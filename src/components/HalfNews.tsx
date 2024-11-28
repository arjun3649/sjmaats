import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HalfNewsProps {
  title: string;
  description: string;
  imageUrl: string;
}

const HalfNews: React.FC<HalfNewsProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-video w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 m-2">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 600px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative p-5">
        <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>

        <p className="mb-4 text-gray-600">
          {description.length > 150
            ? `${description.substring(0, 150)}...`
            : description}
        </p>

        {/* Read More Button - Hidden by default, shown on hover */}
        <div className="absolute bottom-0 left-0 right-0 flex transform items-center justify-end bg-gradient-to-t from-white via-white to-transparent p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Link
            href="/newsroom"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            prefetch={true}
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HalfNews;
