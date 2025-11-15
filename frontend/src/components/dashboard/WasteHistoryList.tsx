import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Package } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface WasteHistoryListProps {
  userId: string;
}

interface WasteReport {
  _id: string;
  wasteType: string;
  quantity: number;
  status: string;
  location?: string;
  createdAt: string;
}

const WasteHistoryList = ({ userId }: WasteHistoryListProps) => {
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userId) fetchReports();
  }, [userId]);

  const fetchReports = async () => {
    try {
      // use the correct plural 'farmers' path and normalize snake_case -> camelCase
      const res = await api.get(`/farmers/waste-reports/${userId}`);
      const data = (res.data || []).map((r:any) => ({
        _id: r._id,
        wasteType: r.waste_type,
        quantity: r.quantity,
        status: r.status,
        location: r.location,
        createdAt: r.created_at,
      }));
      setReports(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load waste reports",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-900";
      case "in_progress":
        return "bg-blue-200 text-blue-900";
      case "completed":
        return "bg-green-200 text-green-900";
      case "cancelled":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const formatWasteType = (type: string) => {
    return (
      type?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || ""
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Recent Reports
        </CardTitle>
        <CardDescription>Your waste collection history</CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No waste reports yet. Create your first report above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report._id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">
                      {formatWasteType(report.wasteType)}
                    </h4>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Quantity: {report.quantity} items</p>
                    {report.location && <p>Location: {report.location}</p>}
                    <p>
                      Reported{" "}
                      {formatDistanceToNow(new Date(report.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WasteHistoryList;
