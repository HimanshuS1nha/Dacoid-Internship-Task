import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Calendar from "@/components/Calendar";
import EventsListSheet from "@/components/EventsListSheet";
import AddEventDialog from "@/components/AddEventDialog";
import EditEventDialog from "@/components/EditEventDialog";

import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";

import { months } from "@/constants/months";

const App = () => {
  const { month, setMonth } = useMonth();
  const { year, setYear } = useYear();

  const handlePrevious = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  return (
    <div className="pt-5 px-5 flex flex-col gap-y-8">
      <EventsListSheet />

      <AddEventDialog />

      <EditEventDialog />

      <div className="flex justify-between items-center w-full">
        <Button onClick={handlePrevious}>
          <ChevronLeft color="white" />
        </Button>
        <h1 className="text-primary text-2xl font-bold">
          {months[month]} {year}
        </h1>
        <Button onClick={handleNext}>
          <ChevronRight color="white" />
        </Button>
      </div>

      <Calendar />
    </div>
  );
};

export default App;
