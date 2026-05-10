import { useState } from "react";
import { useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial, getListTestimonialsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";

type Testimonial = { id: number; name: string; role: string; company: string; content: string; avatarUrl: string | null; rating: number; createdAt: string };

const emptyForm = { name: "", role: "", company: "", content: "", avatarUrl: "", rating: 5 };

function TestimonialModal({ testimonial, onClose }: { testimonial?: Testimonial; onClose: () => void }) {
  const queryClient = useQueryClient();
  const create = useCreateTestimonial();
  const update = useUpdateTestimonial();
  const [form, setForm] = useState(testimonial ? {
    name: testimonial.name, role: testimonial.role, company: testimonial.company,
    content: testimonial.content, avatarUrl: testimonial.avatarUrl ?? "", rating: testimonial.rating,
  } : emptyForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name: form.name, role: form.role, company: form.company, content: form.content, avatarUrl: form.avatarUrl || null, rating: Number(form.rating) };
    const opts = { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() }); onClose(); } };
    testimonial ? update.mutate({ id: testimonial.id, data }, opts) : create.mutate({ data }, opts);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative glass rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-zinc-100">{testimonial ? "Edit Testimonial" : "New Testimonial"}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Name *", field: "name", placeholder: "Client name", required: true },
            { label: "Role *", field: "role", placeholder: "CEO", required: true },
            { label: "Company *", field: "company", placeholder: "Company name", required: true },
            { label: "Avatar URL", field: "avatarUrl", placeholder: "https://..." },
            { label: "Rating", field: "rating", placeholder: "5", type: "number" },
          ].map(({ label, field, placeholder, required, type }) => (
            <div key={field}>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
              <input required={required} type={type ?? "text"} value={(form as any)[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} placeholder={placeholder} min={type === "number" ? 1 : undefined} max={type === "number" ? 5 : undefined} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Testimonial *</label>
            <textarea required rows={4} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Client testimonial..." className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all resize-none" />
          </div>
          <button type="submit" disabled={create.isPending || update.isPending} className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm transition-all">
            {create.isPending || update.isPending ? "Saving..." : testimonial ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const { data: testimonials, isLoading } = useListTestimonials();
  const deleteTestimonial = useDeleteTestimonial();
  const [modal, setModal] = useState<{ open: boolean; testimonial?: Testimonial }>({ open: false });

  const handleDelete = (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    deleteTestimonial.mutate({ id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() }) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-zinc-100">Testimonials</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage client testimonials</p>
        </div>
        <button onClick={() => setModal({ open: true })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all glow-sm">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass rounded-xl p-4 animate-pulse h-24" />)}</div>
      ) : !testimonials || testimonials.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center text-zinc-600">No testimonials yet.</div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="glass rounded-xl p-5 hover:border-violet-500/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-zinc-100">{t.name}</span>
                    <span className="text-xs text-zinc-500">{t.role}, {t.company}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setModal({ open: true, testimonial: t as Testimonial })} className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {modal.open && <TestimonialModal testimonial={modal.testimonial} onClose={() => setModal({ open: false })} />}
    </div>
  );
}
