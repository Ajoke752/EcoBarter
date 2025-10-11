import WasteCard from "../components/WasteCard";

export default function Home() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Welcome to EcoBarter</h2>
      <p className="text-gray-600 mb-6">
        Turn your farm waste into rewards! Track, recycle, and earn.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <WasteCard type="Plastic" weight="10" />
        <WasteCard type="Organic" weight="25" />
        <WasteCard type="Metal" weight="15" />
      </div>
    </div>
  );
}
