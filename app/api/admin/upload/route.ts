import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        cloudinary.uploader.upload_stream({ folder: `images/${imageCategory}_images` }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        }).end(buffer);
    });
    
    const imageUrl = cloudinaryResponse.secure_url;
    
    return NextResponse.json({ success: true, url: imageUrl }, {status : 201});
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to upload image." },
      { status: 500 },
    );
  }
}
