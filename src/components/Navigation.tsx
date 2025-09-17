import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Stethoscope, Activity, FileText } from "lucide-react";

const Navigation = () => {
  return (
    <motion.nav 
      className="bg-primary shadow-soft border-b border-border sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">MediPredict</h1>
              <p className="text-xs text-primary-foreground/80">AI Disease Prediction</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#prediction" 
              className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              <Activity className="w-4 h-4" />
              <span>Prediction</span>
            </motion.a>
            <motion.a 
              href="#results" 
              className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              <FileText className="w-4 h-4" />
              <span>Results</span>
            </motion.a>
          </div>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;