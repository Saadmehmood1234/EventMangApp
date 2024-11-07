import Event from "@/model/Event";
import connectToMongoDb from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
// import mongoose from "mongoose";
// interface EventBody {
//   title: string;
//   members: number;
//   description: string;
//   startDate: string;
//   endDate?: string;
//   location: string;
//   organiser: string;
//   sponsers: string;
//   imageUrl?: string;
//   tags?: string[];
//   category: string;
//   // time: string;
// }

export const POST = async (req: NextRequest) => {
  await connectToMongoDb();

  try {
    //  const body: EventBody = await req.json();
    const formData = await req.formData();
    const image = formData.get("image") as File;

    let imageUrl = "";

    // Handle image upload if present
    if (image) {
      // Validate file size (5MB limit)
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size too large. Maximum size is 5MB" },
          { status: 400 }
        );
      }

      // Validate file type
      if (!image.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Invalid file type. Only images are allowed" },
          { status: 400 }
        );
      }

      // Create unique filename
      const filename = `${uuidv4()}${path.extname(image.name)}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filepath = path.join(uploadDir, filename);

      // Convert File to Buffer
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save file to disk
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const sponsors = JSON.parse(formData.get("sponsors") as string);
    const tags = JSON.parse(formData.get("tags") as string);
    console.log("sponsors:",sponsors)
    console.log("tags:",tags)
    console.log("Saad fp[fkdopkl");
    console.log(
      "Event Data:",
      formData.get("time"),
      formData.get("endDate"),
      formData.get("location"),
      formData.get("title"),
      sponsors,
      tags,
      formData.get("endDate"),
      formData.get("category"),
      formData.get("organizerName"),
      formData.get("description")
    );

    if (
      !formData.get("title") ||
      !formData.get("description") ||
      !formData.get("startDate") ||
      !formData.get("location") ||
      !formData.get("organizerName") ||
      !formData.get("members") ||
      !formData.get("category")
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create and save event object using Mongoose
    const event = new Event({
      title: formData.get("title"),
      members: formData.get("members"),
      location: formData.get("location"),
      category: formData.get("category"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      time: formData.get("time"),
      organiser: formData.get("organizerName"),
      sponsors,
      imageUrl,
      tags,
      description: formData.get("description"),
      createdAt: new Date().toISOString(),
    });

    const result = await event.save();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};






// import Event from "@/model/Event";
// import connectToMongoDb from "@/utils/dbConnect";
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";
// import mongoose from "mongoose";

// interface EventBody {
//   title: string;
//   members: number;
//   description: string;
//   startDate: string;
//   endDate?: string;
//   location: string;
//   organiser: string;
//   sponsers: string[];
//   imageUrl?: string;
//   tags?: string[];
//   category: string;
// }

// export const POST = async (req: NextRequest) => {
//   await connectToMongoDb();

//   try {
//     const formData = await req.formData();
//     const image = formData.get("image") as File;

//     let imageUrl = "";

//     // Handle image upload if present
//     if (image) {
//       // Validate file size (5MB limit)
//       if (image.size > 5 * 1024 * 1024) {
//         return NextResponse.json(
//           { error: "File size too large. Maximum size is 5MB" },
//           { status: 400 }
//         );
//       }

//       // Validate file type
//       if (!image.type.startsWith("image/")) {
//         return NextResponse.json(
//           { error: "Invalid file type. Only images are allowed" },
//           { status: 400 }
//         );
//       }

//       // Create unique filename
//       const filename = `${uuidv4()}${path.extname(image.name)}`;
//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       const filepath = path.join(uploadDir, filename);

//       // Convert File to Buffer
//       const bytes = await image.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       // Save file to disk
//       await writeFile(filepath, buffer);
//       imageUrl = `/uploads/${filename}`;
//     }

//     // Parse sponsors and tags
//     let sponsors, tags;
//     try {
//       sponsors = JSON.parse(formData.get("sponsors") as string);
//       tags = JSON.parse(formData.get("tags") as string);

//       // Validate that sponsors and tags are arrays
//       if (!Array.isArray(sponsors) || !Array.isArray(tags)) {
//         throw new Error("Sponsors and tags must be arrays.");
//       }
//     } catch (err) {
//       return NextResponse.json(
//         { error: "Invalid format for sponsors or tags. Ensure they are arrays." },
//         { status: 400 }
//       );
//     }

//     // Validate required fields
//     if (
//       !formData.get("title") ||
//       !formData.get("description") ||
//       !formData.get("startDate") ||
//       !formData.get("location") ||
//       !formData.get("organizerName") ||
//       !formData.get("members") ||
//       !formData.get("category")
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Additional field validations
//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const members = Number(formData.get("members"));
//     const startDate = new Date(formData.get("startDate") as string);
//     const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;

//     // Validate that members is a number
//     if (isNaN(members) || members <= 0) {
//       return NextResponse.json(
//         { error: "Invalid members field. It must be a positive number." },
//         { status: 400 }
//       );
//     }

//     // Validate that startDate is a valid date
//     if (isNaN(startDate.getTime())) {
//       return NextResponse.json(
//         { error: "Invalid start date." },
//         { status: 400 }
//       );
//     }

//     // Validate that endDate is a valid date if provided and after startDate
//     if (endDate && (isNaN(endDate.getTime()) || endDate < startDate)) {
//       return NextResponse.json(
//         { error: "Invalid end date. It must be after the start date." },
//         { status: 400 }
//       );
//     }

//     // Validate string length for title and description
//     if (title.length > 100) {
//       return NextResponse.json(
//         { error: "Title is too long. Maximum length is 100 characters." },
//         { status: 400 }
//       );
//     }

//     if (description.length > 1000) {
//       return NextResponse.json(
//         { error: "Description is too long. Maximum length is 1000 characters." },
//         { status: 400 }
//       );
//     }

//     // Create and save event object using Mongoose
//     const event = new Event({
//       title,
//       members,
//       location: formData.get("location"),
//       category: formData.get("category"),
//       startDate,
//       endDate,
//       time: formData.get("time"),
//       organiser: formData.get("organizerName"),
//       sponsors,
//       imageUrl,
//       tags,
//       description,
//       createdAt: new Date().toISOString(),
//     });

//     const result = await event.save();

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Event creation error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// };
