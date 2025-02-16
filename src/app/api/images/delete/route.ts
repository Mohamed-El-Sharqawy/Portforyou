import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function DELETE(request: Request): Promise<Response> {
  try {
    const { imageId } = await request.json();

    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    return new Promise((resolve) => {
      imagekit.deleteFile(imageId, (error, result) => {
        if (error) {
          resolve(
            NextResponse.json(
              { error: "Failed to delete image" },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json(
              { message: "Image deleted successfully", result },
              { status: 200 }
            )
          );
        }
      });
    });
  } catch (error: Error | unknown) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
