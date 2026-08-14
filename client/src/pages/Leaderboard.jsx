import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Crown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";

function Leaderboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { xp } = useProgress();

  const [leaderboard, setLeaderboard] = useState([]);

  const userName = user?.displayName || user?.email?.split("@")[0] || "You";

  useEffect(() => {
    /*
     * Simple local leaderboard.
     *
     * Later we can move this to Firebase so
     * different users can compete with each other.
     */

    const savedLeaderboard = JSON.parse(
      localStorage.getItem("pathwiseLeaderboard") || "[]",
    );

    const currentUserId = user?.uid || user?.email || "current-user";

    const updatedLeaderboard = [
      ...savedLeaderboard.filter((item) => item.id !== currentUserId),
      {
        id: currentUserId,
        name: userName,
        xp: Number(xp) || 0,
      },
    ];

    updatedLeaderboard.sort((a, b) => b.xp - a.xp);

    localStorage.setItem(
      "pathwiseLeaderboard",
      JSON.stringify(updatedLeaderboard),
    );

    setLeaderboard(updatedLeaderboard);
  }, [xp, user, userName]);

  const getRankIcon = (index) => {
    if (index === 0) {
      return <Crown size={22} />;
    }

    if (index === 1) {
      return <Medal size={22} />;
    }

    if (index === 2) {
      return <Trophy size={22} />;
    }

    return <span className="font-bold text-slate-500">#{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* BACK */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center gap-2 font-semibold text-slate-600 hover:text-primary-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* HEADER */}

        <div className="rounded-2xl bg-primary-600 p-8 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Trophy size={34} />
            </div>

            <div>
              <p className="text-sm font-semibold text-primary-100">
                PATHWISE AI
              </p>

              <h1 className="mt-1 text-3xl font-bold">Leaderboard</h1>

              <p className="mt-2 text-primary-100">
                Earn XP by completing your career roadmap.
              </p>
            </div>
          </div>
        </div>

        {/* YOUR SCORE */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">YOUR XP</p>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">⭐ {xp} XP</h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep completing roadmap steps to climb the leaderboard.
              </p>
            </div>

            <button
              onClick={() => navigate("/roadmap")}
              className="rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700"
            >
              Continue Roadmap
            </button>
          </div>
        </div>

        {/* LEADERBOARD */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">Top Learners</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your progress compared with other saved profiles.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {leaderboard.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No leaderboard data yet.
              </div>
            ) : (
              leaderboard.map((player, index) => {
                const isCurrentUser =
                  player.id === (user?.uid || user?.email || "current-user");

                return (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-5 ${
                      isCurrentUser ? "bg-primary-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                        {getRankIcon(index)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {player.name}
                          {isCurrentUser && (
                            <span className="ml-2 rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-600">
                              You
                            </span>
                          )}
                        </p>

                        <p className="text-sm text-slate-500">
                          Rank #{index + 1}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-primary-600">
                        ⭐ {player.xp}
                      </p>

                      <p className="text-xs text-slate-400">XP</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="font-semibold text-slate-900">Keep learning 🚀</p>

          <p className="mt-1 text-sm text-slate-500">
            Complete more skills and roadmap steps to increase your XP.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
