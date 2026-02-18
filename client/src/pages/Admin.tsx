import { type FormEvent, useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const notifyOwnerMutation = trpc.system.notifyOwner.useMutation();

  const isAdmin = user?.role === "admin";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAdmin) {
      toast.error("管理者のみ実行できます");
      return;
    }

    try {
      const result = await notifyOwnerMutation.mutateAsync({
        title: title.trim(),
        content: content.trim(),
      });

      if (result.success) {
        toast.success("通知を送信しました");
        setTitle("");
        setContent("");
      } else {
        toast.error("通知サービスで送信に失敗しました");
      }
    } catch (error) {
      console.error(error);
      toast.error("通知の送信に失敗しました");
    }
  };

  if (loading) {
    return (
      <main className="container py-12">
        <p className="text-muted-foreground">読み込み中...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>管理者ページ</CardTitle>
            <CardDescription>ログインが必要です。</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>ホームに戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>403 Forbidden</CardTitle>
            <CardDescription>このページは管理者専用です。</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>ホームに戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container py-12 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">管理者ページ</h1>
        <Link href="/">
          <Button variant="outline">ホームに戻る</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>管理者情報</CardTitle>
          <CardDescription>現在のログインユーザー</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="font-medium">ID:</span> {user.id}
          </p>
          <p>
            <span className="font-medium">Name:</span> {user.name ?? "-"}
          </p>
          <p>
            <span className="font-medium">OpenID:</span> {user.openId}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user.role}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>オーナー通知送信</CardTitle>
          <CardDescription>
            system.notifyOwner (admin専用) を実行します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notify-title">タイトル</Label>
              <Input
                id="notify-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="例: 緊急メンテナンス"
                required
                maxLength={1200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notify-content">本文</Label>
              <Textarea
                id="notify-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="通知内容を入力してください"
                required
                maxLength={20000}
                rows={8}
              />
            </div>

            <Button type="submit" disabled={notifyOwnerMutation.isPending}>
              {notifyOwnerMutation.isPending ? "送信中..." : "通知を送信"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}


