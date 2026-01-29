import { Link } from "react-router-dom";
import { Heart, Activity, TrendingUp } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex flex-col justify-between">
      {/* Background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Icons circle */}
        <div className="mb-8 relative w-24 h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Heart className="w-12 h-12 text-primary absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2" />
              <Activity className="w-12 h-12 text-secondary absolute bottom-0 right-0" />
              <TrendingUp className="w-12 h-12 text-primary absolute bottom-0 left-0" />
            </div>
          </div>
        </div>

        {/* App title */}
        <div className="text-center mb-6 max-w-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
            BMI Health
            <br />
            Assistant
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Your personal health guide. Track, understand, and improve your
            wellness journey.
          </p>
        </div>

        {/* Features list */}
        <div className="mt-8 space-y-3 w-full max-w-sm">
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-foreground font-medium">
              Calculate your BMI instantly
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-sm text-foreground font-medium">
              Get personalized recommendations
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-foreground font-medium">
              Track your health history
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-8 relative z-10">
        <Link
          to="/bmi-input"
          className="w-full block bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Start Your Health Journey
        </Link>
        <p className="text-xs text-muted-foreground text-center mt-4">
          No sign-up required. Your data stays private.
        </p>
      </div>
    </div>
  );
}
