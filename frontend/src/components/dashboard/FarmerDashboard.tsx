import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Leaf, Package, Clock } from "lucide-react";
import WasteReportForm from "./WasteReportForm";
import WasteHistoryList from "./WasteHistoryList";

interface FarmerDashboardProps {
  userId: string;
}

interface FarmerStats {
  treeSeedlings: number;
  compostCredits: number;
  pendingReports: number;
}

const FarmerDashboard = ({ userId }: FarmerDashboardProps) => {
  const [stats, setStats] = useState<FarmerStats>({
    treeSeedlings: 0,
    compostCredits: 0,
    pendingReports: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0); // triggers refresh for child components
  const { toast } = useToast();

  useEffect(() => {
    if (userId) fetchStats();
  }, [userId, refreshKey]);

  // Fetch farmer stats from MongoDB backend
  const fetchStats = async () => {
    try {
      const res = await api.get(`/farmers/stats/${userId}`);
      const data = res.data;

      if (res.status < 200 || res.status >= 300)
        throw new Error(data.message || "Failed to load stats");

      setStats({
        treeSeedlings: data.treeSeedlings || 0,
        compostCredits: data.compostCredits || 0,
        pendingReports: data.pendingReports || 0,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load farmer statistics.",
        variant: "destructive",
      });
    }
  };

  // Called when a new report is created
  const handleReportCreated = () => {
    setRefreshKey((prev) => prev + 1);
    fetchStats();
  };

  return (
    <div className="space-y-8">
      {/* --- Stats Section --- */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Leaf className="w-5 h-5" />
              Tree Seedlings
            </CardTitle>
            <CardDescription>Total earned through recycling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-700">
              {stats.treeSeedlings}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-100 to-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Package className="w-5 h-5" />
              Compost Credits
            </CardTitle>
            <CardDescription>Redeemable compost reward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-700">
              {stats.compostCredits}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Clock className="w-5 h-5" />
              Pending Reports
            </CardTitle>
            <CardDescription>Awaiting collection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-700">
              {stats.pendingReports}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Waste Report Form --- */}
      <WasteReportForm userId={userId} onReportCreated={handleReportCreated} />

      {/* --- Waste History Section --- */}
      <WasteHistoryList key={refreshKey} userId={userId} />
    </div>
  );
};

export default FarmerDashboard;
