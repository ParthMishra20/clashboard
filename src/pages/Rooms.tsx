import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Rooms = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Rooms</h1>
        <p className="mt-2 text-muted-foreground">Create or join chat rooms. Realtime messaging coming next.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Create a Room</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Name your room and invite your clan. Password protection soon.</p>
            </CardContent>
            <CardFooter>
              <Button variant="hero">Create Room</Button>
            </CardFooter>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Public: War Council</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">A demo public room to preview the chat layout.</p>
            </CardContent>
            <CardFooter>
              <Link to="/rooms/demo"><Button variant="gold">Join</Button></Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Rooms;
