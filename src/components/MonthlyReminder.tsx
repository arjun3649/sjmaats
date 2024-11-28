import { committeeMembers } from "@/utils/ReminderData";
import { type FC } from "react";
import MonthlyCard from "./MonthlyCard";

const MonthlyReminders: FC = () => {
  // Get the current month
  const currentMonth = new Date().getMonth() + 1; // 1-12

  // Filter the data for birthdays in the current month
  const birthdayData = committeeMembers.filter((member) => {
    if (member.dob) {
      const [month] = member.dob.split("/");

      if (month) {
        return parseInt(month) === currentMonth;
      }
    }
    return false;
  });

  // Filter the data for anniversaries in the current month
  const anniversaryData = committeeMembers.filter((member) => {
    if (member.annidate) {
      const [month] = member.annidate.split("/");
      if (month) {
        return parseInt(month) === currentMonth;
      }
    }
    return false;
  });

  return (
    <div className="h-auto">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-1">
          <MonthlyCard data={birthdayData} title="🎂 Birthdays" />
          <MonthlyCard data={anniversaryData} title="💑 Anniversaries" />
        </div>
      </div>
    </div>
  );
};

export default MonthlyReminders;
