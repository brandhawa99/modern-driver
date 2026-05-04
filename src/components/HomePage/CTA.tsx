import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useWebHaptics } from "web-haptics/react";

function CTA() {
  const { trigger } = useWebHaptics();
  return (
    <div className="mt-40 w-full justify-center flex">
      <div className="relative">
        <img
          className="rounded-2xl h-120 md:h-fit object-cover"
          src="https://images.unsplash.com/photo-1607585011081-241d2bacb7de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Card className="w-full max-w-sm mx-4 bg-card/95">
            <CardHeader>
              <CardTitle>Sign Up For Our Newsletter</CardTitle>
              <CardDescription>
                Stay updated on the latest cars, performance trends, and
                standout builds from around the world.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="moderndriver@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center"></div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                onClick={() => {
                  trigger([
                    { duration: 40, intensity: 0.7 },
                    { delay: 40, duration: 40, intensity: 0.7 },
                    { delay: 40, duration: 40, intensity: 0.9 },
                    { delay: 40, duration: 50, intensity: 0.6 },
                  ]);
                }}
              >
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CTA;
