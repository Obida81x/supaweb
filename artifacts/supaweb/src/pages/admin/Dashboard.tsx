import { useGetAdminStats, useListMessages } from "@workspace/api-client-react";
import { LayoutDashboard, FolderOpen, Settings, MessageSquare, Star, Rocket, Users, Mail, Eye, Zap } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats();
  const { data: messages } = useListMessages();

  const statCards = [
    { label: "Total Projects", value: stats?.projectsCount ?? 0, icon: FolderOpen, color: "violet" },
    { label: "Services", value: stats?.servicesCount ?? 0, icon: Settings, color: "indigo" },
    { label: "Testimonials", value: stats?.testimonialsCount ?? 0, icon: Star, color: "amber" },
    { label: "Unread Messages", value: stats?.unreadMessagesCount ?? 0, icon: Mail, color: "rose" },
    { label: "Published Projects", value: stats?.publishedProjectsCount ?? 0, icon: Eye, color: "emerald" },
    { label: "Featured Projects", value: stats?.featuredProjectsCount ?? 0, icon: Rocket, color: "sky" },
  ];

  const colorMap: Record<string, string> = {
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    sky: "bg-sky-500/10 border-sky-500/20 text-sky-400",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-zinc-100">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Overview of your SupaWeb site</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-xl p-5 animate-pulse">
              <div className="h-8 w-8 bg-white/5 rounded-lg mb-3" />
              <div className="h-7 bg-white/5 rounded mb-2 w-12" />
              <div className="h-4 bg-white/5 rounded w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="glass rounded-xl p-5 hover:border-violet-500/20 transition-colors">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 ${colorMap[card.color]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-zinc-100 mb-1">{card.value}</div>
                <div className="text-xs text-zinc-500">{card.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recent Messages */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-zinc-100">Recent Messages</h2>
          <Link href="/admin/messages" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View all</Link>
        </div>
        {!messages || messages.length === 0 ? (
          <div className="text-center py-8 text-zinc-600 text-sm">No messages yet</div>
        ) : (
          <div className="space-y-3">
            {messages.slice(0, 5).map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 text-violet-400 text-xs font-bold">
                  {msg.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200">{msg.name}</span>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />}
                  </div>
                  <div className="text-xs text-zinc-500">{msg.email}</div>
                  <p className="text-xs text-zinc-400 mt-1 truncate">{msg.message}</p>
                </div>
                <div className="text-xs text-zinc-600 shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
