import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DemoUser {
  name?: string;
  username?: string;
  email?: string;
}

const Navbar = () => {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<DemoUser>({});
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = localStorage.getItem("demoAuthed") === "1";
    setAuthed(isAuthed);
    if (isAuthed) {
      setUser({
        name: localStorage.getItem("demoName") || undefined,
        username: localStorage.getItem("demoUsername") || undefined,
        email: localStorage.getItem("demoEmail") || undefined,
      });
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("demoAuthed");
    localStorage.removeItem("demoName");
    localStorage.removeItem("demoUsername");
    localStorage.removeItem("demoEmail");
    setAuthed(false);
    navigate("/");
  };

  const initials = (user.name || user.username || "G").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold tracking-tight">Clash Companion</Link>
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <Link to="/rooms" className="hover:underline underline-offset-4">Rooms</Link>
            <Link to="/app" className="hover:underline underline-offset-4">Dashboard</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!authed ? (
            <Link to="/auth">
              <Button size="sm" variant="hero">Sign in</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name || "Member"}</span>
                    <span className="text-xs text-muted-foreground">{user.email || "guest@demo.app"}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/app")}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/rooms")}>Rooms</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
