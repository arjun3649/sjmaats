import SectionHeading from "@/components/SectionHeading";
import { news } from "@/utils/news";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const Newsroom = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Newsroom" />
          <div className="grid grid-cols-1 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md sm:flex-row"
              >
                <div className="relative h-40 w-full flex-shrink-0 sm:h-52 sm:w-[30%] md:m-3">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <h2 className="mb-2 text-lg font-medium text-gray-900">
                    {item.title}
                  </h2>
                  <p className="mb-4 text-gray-600">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <Link
                      href={`/news/${item.slug}`}
                      className="text-sm text-blue-500 hover:text-blue-700"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsroom;
