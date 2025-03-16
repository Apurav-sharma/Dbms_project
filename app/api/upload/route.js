import { writeFile } from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse form data
        const data = await req.formData();
        console.log(data)
        const file = data.get("image"); 
        console.log(file)// Ensure "image" is the form field name

        // Check if file exists
        if (!file) {
            return NextResponse.json({ message: "No file uploaded", success: false });
        }

        // Ensure file has a valid name
        if (!file.name || !file.name.includes(".")) {
            return NextResponse.json({ message: "Invalid file name", success: false });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split('.').pop(); // Extract file extension
        const filename = `IMG${timestamp}.${extension}`;

        // Define file path
        const uploadDir = path.join(process.cwd(), "public/user");

        // Ensure the upload directory exists
        await writeFile(uploadDir, "", { flag: "a" }); // Ensures folder is available

        const filePath = path.join(uploadDir, filename);

        // Create a writable stream and write file data
        const stream = createWriteStream(filePath);
        stream.write(Buffer.from(await file.arrayBuffer()));

        return NextResponse.json({ message: "Upload successful", success: true, path: `/user/${filename}` });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Upload failed", success: false, error: error.message });
    }
}

// Disable Next.js body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};
