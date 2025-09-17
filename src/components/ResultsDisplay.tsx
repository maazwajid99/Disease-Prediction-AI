import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Share2,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";

interface Condition {
  name: string;
  probability: number;
  severity: string;
  description: string;
}

interface PredictionResult {
  conditions: Condition[];
  confidence: number;
  recommendations: string[];
}

interface ResultsDisplayProps {
  result: PredictionResult | null;
}

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'mild': return 'success';
    case 'moderate': return 'warning';
    case 'serious': return 'destructive';
    default: return 'secondary';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'mild': return CheckCircle;
    case 'moderate': return Clock;
    case 'serious': return AlertTriangle;
    default: return Activity;
  }
};

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  if (!result) return null;

  return (
    <section id="results" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Your Health Assessment Results
              </h2>
              <p className="text-xl text-muted-foreground">
                AI-powered analysis of your symptoms
              </p>
            </motion.div>
          </div>

          {/* Confidence Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="shadow-medical border-border/50">
              <CardHeader className="bg-gradient-medical">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span>Analysis Confidence</span>
                </CardTitle>
                <CardDescription>
                  Overall confidence in the prediction accuracy
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Confidence Score</span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </div>
                <Progress value={result.confidence * 100} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {result.confidence > 0.8 ? "High confidence prediction" : 
                   result.confidence > 0.6 ? "Moderate confidence prediction" :
                   "Low confidence - consider professional consultation"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Predicted Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Possible Conditions</h3>
            <div className="grid gap-6">
              {result.conditions.map((condition, index) => {
                const SeverityIcon = getSeverityIcon(condition.severity);
                return (
                  <motion.div
                    key={condition.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="shadow-card border-border/50 hover:shadow-medical transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <SeverityIcon className="w-6 h-6 text-primary" />
                            <div>
                              <h4 className="text-xl font-semibold text-foreground">
                                {condition.name}
                              </h4>
                              <p className="text-muted-foreground">
                                {condition.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant={getSeverityColor(condition.severity) as any}>
                            {condition.severity}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Probability</span>
                            <span className="text-lg font-bold text-primary">
                              {Math.round(condition.probability * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={condition.probability * 100} 
                            className="h-2"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Recommendations</h3>
            <Card className="shadow-medical border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-accent" />
                  <span>Health Recommendations</span>
                </CardTitle>
                <CardDescription>
                  General health advice based on your symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {result.recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-foreground">{recommendation}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Important Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <Alert className="border-warning/50 bg-warning/5">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <AlertDescription className="text-foreground">
                <strong>Medical Disclaimer:</strong> This AI prediction is for informational purposes only 
                and should not replace professional medical diagnosis. Always consult with a qualified 
                healthcare provider for proper medical evaluation and treatment.
              </AlertDescription>
            </Alert>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default ResultsDisplay;