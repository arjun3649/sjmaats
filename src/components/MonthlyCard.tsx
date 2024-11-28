import { type Member } from "@/types/types";
import Image from "next/image";
import { type FC } from "react";

interface MonthlyCard {
  data: Member[];
  title: string;
}

const MonthlyCard: FC<MonthlyCard> = ({ data, title }) => {
  return (
    <div className="w-full overflow-hidden rounded-sm bg-white shadow-lg">
      <div className="bg-blue-600 px-6 py-4">
        <div className="flex items-center justify-center gap-2 text-2xl font-extralight text-white">
          {title}
        </div>
      </div>
      <div className="p-6">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <p className="text-lg">No {title.toLowerCase()} this month</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {data.map((person, index) => (
              <li
                key={index}
                className="flex items-center gap-4 rounded-lg bg-blue-50 p-3 transition-all duration-200 hover:bg-blue-100 md:flex-row"
              >
                <div className="h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-orange-500 shadow-md">
                  <Image
                    src={person.imageUrl}
                    alt={person.name}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-orange-500 object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <p className="font-medium text-blue-900">{person.name}</p>
                  <p className="text-sm text-blue-600">
                    {title === "Birthdays" ? person.dob : person.annidate}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MonthlyCard;
