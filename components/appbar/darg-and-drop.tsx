"use client"

import { uploadFile } from "@/actions/upload";
import React from "react";

export default function UploadPage() {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    async function handleUpload(formData: FormData) {

        uploadFile(formData).then((result) => {
            setImageUrl(result.filePath);
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <h1 className="text-2xl font-bold mb-4 text-slate-500">Upload an Image</h1>
            <div className="flex flex-col items-center justify-center">
                <form action={handleUpload} className="space-y-4 flex flex-col items-center gap-6">

                    {imageUrl ? (
                        <div className="w-full ">
                            <img src={imageUrl} alt="Uploaded" className="w-full  max-w-sm rounded-md shadow-md" />
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center rounded-md justify-center w-[500px] h-[50vh] bg-slate-100 bg-opacity-40">
                            <input
                                type="file"
                                name="file"
                                className=" file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0
                file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Upload Image
                    </button>
                </form>
            </div>




        </div>
    );
}
