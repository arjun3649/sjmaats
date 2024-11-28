import HalfEvent from "@/components/HalfEvent";
import HalfNews from "@/components/HalfNews";
import Carousel from "@/components/ImageCarousel";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { events } from "@/utils/events";
import { news } from "@/utils/news";
import Footer from "./Footer";
import Members from "./Members";
import MonthlyReminder from "./MonthlyReminder";

const Homepage = () => {
  const halfnews = news[0];
  return (
    <div className="flex h-screen flex-col overflow-x-hidden bg-gray-50 md:overflow-auto">
      <Navbar />
      <div className="container mx-auto flex flex-grow flex-col items-center justify-center gap-8 px-4 py-8 md:flex-row md:justify-center">
        <Carousel />
        {halfnews && (
          <HalfNews
            title={halfnews.title}
            description={halfnews.description}
            imageUrl={halfnews.img}
          />
        )}
      </div>
      <SectionHeading title="Events" />
      <div className="mt-3 w-full">
        <HalfEvent events={events} />
      </div>
      <div className="mt-2 w-full">
        <SectionHeading title="Members" />
        <Members value="half" />
      </div>
      <SectionHeading title="Monthly Reminders" />
      <div>
        <MonthlyReminder />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
