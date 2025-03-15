import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req, { params }) {
    const { filename } = params;
    const { img } = params;
    console.log(filename);
    console.log("hello world!")
    // Define the image path in the "public" folder
    const filePathx = `${filename}/${img}`;
    const filePath = path.join("public", filePathx);
    // Check if the file exists
    console.log(filePath);
    // if (!fs.existsSync(filePath)) {
    //     return NextResponse.json({ message: "image not found" }, { status: 404 });
    // }

    // Determine the content type (only for .jpg and .png)
    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        // Read the image file
        const imageBuffer = fs.readFileSync(filePath);
        // console.log(imageBuffer.toString());
        // Create a response with the image buffer
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpg', // Set the correct MIME type
                'Content-Length': imageBuffer.length.toString(), // Optional: Set content length
            },
        });
    } else if (filePath.endsWith(".png")) {
        const imageBuffer = fs.readFileSync(filePath);

        // Create a response with the image buffer
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png', // Set the correct MIME type
                'Content-Length': imageBuffer.length.toString(), // Optional: Set content length
            },
        });
    } else {
        return NextResponse.json({ msg: "image not found" }, { status: 300 })
    }

    // Stream the image to the response
    fs.createReadStream(filePath).pipe(req);
}
