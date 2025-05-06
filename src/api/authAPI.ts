// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../firebase/firebaseDB";

// export const createUser = async (email: string, password: string) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return userCredential.user.uid;
//   } catch (error: unknown) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

// export const login = async (email: string, password: string) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     console.error("Login failed:", error);
//     throw error;
//   }
// };

// export const logout = async () => {
//   try {
//     await signOut(auth);
//     console.log("User logged out successfully");
//   } catch (error) {
//     console.error("Logout failed:", error);
//     throw error;
//   }
// };
