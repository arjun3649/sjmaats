import type { FC } from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({ title, className = "" }) => {
  return (
    <div className={`relative w-full py-6 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="relative flex items-center">
          <div className="absolute left-0 top-1/2 h-0.5 w-full "></div>
          <div className="relative z-10 flex w-full items-center">
            <div className=" pr-6">
              <h2 className="text-2xl font-bold tracking-wide text-blue-900 md:text-4xl">
                {title}
              </h2>
            </div>
            <div className="flex-grow">
              <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-300 to-transparent"></div>
            </div>
            <div className="ml-4 flex items-center space-x-2">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;