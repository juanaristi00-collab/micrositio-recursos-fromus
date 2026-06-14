import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Landing } from "@/components/Landing";
import { LicitarGuide } from "@/components/LicitarGuide";
import { GUIDES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Paso a paso para licitar con el Estado en SECOP II",
  description:
    "Cómo licitar con el Estado: registro en SECOP II, las 5 modalidades, requisitos habilitantes, subsanabilidad y el error que descalifica ofertas. Por Fromus.",
};

export default function LicitarLandingPage() {
  return (
    <>
      <SiteHeader />
      <Landing guide={GUIDES.licitar}>
        <LicitarGuide />
      </Landing>
    </>
  );
}
