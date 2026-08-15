import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  UserCircle,
  LayoutDashboard,
  Target,
  Brain,
  BookOpen,
  Lightbulb,
  Trophy,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  /* =====================================================
     USER DATA
  ===================================================== */

  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "User";

  const avatarInitial = displayName.charAt(0).toUpperCase();

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    const result = await logout();

    setProfileMenuOpen(false);
    setMobileMenuOpen(false);

    if (result?.success) {
      navigate("/login");
    }
  };

  /* =====================================================
     CLOSE MENUS
  ===================================================== */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setProfileMenuOpen((previous) => !previous);
  };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={() => {
              closeMobileMenu();
              setProfileMenuOpen(false);
            }}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 font-bold text-white">
              P
            </div>

            <span className="text-xl font-bold text-primary-600">
              PathWise AI
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-1 lg:flex">
            {/* DASHBOARD */}

            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            {/* CAREERS */}

            <Link
              to="/career-exploration"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
            >
              <Target size={18} />
              Careers
            </Link>

            {/* ASSESSMENT */}

            <Link
              to="/skill-assessment"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
            >
              <Brain size={18} />
              Assessment
            </Link>

            {/* ROADMAP */}

            <Link
              to="/roadmap"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
            >
              <BookOpen size={18} />
              Roadmap
            </Link>

            {/* RECOMMENDATIONS */}

            <Link
              to="/recommendations"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
            >
              <Lightbulb size={18} />
              Recommendations
            </Link>

            {/* ARENA */}

            <Link
              to="/arena"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-700 transition hover:bg-yellow-50 hover:text-yellow-600"
            >
              <Trophy size={18} />
              Arena
            </Link>
          </div>

          {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================= */}

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="relative">
                {/* =========================================
                    PROFILE BUTTON
                ========================================= */}

                <button
                  type="button"
                  onClick={handleProfileClick}
                  aria-label="Open profile menu"
                  aria-expanded={profileMenuOpen}
                  className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-slate-200 hover:bg-slate-50"
                >
                  {/* PROFILE ICON / AVATAR */}

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white shadow-sm">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={displayName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle size={25} strokeWidth={2} />
                    )}
                  </div>

                  {/* USER NAME */}

                  <div className="hidden text-left xl:block">
                    <p className="max-w-[130px] truncate text-sm font-semibold text-slate-800">
                      {displayName}
                    </p>

                    <p className="text-xs text-slate-500">My Profile</p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform ${
                      profileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* =========================================
                    PROFILE DROPDOWN
                ========================================= */}

                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    {/* USER INFORMATION */}

                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-600 text-lg font-bold text-white">
                          {user?.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={displayName}
                              className="h-12 w-12 object-cover"
                            />
                          ) : (
                            <UserCircle size={30} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {displayName}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MY PROFILE */}

                    <Link
                      to="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                    >
                      <UserCircle size={21} />

                      <div>
                        <p className="font-semibold">My Profile</p>

                        <p className="text-xs text-slate-500">
                          Edit your information
                        </p>
                      </div>
                    </Link>

                    {/* DASHBOARD */}

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                    >
                      <LayoutDashboard size={21} />

                      <div>
                        <p className="font-semibold">Dashboard</p>

                        <p className="text-xs text-slate-500">
                          View your progress
                        </p>
                      </div>
                    </Link>

                    {/* ROADMAP */}

                    <Link
                      to="/roadmap"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                    >
                      <BookOpen size={21} />

                      <div>
                        <p className="font-semibold">My Roadmap</p>

                        <p className="text-xs text-slate-500">
                          Continue learning
                        </p>
                      </div>
                    </Link>

                    {/* ARENA */}

                    <Link
                      to="/arena"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 transition hover:bg-yellow-50 hover:text-yellow-600"
                    >
                      <Trophy size={21} />

                      <div>
                        <p className="font-semibold">PathWise Arena</p>

                        <p className="text-xs text-slate-500">
                          XP, quests & badges
                        </p>
                      </div>
                    </Link>

                    {/* DIVIDER */}

                    <div className="my-1 border-t border-slate-100" />

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={21} />

                      <div className="text-left">
                        <p className="font-semibold">Logout</p>

                        <p className="text-xs text-red-400">
                          Sign out of PathWise AI
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* LOGIN */}

                <Link
                  to="/login"
                  className="px-4 py-2 font-semibold text-slate-700 transition hover:text-primary-600"
                >
                  Login
                </Link>

                {/* GET STARTED */}

                <Link
                  to="/register"
                  className="rounded-xl bg-primary-600 px-5 py-2.5 font-semibold text-white transition hover:bg-primary-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((previous) => !previous);
              setProfileMenuOpen(false);
            }}
            aria-label="Toggle navigation menu"
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 py-4 lg:hidden">
            {user ? (
              <div className="space-y-1">
                {/* MOBILE USER */}

                <div className="mb-3 rounded-xl bg-slate-50 px-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-600 font-bold text-white">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={displayName}
                          className="h-11 w-11 object-cover"
                        />
                      ) : (
                        <UserCircle size={27} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">
                        {displayName}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DASHBOARD */}

                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>

                {/* CAREERS */}

                <Link
                  to="/career-exploration"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                >
                  <Target size={20} />
                  Career Exploration
                </Link>

                {/* ASSESSMENT */}

                <Link
                  to="/skill-assessment"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                >
                  <Brain size={20} />
                  Skill Assessment
                </Link>

                {/* ROADMAP */}

                <Link
                  to="/roadmap"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                >
                  <BookOpen size={20} />
                  Roadmap
                </Link>

                {/* RECOMMENDATIONS */}

                <Link
                  to="/recommendations"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                >
                  <Lightbulb size={20} />
                  Recommendations
                </Link>

                {/* ARENA */}

                <Link
                  to="/arena"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold text-slate-700 transition hover:bg-yellow-50 hover:text-yellow-600"
                >
                  <Trophy size={20} />
                  Arena
                </Link>

                {/* PROFILE */}

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-primary-600"
                >
                  <UserCircle size={20} />
                  My Profile
                </Link>

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="rounded-xl bg-primary-600 px-3 py-3 text-center font-semibold text-white transition hover:bg-primary-700"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
