import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChipBadge } from "@/components/ChipBadge";
import { DeviceCard } from "@/components/DeviceCard";
import { ArrowLeft, Server, Layers, Database } from "lucide-react";
import { toast } from "sonner";

interface Device {
  id: string;
  hw_sku: string;
  chip_name: string;
  port_layout?: string;
  buffer_size?: string;
  created_at?: string;
}

const ModelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device | null>(null);
  const [relatedDevices, setRelatedDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("device_layout_info")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        toast.error("Failed to load device details");
        console.error(error);
      } else if (data) {
        setDevice(data);

        // Fetch related devices with same chip
        if (data.chip_name) {
          const { data: related } = await supabase
            .from("device_layout_info")
            .select("*")
            .eq("chip_name", data.chip_name)
            .neq("id", id)
            .limit(4);

          setRelatedDevices(related || []);
        }
      }
      setLoading(false);
    };

    fetchDevice();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Device not found</h2>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">
            Return to search
          </button>
        </div>
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
                  Switch Model
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{device.hw_sku}</h1>
              </div>
              <Server className="w-12 h-12 text-primary/50" />
            </div>

            <div>
              <ChipBadge chipName={device.chip_name} />
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {device.port_layout && (
              <div className="glass-card rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Layers className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Port Layout</span>
                </div>
                <div className="text-2xl font-semibold">{device.port_layout}</div>
              </div>
            )}

            {device.buffer_size && (
              <div className="glass-card rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Database className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Buffer Size</span>
                </div>
                <div className="text-2xl font-semibold">{device.buffer_size}</div>
              </div>
            )}
          </div>

          {/* Capabilities Card */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">Key Capabilities</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Chip Technology</div>
                <div className="text-lg font-medium text-primary">{device.chip_name}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Port Configuration</div>
                <div className="text-lg font-medium">{device.port_layout || "N/A"}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Buffer Capacity</div>
                <div className="text-lg font-medium">{device.buffer_size || "N/A"}</div>
              </div>
            </div>
          </div>

          {/* Related Devices */}
          {relatedDevices.length > 0 && (
            <div className="space-y-6 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">
                  Other models with {device.chip_name}
                </h3>
                <button
                  onClick={() => navigate(`/chip/${encodeURIComponent(device.chip_name)}`)}
                  className="text-sm text-primary hover:underline"
                >
                  View all →
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedDevices.map((related) => (
                  <DeviceCard key={related.id} {...related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;
