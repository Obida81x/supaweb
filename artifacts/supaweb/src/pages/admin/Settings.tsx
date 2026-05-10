import { useState } from "react";
import { useGetSettings, useUpdateSettings, useChangePassword, getGetSettingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Save, KeyRound, BarChart2, CheckCircle, AlertCircle } from "lucide-react";

function Alert({ type, msg }: { type: "ok" | "err"; msg: string }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${type === "ok" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
      {type === "ok" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      {msg}
    </div>
  );
}

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useGetSettings();
  const updateSettings = useUpdateSettings();
  const changePassword = useChangePassword();

  const [statsForm, setStatsForm] = useState({ yearsActive: "", customProjectsCount: "", customClientsCount: "", customServicesCount: "" });
  const [statsMsg, setStatsMsg] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const [pwForm, setPwForm] = useState({ currentPassword: "", newEmail: "", newPassword: "", confirmPassword: "" });
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatsMsg(null);
    const data: Record<string, number | null> = {};
    if (statsForm.yearsActive !== "") data.yearsActive = Number(statsForm.yearsActive);
    if (statsForm.customProjectsCount !== "") data.customProjectsCount = statsForm.customProjectsCount === "0" ? null : Number(statsForm.customProjectsCount);
    if (statsForm.customClientsCount !== "") data.customClientsCount = statsForm.customClientsCount === "0" ? null : Number(statsForm.customClientsCount);
    if (statsForm.customServicesCount !== "") data.customServicesCount = statsForm.customServicesCount === "0" ? null : Number(statsForm.customServicesCount);
    updateSettings.mutate(
      { data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSettingsQueryKey() });
          setStatsMsg({ type: "ok", msg: "Statistics updated successfully." });
          setStatsForm({ yearsActive: "", customProjectsCount: "", customClientsCount: "", customServicesCount: "" });
        },
        onError: () => setStatsMsg({ type: "err", msg: "Failed to update statistics." }),
      }
    );
  };

  const handlePwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (pwForm.newPassword && pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg({ type: "err", msg: "New passwords do not match." });
      return;
    }
    if (pwForm.newPassword && pwForm.newPassword.length < 8) {
      setPwMsg({ type: "err", msg: "New password must be at least 8 characters." });
      return;
    }
    changePassword.mutate(
      { data: { currentPassword: pwForm.currentPassword, newEmail: pwForm.newEmail || undefined, newPassword: pwForm.newPassword || undefined } },
      {
        onSuccess: () => {
          setPwMsg({ type: "ok", msg: "Account updated successfully." });
          setPwForm({ currentPassword: "", newEmail: "", newPassword: "", confirmPassword: "" });
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.error ?? "Failed to update account.";
          setPwMsg({ type: "err", msg });
        },
      }
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-zinc-100">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage your account and site configuration</p>
      </div>

      {/* Stats overrides */}
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
              <div className="text-xs text-zinc-500">Years Active</div>
              <div className="text-xs text-zinc-200 font-medium">{settings?.yearsActive ?? 5}</div>
              <div className="text-xs text-zinc-500">Projects Count Override</div>
              <div className="text-xs text-zinc-200 font-medium">{settings?.customProjectsCount ?? <span className="text-zinc-600">auto (from DB)</span>}</div>
              <div className="text-xs text-zinc-500">Clients Count Override</div>
              <div className="text-xs text-zinc-200 font-medium">{settings?.customClientsCount ?? <span className="text-zinc-600">auto (from DB)</span>}</div>
              <div className="text-xs text-zinc-500">Services Count Override</div>
              <div className="text-xs text-zinc-200 font-medium">{settings?.customServicesCount ?? <span className="text-zinc-600">auto (from DB)</span>}</div>
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
                    <input
                      type="number"
                      min={0}
                      value={(statsForm as any)[field]}
                      onChange={(e) => setStatsForm((f) => ({ ...f, [field]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all"
                    />
                  </div>
                ))}
              </div>
              {statsMsg && <Alert type={statsMsg.type} msg={statsMsg.msg} />}
              <button type="submit" disabled={updateSettings.isPending} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold transition-all">
                <Save className="w-4 h-4" />
                {updateSettings.isPending ? "Saving..." : "Save Statistics"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Change password / email */}
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
            <input
              required
              type="password"
              value={pwForm.currentPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
              placeholder="Your current password"
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <div className="border-t border-white/5 pt-4">
            <p className="text-xs text-zinc-600 mb-3">Leave fields blank to keep unchanged</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">New Email</label>
                <input
                  type="email"
                  value={pwForm.newEmail}
                  onChange={(e) => setPwForm((f) => ({ ...f, newEmail: e.target.value }))}
                  placeholder="new@email.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
              <div />
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={pwForm.newPassword}
                  onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
                  placeholder="Min. 8 characters"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={pwForm.confirmPassword}
                  onChange={(e) => setPwForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                  placeholder="Repeat new password"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-all"
                />
              </div>
            </div>
          </div>
          {pwMsg && <Alert type={pwMsg.type} msg={pwMsg.msg} />}
          <button type="submit" disabled={changePassword.isPending} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold transition-all">
            <Save className="w-4 h-4" />
            {changePassword.isPending ? "Updating..." : "Update Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
