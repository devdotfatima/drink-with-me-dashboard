import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseDB";
// import { COLLECTIONS } from "../shared/consts";

export const fetchTotals = async () => {
  try {
    // const [routes, locations] = await Promise.all([
    //   getDocs(collection(db, COLLECTIONS.ROUTES)),
    //   getDocs(collection(db, COLLECTIONS.LOCATIONS)),
    // ]);

    // return {
    //   totalRoutes: routes.size,
    //   totalLocations: locations.size,
    // };
     return {
      totalRoutes: 10,
      totalLocations: 10,
    };
  } catch (error) {
    console.error("Error fetching totals:", error);
    return { totalRoutes: 0, totalLocations: 0}; // Default values
  }
};

export type MonthlyBookingData = {
  bookings: number[];
  earnings: number[];
};

export const fetchMonthlyBookings = async (): Promise<MonthlyBookingData> => {
  try {
    const bookingsSnapshot = await getDocs(collection(db, "bookings"));

    // Initialize data for 12 months
    const monthlyData = {
      bookings: Array(12).fill(0),
      earnings: Array(12).fill(0),
    };

    bookingsSnapshot.docs.forEach((doc) => {
      const data = doc.data();

      const pickupDate = data.pickupDate.toDate(); // Convert Firestore timestamp to JS Date
      const month = pickupDate.getMonth(); // Extract 0-based month
      const totalPrice = parseFloat(data.totalPrice); // Parse totalPrice as a float

      // Update bookings count and earnings
      monthlyData.bookings[month] += 1;
      monthlyData.earnings[month] += totalPrice;
    });

    return monthlyData;
  } catch (error) {
    console.error("Error fetching monthly bookings:", error);

    // Return default values on error
    return {
      bookings: Array(12).fill(0),
      earnings: Array(12).fill(0),
    };
  }
};
