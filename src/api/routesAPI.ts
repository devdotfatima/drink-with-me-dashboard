import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseDB";
import { COLLECTIONS, PAGE_SIZE } from "../shared/consts";
import { RouteT } from "../shared/types";
import { RouteTypeT } from "../shared/lib/validations";

export const fetchRoutes = async (
  pageNumber: number = 1
): Promise<{
  routes: RouteT[];
  total: number;
}> => {
  try {
    const routesRef = collection(db, COLLECTIONS.ROUTES);
    const routesQuery = query(
      routesRef,
      orderBy("addedDate", "desc"),
      limit(PAGE_SIZE)
    );

    // Fetch total count for pagination purposes
    const snapshot = await getCountFromServer(routesRef);
    const totalCount = snapshot.data().count;

    // Calculate the starting document based on the page number
    let startingDoc = null;
    if (pageNumber > 1) {
      const skipDocsQuery = query(
        routesRef,
        orderBy("addedDate", "desc"),
        limit((pageNumber - 1) * PAGE_SIZE)
      );
      const skipDocs = await getDocs(skipDocsQuery);
      startingDoc = skipDocs.docs[skipDocs.docs.length - 1];
    }

    const routesData: RouteT[] = [];
    let routesQueryWithStart = routesQuery;
    if (startingDoc) {
      routesQueryWithStart = query(
        routesRef,
        orderBy("addedDate", "desc"),
        startAfter(startingDoc),
        limit(PAGE_SIZE)
      );
    }

    const dbResults = await getDocs(routesQueryWithStart);

    dbResults.forEach((doc) => {
      routesData.push({
        addedBy: doc.data().addedBy,
        addedDate: doc.data().addedDate,
        routeFare: doc.data().routeFare,
        routeFrom: doc.data().routeFrom,
        routeID: doc.data().routeID,
        routeTo: doc.data().routeTo,
      });
    });

    return { routes: routesData, total: totalCount };
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};

export const createRoute = async (routeData: RouteTypeT) => {
  const routesRef = doc(collection(db, COLLECTIONS.ROUTES));
  const route = {
    ...routeData,
    routeTo: routeData.routeTo.value,
    routeFrom: routeData.routeFrom.value,
    routeID: routesRef.id,
  };
  try {
    await setDoc(routesRef, route);
    return route;
  } catch (error) {
    console.error("Error creating coupon: ", error);
    throw error;
  }
};

export const updateRoute = async (
  routeID: string,
  updatedData: Partial<RouteTypeT>
) => {
  const routeRef = doc(db, COLLECTIONS.ROUTES, routeID);

  try {
    const route = {
      ...updatedData,
      routeTo: updatedData.routeTo?.value,
      routeFrom: updatedData.routeFrom?.value,
    };
    await updateDoc(routeRef, route);
    return { id: routeID, ...updatedData };
  } catch (error) {
    console.error("Error updating route: ", error);
    throw error;
  }
};

export const deleteRoute = async (routeID: string) => {
  const routeRef = doc(db, COLLECTIONS.ROUTES, routeID);
  try {
    await deleteDoc(routeRef);
  } catch (error) {
    console.error("Error updating route: ", error);
    throw error;
  }
};
