import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mic, Send, Loader2 } from "lucide-react";
import api from "@/lib/api";
// REMOVED: Supabase and AudioRecorder imports

interface WasteReportFormProps {
  userId: string;
  onReportCreated: () => void;
}

const wasteTypes = [
  { value: "plastic_bottles", label: "Plastic Bottles" },
  { value: "agrochemical_containers", label: "Agrochemical Containers" },
  { value: "plastic_bags", label: "Plastic Bags" },
  { value: "metal_cans", label: "Metal Cans" },
  { value: "glass", label: "Glass" },
  { value: "other", label: "Other" },
];

const WasteReportForm = ({ userId, onReportCreated }: WasteReportFormProps) => {
  const [wasteType, setWasteType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  // REMOVED: isRecording state
  const { toast } = useToast();
  // REMOVED: recorderRef

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wasteType || !quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`/waste-reports`, {
        farmer_id: userId,
        waste_type: wasteType,
        quantity: parseInt(quantity),
        description,
        location,
        status: "pending",
      });

      const data = res.data;

      if (res.status < 200 || res.status >= 300) {
        throw new Error(data.message || "Failed to submit report");
      }

      toast({
        title: "Success!",
        description:
          "Your waste report has been submitted. An agent will collect it soon.",
      });

      // Reset form
      setWasteType("");
      setQuantity("");
      setDescription("");
      setLocation("");
      onReportCreated();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: (error as Error).message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // REVERTED to placeholder function to remove Supabase dependency
  const handleVoiceRecord = () => {
    toast({
      title: "Coming Soon 🎙️",
      description: "Voice recording will be available in future updates.",
    });
  };

  return (
    <Card className="w-full shadow-md rounded-2xl border border-muted">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Report Waste Collection</span>
          <Button
            type="button"
            variant="secondary" // Reverted
            size="sm"
            onClick={handleVoiceRecord}
            className="gap-2"
            // The loading state of the main form should not disable this button
            // disabled={loading} // Removed
          >
            <Mic className="w-4 h-4" /> {/* Reverted to simple icon */}
            Voice Report {/* Reverted to simple text */}
          </Button>
        </CardTitle>
        <CardDescription>
          Tell us about the waste you want to exchange for rewards.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wasteType">Waste Type *</Label>
              <Select value={wasteType} onValueChange={setWasteType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (items) *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="e.g., 10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Your farm location or address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Textarea
              id="description"
              placeholder="Any additional information about the waste..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
            disabled={loading} // This loading flag is for the form submission
          >
            {/* This loading spinner is only for the form submission.
              The voice button's loading state was separate and has been removed.
            */}
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Send className="mr-2 w-4 h-4" />
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WasteReportForm;
