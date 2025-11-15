import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, Users, Recycle, TreePine, Package, Shield } from "lucide-react";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About EcoBarter
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Empowering rural communities to create a sustainable future through innovative waste management
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            EcoBarter addresses the critical challenge of waste management in rural areas while promoting environmental sustainability. We believe that everyone should have access to proper waste disposal and the opportunity to contribute to a greener planet.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            By connecting farmers with trained collection agents through a simple, voice-enabled platform, we make environmental responsibility accessible to all, regardless of literacy or technical expertise.
          </p>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">The EcoBarter Process</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">1. Report Your Waste</h3>
                <p className="text-muted-foreground mb-4">
                  Farmers can report their waste using either voice recording or text input. Our AI-powered system transcribes voice reports automatically, making it accessible for everyone.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Voice-enabled reporting in local languages</li>
                  <li>Simple text-based alternative</li>
                  <li>Specify waste type and estimated quantity</li>
                  <li>Automatic location tracking</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">2. Agent Collection</h3>
                <p className="text-muted-foreground mb-4">
                  Trained local agents receive collection requests and visit farmers' locations to collect waste properly and safely.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Professional waste handling and sorting</li>
                  <li>Community-based collection network</li>
                  <li>Scheduled pickups</li>
                  <li>Proper disposal and recycling</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Leaf className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">3. Earn Environmental Rewards</h3>
                <p className="text-muted-foreground mb-4">
                  For every successful waste collection, farmers receive tangible rewards that benefit their land and community.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Native tree seedlings for reforestation</li>
                  <li>Compost credits for soil enrichment</li>
                  <li>Track your environmental impact</li>
                  <li>Community recognition and achievements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why Choose EcoBarter?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-2xl">
              <TreePine className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Environmental Impact</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Reduce pollution in rural areas</li>
                <li>• Increase tree coverage and biodiversity</li>
                <li>• Promote sustainable farming practices</li>
                <li>• Combat climate change locally</li>
              </ul>
            </div>

            <div className="bg-background p-8 rounded-2xl">
              <Users className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Community Benefits</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Create local employment opportunities</li>
                <li>• Build environmental awareness</li>
                <li>• Strengthen community bonds</li>
                <li>• Improve public health</li>
              </ul>
            </div>

            <div className="bg-background p-8 rounded-2xl">
              <Package className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Simple & Accessible</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• No technical expertise required</li>
                <li>• Voice-based interface</li>
                <li>• Works on basic smartphones</li>
                <li>• Multi-language support</li>
              </ul>
            </div>

            <div className="bg-background p-8 rounded-2xl">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Safe & Secure</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Trained collection agents</li>
                <li>• Proper waste handling protocols</li>
                <li>• Secure data management</li>
                <li>• Transparent tracking system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Powered by Innovation</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            EcoBarter leverages cutting-edge technology to make environmental action accessible
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">AI Voice</div>
              <p className="text-muted-foreground">
                Automatic transcription enables reporting in any language
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-secondary mb-2">Cloud Platform</div>
              <p className="text-muted-foreground">
                Secure, scalable infrastructure for reliability
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">Real-time Tracking</div>
              <p className="text-muted-foreground">
                Monitor your impact and rewards instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join the EcoBarter community today and start making a difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-6 rounded-xl"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/")}
              className="text-lg px-12 py-6 rounded-xl"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
