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
    </div>
  );
};

export default Index;