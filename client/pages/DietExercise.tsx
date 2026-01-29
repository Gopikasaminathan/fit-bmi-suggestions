import { useNavigate } from "react-router-dom";
import { ChevronLeft, Apple, Dumbbell, Lightbulb, Droplets, Moon, Wind, Flame } from "lucide-react";
import { Link } from "react-router-dom";

export default function DietExercise() {
  const navigate = useNavigate();

  const dietTips = [
    {
      icon: Apple,
      title: "Balanced Nutrition",
      description: "Include lean proteins, whole grains, fruits, and vegetables in your daily diet.",
      details: [
        "Eat proteins at every meal",
        "Choose whole grains over refined carbs",
        "Fill half your plate with vegetables",
        "Limit sugar and processed foods"
      ]
    },
    {
      icon: Dumbbell,
      title: "Regular Exercise",
      description: "Aim for 150 minutes of moderate-intensity activity per week.",
      details: [
        "30 minutes daily walking is ideal",
        "Strength training 2-3 times a week",
        "Mix cardio with flexibility exercises",
        "Start small and build gradually"
      ]
    },
    {
      icon: Droplets,
      title: "Hydration",
      description: "Drink plenty of water throughout the day to stay hydrated.",
      details: [
        "Drink 8-10 glasses of water daily",
        "Drink water before, during, after exercise",
        "Limit sugary drinks and alcohol",
        "Monitor urine color for hydration"
      ]
    },
  ];

  const lifestyleTips = [
    {
      icon: Moon,
      title: "Quality Sleep",
      description: "7-9 hours of quality sleep is essential for health and metabolism.",
      color: "secondary",
    },
    {
      icon: Wind,
      title: "Stress Management",
      description: "Practice meditation, yoga, or deep breathing daily.",
      color: "primary",
    },
    {
      icon: Flame,
      title: "Metabolism Boost",
      description: "Increase physical activity and eat protein-rich foods.",
      color: "warning",
    },
  ];

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
            Health Recommendations
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-8 relative z-10">
        {/* Section title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Diet & Exercise Tips
          </h2>
          <p className="text-muted-foreground">
            Personalized recommendations based on your health profile
          </p>
        </div>

        {/* Tips cards */}
        <div className="space-y-4 mb-8">
          {dietTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational banner */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 rounded-2xl p-6 mb-8">
          <p className="text-center text-foreground font-semibold">
            💪 Remember: Small consistent changes lead to big results!
          </p>
        </div>

        {/* Placeholder message */}
        <div className="bg-secondary/5 border-2 border-secondary/30 rounded-2xl p-6 mb-8 text-center">
          <p className="text-foreground font-semibold mb-2">
            Want more detailed recommendations?
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            This section is ready to be expanded with personalized diet plans, exercise routines, and progress tracking. Let us know what features you'd like to add!
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="space-y-3">
          <Link
            to="/history"
            className="w-full block bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            View Your History
          </Link>
          <Link
            to="/"
            className="w-full block text-center py-3 px-6 rounded-2xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
