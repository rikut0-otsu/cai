import { getLoginUrl, getOwnerContactHref } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowUpRight, CircleHelp, ShieldCheck } from "lucide-react";

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const ownerContactHref = getOwnerContactHref();

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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-14 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="container flex min-h-screen flex-col items-center justify-center py-10">
        <Card className="w-full max-w-xl border-white/60 bg-white/70 shadow-2xl backdrop-blur-md">
          <CardHeader className="space-y-5 text-center">
            <div className="mx-auto flex w-full max-w-sm items-center justify-center rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-200">
              <img
                src="/logo.png"
                alt="Service logo"
                className="h-auto w-full object-contain"
              />
            </div>
            <CardDescription className="text-sm leading-6">
              このサービスはログインしたユーザーのみ利用できます。
              <br />
              Googleアカウントでサインインして開始してください。
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              onClick={handleLoginClick}
              className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            >
              Googleでログイン
            </Button>
            <Button
              onClick={handleSelectAccountClick}
              variant="outline"
              className="h-11 w-full rounded-xl border-slate-300 bg-white/60"
            >
              アカウントを選んでログイン
            </Button>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white/60 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <CircleHelp className="h-4 w-4" />
                ログインできない場合
              </div>

              {ownerContactHref ? (
                <a
                  href={ownerContactHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-700 underline underline-offset-4"
                >
                  オーナーへ問い合わせる
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">
                  問い合わせ先は管理者にご確認ください。
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Google OAuthを利用してログインします
            </div>
          </CardContent>
        </Card>

        <footer className="mt-6 text-center text-xs text-slate-500">
          Created by Rikuto Otsu
        </footer>
      </div>
    </main>
  );
}
