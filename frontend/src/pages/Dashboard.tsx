import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, LogOut } from "lucide-react";
import FarmerDashboard from "@/components/dashboard/FarmerDashboard";
import AgentDashboard from "@/components/dashboard/AgentDashboard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setUserRole(res.data.role);
      } catch (error) {
        console.error("Profile load failed:", error);
        toast({
          title: "Error",
          description: "Failed to load user profile. Please log in again.",
          variant: "destructive",
        });
        localStorage.removeItem("token");
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EcoBarter</h1>
              <p className="text-sm text-muted-foreground capitalize">
                {userRole} Dashboard
              </p>
            </div>
          </div>
          <Button variant="secondary" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {userRole === "farmer" ? (
          <FarmerDashboard userId={user?._id} />
        ) : userRole === "agent" ? (
          <AgentDashboard userId={user?._id} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Invalid user role</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
