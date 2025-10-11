import { useEffect, useState } from "react";
import API from "../api";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    API.get("/rewards")
      .then((res) => setRewards(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Your Rewards</h2>
      <ul className="space-y-3">
        {rewards.map((r) => (
          <li key={r._id} className="p-4 bg-white shadow rounded">
            {r.name} — {r.pointsRequired} points
          </li>
        ))}
      </ul>
    </div>
  );
}
