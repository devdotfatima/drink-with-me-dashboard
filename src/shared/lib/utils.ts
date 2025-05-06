import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { setKey, setLanguage, geocode, RequestType } from "react-geocode";

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

setKey(import.meta.env.VITE_GEOCODER_API_KEY as string);
setLanguage("en");

export const getAddress = async (
  lat: number,
  lng: number
): Promise<{ address: string; locationId: string }> => {
  try {
    const { results } = await geocode(RequestType.LATLNG, `${lat},${lng}`);

    if (!results || results.length === 0) {
      throw new Error("No results found");
    }

    const locationData = {
      address: results[0].formatted_address,
      locationId: results[0].place_id,
    };

    return locationData;
  } catch (error) {
    console.error("Geocode error:", error);
    throw error;
  }
};

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d");
    } else {
      return formatDate(from, "MMM d, yyyy");
    }
  }
}
