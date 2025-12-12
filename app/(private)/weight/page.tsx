"use client";

import { useState } from "react";

const WeightPage = () => {
  const [weight, setWeight] = useState("");

  const handleSubmit = async () => {
    if (!weight) return;

    await fetch("api/weight", {
      method: "POST",
      body: JSON.stringify({ weight }),
      headers: { "Content-Type": "application/json" },
    });
    alert("🎉 記録しました!");
    setWeight("");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">今日の体重</h1>
      <input
        type="number"
        step="0.1"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="70.4"
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white p-2 rounded w-full"
      >
        保存
      </button>
    </div>
  );
};

export default WeightPage;
