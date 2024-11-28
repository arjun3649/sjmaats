import { Card, CardContent } from "@/components/ui/card";
import { type Event } from "@/types/types";
import Image from "next/image";
import { events } from "@/utils/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card className="mb-6 border border-blue-600 transition-all duration-300 shadow-md hover:shadow-xl">
      <CardContent className="flex flex-col p-0 md:flex-row md:gap-6">
        {/* Date Box */}
        <div className="flex w-full flex-col items-center justify-center rounded-t-lg bg-blue-800 p-6 md:w-[100px] md:rounded-none md:rounded-l-lg">
          <div className="text-4xl font-bold text-white">{event.date.day}</div>
          <div className="text-base text-blue-200">{event.date.month}</div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:py-6 md:pr-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-4">
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-semibold text-black">
                {event.title}
              </h3>
              <p className="text-gray-800">{event.description}</p>
            </div>
            <div className="relative mt-4 h-32 w-full overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 md:mt-0 md:h-32 md:w-32 md:flex-shrink-0">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="rounded object-cover transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Events = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="text-center">
          
          <p className="text-xl text-blue-400">
            Stay connected with all our upcoming events and activities
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
