import { SearchBar } from "@/components/SearchBar";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold gradient-text">JasonTech</h1>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Switch Chip Lookup
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly find switch models by chip name, or discover chip details by model number
            </p>
          </div>

          {/* Search Bar */}
          <div className="pt-8">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
            <div className="space-y-2">
              <div className="text-3xl font-bold gradient-text">Fast</div>
              <div className="text-sm text-muted-foreground">Millisecond search</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold gradient-text">Accurate</div>
              <div className="text-sm text-muted-foreground">Real-time data</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold gradient-text">Simple</div>
              <div className="text-sm text-muted-foreground">Engineer-focused</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Chips Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-center">Popular Chip Series</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Tomahawk", "Spectrum", "Jericho", "Trident"].map((chip) => (
              <div
                key={chip}
                className="glass-card rounded-lg p-6 text-center hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="text-lg font-semibold text-foreground">{chip}</div>
                <div className="text-sm text-muted-foreground mt-1">Series</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-24 border-t border-border/30">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 JasonTech. Built for engineers, by engineers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
