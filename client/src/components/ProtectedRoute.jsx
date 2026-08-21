import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait until Firebase/AuthContext finishes checking
  // whether the user is already logged in.
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />

          <p className="text-slate-700 font-semibold">Loading PathWise AI...</p>

          <p className="text-sm text-slate-500 mt-1">Checking your session</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;
