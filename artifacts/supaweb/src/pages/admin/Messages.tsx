import { useListMessages, useDeleteMessage, getListMessagesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Mail, MailOpen } from "lucide-react";

export default function AdminMessages() {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useListMessages();
  const deleteMessage = useDeleteMessage();

  const handleDelete = (id: number) => {
    if (!confirm("Delete this message?")) return;
    deleteMessage.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey() }),
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-zinc-100">Messages</h1>
        <p className="text-zinc-500 text-sm mt-1">Contact form submissions</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass rounded-xl p-5 animate-pulse h-28" />)}
        </div>
      ) : !messages || messages.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center text-zinc-600">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`glass rounded-xl p-5 hover:border-violet-500/20 transition-colors ${!msg.read ? "border-violet-500/20" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-zinc-100">{msg.name}</span>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />}
                    </div>
                    <div className="text-xs text-zinc-500 mb-1">{msg.email}</div>
                    {msg.subject && <div className="text-xs font-medium text-violet-400 mb-2">{msg.subject}</div>}
                    <p className="text-sm text-zinc-400 leading-relaxed">{msg.message}</p>
                    <div className="mt-3 text-xs text-zinc-600">{new Date(msg.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a href={`mailto:${msg.email}`} className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <button onClick={() => handleDelete(msg.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
