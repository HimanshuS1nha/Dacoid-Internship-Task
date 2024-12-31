import { CalendarIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const DateCard = ({ date }: { date: string }) => {
  return (
    <Card
      className={`w-[150px] h-[85px] flex items-center justify-center hover:text-white delay-100 transition-all cursor-pointer relative ${
        date === "" ? "bg-gray-300" : "hover:bg-primary"
      }`}
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
            <p className="text-xs">0</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DateCard;
