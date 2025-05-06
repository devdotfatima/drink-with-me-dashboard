import { z } from "zod";

import { GeoPoint } from "firebase/firestore";

export const LocationSchema = z.object({
  locationName: z.string().min(1, "Address is required"),
  locationType: z.object({
    label: z.string(),
    value: z.string(),
  }),
  // geoPoint: z.tuple([z.number(), z.number()]),
  geoPoint: z.custom<GeoPoint>(),
  locationId: z.string(),
  locationReference: z.string(),
  addedBy: z.string(),
  addedDate: z.string(),
});

export type LocationTypeT = z.infer<typeof LocationSchema>;

export const RouteSchema = z
  .object({
    routeFare: z.number().min(1, "Fare must be at least 1"),

    routeFrom: z.object({
      label: z.string().min(1, "Location label is required"),
      value: z.string().min(1, "Location value is required"),
    }),

    routeTo: z.object({
      label: z.string().min(1, "Location label is required"),
      value: z.string().min(1, "Location value is required"),
    }),
    routeID: z.string().optional(),
    addedBy: z.string().optional(),
    addedDate: z.date().optional(),
  })
  .refine((data) => data.routeFrom.value !== data.routeTo.value, {
    path: ["routeTo"], // Attach the error to the "routeTo" field
    message: "'From' and 'To' locations cannot be the same",
  });
export type RouteTypeT = z.infer<typeof RouteSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginTypeT = z.infer<typeof LoginSchema>;


export const venueSchema = z.object({
  name: z.string().min(1, "Venue name is required"),
  location: z.string().min(1, "Location is required"),
  imageUrls: z.array(z.string().url("Must be a valid URL")).min(1),
  popularDrinks: z.array(z.string().min(1, "Drink name required")).min(1),
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  days: z.array(z.string()).min(1, "Select at least one day"),
  hours: z.string().min(1, "Hours are required"),
});

export type VenueForm = z.infer<typeof venueSchema>;


export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  eventType: z.enum(["Wine Tasting", "Art Event", "Food", "Music", "Other"], {
    required_error: "Event type is required",
  }),
  date: z.string().min(1, "Date is required"), // Can be refined further with regex or Zod.date()
  time: z.string().min(1, "Time is required"), // Can be refined for time format
  venueId: z.string().min(1, "Venue is required"),
});