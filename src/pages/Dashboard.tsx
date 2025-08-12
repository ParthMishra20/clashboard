import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to Clash Companion. Jump into rooms or explore stats.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/rooms"><Button variant="gold">Open Rooms</Button></Link>
          <Link to="/"><Button variant="outline">Back to Home</Button></Link>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
