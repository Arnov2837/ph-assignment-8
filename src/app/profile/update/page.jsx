import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EditProfile from "@/components/Home/EditProfile";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <section className="min-h-screen bg-[#f6f2ea] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-[#2d1f15] mb-6 text-center">
          Update Your Profile
        </h2>

        <EditProfile user={user} />

      </div>
    </section>
  );
}