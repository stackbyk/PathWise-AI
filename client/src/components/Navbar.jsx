import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Compass, Menu, X, Sun, Moon, ChevronDown, User, LogOut, LayoutDashboard, Target, Brain, Route, Lightbulb, Award, Trophy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const links = [
  { label: "Careers", to: "/career-exploration", icon: Target },
  { label: "Assessment", to: "/skill-assessment", icon: Brain },
  { label: "Roadmap", to: "/roadmap", icon: Route },
  { label: "Recommendations", to: "/recommendations", icon: Lightbulb },
  { label: "Badges", to: "/dashboard#badges", icon: Award },
  { label: "Arena", to: "/arena", icon: Trophy },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("pathwiseTheme") === "dark");
  const profileRef = useRef(null);
  const name = user?.displayName || user?.name || localStorage.getItem("pathwiseProfileName") || "Learner";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("pathwiseTheme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const close = (event) => {
      if (!profileRef.current?.contains(event.target)) setProfile(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") { setProfile(false); setMobile(false); }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return <nav className="pw-nav" aria-label="Main navigation">
    <div className="pw-nav-inner">
      <Link to="/dashboard" className="pw-brand" onClick={() => setMobile(false)} aria-label="PathWise AI dashboard">
        <span className="pw-brand-mark"><Compass size={25} strokeWidth={1.6} /></span>
        <span>PathWise<span className="pw-brand-ai"> AI</span></span>
      </Link>
      <div className="pw-desktop-links">
        {links.map(({ label, to }) => to.includes("#") ?
          <Link key={label} to={to} className={location.hash === "#badges" ? "active" : undefined} aria-current={location.hash === "#badges" ? "location" : undefined}>{label}</Link> :
          <NavLink key={label} to={to}>{label}</NavLink>)}
      </div>
      <div className="pw-nav-actions">
        <button type="button" className="pw-icon-button" onClick={() => setDark(v => !v)} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={dark}>
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <div className="pw-profile" ref={profileRef}>
          <button type="button" className="pw-profile-button" onClick={() => setProfile(v => !v)} aria-expanded={profile} aria-controls="pw-profile-menu" aria-label="Open profile menu">
            <span className="pw-avatar">{user?.photoURL ? <img src={user.photoURL} alt="" /> : name.charAt(0).toUpperCase()}</span>
            <ChevronDown size={15} />
          </button>
          {profile && <div id="pw-profile-menu" className="pw-profile-menu">
            <div className="pw-profile-info"><strong>{name}</strong><span>{user?.email || "Your career journey starts here"}</span></div>
            <Link to="/dashboard" onClick={() => setProfile(false)}><LayoutDashboard size={17} />Dashboard</Link>
            <Link to="/profile" onClick={() => setProfile(false)}><User size={17} />My profile</Link>
            {user ? <button onClick={async () => { const result = await logout(); if (result?.success) { setProfile(false); navigate("/login"); } }}><LogOut size={17} />Sign out</button> : <Link to="/login" onClick={() => setProfile(false)}><User size={17} />Sign in</Link>}
          </div>}
        </div>
        <button type="button" className="pw-icon-button pw-mobile-toggle" aria-label={mobile ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobile} aria-controls="pw-mobile-menu" onClick={() => { setMobile(v => !v); setProfile(false); }}>
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </div>
    {mobile && <div className="pw-mobile-links" id="pw-mobile-menu">
      <NavLink to="/dashboard" onClick={() => setMobile(false)}><LayoutDashboard size={18} />Dashboard</NavLink>
      {links.map(({ label, to, icon: Icon }) => <Link key={label} to={to} onClick={() => setMobile(false)}><Icon size={18} />{label}</Link>)}
    </div>}
  </nav>;
}
