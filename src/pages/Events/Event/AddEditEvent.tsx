import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "../../../shared/lib/validations"; 
import { useEffect, useState } from "react";

export type EventForm = {
  title: string;
  description?: string;
  eventType: "Wine Tasting" | "Art Event" | "Food" | "Music" | "Other";
  date: string;
  time: string;
  venueId: string;
};

const defaultValues: EventForm = {
  title: "",
  description: "",
  eventType: "Wine Tasting",
  date: "",
  time: "",
  venueId: "",
};

const eventTypes = ["Wine Tasting", "Art Event", "Food", "Music", "Other"];

const AddEditEvent = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  const [venues, setVenues] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    // Replace this with actual fetch call
    const fetchVenues = async () => {
      // Example data
      const response = [
        { id: "1", name: "Downtown Lounge" },
        { id: "2", name: "Seaside Bistro" },
      ];
      setVenues(response);
    };

    fetchVenues();
  }, []);

  const onSubmit = (data: EventForm) => {
    console.log("Event Submitted:", data);
    // Call add/edit API based on `isEdit`
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-8 text-start">
        {isEdit ? "Edit Event" : "Add Event"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label className="form-label">Title</label>
          <input {...register("title")} className="form-input" />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div>
          <label className="form-label">Description</label>
          <textarea {...register("description")} className="form-input" />
          {errors.description && <p className="form-error">{errors.description.message}</p>}
        </div>

        <div>
          <label className="form-label">Event Type</label>
          <select {...register("eventType")} className="form-input">
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.eventType && <p className="form-error">{errors.eventType.message}</p>}
        </div>

        <div>
          <label className="form-label">Date</label>
          <input type="date" {...register("date")} className="form-input" />
          {errors.date && <p className="form-error">{errors.date.message}</p>}
        </div>

        <div>
          <label className="form-label">Time</label>
          <input type="time" {...register("time")} className="form-input" />
          {errors.time && <p className="form-error">{errors.time.message}</p>}
        </div>

        <div>
          <label className="form-label">Venue</label>
          <select {...register("venueId")} className="form-input">
            <option value="">Select a venue</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
          {errors.venueId && <p className="form-error">{errors.venueId.message}</p>}
        </div>

        <div className="text-end">
          <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700">
            {isEdit ? "Update Event" : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditEvent;