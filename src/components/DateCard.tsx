import { CalendarIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useEventsListSheet } from "@/hooks/useEventsListSheet";
import { useSelectedDate } from "@/hooks/useSelectedDate";
import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";
import { useEvents } from "@/hooks/useEvents";

const DateCard = ({ date }: { date: string }) => {
  const setIsVisible = useEventsListSheet((state) => state.setIsVisible);
  const setSelectedDate = useSelectedDate((state) => state.setSelectedDate);
  const month = useMonth((state) => state.month);
  const year = useYear((state) => state.year);
  const events = useEvents((state) => state.events);
  const filtertedEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const dateSelected = new Date(year, month, parseInt(date));

    return (
      eventDate.getFullYear() === dateSelected.getFullYear() &&
      eventDate.getMonth() === dateSelected.getMonth() &&
      eventDate.getDate() === dateSelected.getDate()
    );
  });
  return (
    <Card
      className={`w-[150px] h-[85px] flex items-center justify-center hover:text-white delay-100 transition-all cursor-pointer relative ${
        date === "" ? "bg-gray-300" : "hover:bg-primary"
      }`}
      onClick={() => {
        setSelectedDate(date);
        setIsVisible(true);
      }}
    >
      {date !== "" && (
        <CardContent className="flex flex-col items-center">
          <p
            className={`${
              new Date().getDate() === parseInt(date)
                ? "bg-primary size-8 flex justify-center items-center rounded-full text-white"
                : ""
            }`}
          >
            {date}
          </p>

          <div className="absolute bottom-1.5 right-1.5 flex gap-x-1 items-center">
            <CalendarIcon size={15} />
            <p className="text-xs">{filtertedEvents.length}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DateCard;
