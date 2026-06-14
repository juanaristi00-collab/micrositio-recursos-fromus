import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  description:
    "Aviso de privacidad y política de tratamiento de datos personales de Fromus S.A.S. conforme a la Ley 1581 de 2012 (Habeas Data).",
};

export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader />
      <div className="container-prose py-12">
        <span className="font-mono text-xs text-orange">
          <span className="text-beige/40">fromus@recursos</span>:~$ cat
          privacidad.txt
        </span>
        <h1 className="mt-4 font-display text-3xl leading-tight text-beige sm:text-4xl">
          Política de tratamiento de datos personales
        </h1>
        <p className="mt-3 text-sm text-beige/50">
          Conforme a la Ley <span className="num">1581</span> de{" "}
          <span className="num">2012</span> y al Decreto{" "}
          <span className="num">1377</span> de <span className="num">2013</span>{" "}
          (Habeas Data).
        </p>

        <article className="prose-fromus mt-10">
          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>Fromus S.A.S.</strong>, sociedad identificada con NIT{" "}
            <span className="num">902074666-4</span>, es la responsable del
            tratamiento de los datos personales recolectados a través de este
            sitio. Canal de contacto para el ejercicio de derechos:{" "}
            <a href="mailto:recursos@fromus.tech">recursos@fromus.tech</a>.
          </p>

          <h2>2. Datos que recolectamos</h2>
          <p>
            A través de los formularios de este micrositio recolectamos
            únicamente tu <strong>correo electrónico</strong>, la guía solicitada
            (RUP o licitar), la marca de tu consentimiento y, como prueba del
            mismo, la dirección IP y la fecha del registro.
          </p>

          <h2>3. Finalidad del tratamiento</h2>
          <p>
            Los datos se usan para: (i) entregarte el material que solicitaste;
            (ii) enviarte comunicaciones de Fromus relacionadas con contratación
            estatal, nuestros productos y contenidos de valor; y (iii) atender
            tus solicitudes. No vendemos ni cedemos tus datos a terceros con
            fines comerciales.
          </p>

          <h2>4. Consentimiento</h2>
          <p>
            El tratamiento se realiza con tu <strong>autorización previa,
            expresa e informada</strong>, que otorgas al marcar la casilla de
            consentimiento (no premarcada) en el formulario. Puedes revocarla en
            cualquier momento.
          </p>

          <h2>5. Derechos del titular</h2>
          <p>Como titular de los datos tienes derecho a:</p>
          <ul>
            <li>
              <strong>Conocer</strong> los datos que tenemos sobre ti y cómo los
              tratamos.
            </li>
            <li>
              <strong>Actualizar y rectificar</strong> datos inexactos,
              incompletos o desactualizados.
            </li>
            <li>
              <strong>Suprimir</strong> tus datos cuando proceda y{" "}
              <strong>revocar</strong> la autorización otorgada.
            </li>
            <li>
              Solicitar <strong>prueba de la autorización</strong> otorgada.
            </li>
            <li>
              Presentar quejas ante la{" "}
              <strong>Superintendencia de Industria y Comercio (SIC)</strong> por
              infracciones a la ley.
            </li>
          </ul>

          <h2>6. Mecanismo para darse de baja</h2>
          <p>
            Cada correo que enviamos incluye un enlace de{" "}
            <strong>“Darse de baja”</strong>. Al usarlo, dejarás de recibir
            comunicaciones de forma inmediata. También puedes escribirnos a{" "}
            <a href="mailto:recursos@fromus.tech">recursos@fromus.tech</a> para
            ejercer cualquiera de tus derechos; atenderemos tu solicitud en los
            términos de ley.
          </p>

          <h2>7. Vigencia</h2>
          <p>
            Tus datos se conservarán mientras exista una relación con Fromus o
            mientras no solicites su supresión. Esta política puede actualizarse;
            la versión vigente es la publicada en este sitio.
          </p>
        </article>
      </div>
    </>
  );
}
