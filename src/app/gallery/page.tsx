// app/gallery/page.tsx
import Footer from "@/components/Footer";
import Gallery from "@/components/GalleryFolder";
import Navbar from "@/components/Navbar";
import { getGalleryData } from "@/services/galleryService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Browse through our collection of photos organized by events",
};

export default async function GalleryPage() {
  const galleryData = await getGalleryData();

  return (
    <main className=" bg-gray-50">
      <Navbar/>
      <div className="container mx-auto py-8">
        <h1 className="mb-8 px-4 text-3xl font-bold">Photo Gallery</h1>
        <Gallery initialData={galleryData} />
      </div>
      <Footer/>
    </main>
  );
}
