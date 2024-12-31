import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

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

import { useAddEventDialog } from "@/hooks/useAddEventDialog";
import { useSelectedDate } from "@/hooks/useSelectedDate";
import { useEvents } from "@/hooks/useEvents";
import { useMonth } from "@/hooks/useMonth";
import { useYear } from "@/hooks/useYear";

import type { EventType } from "types";

const AddEventDialog = () => {
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const { isVisible, setIsVisible } = useAddEventDialog();
  const { events, setEvents } = useEvents();
  const month = useMonth((state) => state.month);
  const year = useYear((state) => state.year);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("");

  const handleAddEvent = () => {
    const newEventStartTime = new Date(
      year,
      month,
      parseInt(selectedDate!),
      parseInt(startTime.split(":")[0]),
      parseInt(startTime.split(":")[1])
    ).getTime();
    const newEventEndTime = new Date(
      year,
      month,
      parseInt(selectedDate!),
      parseInt(endTime.split(":")[0]),
      parseInt(endTime.split(":")[1])
    ).getTime();

    if (newEventEndTime < newEventStartTime) {
      return alert("Start time cannot be less than end time");
    }

    // Checking for event clash
    const event = events.find((event) => {
      const eventDate = new Date(event.date);
      const eventStartTime = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        parseInt(event.startTime.split(":")[0]),
        parseInt(event.startTime.split(":")[1])
      ).getTime();
      const eventEndTime = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        parseInt(event.endTime.split(":")[0]),
        parseInt(event.endTime.split(":")[1])
      ).getTime();

      if (newEventStartTime >= eventStartTime) {
        if (newEventStartTime <= eventEndTime) {
          return true;
        } else {
          return false;
        }
      } else {
        if (newEventEndTime <= eventStartTime) {
          return true;
        } else if (newEventEndTime >= eventEndTime) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (event) {
      return alert("There is already an event at this time slot");
    }

    const newEvents: EventType[] = [
      ...events,
      {
        id: uuidV4(),
        title,
        description,
        endTime,
        startTime,
        color,
        date: new Date(year, month, parseInt(selectedDate!)),
      },
    ];

    setEvents(newEvents);
    setIsVisible(false);
  };
  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        setSelectedDate(null);
        setIsVisible(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>Click add when done.</DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddEvent();
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
            <Select required onValueChange={(value) => setColor(value)}>
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

          <Button type="submit">Add</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
