import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseDB";
import { COLLECTIONS, PAGE_SIZE } from "../shared/consts";
import { LocationT } from "../shared/types";
import { LocationTypeT } from "../shared/lib/validations";

export const fetchLocations = async (
  pageNumber: number = 1
): Promise<{
  locations: LocationT[];
  total: number;
}> => {
  try {
    const locationsRef = collection(db, COLLECTIONS.LOCATIONS);
    const locationsQuery = query(
      locationsRef,
      orderBy("addedDate", "desc"),
      limit(PAGE_SIZE)
    );

    // Fetch total count for pagination purposes
    const snapshot = await getCountFromServer(locationsRef);
    const totalCount = snapshot.data().count;

    // Calculate the starting document based on the page number
    let startingDoc = null;
    if (pageNumber > 1) {
      const skipDocsQuery = query(
        locationsRef,
        orderBy("addedDate", "desc"),
        limit((pageNumber - 1) * PAGE_SIZE)
      );
      const skipDocs = await getDocs(skipDocsQuery);
      startingDoc = skipDocs.docs[skipDocs.docs.length - 1];
    }

    const locationData: LocationT[] = [];
    let locationsQueryWithStart = locationsQuery;
    if (startingDoc) {
      locationsQueryWithStart = query(
        locationsRef,
        orderBy("addedDate", "desc"),
        startAfter(startingDoc),
        limit(PAGE_SIZE)
      );
    }

    const dbResults = await getDocs(locationsQueryWithStart);

    dbResults.forEach((doc) => {
      locationData.push({
        addedBy: doc.data().addedBy,
        addedDate: doc.data().addedDate,
        geoPoint: doc.data().geoPoint,
        locationId: doc.data().locationId,
        locationName: doc.data().locationName,
        locationReference: doc.data().locationReference,
        locationType: doc.data().locationType,
      });
    });

    return { locations: locationData, total: totalCount };
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const fetchAllLocations = async (): Promise<LocationT[]> => {
  try {
    const locationsRef = collection(db, COLLECTIONS.LOCATIONS);
    const locationsQuery = query(locationsRef);

    const locationData: LocationT[] = [];
    const dbResults = await getDocs(locationsQuery);

    dbResults.forEach((doc) => {
      const data = doc.data();
      locationData.push({
        addedBy: data.addedBy,
        addedDate: data.addedDate,
        geoPoint: data.geoPoint,
        locationId: data.locationId,
        locationName: data.locationName,
        locationReference: data.locationReference,
        locationType: data.locationType,
      });
    });

    return locationData;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const deleteLocation = async (locationId: string) => {
  const locationRef = doc(db, COLLECTIONS.LOCATIONS, locationId);
  try {
    await deleteDoc(locationRef);
  } catch (error) {
    console.error("Error deleting location: ", error);
    throw error;
  }
};

export const createLocation = async (
  locationData: Omit<LocationT, "locationId">
) => {
  const locationRef = doc(collection(db, COLLECTIONS.LOCATIONS));
  const location = {
    ...locationData,
    locationId: locationRef.id,
  };
  try {
    await setDoc(locationRef, location);
    return location;
  } catch (error) {
    console.error("Error creating location: ", error);
    throw error;
  }
};

export const updateLocation = async (
  locationId: string,
  updatedData: Partial<LocationTypeT>
) => {
  const locationRef = doc(db, COLLECTIONS.LOCATIONS, locationId);

  try {
    await updateDoc(locationRef, {
      ...updatedData,
      locationType: updatedData.locationType?.value,
    });
    return { id: locationId, ...updatedData };
  } catch (error) {
    console.error("Error updating location: ", error);
    throw error;
  }
};
