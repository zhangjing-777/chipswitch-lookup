import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DeviceCard } from "@/components/DeviceCard";
import { ArrowLeft, Cpu, Zap, Layers } from "lucide-react";
import { toast } from "sonner";

interface Device {
  id: string;
  hw_sku: string;
  chip_name: string;
  port_layout?: string;
  buffer_size?: string;
}

const ChipDetail = () => {
  const { chipName } = useParams();
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const decodedChipName = chipName ? decodeURIComponent(chipName) : "";

  useEffect(() => {
    const fetchDevices = async () => {
      if (!decodedChipName) return;

      const { data, error } = await supabase
        .from("device_layout_info")
        .select("*")
        .eq("chip_name", decodedChipName);

      if (error) {
        toast.error("Failed to load chip details");
        console.error(error);
      } else {
        setDevices(data || []);
      }
      setLoading(false);
    };

    fetchDevices();
  }, [decodedChipName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to search</span>
        </button>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  Chip Series
                </div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  {decodedChipName}
                </h1>
              </div>
              <Cpu className="w-12 h-12 text-primary/50" />
            </div>
          </div>

          {/* Chip Capabilities */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Performance</span>
              </div>
              <div className="text-lg font-semibold">High-Speed Switching</div>
            </div>

            <div className="glass-card rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Flexibility</span>
              </div>
              <div className="text-lg font-semibold">Multiple Configurations</div>
            </div>

            <div className="glass-card rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Models</span>
              </div>
              <div className="text-lg font-semibold">{devices.length} Available</div>
            </div>
          </div>

          {/* Devices List */}
          <div className="space-y-6 pt-8">
            <h3 className="text-2xl font-semibold">
              Models using {decodedChipName}
            </h3>

            {devices.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {devices.map((device) => (
                  <DeviceCard key={device.id} {...device} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-xl p-12 text-center">
                <p className="text-muted-foreground">
                  No models found for this chip.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipDetail;
