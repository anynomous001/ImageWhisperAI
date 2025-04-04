// actions/upload.ts
'use server';

import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(formData: FormData) {
    const file = formData.get('file') as File;

    if (!file) {
        throw new Error('No file uploaded');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    return {
        message: 'File uploaded successfully',
        filePath: `/uploads/${file.name}`
    };
}
