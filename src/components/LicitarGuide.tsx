/**
 * Contenido fuente verificado — Material 2: Paso a paso para licitar
 * (sección 8 del paquete). Ley 80/1993, Ley 1150/2007, conceptos ANCP-CCE.
 */
export function LicitarGuide() {
  return (
    <article className="prose-fromus">
      <h2>Resumen</h2>
      <p>
        Licitar con el Estado se rige por la Ley 80/1993 y la Ley 1150/2007 y se
        tramita en línea en <strong>SECOP II</strong>. Hay{" "}
        <strong>cinco modalidades</strong>: licitación pública, selección
        abreviada (menor cuantía y subasta inversa), concurso de méritos, mínima
        cuantía y contratación directa. El proveedor crea una cuenta gratuita en
        SECOP II, encuentra oportunidades, cumple los{" "}
        <strong>requisitos habilitantes</strong> y presenta la oferta con su{" "}
        <strong>garantía de seriedad</strong> (mínimo{" "}
        <span className="num">10%</span>). <strong>Regla de oro:</strong> lo que
        no da puntaje es subsanable;{" "}
        <strong>
          no entregar la garantía de seriedad con la oferta es insubsanable
        </strong>{" "}
        y causal de rechazo (Ley 1882/2018).
      </p>

      <h2>Qué significa licitar</h2>
      <p>
        Las entidades públicas escogen contratistas por una de las cinco
        modalidades, con selección <strong>objetiva</strong> (la oferta más
        favorable, sin factores subjetivos — art. 5 Ley 1150). Todo es
        electrónico y público en SECOP II.
      </p>

      <h2>Registro en SECOP II como proveedor (paso a paso)</h2>
      <ol>
        <li>Entra a community.secop.gov.co → “Registro”.</li>
        <li>Registra el usuario; zona horaria UTC-5 Bogotá.</li>
        <li>Activa con el enlace que llega al correo (revisa spam).</li>
        <li>
          Crea/solicita acceso a la Entidad: nombre y{" "}
          <strong>NIT sin dígito de verificación</strong>.
        </li>
        <li>Tipo “Proveedor”, área “Privado”, tipo de organización.</li>
        <li>
          Diligencia datos, <strong>correo de notificaciones</strong> (ahí
          llegan TODAS las alertas) y representante legal.
        </li>
        <li>Anexa documentos y finaliza.</li>
      </ol>
      <blockquote>
        La ANCP-CCE aprueba el registro pero <strong>no verifica</strong> los
        datos; no reemplazan los que cada entidad pida. Las compras por Acuerdo
        Marco se hacen en la <strong>Tienda Virtual del Estado (TVEC)</strong>.
      </blockquote>

      <h2>Modalidades y cuantías (art. 2 Ley 1150)</h2>
      <p>
        Menor cuantía según presupuesto anual de la entidad (en SMMLV):
      </p>
      <div className="my-5 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-edge text-left text-beige/50">
              <th className="py-2 pr-4 font-mono font-normal">
                Presupuesto (SMMLV)
              </th>
              <th className="py-2 font-mono font-normal">
                Menor cuantía hasta
              </th>
            </tr>
          </thead>
          <tbody className="text-beige/80">
            {[
              ["≥ 1.200.000", "1.000 SMMLV"],
              ["≥ 850.000 y < 1.200.000", "850 SMMLV"],
              ["≥ 400.000 y < 850.000", "650 SMMLV"],
              ["≥ 120.000 y < 400.000", "450 SMMLV"],
              ["< 120.000", "280 SMMLV"],
            ].map(([presupuesto, cuantia]) => (
              <tr key={presupuesto} className="border-b border-edge/50">
                <td className="num py-2 pr-4">{presupuesto}</td>
                <td className="num py-2 font-semibold text-beige">{cuantia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <strong>
          Mínima cuantía = <span className="num">10%</span> de la menor cuantía
        </strong>{" "}
        de la entidad.
      </p>
      <ul>
        <li>
          <strong>Licitación pública:</strong> regla general, cuando supera la
          menor cuantía. Típica en obra pública.
        </li>
        <li>
          <strong>Selección abreviada:</strong> menor cuantía; o{" "}
          <strong>subasta inversa</strong> para bienes/servicios de
          características técnicas uniformes (se compite bajando precio).
        </li>
        <li>
          <strong>Concurso de méritos:</strong> consultoría e interventoría;
          decide la <strong>calidad/experiencia, no el precio</strong>.
        </li>
        <li>
          <strong>Mínima cuantía:</strong> procedimiento simplificado; se
          perfecciona con la aceptación de la oferta de menor precio.{" "}
          <strong>No exige RUP.</strong>
        </li>
        <li>
          <strong>Contratación directa:</strong> casos taxativos (urgencia,
          interadministrativos, servicios profesionales, arrendamiento, ausencia
          de pluralidad de oferentes); sin límite de cuantía.
        </li>
      </ul>

      <h2>Encontrar oportunidades</h2>
      <p>
        Buscador de SECOP II por código UNSPSC, palabra clave, entidad, ubicación
        y estado. Configura <strong>alertas automáticas</strong>. Revisa el{" "}
        <strong>Plan Anual de Adquisiciones (PAA)</strong> de tus entidades
        objetivo.
      </p>

      <h2>Requisitos habilitantes</h2>
      <p>No otorgan puntaje (art. 5 Ley 1150). Cuatro tipos:</p>
      <ul>
        <li>
          <strong>Jurídicos:</strong> capacidad legal; existencia/representación;
          sin inhabilidades.
        </li>
        <li>
          <strong>Financieros:</strong> vía RUP (liquidez, endeudamiento,
          cobertura).
        </li>
        <li>
          <strong>Organizacionales:</strong> rentabilidad del patrimonio y del
          activo (vía RUP).
        </li>
        <li>
          <strong>Experiencia:</strong> contratos ejecutados clasificados por
          UNSPSC y en SMMLV (vía RUP), más experiencia específica que pida la
          entidad.
        </li>
      </ul>

      <h2>Leer el pliego / documentos tipo</h2>
      <p>
        Los <strong>documentos tipo</strong> de Colombia Compra son{" "}
        <strong>obligatorios</strong> en obra pública de infraestructura de
        transporte (Ley 2022/2020), agua y saneamiento, catastro, y en los de{" "}
        <strong>Infraestructura Social</strong> —que agrupan educación, salud y
        recreación/deporte, y se ampliaron a <strong>vivienda</strong> y obras
        de carácter <strong>institucional</strong>—. Para esos, la entidad{" "}
        <strong>no puede cambiar</strong> las condiciones habilitantes ni los
        factores de escogencia.
      </p>
      <p>
        <strong>Secciones clave:</strong> objeto y alcance; presupuesto oficial;
        cronograma; requisitos habilitantes; factores de evaluación y puntaje;
        garantías; minuta; y anexos/formatos/matrices.
      </p>

      <h2>Armar y presentar la oferta</h2>
      <p>
        Componentes: carta de presentación; documentos habilitantes (RUP
        vigente, certificaciones, RUT); propuesta técnica;{" "}
        <strong>propuesta económica dentro del presupuesto oficial</strong>{" "}
        (superarlo = rechazo); anexos;{" "}
        <strong>garantía de seriedad</strong>. Todo se carga y firma en SECOP II
        antes del cierre. La garantía de seriedad ≥{" "}
        <strong>
          <span className="num">10%</span>
        </strong>{" "}
        del valor, vigente desde la presentación hasta la aprobación de la
        garantía de cumplimiento (art. 7 Ley 1150).
      </p>

      <h2>Subsanabilidad (art. 5 Ley 1150, mod. Ley 1882/2018)</h2>
      <p>
        <strong>Regla:</strong> lo que NO da puntaje es subsanable, por regla
        general hasta el traslado del informe de evaluación. Dos casos
        especiales: en <strong>subasta inversa</strong>, antes de que inicie el
        evento de subasta; en <strong>mínima cuantía</strong> (Decreto
        1860/2021), hasta que finalice ese traslado —que aquí dura apenas{" "}
        <span className="num">1</span> día hábil—.
      </p>
      <p>
        <strong>NO subsanable:</strong> no entregar la garantía de seriedad con
        la oferta (causal de rechazo); acreditar circunstancias ocurridas{" "}
        <strong>después del cierre</strong>; lo que afecta la asignación de
        puntaje.
      </p>
      <p>
        <strong>Matiz:</strong> si la garantía SÍ se presentó pero tiene errores
        (vigencia/valor), esos defectos <strong>sí</strong> se corrigen; lo
        insubsanable es no haberla aportado.
      </p>

      <h2>Cronograma típico (licitación pública)</h2>
      <ol>
        <li>Plan Anual de Adquisiciones + estudios previos.</li>
        <li>
          Aviso de convocatoria + <strong>proyecto de pliego</strong> en SECOP.
        </li>
        <li>Observaciones y respuestas.</li>
        <li>
          Acto de apertura + <strong>pliego definitivo</strong>.
        </li>
        <li>Audiencia de riesgos y aclaraciones.</li>
        <li>Adendas (si las hay).</li>
        <li>Cierre: presentación de ofertas.</li>
        <li>
          Evaluación; informe se publica <strong>5 días hábiles</strong> para
          observaciones/subsanación.
        </li>
        <li>Respuesta a observaciones e informe final.</li>
        <li>
          <strong>Audiencia pública de adjudicación</strong> (resolución
          motivada, irrevocable).
        </li>
        <li>Firma, garantías, registro presupuestal, acta de inicio.</li>
      </ol>
      <blockquote>
        En obra pública, SECOP II usa <strong>dos sobres</strong>: el económico
        permanece cerrado hasta la audiencia de adjudicación. Una licitación
        completa suele tomar varios meses.
      </blockquote>

      <h2>Errores que descalifican</h2>
      <ul>
        <li>
          No adjuntar la garantía de seriedad con la oferta (rechazo
          insubsanable).
        </li>
        <li>Oferta económica que supera el presupuesto oficial.</li>
        <li>
          RUP no vigente o no en firme, o sin los indicadores exigidos al
          cierre.
        </li>
        <li>
          Acreditar experiencia/condiciones ocurridas después del cierre.
        </li>
        <li>No responder los requerimientos de subsanación a tiempo.</li>
        <li>Presentar la oferta fuera de la hora de cierre.</li>
      </ul>
      <blockquote>
        Matiz sobre el RUP: debe estar vigente y <strong>en firme</strong> al
        cierre, pero la exigencia del <strong>código UNSPSC exacto</strong> se
        ha flexibilizado: manuales y documentos tipo recientes permiten que la
        entidad clasifique la experiencia aportada si el objeto del contrato
        previo concuerda con lo solicitado, aunque no figure bajo el código
        idéntico.
      </blockquote>

      <h2>Los 5 puntos más accionables</h2>
      <ol>
        <li>
          <strong>La garantía de seriedad SIEMPRE va CON la oferta.</strong>
        </li>
        <li>
          <strong>Nunca superes el presupuesto oficial.</strong>
        </li>
        <li>
          <strong>Mantén el RUP vigente</strong> con los códigos e indicadores
          exigidos al cierre.
        </li>
        <li>
          <strong>
            Lee primero cronograma y requisitos habilitantes; configura alertas y
            revisa el PAA.
          </strong>
        </li>
        <li>
          <strong>Distingue puntaje vs. habilitante:</strong> lo habilitante se
          subsana; lo que da puntos, no.
        </li>
      </ol>

      <h2>Fuentes</h2>
      <p className="text-xs text-beige/40">
        Consultadas el 14 de junio de 2026.
      </p>
      <ul>
        <li>Modalidades — funcionpublica.gov.co; colombiacompra.gov.co</li>
        <li>
          Cuantías (art. 2 Ley 1150) — funcionpublica.gov.co; Concepto C-222 de
          2026 ANCP-CCE
        </li>
        <li>Registro SECOP II — colombiacompra.gov.co</li>
        <li>
          Subsanabilidad/garantía — Conceptos C-426 de 2024, C-518 de 2025
          ANCP-CCE
        </li>
        <li>Licitación (art. 30 Ley 80) — sintesis.colombiacompra.gov.co</li>
        <li>Documentos tipo — colombiacompra.gov.co</li>
      </ul>
    </article>
  );
}
