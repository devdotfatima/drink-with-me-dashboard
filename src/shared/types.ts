import { GeoPoint } from "firebase/firestore";

export type LocationT = {
  addedBy: string;
  addedDate: string;
  geoPoint: GeoPoint; // Adjust based on your Firestore data
  locationId: string;
  locationName: string;
  locationReference: string;
  locationType: string;
};

export type RouteT = {
  addedBy: string;
  addedDate: Date; // Timestamp of when the route was added
  routeFare: string; // Fare of the route, stored as a string
  routeFrom: string; // Starting location of the route
  routeID: string;
  routeTo: string;
};
