"use client";

import { useRouter } from "next/navigation";

export function AdminLogout() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button onClick={logout} className="btn-ghost text-xs">
      Cerrar sesión
    </button>
  );
}
