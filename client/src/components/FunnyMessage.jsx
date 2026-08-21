import { useState } from "react";

const messages = [
  "🐛 Congratulations! You fixed a bug. Unfortunately, 3 more just spawned.",
  "💻 Your code works! Don't touch it. Don't even look at it.",
  "☕ One more coding session and you'll officially become a coffee-powered developer.",
  "🚀 You're getting closer to your career goal. Keep going!",
  "🧠 Your brain is compiling... Please wait.",
  "🔥 You're on fire! Hopefully that's your productivity and not your laptop.",
  "😂 Debugging: Being the detective in a crime movie where you're also the criminal.",
  "⚡ Keep coding. Future you will thank you.",
  "🎯 Another skill unlocked! Your resume just got a little stronger.",
  "👀 The compiler is watching. Make good choices.",
  "💀 That error message wasn't a suggestion.",
  "🚀 Every expert developer was once confused by a missing semicolon.",
  "🏆 Small progress is still progress. Keep stacking those wins!",
  "🤖 AI says you're doing great. And AI rarely compliments people.",
  "💡 Today's bug is tomorrow's interview story.",
];

export default function FunnyMessage() {
  const [message] = useState(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
  });

  return (
    <p className="max-w-2xl text-xl font-extrabold leading-relaxed text-white sm:text-2xl md:text-3xl">
      {message}
    </p>
  );
}
