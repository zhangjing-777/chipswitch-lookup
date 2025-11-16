import { useNavigate } from "react-router-dom";
import { ChipBadge } from "./ChipBadge";
import { HardDrive, Layers } from "lucide-react";

interface DeviceCardProps {
  id: string;
  hw_sku: string;
  chip_name: string;
  port_layout?: string;
  buffer_size?: string;
}

export const DeviceCard = ({ id, hw_sku, chip_name, port_layout, buffer_size }: DeviceCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/model/${id}`)}
      className="glass-card rounded-xl p-6 cursor-pointer hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {hw_sku}
          </h3>
          <div className="mt-2">
            <ChipBadge chipName={chip_name} clickable={false} />
          </div>
        </div>
        <HardDrive className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-2 text-sm">
        {port_layout && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers className="w-4 h-4" />
            <span>{port_layout}</span>
          </div>
        )}
        {buffer_size && (
          <div className="text-muted-foreground">
            Buffer: <span className="text-foreground">{buffer_size}</span>
          </div>
        )}
      </div>
    </div>
  );
};
