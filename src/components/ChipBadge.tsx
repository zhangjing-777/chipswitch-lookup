import { Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChipBadgeProps {
  chipName: string;
  clickable?: boolean;
}

export const ChipBadge = ({ chipName, clickable = true }: ChipBadgeProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate(`/chip/${encodeURIComponent(chipName)}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!clickable}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 
                  ${clickable ? "hover:bg-primary/20 hover:border-primary/50 cursor-pointer" : "cursor-default"} 
                  transition-all duration-200`}
    >
      <Cpu className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-primary">{chipName}</span>
    </button>
  );
};
