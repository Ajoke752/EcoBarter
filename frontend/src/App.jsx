import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddWaste from "./pages/AddWaste";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-green-50 text-gray-800">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-waste" element={<AddWaste />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

