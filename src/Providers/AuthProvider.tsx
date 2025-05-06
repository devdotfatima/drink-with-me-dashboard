import {
  createContext,
  useContext,
  useState,
  // useEffect,
  ReactNode,
} from "react";
import {
  //  getAuth, onAuthStateChanged,
   User } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: () => void; // Define your login logic if using FirebaseUI or custom flows
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, ] = useState<User | null>(null);
  const [loading, ] = useState(true);
  const [token, ] = useState<string | null>(null);

  // const auth = getAuth();

  // Monitor authentication state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     setUser(user);
  //     if (user) {
  //       const idToken = await user.getIdToken();
  //       setToken(idToken);
  //     } else {
  //       setToken(null);
  //     }
  //     setLoading(false);
  //   });

  //   return unsubscribe; // Cleanup subscription on unmount
  // }, [auth]);

  // // Logout function
  const logout = async () => {
    // await auth.signOut();
    // setUser(null);
    // setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, token, login: () => {}, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
