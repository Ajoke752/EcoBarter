import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import treeIcon from "@/assets/tree-icon.png";
import wasteIcon from "@/assets/waste-icon.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-accent">
            <Leaf className="w-5 h-5 text-accent-foreground" />
            <span className="text-accent-foreground font-medium">Clean Environment, Better Future</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Transform Waste into Trees
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            EcoBarter connects rural farmers with a simple voice-based system to exchange waste for tree seedlings and compost credits
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-xl shadow-glow"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 rounded-xl"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How EcoBarter Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-soft hover:shadow-glow transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">1. Report Waste</h3>
              <p className="text-muted-foreground">
                Use your voice or text to report the waste you have. Simple and accessible for everyone.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl shadow-soft hover:shadow-glow transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">2. Local Collection</h3>
              <p className="text-muted-foreground">
                Our trained agents visit your location to collect and properly dispose of the waste.
              </p>
            </div>

            <div className="bg-background p-8 rounded-2xl shadow-soft hover:shadow-glow transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">3. Earn Rewards</h3>
              <p className="text-muted-foreground">
                Receive tree seedlings or compost credits for every successful collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Growing Impact
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Together, we're creating a cleaner, greener future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex justify-center mb-4">
                <img src={wasteIcon} alt="Waste collected" className="w-20 h-20" />
              </div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-lg text-primary-foreground/80">Kg Waste Collected</div>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex justify-center mb-4">
                <img src={treeIcon} alt="Trees planted" className="w-20 h-20" />
              </div>
              <div className="text-5xl font-bold mb-2">5,000+</div>
              <div className="text-lg text-primary-foreground/80">Trees Planted</div>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex justify-center mb-4">
                <Users className="w-20 h-20" />
              </div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg text-primary-foreground/80">Active Farmers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of farmers turning waste into environmental impact
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary-glow text-primary-foreground text-lg px-12 py-6 rounded-xl shadow-glow"
          >
            Join EcoBarter Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
