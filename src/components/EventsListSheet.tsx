import { Pencil, Plus, Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useEvents } from "@/hooks/useEvents";
import { useSelectedDate } from "@/hooks/useSelectedDate";
import { useEventsListSheet } from "@/hooks/useEventsListSheet";
import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";

import { months } from "@/constants/months";

const EventsListSheet = () => {
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const { events, setEvents, setSelectedEvent } = useEvents();
  const { isVisible, setIsVisible } = useEventsListSheet();
  const month = useMonth((state) => state.month);
  const year = useYear((state) => state.year);

  const filtertedEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const dateSelected = new Date(year, month, parseInt(selectedDate!));

    return (
      eventDate.getFullYear() === dateSelected.getFullYear() &&
      eventDate.getMonth() === dateSelected.getMonth() &&
      eventDate.getDate() === dateSelected.getDate()
    );
  });

  const handleDeleteEvent = (id: string) => {
    const newEvents = events.filter((event) => event.id !== id);
    setEvents(newEvents);
  };
  return (
    <Sheet
      open={isVisible}
      onOpenChange={() => {
        setSelectedDate(null);
        setIsVisible(false);
      }}
    >
      <SheetContent>
        <SheetHeader>
          <div className="flex justify-between items-center mt-8">
            <SheetTitle>
              {months[month]} {selectedDate}, {year}
            </SheetTitle>
            <Button
              className="bg-emerald-600 hover:bg-emerald-600/80 focus:outline-none focus-visible:ring-transparent"
              onClick={() => {
                setIsVisible(false);
              }}
            >
              <Plus color="white" />
            </Button>
          </div>
          <SheetDescription>List of events</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-y-4 mt-4">
          {filtertedEvents.length > 0 ? (
            filtertedEvents.map((event) => {
              return (
                <div
                  className={`px-4 py-2.5 rounded-lg flex justify-between items-center`}
                  style={{ backgroundColor: event.color }}
                  key={event.id}
                >
                  <div className="flex flex-col">
                    <p className="text-lg text-white font-semibold">
                      {event.title}
                    </p>
                    <p className="text-gray-100 text-sm">
                      {event.description && event.description.length > 0
                        ? event.description?.substring(0, 20) + "..."
                        : "No description"}
                    </p>
                  </div>

                  <div className="flex gap-x-3 items-center">
                    <Pencil
                      color="white"
                      size={18}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsVisible(false);
                      }}
                    />
                    <Trash2
                      color="white"
                      size={18}
                      className="cursor-pointer"
                      onClick={() => handleDeleteEvent(event.id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-rose-600 text-center font-semibold">
              No events to show
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EventsListSheet;
