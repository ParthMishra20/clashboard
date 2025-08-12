import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Demo flow until Supabase is connected
      await new Promise((r) => setTimeout(r, 600));
      toast({ title: mode === "login" ? "Welcome back!" : "Account ready", description: "Demo auth: navigating to dashboard." });
      navigate("/app");
    } catch (err: any) {
      toast({ title: "Authentication error", description: err.message, });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast({ title: "Google OAuth pending", description: "We'll connect Google via Supabase in the next step." });
      navigate("/app");
    } catch (err: any) {
      toast({ title: "Google sign-in failed", description: err.message });
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
              {mode === "login" ? "Welcome back to Clash Companion." : "Join Clash Companion to chat and track clan progress."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="button" variant="gold" size="lg" disabled={loading} className="w-full" onClick={handleGoogle}>
                Continue with Google
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <button type="button" className="underline underline-offset-4" onClick={() => setMode("signup")}>New here? Create an account</button>
                ) : (
                  <button type="button" className="underline underline-offset-4" onClick={() => setMode("login")}>Already have an account? Log in</button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Auth;
