<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
>>>>>>> e24463283d72ca426a3821db47bc446b006c839e
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
<<<<<<< HEAD
import { Mic, Send, Loader2 } from "lucide-react";
import api from "@/lib/api";
=======
import { Mic, Send, Loader2, MicOff } from "lucide-react";
import { AudioRecorder, blobToBase64 } from "@/utils/audioRecorder";
>>>>>>> e24463283d72ca426a3821db47bc446b006c839e

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
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const recorderRef = useRef<AudioRecorder | null>(null);

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

<<<<<<< HEAD
  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    toast({
      title: "Coming Soon 🎙️",
      description: "Voice recording will be available in future updates.",
    });
=======
  const handleVoiceRecord = async () => {
    if (isRecording) {
      // Stop recording and transcribe
      try {
        if (!recorderRef.current) return;
        
        setLoading(true);
        const audioBlob = await recorderRef.current.stop();
        const base64Audio = await blobToBase64(audioBlob);

        toast({
          title: "Transcribing...",
          description: "Converting your voice to text...",
        });

        // Send to edge function for transcription
        const { data, error } = await supabase.functions.invoke('transcribe-audio', {
          body: { audio: base64Audio }
        });

        if (error) {
          const errorMessage = data?.error?.includes('quota') || data?.error?.includes('insufficient_quota')
            ? "OpenAI API credits exhausted. Please update your API key with one that has credits."
            : data?.error || "Failed to transcribe audio. Please try again.";
          
          throw new Error(errorMessage);
        }

        if (data?.text) {
          setDescription(data.text);
          toast({
            title: "Success!",
            description: "Your voice has been transcribed to the description field.",
          });
        }

        setIsRecording(false);
      } catch (error: any) {
        console.error('Voice recording error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to process voice recording",
          variant: "destructive",
        });
        setIsRecording(false);
      } finally {
        setLoading(false);
      }
    } else {
      // Start recording
      try {
        recorderRef.current = new AudioRecorder();
        await recorderRef.current.start();
        setIsRecording(true);
        toast({
          title: "Recording...",
          description: "Speak clearly about your waste. Click the button again to stop.",
        });
      } catch (error: any) {
        console.error('Start recording error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to start recording. Please check microphone permissions.",
          variant: "destructive",
        });
      }
    }
>>>>>>> e24463283d72ca426a3821db47bc446b006c839e
  };

  return (
    <Card className="w-full shadow-md rounded-2xl border border-muted">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Report Waste Collection</span>
          <Button
            type="button"
            variant={isRecording ? "destructive" : "secondary"}
            size="sm"
            onClick={handleVoiceRecord}
            className="gap-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
            {isRecording ? "Stop Recording" : "Voice Report"}
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
            disabled={loading}
          >
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
