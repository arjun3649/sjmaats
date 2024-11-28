"use client";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { news } from "@/utils/news";
import Image from "next/image";
import { useParams } from "next/navigation";

const NewsPage = () => {
  const { slug } = useParams();

  // Find the news item using the slug
  const newsItem = news.find((item) => item.slug === slug);

  if (!newsItem) {
    return (
      <div>
        <Navbar />
        <div className="bg-gray-100 py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-10 text-3xl font-bold text-gray-900">
              News Not Found
            </h1>
            <p>The requested news item could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="mb-6 w-full max-w-4xl text-center">
              <SectionHeading title={newsItem.title } />
              <p className="mb-4 text-base text-gray-600 sm:text-lg">
                {newsItem.description}
              </p>
              <p className="mb-4 text-sm text-gray-500"> Posted on : {newsItem.date}</p>
              {newsItem.links && (
                <a
                  href={newsItem.links}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-500 hover:text-blue-700 sm:text-base"
                >
                  Check Exam Schedule
                </a>
              )}
            </div>
            <div className="relative mb-6 w-full max-w-4xl">
              <Image
                src={newsItem.img}
                alt={newsItem.title}
                layout="responsive"
                width={700}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
