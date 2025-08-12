import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ChatRoom = () => {
  const { id } = useParams();
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Room: {id}</h1>
        <p className="mt-2 text-muted-foreground">Realtime chat UI will appear here. Typing indicators, pins, and media coming soon.</p>
        <div className="mt-6">
          <Link to="/rooms"><Button variant="outline">Back to Rooms</Button></Link>
        </div>
      </section>
    </main>
  );
};

export default ChatRoom;
