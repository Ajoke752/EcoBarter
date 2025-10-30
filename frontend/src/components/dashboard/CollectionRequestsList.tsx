import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, MapPin, CheckCircle2, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CollectionRequestsListProps {
  agentId: string; // ✅ must be a string (required)
  onCollectionComplete: () => void;
}

interface WasteReport {
  _id: string;
  wasteType: string;
  quantity: number;
  location?: string;
  createdAt: string;
  farmer: {
    fullName: string;
    phone?: string;
  };
}

const CollectionRequestsList: React.FC<CollectionRequestsListProps> = ({
  agentId,
  onCollectionComplete,
}) => {
  const [requests, setRequests] = useState<WasteReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/waste/pending");
      setRequests(res.data || []);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load collection requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartCollection = async (reportId: string) => {
    setProcessingId(reportId);
    try {
      await api.post(`/waste/start/${reportId}`);
      toast({
        title: "Collection Started",
        description: "The collection has been marked as in progress.",
      });
      fetchRequests();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleCompleteCollection = async (report: WasteReport) => {
    setProcessingId(report._id);
    try {
      const res = await api.post(`/collections/complete/${report._id}`, {
        agentId,
      });

      toast({
        title: "Collection Completed!",
        description: `Farmer earned ${res.data.treeSeedlings} tree seedlings and ${res.data.compostCredits} compost credits.`,
      });

      fetchRequests();
      onCollectionComplete();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Collection Requests
        </CardTitle>
        <CardDescription>
          Pending waste collections from farmers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No pending collection requests at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="p-4 bg-muted/50 rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">
                        {request.wasteType}
                      </h4>
                      <Badge className="bg-accent text-accent-foreground">
                        {request.quantity} items
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-medium">
                        Farmer: {request.farmer.fullName}
                      </p>
                      {request.farmer.phone && <p>Phone: {request.farmer.phone}</p>}
                      {request.location && <p>Location: {request.location}</p>}
                      <p>
                        Reported{" "}
                        {formatDistanceToNow(new Date(request.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleStartCollection(request._id)}
                    disabled={processingId === request._id}
                    className="flex-1"
                  >
                    {processingId === request._id ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    Start Collection
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleCompleteCollection(request)}
                    disabled={processingId === request._id}
                    className="flex-1 bg-primary hover:bg-primary/80"
                  >
                    {processingId === request._id ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    )}
                    Complete Collection
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollectionRequestsList;
