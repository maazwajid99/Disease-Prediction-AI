import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import heroImage from "@/assets/medical-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-medical overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Medical AI Technology"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                AI-Powered
                <span className="block text-primary">Disease Prediction</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                Advanced machine learning algorithms analyze your symptoms to provide 
                accurate disease predictions and health insights in seconds.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-primary text-primary-foreground shadow-medical hover:shadow-lg transition-all"
                >
                  Start Prediction
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex items-center space-x-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Zap className="w-5 h-5 text-warning" />
                <span className="text-sm">Instant Results</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-sm">Trusted by 10k+</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-card border border-border/50"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </motion.div>
              <motion.div 
                className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-card border border-border/50"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-success">10K+</div>
                <div className="text-sm text-muted-foreground">Predictions Made</div>
              </motion.div>
              <motion.div 
                className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-card border border-border/50"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Availability</div>
              </motion.div>
              <motion.div 
                className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-card border border-border/50"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-warning">2s</div>
                <div className="text-sm text-muted-foreground">Average Response</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;