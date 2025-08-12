import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const name = localStorage.getItem("demoName") || "Member";
  const username = localStorage.getItem("demoUsername") || "player";
  const email = localStorage.getItem("demoEmail") || "guest@demo.app";

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="mt-2 text-muted-foreground">Manage your details. Real profiles will sync after we connect Supabase.</p>
        <div className="mt-6 max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>{name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Username</span><span>@{username}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{email}</span></div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Profile;
