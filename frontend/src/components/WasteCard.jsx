export default function WasteCard({ type, weight }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 border border-green-100">
      <h3 className="text-lg font-semibold text-green-800">{type} Waste</h3>
      <p className="text-gray-500">{weight} kg collected</p>
    </div>
  );
}
