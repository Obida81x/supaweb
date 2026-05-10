import { useState } from "react";
import { useAdminListProjects, useCreateProject, useUpdateProject, useDeleteProject, getAdminListProjectsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X, ExternalLink, Github, Check, Eye, EyeOff } from "lucide-react";

type Project = {
  id: number; title: string; description: string; imageUrl: string | null;
  technologies: string[]; category: string; liveUrl: string | null;
  githubUrl: string | null; featured: boolean; published: boolean; createdAt: string;
};

const emptyForm = { title: "", description: "", imageUrl: "", technologies: "", category: "Business Website", liveUrl: "", githubUrl: "", featured: false, published: true };

function ProjectModal({ project, onClose }: { project?: Project; onClose: () => void }) {
  const queryClient = useQueryClient();
  const create = useCreateProject();
  const update = useUpdateProject();
  const [form, setForm] = useState(project ? {
    title: project.title, description: project.description, imageUrl: project.imageUrl ?? "",
    technologies: project.technologies.join(", "), category: project.category,
    liveUrl: project.liveUrl ?? "", githubUrl: project.githubUrl ?? "",
    featured: project.featured, published: project.published,
  } : emptyForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: form.title, description: form.description, imageUrl: form.imageUrl || null,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      category: form.category, liveUrl: form.liveUrl || null, githubUrl: form.githubUrl || null,
      featured: form.featured, published: form.published,
    };
    const opts = {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListProjectsQueryKey() });
        onClose();
      },
    };
    if (project) {
      update.mutate({ id: project.id, data }, opts);
    } else {
      create.mutate({ data }, opts);
    }
  };

  const isPending = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-zinc-100">{project ? "Edit Project" : "New Project"}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Title *", field: "title", placeholder: "Project title", required: true },
            { label: "Category", field: "category", placeholder: "Category" },
            { label: "Technologies", field: "technologies", placeholder: "React, Node.js, PostgreSQL" },
            { label: "Live URL", field: "liveUrl", placeholder: "https://..." },
            { label: "GitHub URL", field: "githubUrl", placeholder: "https://github.com/..." },
            { label: "Image URL", field: "imageUrl", placeholder: "https://..." },
          ].map(({ label, field, placeholder, required }) => (
            <div key={field}>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
              <input
                required={required}
                value={(form as any)[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                placeholder={placeholder}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description *</label>
            <textarea
              required rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Project description..."
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
            />
          </div>
          <div className="flex items-center gap-6">
            {[{ label: "Featured", field: "featured" }, { label: "Published", field: "published" }].map(({ label, field }) => (
              <label key={field} className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, [field]: !(f as any)[field] }))}
                  className={`w-9 h-5 rounded-full transition-colors ${(form as any)[field] ? "bg-violet-600" : "bg-white/10"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white m-0.5 transition-transform ${(form as any)[field] ? "translate-x-4" : "translate-x-0"}`} />
                </div>
                <span className="text-xs text-zinc-400">{label}</span>
              </label>
            ))}
          </div>
          <button type="submit" disabled={isPending} className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm transition-all">
            {isPending ? "Saving..." : project ? "Update Project" : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminProjects() {
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useAdminListProjects();
  const deleteProject = useDeleteProject();
  const [modal, setModal] = useState<{ open: boolean; project?: Project }>({ open: false });

  const handleDelete = (id: number) => {
    if (!confirm("Delete this project?")) return;
    deleteProject.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getAdminListProjectsQueryKey() }),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-zinc-100">Projects</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <button onClick={() => setModal({ open: true })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all glow-sm">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass rounded-xl p-4 animate-pulse h-20" />)}
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center text-zinc-600">No projects yet. Add your first one.</div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-violet-500/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-violet-400">{project.category.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-100 truncate">{project.title}</span>
                  {project.featured && <span className="px-1.5 py-0.5 rounded text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">Featured</span>}
                  {project.published ? (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1"><Eye className="w-3 h-3" />Published</span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 flex items-center gap-1"><EyeOff className="w-3 h-3" />Draft</span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{project.category} &middot; {project.technologies.slice(0, 3).join(", ")}</div>
              </div>
              <div className="flex items-center gap-2">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"><ExternalLink className="w-3.5 h-3.5" /></a>}
                <button onClick={() => setModal({ open: true, project: project as Project })} className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && <ProjectModal project={modal.project} onClose={() => setModal({ open: false })} />}
    </div>
  );
}
