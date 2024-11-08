// import { writeFile } from "fs/promises";
// import path from "path";
// import { v4 as uuidv4 } from "uuid";
// import { NextResponse } from "next/server";
// import connectToMongoDb from "@/utils/dbConnect";
// import { MyEventUser } from "@/model/User";
// export async function PUT(request: Request) {
//   try {
//     const formData = await request.formData();
//     const image = formData.get("avatarUrl") as File;

//     let imageUrl = "";

//     if (image) {
//       if (image.size > 5 * 1024 * 1024) {
//         return NextResponse.json(
//           { error: "File size too large. Maximum size is 5MB" },
//           { status: 400 }
//         );
//       }

//       if (!image.type.startsWith("image/")) {
//         return NextResponse.json(
//           { error: "Invalid file type. Only images are allowed" },
//           { status: 400 }
//         );
//       }
//       const filename = `${uuidv4()}${path.extname(image.name)}`;
//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       const filepath = path.join(uploadDir, filename);
//       const bytes = await image.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       await writeFile(filepath, buffer);
//       imageUrl = `/uploads/${filename}`;
//     }

//     const name = formData.get("name");
//     const id = formData.get("id");
//     const semester = formData.get("semester");
//     const enrollment = formData.get("enrollment");
//     const avatarUrl = formData.get("avatarUrl");
//     const email = formData.get("email");
//     const phone = formData.get("phone");
//     // const { id, name, enrollment, email, semester, phone, avatarUrl } = await request.json();
//     await connectToMongoDb();
//     console.log(
//       "Request data:",
//       id,
//       name,
//       semester,
//       enrollment,
//       email,
//       avatarUrl,
//       phone
//     );
//     const updatedUser = await MyEventUser.findOneAndUpdate(
//       { email },
//       {
//         $set: {
//           ...(name && { name }),
//           ...(enrollment && { enrollment }),
//           ...(semester && { semester }),
//           ...(phone && { phone }),
//           ...(avatarUrl && { image: avatarUrl }),
//         },
//       },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json({ success: true, user: updatedUser });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// // export const POST = async (req: NextRequest) => {
// //   await connectToMongoDb();

// //   try {
// //     //  const body: EventBody = await req.json();
// //     const formData = await req.formData();
// //     const image = formData.get("image") as File;

// //     let imageUrl = "";

// //     // Handle image upload if present
// //     if (image) {
// //       // Validate file size (5MB limit)
// //       if (image.size > 5 * 1024 * 1024) {
// //         return NextResponse.json(
// //           { error: "File size too large. Maximum size is 5MB" },
// //           { status: 400 }
// //         );
// //       }

// //       // Validate file type
// //       if (!image.type.startsWith("image/")) {
// //         return NextResponse.json(
// //           { error: "Invalid file type. Only images are allowed" },
// //           { status: 400 }
// //         );
// //       }

// //       // Create unique filename
// //       const filename = `${uuidv4()}${path.extname(image.name)}`;
// //       const uploadDir = path.join(process.cwd(), "public/uploads");
// //       const filepath = path.join(uploadDir, filename);

// //       // Convert File to Buffer
// //       const bytes = await image.arrayBuffer();
// //       const buffer = Buffer.from(bytes);

// //       // Save file to disk
// //       await writeFile(filepath, buffer);
// //       imageUrl = `/uploads/${filename}`;
// //     }

// //     const sponsors = JSON.parse(formData.get("sponsors") as string);
// //     const tags = JSON.parse(formData.get("tags") as string);
// //     console.log("sponsors:",sponsors)
// //     console.log("tags:",tags)
// //     console.log("Saad fp[fkdopkl");
// //     console.log(
// //       "Event Data:",
// //       formData.get("time"),
// //       formData.get("endDate"),
// //       formData.get("location"),
// //       formData.get("title"),
// //       sponsors,
// //       tags,
// //       formData.get("endDate"),
// //       formData.get("category"),
// //       formData.get("organizerName"),
// //       formData.get("description")
// //     );

// //     if (
// //       !formData.get("title") ||
// //       !formData.get("description") ||
// //       !formData.get("startDate") ||
// //       !formData.get("location") ||
// //       !formData.get("organizerName") ||
// //       !formData.get("members") ||
// //       !formData.get("category")
// //     ) {
// //       return NextResponse.json(
// //         { error: "Missing required fields" },
// //         { status: 400 }
// //       );
// //     }

// //     // Create and save event object using Mongoose
// //     const event = new Event({
// //       title: formData.get("title"),
// //       members: formData.get("members"),
// //       location: formData.get("location"),
// //       category: formData.get("category"),
// //       startDate: formData.get("startDate"),
// //       endDate: formData.get("endDate"),
// //       time: formData.get("time"),
// //       organiser: formData.get("organizerName"),
// //       sponsors,
// //       imageUrl,
// //       tags,
// //       description: formData.get("description"),
// //       createdAt: new Date().toISOString(),
// //     });

// //     const result = await event.save();

// //     return NextResponse.json(result);
// //   } catch (error) {
// //     console.error("Event creation error:", error);
// //     return NextResponse.json(
// //       { error: "Internal server error" },
// //       { status: 500 }
// //     );
// //   }
// // };
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import connectToMongoDb from "@/utils/dbConnect";
import { MyEventUser } from "@/model/User";

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    let imageUrl = "";
    console.log("New Saad Mehmood Image:", image);
    // Handling image upload
    if (image) {
      // Check if image size exceeds 5MB
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size too large. Maximum size is 5MB" },
          { status: 400 }
        );
      }
      console.log("ANKUSH SINGH")
      // Check if the file type is an image
    //   if (!image.type.startsWith("image/")) {
    //     return NextResponse.json(
    //       { error: "Invalid file type. Only images are allowed" },
    //       { status: 400 }
    //     );
    //   }
    

      // Generate a unique file name using UUID and file extension
      const filename = `${uuidv4()}${path.extname(image.name)}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filepath = path.join(uploadDir, filename);

      // Convert the image to a buffer and write it to disk
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      // Set the image URL for saving in the database
      imageUrl = `/uploads/${filename}`;
    }
  console.log("ROHIT SINGH")
    const name = formData.get("name")?.toString();
    const id = formData.get("id")?.toString();
    const semester = formData.get("semester")?.toString();
    const enrollment = formData.get("enrollment")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const course = formData.get("course")?.toString();
    console.log("Image:", imageUrl);
    await connectToMongoDb();
    console.log("Request data:", {
      id,
      name,
      semester,
      enrollment,
      email,
      phone,
      course,
      image: imageUrl,
    });

    // Update the user's data in the database
    const updatedUser = await MyEventUser.findOneAndUpdate(
      { email },
      {
        $set: {
          ...(name && { name }),
          ...(enrollment && { enrollment }),
          ...(semester && { semester }),
          ...(phone && { phone }),
          ...(course && { course }),
          ...(imageUrl && { image: imageUrl }), // Update the image if available
        },
      },
      { new: true }
    );

    // If the user was not found, return a 404 response
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated user data as a response
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    // Handle errors and return a 500 response
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
