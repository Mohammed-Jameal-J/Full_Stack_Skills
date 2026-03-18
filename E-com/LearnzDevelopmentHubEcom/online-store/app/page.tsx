import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          {/* <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </form> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <div className="h-full flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Welcome, {session.user?.email}!
              </h2>
              <p className="text-gray-600 text-center">
                You have successfully logged in to your dashboard.
              </p>
              <div className="mt-8 space-x-4">
                <Link
                  href="/login"
                  className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Profile
                </Link>
                <Link
                  href="/login"
                  className="inline-block px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
