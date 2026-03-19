"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TopMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-2xl font-bold">
          🛍️ OnlineStore
        </Link>
      </div>

      <div className="flex-none gap-4">
        {mounted ? (
          <>
            {status === "unauthenticated" ? (
              <>
                <Link href="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link href="/register" className="btn btn-outline btn-sm">
                  Register
                </Link>
              </>
            ) : status === "authenticated" ? (
              <>
                <span className="text-sm">
                  Welcome, <strong>{session?.user?.name}</strong>
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-error btn-sm "
                >
                  Sign Out
                </button>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
