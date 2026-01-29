import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, Clock, Zap, Water, Moon, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface NotificationPreference {
  morningReminder: boolean;
  eveningReminder: boolean;
  hydrationReminder: boolean;
  exerciseReminder: boolean;
  sleepReminder: boolean;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<NotificationPreference>({
    morningReminder: true,
    eveningReminder: true,
    hydrationReminder: true,
    exerciseReminder: true,
    sleepReminder: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("notificationPreferences");
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const savePreferences = (newPreferences: NotificationPreference) => {
    setPreferences(newPreferences);
    localStorage.setItem("notificationPreferences", JSON.stringify(newPreferences));
  };

  const togglePreference = (key: keyof NotificationPreference) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    savePreferences(updated);
  };

  const notificationOptions = [
    {
      id: "morningReminder" as const,
      icon: Utensils,
      title: "Morning Health Check",
      description: "Start your day with a healthy reminder",
      time: "08:00 AM",
      message: "Good morning! ☀️ Time for a healthy breakfast and to log your health metrics.",
      color: "primary",
    },
    {
      id: "eveningReminder" as const,
      icon: Clock,
      title: "Evening Wellness",
      description: "Reflect on your daily health progress",
      time: "07:00 PM",
      message: "How was your day? 📊 Log your current weight and track your progress.",
      color: "secondary",
    },
    {
      id: "hydrationReminder" as const,
      icon: Water,
      title: "Hydration Reminder",
      description: "Stay hydrated throughout the day",
      time: "Every 3 hours",
      message: "💧 Remember to drink water! Proper hydration is key to good health.",
      color: "info",
    },
    {
      id: "exerciseReminder" as const,
      icon: Zap,
      title: "Exercise Time",
      description: "Get moving and stay active",
      time: "06:00 PM",
      message: "⚡ Time to exercise! Even a 15-minute walk helps. You've got this!",
      color: "success",
    },
    {
      id: "sleepReminder" as const,
      icon: Moon,
      title: "Bedtime Reminder",
      description: "Maintain a healthy sleep schedule",
      time: "10:00 PM",
      message: "🌙 Time for bed! Quality sleep is essential for your health and metabolism.",
      color: "warning",
    },
  ];

  const activeReminders = Object.values(preferences).filter(Boolean).length;

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
            Health Reminders
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-8 relative z-10">
        {/* Active reminders card */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase">
                Active Reminders
              </p>
              <p className="text-3xl font-bold text-foreground">{activeReminders}</p>
            </div>
            <Bell className="w-12 h-12 text-primary/40" />
          </div>
        </div>

        {/* Notification preferences */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Daily Health Reminders
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Stay motivated with personalized notifications
          </p>

          <div className="space-y-4">
            {notificationOptions.map((option) => {
              const Icon = option.icon;
              const isActive = preferences[option.id];

              return (
                <div
                  key={option.id}
                  className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all cursor-pointer ${
                    isActive
                      ? `border-${option.color} bg-${option.color}/5`
                      : "border-border hover:border-primary/20"
                  }`}
                  onClick={() => togglePreference(option.id)}
                  style={
                    isActive
                      ? {
                          borderColor: `hsl(var(--${option.color}))`,
                          backgroundColor: `hsla(var(--${option.color}), 0.05)`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isActive ? `bg-${option.color}/10` : "bg-muted"
                      }`}
                      style={
                        isActive
                          ? { backgroundColor: `hsla(var(--${option.color}), 0.1)` }
                          : undefined
                      }
                    >
                      <Icon
                        className={`w-6 h-6 transition-all ${
                          isActive ? `text-${option.color}` : "text-muted-foreground"
                        }`}
                        style={
                          isActive
                            ? { color: `hsl(var(--${option.color}))` }
                            : undefined
                        }
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {option.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </p>
                        </div>
                        <div
                          className={`w-12 h-7 rounded-full transition-all flex items-center p-1 flex-shrink-0 ${
                            isActive
                              ? `bg-${option.color}`
                              : "bg-muted-foreground/30"
                          }`}
                          style={
                            isActive
                              ? { backgroundColor: `hsl(var(--${option.color}))` }
                              : undefined
                          }
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-all ${
                              isActive ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground mt-3 font-medium">
                        ⏰ {option.time}
                      </p>
                    </div>
                  </div>

                  {/* Message preview */}
                  {isActive && (
                    <div className="mt-4 p-3 bg-white/50 rounded-lg border border-border/50">
                      <p className="text-sm text-foreground italic">
                        "{option.message}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational section */}
        <div className="bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-2xl p-6 mb-8">
          <div className="text-center">
            <p className="text-2xl mb-2">💪</p>
            <h3 className="font-bold text-foreground mb-2">
              Stay Consistent!
            </h3>
            <p className="text-sm text-muted-foreground">
              Regular reminders help you build healthy habits. Enable notifications to get daily motivation and health tips delivered to your device.
            </p>
          </div>
        </div>

        {/* Info section */}
        <div className="bg-secondary/5 border-2 border-secondary/30 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-3">How Reminders Help</h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex gap-2">
              <span className="text-secondary font-bold">✓</span>
              <span>Build consistent health tracking habits</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold">✓</span>
              <span>Motivate you to stay active and hydrated</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold">✓</span>
              <span>Monitor your progress regularly</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold">✓</span>
              <span>Maintain a healthy sleep schedule</span>
            </li>
          </ul>
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
