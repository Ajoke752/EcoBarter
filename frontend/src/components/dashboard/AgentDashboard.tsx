import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle2, TrendingUp } from "lucide-react";
import CollectionRequestsList from "@/components/dashboard/CollectionRequestsList";

interface AgentDashboardProps {
  userId?: string | null; // ✅ userId can be undefined or null
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ userId }) => {
  const [stats, setStats] = useState({
    pendingCollections: 0,
    completedCollections: 0,
    totalWasteCollected: 0,
  });

  useEffect(() => {
    if (userId) {
      fetchStats();
    }
  }, [userId]);

  const fetchStats = async () => {
    try {
      const pendingRes = await api.get("/waste/pending");
      const completedRes = await api.get(`/collections/agent/${userId}`);

      const completed = completedRes.data || [];
      const totalWaste = completed.reduce(
        (sum: number, c: { quantity: number }) => sum + (c.quantity || 0),
        0
      );

      setStats({
        pendingCollections: pendingRes.data?.length || 0,
        completedCollections: completed.length,
        totalWasteCollected: totalWaste,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-200/30 to-green-100/20 border-green-300/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Package className="w-5 h-5" />
              Pending Requests
            </CardTitle>
            <CardDescription>Awaiting collection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-700">
              {stats.pendingCollections}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-200/30 to-blue-100/20 border-blue-300/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <CheckCircle2 className="w-5 h-5" />
              Completed
            </CardTitle>
            <CardDescription>Total collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-700">
              {stats.completedCollections}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-200/30 to-amber-100/20 border-amber-300/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <TrendingUp className="w-5 h-5" />
              Waste Collected
            </CardTitle>
            <CardDescription>Total items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-700">
              {stats.totalWasteCollected}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Only render if userId is a string */}
      {typeof userId === "string" && userId.trim() !== "" ? (
        <CollectionRequestsList
          agentId={userId}
          onCollectionComplete={fetchStats}
        />
      ) : (
        <p className="text-center text-gray-500 py-6 italic">
          Please log in to view your collection requests.
        </p>
      )}
    </div>
  );
};

export default AgentDashboard;
