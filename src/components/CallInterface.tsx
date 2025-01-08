import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Phone, PhoneOff } from "lucide-react";

const CallInterface = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const startCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.retellai.com/start-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`
        },
        body: JSON.stringify({
          agentId: 'your-agent-id' // Replace with actual agent ID
        })
      });

      if (!response.ok) {
        throw new Error('Failed to start call');
      }

      setIsCallActive(true);
      toast({
        title: "Call Started",
        description: "You're now connected to the agent.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const endCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.retellai.com/end-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to end call');
      }

      setIsCallActive(false);
      toast({
        title: "Call Ended",
        description: "The call has been terminated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-lg shadow-lg">
      <div className="text-2xl font-semibold text-gray-800">
        {isCallActive ? "On Call" : "Start a Call"}
      </div>
      
      <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isCallActive ? 'bg-green-100' : 'bg-blue-100'
      }`}>
        {isCallActive ? (
          <PhoneOff className="w-12 h-12 text-red-500" />
        ) : (
          <Phone className="w-12 h-12 text-blue-500" />
        )}
      </div>

      <Button
        variant={isCallActive ? "destructive" : "default"}
        size="lg"
        onClick={isCallActive ? endCall : startCall}
        disabled={isLoading}
        className="w-48"
      >
        {isLoading ? (
          "Processing..."
        ) : isCallActive ? (
          "End Call"
        ) : (
          "Start Call"
        )}
      </Button>

      {isCallActive && (
        <p className="text-sm text-gray-600">
          Connected to agent
        </p>
      )}
    </div>
  );
};

export default CallInterface;