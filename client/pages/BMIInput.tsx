import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function BMIInput() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!age || parseInt(age) < 1 || parseInt(age) > 150)
      newErrors.age = "Please enter a valid age";
    if (!height || parseFloat(height) < 50 || parseFloat(height) > 300)
      newErrors.height = "Please enter a valid height";
    if (!weight || parseFloat(weight) < 10 || parseFloat(weight) > 500)
      newErrors.weight = "Please enter a valid weight";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = () => {
    if (!validateForm()) return;

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    // Save to localStorage
    const records = JSON.parse(localStorage.getItem("bmiRecords") || "[]");
    const newRecord = {
      id: Date.now(),
      name,
      age: parseInt(age),
      gender,
      height: parseFloat(height),
      weight: parseFloat(weight),
      bmi: parseFloat(bmi.toFixed(1)),
      date: new Date().toLocaleDateString(),
      timestamp: new Date().getTime(),
    };

    records.push(newRecord);
    localStorage.setItem("bmiRecords", JSON.stringify(records));

    // Navigate to result screen
    navigate("/bmi-result", { state: { record: newRecord } });
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
            Your Health Info
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-8 relative z-10">
        <div className="space-y-6">
          {/* Name field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </div>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-2xl border-2 transition-all text-foreground placeholder:text-muted-foreground ${
                errors.name
                  ? "border-danger/50 bg-danger/5"
                  : "border-border bg-white hover:border-primary/30 focus:border-primary"
              } focus:outline-none`}
            />
            {errors.name && (
              <p className="text-sm text-danger mt-2">{errors.name}</p>
            )}
          </div>

          {/* Age field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                if (errors.age) setErrors({ ...errors, age: "" });
              }}
              placeholder="Enter your age"
              className={`w-full px-4 py-3 rounded-2xl border-2 transition-all text-foreground placeholder:text-muted-foreground ${
                errors.age
                  ? "border-danger/50 bg-danger/5"
                  : "border-border bg-white hover:border-primary/30 focus:border-primary"
              } focus:outline-none`}
            />
            {errors.age && (
              <p className="text-sm text-danger mt-2">{errors.age}</p>
            )}
          </div>

          {/* Gender toggle */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Gender
            </label>
            <div className="flex gap-3">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g as "male" | "female")}
                  className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all border-2 capitalize ${
                    gender === g
                      ? `border-${g === "male" ? "primary" : "secondary"} bg-${g === "male" ? "primary" : "secondary"}/10`
                      : "border-border bg-white hover:border-primary/30"
                  }`}
                  style={
                    gender === g
                      ? {
                          borderColor:
                            g === "male"
                              ? "hsl(var(--primary))"
                              : "hsl(var(--secondary))",
                          backgroundColor:
                            g === "male"
                              ? "hsla(var(--primary), 0.1)"
                              : "hsla(var(--secondary), 0.1)",
                          color: "hsl(var(--foreground))",
                        }
                      : undefined
                  }
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Height field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                if (errors.height) setErrors({ ...errors, height: "" });
              }}
              placeholder="Enter your height in cm"
              className={`w-full px-4 py-3 rounded-2xl border-2 transition-all text-foreground placeholder:text-muted-foreground ${
                errors.height
                  ? "border-danger/50 bg-danger/5"
                  : "border-border bg-white hover:border-primary/30 focus:border-primary"
              } focus:outline-none`}
            />
            {errors.height && (
              <p className="text-sm text-danger mt-2">{errors.height}</p>
            )}
          </div>

          {/* Weight field */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                if (errors.weight) setErrors({ ...errors, weight: "" });
              }}
              placeholder="Enter your weight in kg"
              className={`w-full px-4 py-3 rounded-2xl border-2 transition-all text-foreground placeholder:text-muted-foreground ${
                errors.weight
                  ? "border-danger/50 bg-danger/5"
                  : "border-border bg-white hover:border-primary/30 focus:border-primary"
              } focus:outline-none`}
            />
            {errors.weight && (
              <p className="text-sm text-danger mt-2">{errors.weight}</p>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 space-y-3">
          <button
            onClick={calculateBMI}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Calculate BMI
          </button>
          <Link
            to="/"
            className="w-full block text-center py-3 px-6 rounded-2xl border-2 border-border text-foreground font-semibold hover:bg-muted transition-all"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
