import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Landing } from "@/components/Landing";
import { RupGuide } from "@/components/RupGuide";
import { GUIDES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guía del RUP — el documento para licitar con el Estado",
  description:
    "Guía completa del RUP: qué es, quién está obligado, los 5 indicadores con sus fórmulas, inscripción, renovación y errores comunes. Gratis, por Fromus.",
};

export default function RupLandingPage() {
  return (
    <>
      <SiteHeader />
      <Landing guide={GUIDES.rup}>
        <RupGuide />
      </Landing>
    </>
  );
}
