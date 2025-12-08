"use client";

const Streak = () => {
  const streak = 18;

  return (
    <div className="p-4 bg-white rounded shadow text-center">
      <p className="text-lg font-bold">🔥 連続記録</p>
      <p className="text-3xl font-extrabold">{streak} 日</p>
    </div>
  );
};

export default Streak;
