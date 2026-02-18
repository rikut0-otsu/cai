import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, loading, setLocation]);

  const handleLoginClick = () => {
    window.location.href = getLoginUrl();
  };

  const handleSelectAccountClick = () => {
    window.location.href = getLoginUrl({ selectAccount: true });
  };

  return (
    <main className="container py-12">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>ログイン</CardTitle>
            <CardDescription>
              このページを利用するにはGoogleアカウントでログインしてください。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={handleLoginClick} className="w-full">
              Googleでログイン
            </Button>
            <Button
              onClick={handleSelectAccountClick}
              variant="outline"
              className="w-full"
            >
              アカウントを選んでログイン
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
