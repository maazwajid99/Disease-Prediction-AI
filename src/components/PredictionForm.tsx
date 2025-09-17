import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionFormProps {
  onPredictionResult: (result: any) => void;
}

const commonSymptoms = [
  "Fever", "Headache", "Cough", "Fatigue", "Nausea", "Dizziness",
  "Chest Pain", "Shortness of Breath", "Abdominal Pain", "Joint Pain",
  "Sore Throat", "Runny Nose", "Muscle Aches", "Loss of Appetite"
];

const PredictionForm = ({ onPredictionResult }: PredictionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: [] as string[],
    additionalSymptoms: "",
    duration: "",
    severity: ""
  });
  
  const { toast } = useToast();

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const simulatePrediction = async () => {
    // Simulate AI prediction with realistic medical conditions
    const conditions = [
      { name: "Common Cold", probability: 0.75, severity: "Mild", description: "Viral upper respiratory infection" },
      { name: "Influenza", probability: 0.65, severity: "Moderate", description: "Seasonal flu virus infection" },
      { name: "Migraine", probability: 0.45, severity: "Moderate", description: "Primary headache disorder" },
      { name: "Gastroenteritis", probability: 0.35, severity: "Mild", description: "Stomach flu or food poisoning" },
      { name: "Hypertension", probability: 0.25, severity: "Serious", description: "High blood pressure condition" }
    ];

    // Filter and sort based on symptoms
    const relevantConditions = conditions
      .filter(c => Math.random() > 0.3)
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3);

    return {
      conditions: relevantConditions,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
      recommendations: [
        "Consult with a healthcare professional for proper diagnosis",
        "Monitor symptoms and seek immediate care if they worsen",
        "Stay hydrated and get adequate rest",
        "Consider over-the-counter medications for symptom relief"
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.symptoms.length === 0) {
      toast({
        title: "Please select symptoms",
        description: "Select at least one symptom to continue",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await simulatePrediction();
      onPredictionResult(result);
      
      toast({
        title: "Prediction Complete",
        description: "Your health assessment is ready",
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="prediction" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                AI Health Assessment
              </h2>
              <p className="text-xl text-muted-foreground">
                Enter your symptoms for personalized health predictions
              </p>
            </motion.div>
          </div>

          <Card className="shadow-medical border-border/50">
            <CardHeader className="bg-gradient-medical">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-primary" />
                <span>Symptom Analysis</span>
              </CardTitle>
              <CardDescription>
                Provide accurate information for the most reliable predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Symptoms Selection */}
                <div className="space-y-4">
                  <Label>Common Symptoms (select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {commonSymptoms.map((symptom) => (
                      <motion.div
                        key={symptom}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={symptom}
                          checked={formData.symptoms.includes(symptom)}
                          onCheckedChange={() => handleSymptomToggle(symptom)}
                        />
                        <Label htmlFor={symptom} className="text-sm cursor-pointer">
                          {symptom}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Symptom Duration</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long have you had these symptoms?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2days">1-2 days</SelectItem>
                        <SelectItem value="3-7days">3-7 days</SelectItem>
                        <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                        <SelectItem value="2weeks+">More than 2 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Symptom Severity</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your symptom severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Symptoms */}
                <div className="space-y-2">
                  <Label htmlFor="additionalSymptoms">Additional Symptoms or Notes</Label>
                  <Textarea
                    id="additionalSymptoms"
                    placeholder="Describe any other symptoms or relevant information..."
                    value={formData.additionalSymptoms}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalSymptoms: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-primary text-primary-foreground shadow-medical hover:shadow-lg transition-all py-6 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Symptoms...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-5 w-5" />
                        Get AI Prediction
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PredictionForm;