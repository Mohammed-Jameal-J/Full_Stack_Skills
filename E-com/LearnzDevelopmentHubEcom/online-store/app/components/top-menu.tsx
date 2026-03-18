"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function TopMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              OnlineStore
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  className={`text-sm font-medium ${
                    pathname === "/login"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`text-sm font-medium ${
                    pathname === "/register"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  Register
                </Link>
              </>
            ) : status === "authenticated" ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {session?.user?.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-gray-600 hover:text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
