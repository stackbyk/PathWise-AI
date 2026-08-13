import React, { useEffect, useState } from "react";
import {
  Trophy,
  Flame,
  Target,
  Star,
  Zap,
  Crown,
  CheckCircle2,
  Lock,
  Quote,
  Medal,
} from "lucide-react";
import "./Gamification.css";

const quotes = [
  "Small progress is still progress. Keep going! 🚀",
  "Your future self will thank you for what you learn today. 💡",
  "Don't compare your beginning to someone else's middle. 🌱",
  "Consistency beats motivation. Show up today. 🔥",
  "Every skill you master makes your career stronger. 💪",
  "One completed task today is one step closer to your dream career. 🎯",
];

const missions = [
  {
    id: 1,
    title: "Complete a Skill",
    description: "Finish one skill from your personalized roadmap.",
    xp: 50,
    icon: "🎯",
  },
  {
    id: 2,
    title: "Learn for 20 Minutes",
    description: "Spend at least 20 minutes learning today.",
    xp: 30,
    icon: "📚",
  },
  {
    id: 3,
    title: "Complete 2 Skills",
    description: "Complete two roadmap skills in one day.",
    xp: 100,
    icon: "⚡",
  },
];

const initialBadges = [
  {
    id: 1,
    name: "First Step",
    description: "Complete your first skill",
    icon: "🚀",
    requirement: 1,
  },
  {
    id: 2,
    name: "Skill Builder",
    description: "Complete 5 skills",
    icon: "🛠️",
    requirement: 5,
  },
  {
    id: 3,
    name: "Roadmap Starter",
    description: "Complete 10 skills",
    icon: "🗺️",
    requirement: 10,
  },
  {
    id: 4,
    name: "Consistency King",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    requirement: 7,
  },
  {
    id: 5,
    name: "Unstoppable",
    description: "Maintain a 30-day streak",
    icon: "💎",
    requirement: 30,
  },
  {
    id: 6,
    name: "Career Ready",
    description: "Reach Level 5",
    icon: "🏆",
    requirement: 5,
  },
];

const leaderboardData = [
  {
    rank: 1,
    name: "Aarav",
    xp: 2450,
    level: 8,
    avatar: "🧑‍💻",
  },
  {
    rank: 2,
    name: "Priya",
    xp: 2180,
    level: 7,
    avatar: "👩‍💻",
  },
  {
    rank: 3,
    name: "Rahul",
    xp: 1940,
    level: 6,
    avatar: "👨‍💻",
  },
  {
    rank: 4,
    name: "You",
    xp: 0,
    level: 1,
    avatar: "⭐",
    currentUser: true,
  },
];

function Gamification() {
  const [xp, setXp] = useState(() => {
    return Number(localStorage.getItem("pathwiseXP")) || 0;
  });

  const [completedSkills, setCompletedSkills] = useState(() => {
    return Number(localStorage.getItem("pathwiseCompletedSkills")) || 0;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("pathwiseStreak")) || 0;
  });

  const [completedMissions, setCompletedMissions] = useState(() => {
    return JSON.parse(localStorage.getItem("pathwiseMissions") || "[]");
  });

  const [quoteIndex, setQuoteIndex] = useState(() => {
    return new Date().getDate() % quotes.length;
  });

  useEffect(() => {
    localStorage.setItem("pathwiseXP", xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("pathwiseCompletedSkills", completedSkills);
  }, [completedSkills]);

  useEffect(() => {
    localStorage.setItem("pathwiseStreak", streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("pathwiseMissions", JSON.stringify(completedMissions));
  }, [completedMissions]);

  const level = Math.floor(xp / 500) + 1;

  const currentLevelXP = xp % 500;

  const levelProgress = Math.min(Math.round((currentLevelXP / 500) * 100), 100);

  const completeMission = (mission) => {
    if (completedMissions.includes(mission.id)) {
      return;
    }

    setCompletedMissions((current) => [...current, mission.id]);
    setXp((current) => current + mission.xp);

    if (mission.id === 1) {
      setCompletedSkills((current) => current + 1);
    }
  };

  const badges = initialBadges.map((badge) => {
    const unlocked =
      (badge.id <= 3 && completedSkills >= badge.requirement) ||
      (badge.id === 4 && streak >= badge.requirement) ||
      (badge.id === 5 && streak >= badge.requirement) ||
      (badge.id === 6 && level >= badge.requirement);

    return {
      ...badge,
      unlocked,
    };
  });

  const unlockedBadges = badges.filter((badge) => badge.unlocked).length;

  const leaderboard = leaderboardData
    .map((user) =>
      user.currentUser
        ? {
            ...user,
            xp,
            level,
          }
        : user,
    )
    .sort((a, b) => b.xp - a.xp)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="gamification-page">
      {/* HERO */}
      <section className="game-hero">
        <div>
          <span className="game-label">PATHWISE ARENA</span>

          <h1>
            Learn. Level Up. <span>Become Career Ready. 🚀</span>
          </h1>

          <p>
            Turn your learning journey into a game. Complete skills, earn XP,
            maintain your streak and climb the leaderboard.
          </p>
        </div>

        <div className="hero-trophy">🏆</div>
      </section>

      {/* STATS */}
      <section className="game-stats">
        <div className="game-stat-card">
          <div className="stat-icon xp-icon">
            <Zap size={23} />
          </div>

          <div>
            <span>XP</span>
            <strong>{xp}</strong>
          </div>
        </div>

        <div className="game-stat-card">
          <div className="stat-icon level-icon">
            <Star size={23} />
          </div>

          <div>
            <span>LEVEL</span>
            <strong>{level}</strong>
          </div>
        </div>

        <div className="game-stat-card">
          <div className="stat-icon streak-icon">
            <Flame size={23} />
          </div>

          <div>
            <span>STREAK</span>
            <strong>{streak} days</strong>
          </div>
        </div>

        <div className="game-stat-card">
          <div className="stat-icon goal-icon">
            <Target size={23} />
          </div>

          <div>
            <span>BADGES</span>
            <strong>
              {unlockedBadges}/{badges.length}
            </strong>
          </div>
        </div>
      </section>

      {/* LEVEL PROGRESS */}
      <section className="game-card level-card">
        <div className="section-heading">
          <div>
            <span className="section-label">YOUR JOURNEY</span>

            <h2>
              🌱 Level {level} —{" "}
              {level < 3 ? "Beginner" : level < 5 ? "Explorer" : "Achiever"}
            </h2>

            <p>{500 - currentLevelXP} XP remaining until your next level.</p>
          </div>

          <strong>{levelProgress}%</strong>
        </div>

        <div className="level-bar">
          <div style={{ width: `${levelProgress}%` }} />
        </div>

        <div className="level-xp-text">
          <span>{currentLevelXP} XP</span>
          <span>500 XP</span>
        </div>
      </section>

      {/* DAILY QUOTE */}
      <section className="quote-card">
        <div className="quote-icon">
          <Quote size={26} />
        </div>

        <div>
          <span>💬 DAILY MOTIVATION</span>

          <h2>{quotes[quoteIndex]}</h2>

          <button
            onClick={() =>
              setQuoteIndex((current) => (current + 1) % quotes.length)
            }
          >
            Give me another motivation ✨
          </button>
        </div>
      </section>

      {/* DAILY MISSIONS */}
      <section className="game-card">
        <div className="section-heading">
          <div>
            <span className="section-label">TODAY'S CHALLENGE</span>
            <h2>🎯 Daily Missions</h2>
            <p>Complete missions and collect extra XP.</p>
          </div>

          <div className="mission-count">
            {completedMissions.length}/{missions.length}
          </div>
        </div>

        <div className="missions-grid">
          {missions.map((mission) => {
            const completed = completedMissions.includes(mission.id);

            return (
              <div
                className={`mission-card ${completed ? "mission-complete" : ""}`}
                key={mission.id}
              >
                <div className="mission-top">
                  <div className="mission-emoji">{mission.icon}</div>

                  <span>+{mission.xp} XP</span>
                </div>

                <h3>{mission.title}</h3>

                <p>{mission.description}</p>

                <button
                  disabled={completed}
                  onClick={() => completeMission(mission)}
                >
                  {completed ? (
                    <>
                      <CheckCircle2 size={17} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Zap size={17} />
                      Complete Mission
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="game-card">
        <div className="section-heading">
          <div>
            <span className="section-label">COMPETE & GROW</span>

            <h2>
              <Trophy size={22} /> Global Leaderboard
            </h2>

            <p>Keep learning and climb higher on the PathWise leaderboard.</p>
          </div>
        </div>

        <div className="leaderboard">
          {leaderboard.map((user) => (
            <div
              key={user.name}
              className={`leader-row ${user.currentUser ? "current-user" : ""}`}
            >
              <div className="rank">{getRankIcon(user.rank)}</div>

              <div className="leader-avatar">{user.avatar}</div>

              <div className="leader-info">
                <strong>
                  {user.name}

                  {user.currentUser && <span className="you-tag">YOU</span>}
                </strong>

                <span>Level {user.level}</span>
              </div>

              <div className="leader-xp">
                <Zap size={16} />
                {user.xp} XP
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BADGES */}
      <section className="game-card">
        <div className="section-heading">
          <div>
            <span className="section-label">ACHIEVEMENTS</span>

            <h2>
              <Medal size={22} /> Your Badges
            </h2>

            <p>
              Unlock badges by completing milestones throughout your journey.
            </p>
          </div>

          <strong>
            {unlockedBadges}/{badges.length} unlocked
          </strong>
        </div>

        <div className="badges-grid">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`badge-card ${
                badge.unlocked ? "badge-unlocked" : "badge-locked"
              }`}
            >
              <div className="badge-icon">
                {badge.unlocked ? badge.icon : <Lock size={24} />}
              </div>

              <h3>{badge.name}</h3>

              <p>{badge.description}</p>

              {badge.unlocked ? (
                <span className="badge-status">
                  <CheckCircle2 size={14} />
                  Unlocked
                </span>
              ) : (
                <span className="badge-status locked">🔒 Locked</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL MOTIVATION */}
      <section className="final-game-card">
        <Crown size={32} />

        <h2>Your career journey is a marathon, not a race. 🏃‍♂️</h2>

        <p>
          Keep showing up, keep learning, and let every small win move you
          closer to your dream career.
        </p>

        <strong>🔥 One skill at a time. One level at a time.</strong>
      </section>
    </div>
  );
}

export default Gamification;
