import { Image as ImageType } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface ImageGridProps {
  images: ImageType[];
}

export function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <Card key={image._id} className="overflow-hidden">
          <img
            src={image.url}
            alt={image.filename}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-500 truncate">{image.filename}</p>
            <p className="text-xs text-gray-400">
              {new Date(image.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}