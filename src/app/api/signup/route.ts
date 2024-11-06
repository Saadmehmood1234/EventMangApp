// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import connectToMongoDb from "@/utils/dbConnect";
// import { MyEventUser } from "@/model/User";

// export const POST = async (req: NextRequest) => {
//   try {
//     await connectToMongoDb();

//     const { name, email, password } = await req.json();

//     if (!email || !name || !password) {
//       return NextResponse.json({ message: "Please provide all fields" }, { status: 400 });
//     }

//     const user = await MyEventUser.findOne({ email });
//     if (user) {
//       return NextResponse.json({ message: "User already exists" }, { status: 400 });
//     }

//     const hashedPassword = await bcryptjs.hash(password, 10);
//     await MyEventUser.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Error in Sign Up" }, { status: 500 });
//   }
// };
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectToMongoDb from "@/utils/dbConnect";
import { MyEventUser } from "@/model/User";

export const POST = async (req: NextRequest) => {
  try {
    await connectToMongoDb();

    const { name, email, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json({ message: "Please provide all fields" }, { status: 400 });
    }

    const user = await MyEventUser.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${name}`;
    const hashedPassword = await bcryptjs.hash(password, 10);
    await MyEventUser.create({
      name,
      email,
      password: hashedPassword,
      image:boyProfilePicture
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error in Sign Up" }, { status: 500 });
  }
};
