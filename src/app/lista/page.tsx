import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ListaTools } from "@/components/ListaTools";

export const metadata: Metadata = {
  title: "La lista — herramientas de IA por tarea (EXCELENTE / BUENA / MALA)",
  description:
    "Las herramientas de IA que de verdad usamos, ordenadas por tarea en tres niveles. Para cada cosa: la que vuela, la que sirve y la que mejor dejás quieta. Por Fromus.",
};

export default function ListaPage() {
  return (
    <>
      <SiteHeader />
      <ListaTools />
    </>
  );
}
