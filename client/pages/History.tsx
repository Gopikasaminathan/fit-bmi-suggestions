import { useNavigate } from "react-router-dom";
import { ChevronLeft, Trash2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
  if (bmi < 18.5) return { category: "Underweight", color: "info" };
  if (bmi < 25) return { category: "Normal Weight", color: "success" };
  if (bmi < 30) return { category: "Overweight", color: "warning" };
  return { category: "Obese", color: "danger" };
}

export default function History() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<BMIRecord[]>([]);

  useEffect(() => {
    const storedRecords = JSON.parse(
      localStorage.getItem("bmiRecords") || "[]",
    );
    // Sort by timestamp, newest first
    setRecords(
      storedRecords.sort(
        (a: BMIRecord, b: BMIRecord) => b.timestamp - a.timestamp,
      ),
    );
  }, []);

  const deleteRecord = (id: number) => {
    const updatedRecords = records.filter((r) => r.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem("bmiRecords", JSON.stringify(updatedRecords));
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, { text: string; bg: string }> = {
      info: { text: "text-info", bg: "bg-info/10" },
      success: { text: "text-success", bg: "bg-success/10" },
      warning: { text: "text-warning", bg: "bg-warning/10" },
      danger: { text: "text-danger", bg: "bg-danger/10" },
    };
    return colorMap[color] || colorMap.success;
  };

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
            Your BMI History
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-8 relative z-10">
        {records.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Records Yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start tracking your BMI to see your history here
            </p>
            <Link
              to="/bmi-input"
              className="inline-block bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Calculate Your BMI
            </Link>
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-border text-center">
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">
                  Total Checks
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {records.length}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-border text-center">
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">
                  Latest BMI
                </p>
                <p className="text-2xl font-bold text-primary">
                  {records[0].bmi}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-border text-center">
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">
                  Status
                </p>
                <p className="text-sm font-bold text-foreground">
                  {getBMICategory(records[0].bmi).category}
                </p>
              </div>
            </div>

            {/* Records list */}
            <div className="space-y-3">
              {records.map((record) => {
                const category = getBMICategory(record.bmi);
                const colorClass = getColorClass(category.color);

                return (
                  <div
                    key={record.id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">
                            {record.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {record.age}y • {record.gender}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          {record.date}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-lg">
                            <span className="text-xs font-medium text-muted-foreground">
                              H:{record.height}cm
                            </span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-lg">
                            <span className="text-xs font-medium text-muted-foreground">
                              W:{record.weight}kg
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-2">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-foreground">
                            {record.bmi}
                          </p>
                          <p
                            className={`text-xs font-semibold ${colorClass.text}`}
                          >
                            {category.category}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="p-2 hover:bg-danger/10 rounded-lg transition-colors text-danger"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 space-y-3">
          <Link
            to="/bmi-input"
            className="w-full block bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            New Calculation
          </Link>
          <Link
            to="/notifications"
            className="w-full block text-center py-3 px-6 rounded-2xl border-2 border-primary/30 text-foreground font-semibold hover:bg-primary/5 transition-all"
          >
            Set Health Reminders
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
