import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
    try {
        // Parse form data
        const data = await req.formData();
        const file = data.get("file");

        if (!file) {
            return NextResponse.json({ message: "No file uploaded", success: false });
        }

        // Generate a unique filename
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
        const fileExt = path.extname(file.name);
        const newFileName = `IMG_${timestamp}${fileExt}`;

        // Convert file to Buffer
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);

        // Define the storage path
        const uploadPath = path.join(process.cwd(), "public/user", newFileName);

        // Ensure the directory exists
        await writeFile(uploadPath, buffer);

        // Return the public path
        const returnPath = `/user/${newFileName}`;
        return NextResponse.json({ message: "Upload successful", success: true, path: returnPath });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Upload failed", success: false, error: error.message });
    }
}
