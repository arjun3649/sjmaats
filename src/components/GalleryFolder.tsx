// components/Gallery.tsx
'use client';

import React, { useState } from 'react';
import { Folder, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GalleryFolder, GalleryImage, GalleryData } from '@/types/types';

interface GalleryProps {
  initialData: GalleryData;
}

const Gallery = ({ initialData }: GalleryProps) => {
  const [currentFolder, setCurrentFolder] = useState<GalleryFolder | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleFolderClick = (folder: GalleryFolder) => {
    setCurrentFolder(folder);
  };

  const handleBackClick = () => {
    setCurrentFolder(null);
  };

  const FolderView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {initialData.folders.map((folder) => (
        <Card 
          key={folder.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleFolderClick(folder)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              {folder.name}
            </CardTitle>
            {folder.description && (
              <CardDescription>{folder.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">
              {folder.images.length} images
            </div>
            {folder.createdAt && (
              <div className="text-sm text-gray-500">
                Created: {new Date(folder.createdAt).toLocaleDateString()}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ImageGrid = ({ folder }: { folder: GalleryFolder }) => (
    <div>
      <div className="p-4">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={handleBackClick}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to folders
        </Button>
        <h2 className="text-2xl font-bold mb-4">{folder.name}</h2>
      </div>
      <ScrollArea className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {folder.images.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-2">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-48 object-cover rounded-md"
                      loading="lazy"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm">{image.title}</p>
                    {image.createdAt && (
                      <p className="text-sm text-gray-500">
                        {new Date(image.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {currentFolder ? (
        <ImageGrid folder={currentFolder} />
      ) : (
        <FolderView />
      )}
    </>
  );
};

export default Gallery;