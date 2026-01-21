"use client";

import { useState } from "react";
import WeightInputField from "../../components/input/WeightInputField";

const WeightPage = () => {
  const [weight, setWeight] = useState("");

  const handleSubmit = async () => {
    if (!weight) return;

    await fetch("api/weight", {
      method: "POST",
      body: JSON.stringify({ weight }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        alert("🎉 記録しました!");
        setWeight("");
      })
      .catch(() => {
        alert("エラーが発生しました。");
      });
  };

  return <WeightInputField weight={weight} setWeight={setWeight} handleSubmit={handleSubmit} />;
};

export default WeightPage;
