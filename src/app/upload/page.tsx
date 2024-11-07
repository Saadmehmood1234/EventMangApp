"use client";

import { ImageUploader } from "@/components/ImageUploader";
import { ImageGrid } from "@/components/ImageGrid";
import { useState } from "react";
import { Image as ImageType } from "@/lib/types";

export default function UploadPage() {
  const [images, setImages] = useState<ImageType[]>([]);

  const handleUploadSuccess = (newImage: ImageType) => {
    setImages((prev) => [newImage, ...prev]);
  };
 console.log("my images",images)
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Image Upload</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload and manage your images</p>
        </div>
        
        <ImageUploader onUploadSuccess={handleUploadSuccess} />
        <ImageGrid images={images} />
      </div>
    </div>
  );
}