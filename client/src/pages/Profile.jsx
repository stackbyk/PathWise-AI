import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center">
          {/* Profile Picture */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-5"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold mx-auto mb-5">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}

          <h1 className="text-3xl font-bold text-slate-900">
            {user?.displayName || "User"}
          </h1>

          <p className="text-slate-500 mt-2">{user?.email}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500">Account</p>
            <p className="font-semibold text-slate-800">Google Account</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500">Career Goal</p>
            <p className="font-semibold text-slate-800">Full Stack Developer</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
