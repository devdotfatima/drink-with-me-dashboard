import { Navigate } from "react-router";
import { useAuth } from "../../../Providers/AuthProvider";
import Loader from "../../../shared/lib/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen ">
        <Loader />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
