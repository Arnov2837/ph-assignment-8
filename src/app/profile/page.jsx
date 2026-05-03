import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Mail, ShieldCheck, Calendar, Edit3, Laptop, Globe, Fingerprint } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user, session: sessionDetails } = session;

  return (
    <section className="min-h-screen bg-[#fafaf9] py-16 px-4 md:px-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 blur-[100px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-gray-50">
                  <img
                    src={user.image || "/avatar.png"}
                    alt={user.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {user.emailVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 border-4 border-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-black text-[#2d1f15] mt-6 leading-tight">{user.name}</h2>
              <p className="text-gray-400 text-sm font-medium mt-1 flex items-center gap-1">
                <Mail size={14} /> {user.email}
              </p>

              <div className="w-full border-t border-dashed border-gray-100 mt-8 pt-8 space-y-4 text-left">
                <div className="flex items-center gap-3 text-gray-500">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Created</p>
                    <span className="text-sm font-bold text-[#2d1f15]">
                      {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/profile/update"
                className="w-full mt-8 py-4 rounded-2xl bg-[#2d1f15] text-white font-bold flex items-center justify-center gap-2 hover:bg-orange-500 transition-all shadow-xl shadow-gray-200 hover:shadow-orange-200 active:scale-95 group"
              >
                <Edit3 size={18} className="group-hover:-rotate-12 transition-transform" />
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
              <h3 className="text-xl font-black text-[#2d1f15] flex items-center gap-2 mb-8 uppercase tracking-tighter">
                <Fingerprint size={20} className="text-orange-500" /> Identity Details
              </h3>

              <div className="grid gap-6">
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Unique User Identifier</p>
                  <p className="font-mono text-sm text-gray-600 break-all leading-relaxed">{user.id}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Session Token</p>
                    <p className="font-mono text-[10px] text-gray-500 break-all">{sessionDetails.token}</p>
                  </div>
                  <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Token Expires</p>
                    <p className="font-bold text-[#2d1f15]">
                      {new Date(sessionDetails.expiresAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2d1f15] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
               <div className="relative z-10">
                  <div className="flex items-center gap-2 text-orange-400 mb-6">
                    <Laptop size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Session Metadata</span>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-2">User Agent</span>
                      <p className="text-xs text-gray-300 leading-relaxed font-medium">{sessionDetails.userAgent}</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">IP Address</span>
                        <span className="font-mono text-sm mt-1">{sessionDetails.ipAddress === "0000:0000:0000:0000:0000:0000:0000:0000" ? "::1 (Local)" : sessionDetails.ipAddress}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block">Last Sync</span>
                        <span className="text-sm font-bold text-orange-400 mt-1 block">
                          {new Date(sessionDetails.updatedAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}