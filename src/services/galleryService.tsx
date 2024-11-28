// services/galleryService.ts
import { GalleryData } from "@/types/types";

// This could be replaced with actual API calls
export const getGalleryData = async (): Promise<GalleryData> => {
  // Simulated API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    folders: [
      {
        id: "1",
        name: "Summer Wedding 2024",
        description: "Beautiful moments from the summer wedding",

        images: [
          {
            id: "1",
            url: "/api/placeholder/400/300",
            title: "Ceremony",
            createdAt: "2024-06-15",
          },
          {
            id: "2",
            url: "/api/placeholder/400/300",
            title: "Reception",
            createdAt: "2024-06-15",
          },
          {
            id: "3",
            url: "/api/placeholder/400/300",
            title: "Family Photos",
            createdAt: "2024-06-15",
          },
        ],
      },
      {
        id: "2",
        name: "Birthday Party",
        description: "Annual birthday celebration",

        images: [
          {
            id: "4",
            url: "/api/placeholder/400/300",
            title: "Cake Cutting",
            createdAt: "2024-05-20",
          },
          {
            id: "5",
            url: "/api/placeholder/400/300",
            title: "Games",
            createdAt: "2024-05-20",
          },
        ],
      },
    ],
  };
};
