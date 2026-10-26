import { NextResponse } from "next/server";
import cloudinary from "@/services/cloudinary"

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const imageCategory = body.get("type");
    const imageFile = body.get("file") as File;

    if (!imageFile) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: `images/${imageCategory}_images` },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    const imageUrl = cloudinaryResponse.secure_url;

    return NextResponse.json({ success: true, url: imageUrl }, { status: 201 });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    return NextResponse.json(
      { success: false, message: "Unable to upload image." },
      { status: 500 },
    );
  }
}
