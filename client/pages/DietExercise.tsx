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
            Health & Diet Tips
          </h2>
          <p className="text-muted-foreground">
            Comprehensive recommendations to support your health journey
          </p>
        </div>

        {/* Main tips cards with details */}
        <div className="space-y-4 mb-10">
          {dietTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2 bg-muted/30 p-4 rounded-xl">
                  {tip.details?.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span className="text-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lifestyle tips section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Lifestyle Essentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lifestyleTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `hsla(var(--${tip.color}), 0.1)` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: `hsl(var(--${tip.color}))` }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily routine suggestion */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Suggested Daily Routine</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 items-start">
              <span className="bg-primary/20 text-primary rounded-full w-7 h-7 flex items-center justify-center font-semibold flex-shrink-0">1</span>
              <div><p className="font-medium text-foreground">Morning: 7:00 AM</p><p className="text-muted-foreground">Hydrate, breakfast, light stretching</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-primary/20 text-primary rounded-full w-7 h-7 flex items-center justify-center font-semibold flex-shrink-0">2</span>
              <div><p className="font-medium text-foreground">Afternoon: 12:00 PM</p><p className="text-muted-foreground">Balanced lunch, 1-hour activity</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-primary/20 text-primary rounded-full w-7 h-7 flex items-center justify-center font-semibold flex-shrink-0">3</span>
              <div><p className="font-medium text-foreground">Evening: 6:00 PM</p><p className="text-muted-foreground">Exercise, healthy dinner</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-primary/20 text-primary rounded-full w-7 h-7 flex items-center justify-center font-semibold flex-shrink-0">4</span>
              <div><p className="font-medium text-foreground">Night: 10:00 PM</p><p className="text-muted-foreground">Relax, sleep 7-9 hours</p></div>
            </div>
          </div>
        </div>

        {/* Motivational banner */}
        <div className="bg-gradient-to-r from-success/20 to-primary/20 border-2 border-success/30 rounded-2xl p-6 mb-8">
          <p className="text-center text-foreground font-semibold">
            💪 Remember: Small consistent changes lead to big results!
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="space-y-3">
          <Link
            to="/notifications"
            className="w-full block bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Enable Health Reminders
          </Link>
          <Link
            to="/history"
            className="w-full block text-center py-3 px-6 rounded-2xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
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
