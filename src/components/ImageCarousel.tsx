"use client";
import Image from "next/image";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface CarouselImage {
  id: number;
  title: string;
  src: string;
  alt: string;
}

const ImageCarousel: React.FC = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  const images: CarouselImage[] = [
    {
      id: 1,
      title: "Nature Scene",
      src: "https://vaave.s3.amazonaws.com/assets/site_content/151669119/banners/851f5ac9941d720844d143ed9cfcf60a_ba9af54ac04f6623287a5d9ad91f32a3.jpeg",
      alt: "Beautiful nature landscape",
    },
    {
      id: 2,
      title: "Urban View",
      alt: "City skyline",
      src: "https://vaave.s3.amazonaws.com/assets/site_content/151669119/banners/851f5ac9941d720844d143ed9cfcf60a_577481e9979eb6611d0e81fb8d1866f4.jpeg",
    },
  ];

  return (
    <Carousel
      className="mx-auto w-full max-w-3xl "
      plugins={[plugin.current]}
      opts={{
        loop: true,
        align: "start",
      }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1 ">
              <div className="relative aspect-video overflow-hidden ">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={image.id === 1}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default ImageCarousel;
