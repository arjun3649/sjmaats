
import Link from "next/link";
import EventCard from "./EventCard";
import { ArrowRight } from "lucide-react";
import {type Event } from "@/types/types";

interface HalfEventProps{
  events: Event[];
}

const HalfEvent: React.FC<HalfEventProps> = ({ events }) => {
  const displayEvents = events.slice(0, 3);
  const hasMoreEvents = events.length > 3;

  return (
    <div className="min-w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {hasMoreEvents && (
        <div className="flex justify-center">
          <Link
            href="/events"
            className="group mx-auto flex h-12 w-4/5 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-2xl sm:h-14 sm:w-3/5 md:h-16 md:w-1/4"
          >
            View All Events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HalfEvent;