import { NextResponse } from "next/server";
import { MyImages } from "@/model/Images";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import connectToMongoDb from "@/utils/dbConnect";
export async function POST(request: Request) {
  await connectToMongoDb();
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
   console.log("mydfile",file)
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size too large. Maximum size is 5MB" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed" }, { status: 400 });
    }

    const filename = `${uuidv4()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filepath = path.join(uploadDir, filename);

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file to disk
    await writeFile(filepath, buffer);

    // Save to MongoDB using the model
    const newImage = new MyImages({
      filename: file.name,
      url: `/uploads/${filename}`,
      createdAt: new Date().toISOString(),
    });

    const result = await newImage.save();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
