import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PredictionForm from "@/components/PredictionForm";
import ResultsDisplay from "@/components/ResultsDisplay";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredictionResult = (result: any) => {
    setPredictionResult(result);
    // Scroll to results section
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <PredictionForm onPredictionResult={handlePredictionResult} />
        <ResultsDisplay result={predictionResult} />
      </main>
      
      {/* Contact Section */}
      <footer id="contact" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Need Professional Medical Help?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our AI predictions are designed to guide you, but professional medical consultation 
            is always recommended for accurate diagnosis and treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg shadow-medical hover:shadow-lg transition-all">
              Find Healthcare Providers
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
              Emergency Services
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;