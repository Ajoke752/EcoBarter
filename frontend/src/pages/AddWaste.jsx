import { useState } from "react";
import API from "../api";

export default function AddWaste() {
  const [type, setType] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/wastes", { type, weightKg });
      alert("✅ Waste added successfully!");
      setType("");
      setWeightKg("");
    } catch (err) {
      console.error(err);
      alert("Failed to add waste.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-xl">
      <h2 className="text-xl font-bold text-green-700 mb-4">Add New Waste</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Type (e.g., Plastic)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="number"
          className="border p-2 w-full rounded"
          placeholder="Weight (kg)"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  );
}
