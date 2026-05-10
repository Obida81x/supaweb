import { useState } from "react";
import { useListServices, useCreateService, useUpdateService, useDeleteService, getListServicesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type Service = { id: number; title: string; description: string; icon: string; features: string[]; sortOrder: number };

const emptyForm = { title: "", description: "", icon: "Globe", features: "", sortOrder: 0 };

function ServiceModal({ service, onClose }: { service?: Service; onClose: () => void }) {
  const queryClient = useQueryClient();
  const create = useCreateService();
  const update = useUpdateService();
  const [form, setForm] = useState(service ? {
    title: service.title, description: service.description, icon: service.icon,
    features: service.features.join(", "), sortOrder: service.sortOrder,
  } : emptyForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: form.title, description: form.description, icon: form.icon,
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      sortOrder: Number(form.sortOrder),
    };
    const opts = { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListServicesQueryKey() }); onClose(); } };
    service ? update.mutate({ id: service.id, data }, opts) : create.mutate({ data }, opts);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative glass rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-zinc-100">{service ? "Edit Service" : "New Service"}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Title *", field: "title", placeholder: "Service title", required: true },
            { label: "Icon Name", field: "icon", placeholder: "Globe, Code2, etc." },
            { label: "Sort Order", field: "sortOrder", placeholder: "0", type: "number" },
          ].map(({ label, field, placeholder, required, type }) => (
            <div key={field}>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
              <input
                required={required}
                type={type ?? "text"}
                value={(form as any)[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                placeholder={placeholder}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all resize-none" placeholder="Service description..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Features (comma-separated)</label>
            <input value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))} placeholder="Feature 1, Feature 2, Feature 3" className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <button type="submit" disabled={create.isPending || update.isPending} className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm transition-all">
            {create.isPending || update.isPending ? "Saving..." : service ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminServices() {
  const queryClient = useQueryClient();
  const { data: services, isLoading } = useListServices();
  const deleteService = useDeleteService();
  const [modal, setModal] = useState<{ open: boolean; service?: Service }>({ open: false });

  const handleDelete = (id: number) => {
    if (!confirm("Delete this service?")) return;
    deleteService.mutate({ id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListServicesQueryKey() }) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-zinc-100">Services</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage the services you offer</p>
        </div>
        <button onClick={() => setModal({ open: true })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all glow-sm">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass rounded-xl p-4 animate-pulse h-16" />)}</div>
      ) : (
        <div className="space-y-3">
          {services?.map((service) => (
            <div key={service.id} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-violet-500/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-100">{service.title}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{service.icon} &middot; Order: {service.sortOrder} &middot; {(service.features ?? []).length} features</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setModal({ open: true, service: service as Service })} className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(service.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modal.open && <ServiceModal service={modal.service} onClose={() => setModal({ open: false })} />}
    </div>
  );
}
