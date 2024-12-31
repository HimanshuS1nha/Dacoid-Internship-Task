import { startOfMonth, endOfMonth, getDay } from "date-fns";

import DateCard from "@/components/DateCard";

import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";

import { days } from "@/constants/days";

const Calendar = () => {
  const month = useMonth((state) => state.month);
  const year = useYear((state) => state.year);

  const getCalendar = () => {
    const firstDay = startOfMonth(new Date(year, month));
    const lastDay = endOfMonth(firstDay);
    const firstDayOfWeek = getDay(firstDay);
    const daysInMonth = lastDay.getDate();

    const calendar: string[] = new Array(firstDayOfWeek).fill("");

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day.toString());
    }
    
    return calendar;
  };
  return (
    <div className="flex flex-col gap-y-4 pl-4 min-w-[1500px] overflow-hidden overflow-x-auto">
      <div className="flex items-center flex-wrap gap-x-16">
        {days.map((day) => {
          return (
            <div key={day} className="w-[150px] flex justify-center">
              <p className="font-bold">{day}</p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center flex-wrap gap-x-16 gap-y-6">
        {getCalendar().map((item, i) => {
          return <DateCard key={i} date={item} />;
        })}
      </div>
    </div>
  );
};

export default Calendar;
