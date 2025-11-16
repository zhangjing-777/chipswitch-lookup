import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  hw_sku: string;
  chip_name: string;
  type: "model" | "chip";
}

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchDevices = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      const { data, error } = await supabase
        .from("device_layout_info")
        .select("id, hw_sku, chip_name")
        .or(`hw_sku.ilike.%${query}%,chip_name.ilike.%${query}%`)
        .limit(8);

      if (!error && data) {
        const modelResults: SearchResult[] = data
          .filter((d) => d.hw_sku?.toLowerCase().includes(query.toLowerCase()))
          .map((d) => ({ ...d, type: "model" as const }));

        const chipResults: SearchResult[] = Array.from(
          new Set(data.map((d) => d.chip_name).filter(Boolean))
        )
          .filter((chip) => chip?.toLowerCase().includes(query.toLowerCase()))
          .map((chip) => ({
            id: chip || "",
            hw_sku: "",
            chip_name: chip || "",
            type: "chip" as const,
          }));

        setResults([...modelResults, ...chipResults].slice(0, 8));
      }
    };

    const debounce = setTimeout(searchDevices, 150);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    if (result.type === "model") {
      navigate(`/model/${result.id}`);
    } else {
      navigate(`/chip/${encodeURIComponent(result.chip_name)}`);
    }
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by model or chip name..."
          className="w-full h-16 pl-16 pr-6 text-lg bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl 
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 
                     transition-all duration-200 placeholder:text-muted-foreground glow"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full glass-card rounded-2xl overflow-hidden z-50 shadow-2xl">
          {results.map((result, idx) => (
            <button
              key={`${result.type}-${result.id || result.chip_name}-${idx}`}
              onClick={() => handleSelect(result)}
              className="w-full px-6 py-4 text-left hover:bg-secondary/50 transition-colors border-b border-border/30 last:border-0 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {result.type === "model" ? "Model" : "Chip"}
                  </div>
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {result.type === "model" ? result.hw_sku : result.chip_name}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.type === "model" && result.chip_name}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
