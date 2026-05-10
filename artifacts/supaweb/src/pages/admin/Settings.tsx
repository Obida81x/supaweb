import { useState } from "react";
import {
  useGetSettings, useUpdateSettings, useChangePassword, getGetSettingsQueryKey,
  useGetAdminSocialLinks, useCreateSocialLink, useUpdateSocialLink, useDeleteSocialLink, getGetAdminSocialLinksQueryKey,
  useGetAdminPaymentMethods, useCreatePaymentMethod, useUpdatePaymentMethod, useDeletePaymentMethod, getGetAdminPaymentMethodsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Save, KeyRound, BarChart2, CheckCircle, AlertCircle,
  Share2, CreditCard, Plus, Trash2, Edit2, X, Check,
} from "lucide-react";

function Alert({ type, msg }: { type: "ok" | "err"; msg: string }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${type === "ok" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
      {type === "ok" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      {msg}
    </div>
  );
}

const ICON_OPTIONS = [
  "Twitter", "Linkedin", "Github", "Instagram", "Facebook", "Mail",
  "TikTok", "WhatsApp", "Youtube", "Telegram", "Globe", "Link",
];

const PAYMENT_TYPES = [
  { value: "bank", label: "Bank Account" },
  { value: "paypal", label: "PayPal" },
  { value: "stripe", label: "Stripe" },
  { value: "wise", label: "Wise (TransferWise)" },
  { value: "western_union", label: "Western Union" },
  { value: "moneygram", label: "MoneyGram" },
  { value: "crypto", label: "Crypto Wallet" },
  { value: "vodafone", label: "Vodafone Cash" },
  { value: "fawry", label: "Fawry" },
  { value: "binance", label: "Binance Pay" },
  { value: "other", label: "Other" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all";

export default function AdminSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useGetSettings();
  const updateSettings = useUpdateSettings();
  const changePassword = useChangePassword();

  const { data: socialLinks = [] } = useGetAdminSocialLinks();
  const createSocialLink = useCreateSocialLink();
  const updateSocialLink = useUpdateSocialLink();
  const deleteSocialLink = useDeleteSocialLink();

  const { data: paymentMethods = [] } = useGetAdminPaymentMethods();
  const createPaymentMethod = useCreatePaymentMethod();
  const updatePaymentMethod = useUpdatePaymentMethod();
  const deletePaymentMethod = useDeletePaymentMethod();

  const [statsForm, setStatsForm] = useState({ yearsActive: "", customProjectsCount: "", customClientsCount: "", customServicesCount: "" });
  const [statsMsg, setStatsMsg] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const [pwForm, setPwForm] = useState({ currentPassword: "", newEmail: "", newPassword: "", confirmPassword: "" });
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const [newLink, setNewLink] = useState({ label: "", icon: "Link", url: "", active: true });
  const [editingLink, setEditingLink] = useState<number | null>(null);
  const [editLinkData, setEditLinkData] = useState({ label: "", icon: "", url: "", active: true });
  const [linkMsg, setLinkMsg] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const [newPM, setNewPM] = useState({ type: "bank", label: "", details: "", instructions: "", icon: "CreditCard", active: true });
  const [editingPM, setEditingPM] = useState<number | null>(null);
  const [editPMData, setEditPMData] = useState({ type: "bank", label: "", details: "", instructions: "", icon: "CreditCard", active: true });
  const [pmMsg, setPmMsg] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatsMsg(null);
    const data: Record<string, number | null> = {};
    if (statsForm.yearsActive !== "") data.yearsActive = Number(statsForm.yearsActive);
    if (statsForm.customProjectsCount !== "") data.customProjectsCount = statsForm.customProjectsCount === "0" ? null : Number(statsForm.customProjectsCount);
    if (statsForm.customClientsCount !== "") data.customClientsCount = statsForm.customClientsCount === "0" ? null : Number(statsForm.customClientsCount);
    if (statsForm.customServicesCount !== "") data.customServicesCount = statsForm.customServicesCount === "0" ? null : Number(statsForm.customServicesCount);
    updateSettings.mutate({ data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetSettingsQueryKey() });
        setStatsMsg({ type: "ok", msg: "Statistics updated." });
        setStatsForm({ yearsActive: "", customProjectsCount: "", customClientsCount: "", customServicesCount: "" });
      },
      onError: () => setStatsMsg({ type: "err", msg: "Failed to update statistics." }),
    });
  };

  const handlePwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (pwForm.newPassword && pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg({ type: "err", msg: "New passwords do not match." }); return;
    }
    if (pwForm.newPassword && pwForm.newPassword.length < 8) {
      setPwMsg({ type: "err", msg: "New password must be at least 8 characters." }); return;
    }
    changePassword.mutate(
      { data: { currentPassword: pwForm.currentPassword, newEmail: pwForm.newEmail || undefined, newPassword: pwForm.newPassword || undefined } },
      {
        onSuccess: () => { setPwMsg({ type: "ok", msg: "Account updated successfully." }); setPwForm({ currentPassword: "", newEmail: "", newPassword: "", confirmPassword: "" }); },
        onError: (err: any) => setPwMsg({ type: "err", msg: err?.response?.data?.error ?? "Failed to update account." }),
      }
    );
  };

  const invalidateLinks = () => queryClient.invalidateQueries({ queryKey: getGetAdminSocialLinksQueryKey() });
  const invalidatePMs = () => queryClient.invalidateQueries({ queryKey: getGetAdminPaymentMethodsQueryKey() });

  const handleAddLink = () => {
    setLinkMsg(null);
    if (!newLink.label || !newLink.url) { setLinkMsg({ type: "err", msg: "Label and URL are required." }); return; }
    createSocialLink.mutate({ data: { label: newLink.label, icon: newLink.icon, url: newLink.url, active: newLink.active, sortOrder: socialLinks.length } }, {
      onSuccess: () => { invalidateLinks(); setNewLink({ label: "", icon: "Link", url: "", active: true }); setLinkMsg({ type: "ok", msg: "Social link added." }); },
      onError: () => setLinkMsg({ type: "err", msg: "Failed to add social link." }),
    });
  };

  const handleSaveLink = (id: number) => {
    updateSocialLink.mutate({ id, data: editLinkData }, {
      onSuccess: () => { invalidateLinks(); setEditingLink(null); },
    });
  };

  const handleDeleteLink = (id: number) => {
    if (!confirm("Delete this social link?")) return;
    deleteSocialLink.mutate({ id }, { onSuccess: invalidateLinks });
  };

  const handleAddPM = () => {
    setPmMsg(null);
    if (!newPM.label || !newPM.type) { setPmMsg({ type: "err", msg: "Label and type are required." }); return; }
    createPaymentMethod.mutate({ data: { type: newPM.type, label: newPM.label, details: newPM.details, instructions: newPM.instructions, icon: newPM.icon, active: newPM.active, sortOrder: paymentMethods.length } }, {
      onSuccess: () => { invalidatePMs(); setNewPM({ type: "bank", label: "", details: "", instructions: "", icon: "CreditCard", active: true }); setPmMsg({ type: "ok", msg: "Payment method added." }); },
      onError: () => setPmMsg({ type: "err", msg: "Failed to add payment method." }),
    });
  };

  const handleSavePM = (id: number) => {
    updatePaymentMethod.mutate({ id, data: editPMData }, {
      onSuccess: () => { invalidatePMs(); setEditingPM(null); },
    });
  };

  const handleDeletePM = (id: number) => {
    if (!confirm("Delete this payment method?")) return;
    deletePaymentMethod.mutate({ id }, { onSuccess: invalidatePMs });
  };

  const startEditLink = (link: (typeof socialLinks)[0]) => {
    setEditingLink(link.id);
    setEditLinkData({ label: link.label, icon: link.icon, url: link.url, active: link.active });
  };

  const startEditPM = (pm: (typeof paymentMethods)[0]) => {
    setEditingPM(pm.id);
    setEditPMData({ type: pm.type, label: pm.label, details: pm.details, instructions: pm.instructions, icon: pm.icon, active: pm.active });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-zinc-100">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage your account, social media, payment methods, and site stats</p>
      </div>

      {/* ── Social Media Links ── */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-zinc-100">Social Media Accounts</h2>
            <p className="text-xs text-zinc-500">Shown in the footer and contact page</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {(socialLinks as any[]).map((link) => (
            <div key={link.id} className="rounded-xl border border-white/8 bg-white/3 p-3">
              {editingLink === link.id ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Label">
                      <input value={editLinkData.label} onChange={e => setEditLinkData(d => ({ ...d, label: e.target.value }))} className={inputCls} />
                    </Field>
                    <Field label="Icon">
                      <select value={editLinkData.icon} onChange={e => setEditLinkData(d => ({ ...d, icon: e.target.value }))} className={inputCls}>
                        {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="URL">
                    <input value={editLinkData.url} onChange={e => setEditLinkData(d => ({ ...d, url: e.target.value }))} className={inputCls} />
                  </Field>
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                      <input type="checkbox" checked={editLinkData.active} onChange={e => setEditLinkData(d => ({ ...d, active: e.target.checked }))} className="accent-violet-500" />
                      Active (visible on site)
                    </label>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingLink(null)} className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all flex items-center gap-1"><X className="w-3 h-3" /> Cancel</button>
                      <button onClick={() => handleSaveLink(link.id)} className="px-3 py-1.5 rounded-lg text-xs bg-violet-600 hover:bg-violet-500 text-white transition-all flex items-center gap-1"><Check className="w-3 h-3" /> Save</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-violet-400 w-20 shrink-0">{link.icon}</span>
                    <span className="text-sm text-zinc-200 font-medium shrink-0">{link.label}</span>
                    <span className="text-xs text-zinc-500 truncate">{link.url}</span>
                    {!link.active && <span className="text-xs px-1.5 py-0.5 rounded-md bg-zinc-700 text-zinc-400 shrink-0">hidden</span>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button onClick={() => startEditLink(link)} className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteLink(link.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {socialLinks.length === 0 && <p className="text-sm text-zinc-600 text-center py-4">No social links yet.</p>}
        </div>

        <div className="border-t border-white/5 pt-5">
          <p className="text-xs font-medium text-zinc-400 mb-3">Add New Social Account</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Field label="Label (e.g. Instagram)">
              <input value={newLink.label} onChange={e => setNewLink(d => ({ ...d, label: e.target.value }))} placeholder="Instagram" className={inputCls} />
            </Field>
            <Field label="Icon">
              <select value={newLink.icon} onChange={e => setNewLink(d => ({ ...d, icon: e.target.value }))} className={inputCls}>
                {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <Field label="URL">
            <input value={newLink.url} onChange={e => setNewLink(d => ({ ...d, url: e.target.value }))} placeholder="https://..." className={inputCls} />
          </Field>
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
              <input type="checkbox" checked={newLink.active} onChange={e => setNewLink(d => ({ ...d, active: e.target.checked }))} className="accent-violet-500" />
              Active
            </label>
            <button onClick={handleAddLink} disabled={createSocialLink.isPending} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold transition-all">
              <Plus className="w-4 h-4" /> Add Link
            </button>
          </div>
          {linkMsg && <div className="mt-3"><Alert type={linkMsg.type} msg={linkMsg.msg} /></div>}
        </div>
      </div>

      {/* ── Payment Methods ── */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-zinc-100">Bank Cards & Electronic Wallets</h2>
            <p className="text-xs text-zinc-500">Shown on the contact page so clients know how to pay you</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {(paymentMethods as any[]).map((pm) => (
            <div key={pm.id} className="rounded-xl border border-white/8 bg-white/3 p-3">
              {editingPM === pm.id ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Type">
                      <select value={editPMData.type} onChange={e => setEditPMData(d => ({ ...d, type: e.target.value }))} className={inputCls}>
                        {PAYMENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </Field>
                    <Field label="Display Name">
                      <input value={editPMData.label} onChange={e => setEditPMData(d => ({ ...d, label: e.target.value }))} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Account Details (IBAN / email / wallet address)">
                    <input value={editPMData.details} onChange={e => setEditPMData(d => ({ ...d, details: e.target.value }))} className={inputCls} />
                  </Field>
                  <Field label="Instructions for client (optional)">
                    <input value={editPMData.instructions} onChange={e => setEditPMData(d => ({ ...d, instructions: e.target.value }))} placeholder="e.g. Include your order ID in the note" className={inputCls} />
                  </Field>
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                      <input type="checkbox" checked={editPMData.active} onChange={e => setEditPMData(d => ({ ...d, active: e.target.checked }))} className="accent-violet-500" />
                      Active (visible to clients)
                    </label>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingPM(null)} className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all flex items-center gap-1"><X className="w-3 h-3" /> Cancel</button>
                      <button onClick={() => handleSavePM(pm.id)} className="px-3 py-1.5 rounded-lg text-xs bg-violet-600 hover:bg-violet-500 text-white transition-all flex items-center gap-1"><Check className="w-3 h-3" /> Save</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-violet-400 w-20 shrink-0 capitalize">{pm.type}</span>
                    <span className="text-sm text-zinc-200 font-medium shrink-0">{pm.label}</span>
                    <span className="text-xs text-zinc-500 truncate">{pm.details}</span>
                    {!pm.active && <span className="text-xs px-1.5 py-0.5 rounded-md bg-zinc-700 text-zinc-400 shrink-0">hidden</span>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button onClick={() => startEditPM(pm)} className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeletePM(pm.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {paymentMethods.length === 0 && <p className="text-sm text-zinc-600 text-center py-4">No payment methods yet.</p>}
        </div>

        <div className="border-t border-white/5 pt-5">
          <p className="text-xs font-medium text-zinc-400 mb-3">Add New Payment Method</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Field label="Type">
              <select value={newPM.type} onChange={e => setNewPM(d => ({ ...d, type: e.target.value }))} className={inputCls}>
                {PAYMENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Display Name">
              <input value={newPM.label} onChange={e => setNewPM(d => ({ ...d, label: e.target.value }))} placeholder="e.g. PayPal Business" className={inputCls} />
            </Field>
          </div>
          <Field label="Account Details (IBAN / email / wallet address)">
            <input value={newPM.details} onChange={e => setNewPM(d => ({ ...d, details: e.target.value }))} placeholder="e.g. supaweb@paypal.com" className={inputCls} />
          </Field>
          <div className="mt-2">
            <Field label="Client Instructions (optional)">
              <input value={newPM.instructions} onChange={e => setNewPM(d => ({ ...d, instructions: e.target.value }))} placeholder="e.g. Include your name and order ID" className={inputCls} />
            </Field>
          </div>
          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
              <input type="checkbox" checked={newPM.active} onChange={e => setNewPM(d => ({ ...d, active: e.target.checked }))} className="accent-violet-500" />
              Active
            </label>
            <button onClick={handleAddPM} disabled={createPaymentMethod.isPending} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold transition-all">
              <Plus className="w-4 h-4" /> Add Method
            </button>
          </div>
          {pmMsg && <div className="mt-3"><Alert type={pmMsg.type} msg={pmMsg.msg} /></div>}
        </div>
      </div>

      {/* ── Site Statistics ── */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-zinc-100">Site Statistics</h2>
            <p className="text-xs text-zinc-500">Override the numbers shown in the homepage stats section</p>
          </div>
        </div>
        {isLoading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-10 glass rounded-xl animate-pulse" />)}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="text-xs text-zinc-500">Years Active</div><div className="text-xs text-zinc-200 font-medium">{settings?.yearsActive ?? 5}</div>
              <div className="text-xs text-zinc-500">Projects Count</div><div className="text-xs text-zinc-200 font-medium">{settings?.customProjectsCount ?? <span className="text-zinc-600">auto</span>}</div>
              <div className="text-xs text-zinc-500">Clients Count</div><div className="text-xs text-zinc-200 font-medium">{settings?.customClientsCount ?? <span className="text-zinc-600">auto</span>}</div>
              <div className="text-xs text-zinc-500">Services Count</div><div className="text-xs text-zinc-200 font-medium">{settings?.customServicesCount ?? <span className="text-zinc-600">auto</span>}</div>
            </div>
            <form onSubmit={handleStatsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Years Active", field: "yearsActive", placeholder: `Current: ${settings?.yearsActive ?? 5}` },
                  { label: "Projects Count (0 = auto)", field: "customProjectsCount", placeholder: "e.g. 50" },
                  { label: "Happy Clients (0 = auto)", field: "customClientsCount", placeholder: "e.g. 40" },
                  { label: "Services Count (0 = auto)", field: "customServicesCount", placeholder: "e.g. 10" },
                ].map(({ label, field, placeholder }) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
                    <input type="number" min={0} value={(statsForm as any)[field]} onChange={(e) => setStatsForm((f) => ({ ...f, [field]: e.target.value }))} placeholder={placeholder} className={inputCls} />
                  </div>
                ))}
              </div>
              {statsMsg && <Alert type={statsMsg.type} msg={statsMsg.msg} />}
              <button type="submit" disabled={updateSettings.isPending} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold transition-all">
                <Save className="w-4 h-4" />{updateSettings.isPending ? "Saving..." : "Save Statistics"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* ── Account Security ── */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <KeyRound className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-zinc-100">Account Security</h2>
            <p className="text-xs text-zinc-500">Change your login email and/or password</p>
          </div>
        </div>
        <form onSubmit={handlePwSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Current Password *</label>
            <input required type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))} placeholder="Your current password" className={inputCls} />
          </div>
          <div className="border-t border-white/5 pt-4">
            <p className="text-xs text-zinc-600 mb-3">Leave blank to keep unchanged</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">New Username / Email</label>
                <input type="email" value={pwForm.newEmail} onChange={(e) => setPwForm((f) => ({ ...f, newEmail: e.target.value }))} placeholder="new@email.com" className={inputCls} />
              </div>
              <div />
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">New Password</label>
                <input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))} placeholder="Min. 8 characters" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirm New Password</label>
                <input type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm((f) => ({ ...f, confirmPassword: e.target.value }))} placeholder="Repeat new password" className={inputCls} />
              </div>
            </div>
          </div>
          {pwMsg && <Alert type={pwMsg.type} msg={pwMsg.msg} />}
          <button type="submit" disabled={changePassword.isPending} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold transition-all">
            <Save className="w-4 h-4" />{changePassword.isPending ? "Updating..." : "Update Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
