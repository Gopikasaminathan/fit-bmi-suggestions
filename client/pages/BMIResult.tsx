import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";

interface BMIRecord {
  id: number;
  name: string;
  age: number;
  gender: "male" | "female";
  height: number;
  weight: number;
  bmi: number;
  date: string;
  timestamp: number;
}

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { category: "Underweight", color: "info", bg: "bg-info/10", border: "border-info", emoji: "⚖️", advice: "Focus on healthy weight gain with balanced nutrition" };
  if (bmi < 25) return { category: "Normal Weight", color: "success", bg: "bg-success/10", border: "border-success", emoji: "✅", advice: "Great! Maintain your healthy lifestyle" };
  if (bmi < 30) return { category: "Overweight", color: "warning", bg: "bg-warning/10", border: "border-warning", emoji: "⚠️", advice: "Consider increasing physical activity and balanced diet" };
  return { category: "Obese", color: "danger", bg: "bg-danger/10", border: "border-danger", emoji: "🔴", advice: "Consult with a healthcare professional for a personalized plan" };
}

export default function BMIResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state?.record as BMIRecord | undefined;

  const bmiInfo = useMemo(
    () => (record ? getBMICategory(record.bmi) : null),
    [record]
  );

  if (!record || !bmiInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            No data found
          </h2>
          <Link to="/bmi-input" className="text-primary hover:underline">
            Go back to enter your information
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      {/* Background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">
            Your BMI Result
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-8 relative z-10">
        {/* User info card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{record.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {record.age} years old • {record.gender}
              </p>
            </div>
            <span className="text-3xl">{bmiInfo.emoji}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">
                Height
              </p>
              <p className="text-lg font-semibold text-foreground">
                {record.height} cm
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">
                Weight
              </p>
              <p className="text-lg font-semibold text-foreground">
                {record.weight} kg
              </p>
            </div>
          </div>
        </div>

        {/* Large BMI display */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-border mb-6 text-center">
          <p className="text-muted-foreground text-sm font-semibold uppercase mb-2">
            Your BMI
          </p>
          <p className="text-7xl font-bold text-foreground mb-3">{record.bmi}</p>
          <p className="text-sm text-muted-foreground">kg/m²</p>
        </div>

        {/* Category card */}
        <div
          className={`${bmiInfo.bg} border-2 ${bmiInfo.border} rounded-2xl p-6 mb-6`}
          style={{
            backgroundColor: `hsla(var(--${bmiInfo.color}), 0.1)`,
            borderColor: `hsl(var(--${bmiInfo.color}))`,
          }}
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
            BMI Category
          </p>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: `hsl(var(--${bmiInfo.color}))` }}
          >
            {bmiInfo.category}
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            {bmiInfo.advice}
          </p>
        </div>

        {/* BMI Range info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">BMI Categories</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-info/5 border border-info/20 rounded-xl">
              <span className="text-sm font-medium text-foreground">
                Underweight
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                BMI &lt; 18.5
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-success/5 border border-success/20 rounded-xl">
              <span className="text-sm font-medium text-foreground">
                Normal Weight
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                18.5 - 24.9
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-warning/5 border border-warning/20 rounded-xl">
              <span className="text-sm font-medium text-foreground">
                Overweight
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                25 - 29.9
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-danger/5 border border-danger/20 rounded-xl">
              <span className="text-sm font-medium text-foreground">Obese</span>
              <span className="text-xs font-semibold text-muted-foreground">
                BMI ≥ 30
              </span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/diet-exercise")}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Get Diet & Exercise Tips
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/notifications")}
            className="w-full py-3 px-6 rounded-2xl border-2 border-primary/30 text-foreground font-semibold hover:bg-primary/5 transition-all"
          >
            Set Health Reminders
          </button>
          <button
            onClick={() => navigate("/history")}
            className="w-full py-3 px-6 rounded-2xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
          >
            View History
          </button>
          <Link
            to="/bmi-input"
            className="w-full block text-center py-3 px-6 rounded-2xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
          >
            New Calculation
          </Link>
        </div>
      </div>
    </div>
  );
}
