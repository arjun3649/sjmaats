import React from "react";
import { type Event } from "@/types/types";
import { Clock, MapPin } from "lucide-react";



interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="group relative rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* Date Display */}
      <div className="mb-3 flex items-baseline gap-2">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600">
            {event.date.day}
          </span>
          <div className="flex flex-col text-sm text-gray-500">
            <span>{event.date.month}</span>
            <span>{event.date.weekday}</span>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        {event.title}
      </h3>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
