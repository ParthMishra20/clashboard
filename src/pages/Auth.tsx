import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"form" | "otp">("form");
  const { toast } = useToast();
  const navigate = useNavigate();

  const finishLogin = () => {
    localStorage.setItem("demoAuthed", "1");
    localStorage.setItem("demoEmail", email);
    if (name) localStorage.setItem("demoName", name);
    if (username) localStorage.setItem("demoUsername", username);
    toast({ title: "Welcome!", description: "Signed in (demo)." });
    navigate("/app");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      if (mode === "login") {
        finishLogin();
      } else {
        // Trigger OTP step in demo
        setStep("otp");
        toast({ title: "OTP sent", description: "Enter the 6-digit code (demo)." });
      }
    } catch (err: any) {
      toast({ title: "Authentication error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      if (otp.length === 6) {
        finishLogin();
      } else {
        toast({ title: "Invalid code", description: "Please enter the 6-digit code." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
        <Card className="border border-border/60 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">{mode === "login" ? "Log in" : "Create account"}</CardTitle>
            <CardDescription>
              {mode === "login" ? "Welcome back to Clash Companion." : "Sign up to chat and track clan progress. You'll verify with a 6-digit OTP."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={mode === "login" ? "current-password" : "new-password"} />
                </div>
                <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full">
                  {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  {mode === "login" ? (
                    <button type="button" className="underline underline-offset-4" onClick={() => setMode("signup")}>New here? Create an account</button>
                  ) : (
                    <button type="button" className="underline underline-offset-4" onClick={() => setMode("login")}>Already have an account? Log in</button>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Enter OTP</Label>
                  <div className="mt-2">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <Button onClick={verifyOtp} variant="gold" size="lg" disabled={loading} className="w-full">Verify & Continue</Button>
                <button className="block w-full text-center text-sm underline underline-offset-4 text-muted-foreground" onClick={() => setStep("form")}>Go back</button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Auth;
