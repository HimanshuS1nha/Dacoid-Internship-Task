import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { useSelectedDate } from "@/hooks/useSelectedDate";
import { useEvents } from "@/hooks/useEvents";
import { useEditEventDialog } from "@/hooks/useEditEventDialog";

import type { EventType } from "types";

const EditEventDialog = () => {
  const { setSelectedDate } = useSelectedDate();
  const { isVisible, setIsVisible } = useEditEventDialog();
  const { events, setEvents, selectedEvent, setSelectedEvent } = useEvents();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState(new Date());

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEditEvent = () => {
    const newEvents: EventType[] = events.map((event) => {
      if (event.id === selectedEvent!.id) {
        return {
          color,
          date,
          endTime,
          startTime,
          title,
          description,
          id: event.id,
        };
      } else {
        return event;
      }
    });

    setSelectedEvent(null);
    setEvents(newEvents);
    setIsVisible(false);
  };

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setStartTime(selectedEvent.startTime);
      setEndTime(selectedEvent.endTime);
      setColor(selectedEvent.color);
      setDate(selectedEvent.date);
    }
  }, [selectedEvent]);
  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        setSelectedDate(null);
        setIsVisible(false);
      }}
    >
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>Click edit when done.</DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditEvent();
          }}
        >
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="title">
              Event Title
            </Label>
            <Input
              placeholder="Enter event title"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="desxription">
              Event Description
            </Label>
            <Textarea
              placeholder="Enter event description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="desxription">
              Event Date
            </Label>
            <Input
              placeholder="Enter event date"
              id="date"
              type="date"
              value={formatDate(new Date(date))}
              onChange={(e) => {
                console.log(new Date(e.target.value));
                setDate(new Date(e.target.value));
              }}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="startTime">
              Event Start Time
            </Label>
            <Input
              placeholder="Enter start time"
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="endTime">
              Event End Time
            </Label>
            <Input
              placeholder="Enter end time"
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="endTime">
              Color
            </Label>
            <Select
              required
              value={color}
              onValueChange={(value) => setColor(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="#dc2626">Red</SelectItem>
                <SelectItem value="#16a34a">Green</SelectItem>
                <SelectItem value="#2563eb">Blue</SelectItem>
                <SelectItem value="#ca8a04">Yellow</SelectItem>
                <SelectItem value="#9333ea">Purple</SelectItem>
                <SelectItem value="#ea580c">Orange</SelectItem>
                <SelectItem value="#db2777">Pink</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Edit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
