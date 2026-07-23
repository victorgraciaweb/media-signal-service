# CLAUDE.md — Media Signal Service (Contexto de la Prueba Técnica)

Este archivo es contexto permanente para toda conversación de desarrollo en este repositorio. Su objetivo es mantener las decisiones alineadas con el enunciado de la prueba (`Senior-Fullstack-Home-Assignment.pdf`), no definir arquitectura ni implementación. Contiene únicamente información derivada de dicho enunciado — sin requisitos inventados ni decisiones técnicas predeterminadas.

Nota: el código, la documentación, los commits y el README del proyecto se redactarán en inglés (así lo exige el enunciado). Este archivo, al ser contexto interno de trabajo y no un entregable, está en español.

---

## Project Overview (Visión general del proyecto)

Construir un pequeño servicio fullstack que ingiere artículos de noticias, los enriquece con IA, y permite a los usuarios buscar y explorar los datos. El proyecto refleja retos reales de media intelligence: parsing de queries booleanas, enriquecimiento mediante LLM, rendimiento SQL, y manejo responsable de contenido no confiable.

Es una **prueba técnica para el puesto de Senior Fullstack Engineer en Carma**, evaluada por el criterio y los tradeoffs — no por la completitud, el pulido ni la escala.

---

## Project Objectives (Objetivos del proyecto)

- Cargar y persistir los 20 artículos de `sample_articles.json`.
- Enriquecer cada artículo con resumen, sentimiento y topic tags generados por IA.
- Permitir búsqueda de artículos mediante sintaxis booleana.
- Proveer una vista agregada de conteo de artículos a lo largo del tiempo, filtrable por al menos una dimensión.
- Demostrar ingeniería consciente de seguridad y de coste en todo momento.

---

## Functional Requirements (Requisitos funcionales)

**Capa de datos**
- Cargar y persistir los 20 artículos de muestra (headline, body, source, date, language).
- Endpoint de listado paginado que evite los problemas de rendimiento de la paginación por `OFFSET` profundo.
- Endpoint de agregación: conteo de artículos agrupado por mes (o semana) para un conjunto de filtros dado.
- Filtrado eficiente por rango de fechas, fuente e idioma.

**Búsqueda booleana**
- Operadores: `AND`, `OR`, `AND NOT` (palabras clave sensibles a mayúsculas — `and`/`or` en minúscula son términos de búsqueda literales, no operadores).
- Paréntesis anidados, p. ej. `(a AND (b OR c))`.
- Coincidencia de frases con comillas dobles, p. ej. `"media intelligence"`.
- Comodín con `*`, p. ej. `renew*` coincide con "renewable", "renewables".
- El enfoque de implementación (parser propio, PostgreSQL FTS, librería, o combinación) es totalmente libre — debe justificarse con sus tradeoffs en el README.

**Enriquecimiento LLM** (por artículo)
- Resumen de 1–2 frases.
- Clasificación de sentimiento: positive / negative / neutral / mixed.
- 1–3 topic tags.

**Superficie fullstack**
- Página de búsqueda: input de texto para queries booleanas, resultados mostrando resumen, badge de sentimiento y topic tags.
- Vista agregada: gráfico o tabla de conteo de artículos en el tiempo, filtrable por al menos una dimensión (sentiment, source o topic).
- La UI solo necesita ser funcional y clara — no pulida.

---

## Non-Functional Requirements (Requisitos no funcionales)

- Rendimiento razonable sobre un dataset pequeño (20 artículos), pero diseñado con consciencia de escala (las decisiones de esquema/indexación deben razonar sobre volúmenes mayores, p. ej. el escenario de 50.000 artículos/día usado para la proyección de coste).
- No se requiere autenticación, HTTPS ni infraestructura de despliegue.
- El setup debe ser simple: idealmente `docker-compose up` o unos pocos comandos de shell documentados.

---

## Technical Constraints (Restricciones técnicas)

- Stack preferido: Node / React / PostgreSQL — pero es aceptable cualquier stack en el que se sea más productivo, siempre que las decisiones se justifiquen en el README.
- Sin requisito de implementar autenticación, HTTPS o infraestructura de despliegue (explícitamente fuera de alcance).
- El proveedor de LLM es libre (OpenAI, Anthropic, modelos locales, etc.), o puede mockearse con outputs de ejemplo realistas más documentación de cómo sería la integración real.

---

## Deliverables (Entregables)

1. **Código funcional** — ejecutable vía `docker-compose up` o unos pocos comandos de shell documentados.
2. **README** con las siguientes secciones obligatorias: Plan, Architecture & Decisions, LLM Cost Analysis, Security & Responsibility, Reflection.
3. **Transcript completo de LLM** (o historial de chat exportado) de las interacciones con herramientas de IA durante la prueba.

---

## Assessment Priorities (Prioridades de evaluación)

Ponderación de evaluación (según el enunciado):

| Criterio | Peso |
|---|---|
| LLM selection & cost reasoning | 20% |
| Correctness & functionality | 20% |
| Plan quality | 15% |
| SQL & performance | 15% |
| Security & responsibility | 15% |
| Transcript & reflection | 15% |

Implicaciones:
- Las decisiones, tradeoffs y el razonamiento importan más que la completitud bruta o el pulido visual.
- Un stub bien razonado ("esto lo dejé a medias y así lo terminaría") puntúa mejor que una implementación apresurada y frágil.
- El esfuerzo estimado es de ~7–9 horas focalizadas con asistencia de IA; no sobre-invertir en ninguna sección más allá de su asignación de tiempo aproximada (Data Layer & SQL ~30 min, Boolean Search ~90–120 min, LLM Enrichment ~60–90 min, Fullstack Surface ~90–120 min, Responsible Coding ~45–60 min).

---

## Security Requirements (Requisitos de seguridad)

Deben abordarse y documentarse (implementación fuertemente recomendada; para prompt injection, al menos una mitigación):

- **Prevención de SQL injection**: todas las queries usan inputs parametrizados o identificadores en whitelist — sin interpolación de strings de input de usuario en SQL.
- **Prevención de XSS**: los datos de muestra contienen deliberadamente intentos de inyección HTML/script (artículos 6 y 18) en headlines/bodies; la UI debe renderizarlos de forma segura.
- **Consciencia de prompt injection**: el texto de los artículos es contenido no confiable que se envía a un LLM; debe documentarse al menos una mitigación, e idealmente implementarse.
- **Guardrails de coste/rate**: al menos un mecanismo para prevenir costes descontrolados de LLM (p. ej. tope de tokens por request, límite de presupuesto diario, detección de duplicados, caching, rate limiting, input stripping).

---

## Performance Expectations (Expectativas de rendimiento)

- El esquema debe soportar filtrado eficiente por rango de fechas, fuente e idioma.
- La paginación debe evitar los problemas de rendimiento del `OFFSET` profundo (p. ej. paginación por keyset/cursor).
- Evitar problemas SQL comunes: queries N+1, OFFSET profundo, `SELECT *`.
- Deben incluirse índices apropiados, con las decisiones de indexación brevemente explicadas en el README.

---

## AI Usage Expectations (Expectativas sobre el uso de IA)

- El uso de herramientas de IA es esperado y fomentado en esta prueba — usarlas es parte de lo que se evalúa, no un atajo que se penaliza.
- Lo que se evalúa es el criterio: cómo se plantean los problemas a la IA, si el output de la IA se evalúa y refina críticamente, y cómo se manejan los casos en que la IA se equivoca o produce algo incompleto.
- El transcript completo de las interacciones con IA debe incluirse en la entrega — el razonamiento durante este proyecto debe mantenerse claro y bien documentado, ya que será revisado.
- Aceptar el output de la IA de forma pasiva o acrítica es una señal negativa; verificarlo y corregirlo activamente es una señal positiva.

---

## Documentation Requirements (Requisitos de documentación)

El README debe incluir, como mínimo, estas secciones:

| Sección | Contenido |
|---|---|
| Plan | Desglose del problema, qué se abordó primero y por qué, qué se recortaría bajo presión de tiempo. |
| Architecture & Decisions | Elección de stack, diseño de esquema, enfoque de búsqueda booleana, selección de modelo(s) LLM con tradeoffs de coste/calidad/latencia. |
| LLM Cost Analysis | Modelo(s) elegido(s), desglose de coste por artículo, coste diario proyectado a 50.000 artículos/día, guardrails implementados. |
| Security & Responsibility | Cómo se manejó SQL injection, XSS, prompt injection y los controles de coste. |
| Reflection | Dónde ayudó más la IA, dónde indujo a error o produjo algo que hubo que corregir, qué se haría diferente con más tiempo. |

Las decisiones de indexación (Data Layer) y el enfoque/tradeoffs de la búsqueda booleana también deben explicarse en el README, según lo indicado en las secciones correspondientes del enunciado.

---

## Out of Scope (Fuera de alcance)

- Autenticación.
- HTTPS.
- Infraestructura de despliegue.
- Diseño de UI pixel-perfect o pulido.
- Completitud más allá de lo necesario para demostrar las decisiones requeridas (el sobre-diseño está explícitamente desaconsejado).

---

## Coding Principles (Principios de desarrollo)

- **No asumir arquitectura que todavía no ha sido decidida.** Plantear el punto de decisión en vez de elegir en silencio.
- **No introducir patrones, librerías o frameworks adicionales** sin una razón directamente ligada a un requisito del enunciado.
- **Priorizar siempre la solución más simple que cumpla correctamente los requisitos.**
- **Evitar la sobreingeniería ("don't gold-plate")** — el enunciado indica explícitamente que las decisiones y tradeoffs se evalúan por encima de la completitud o la complejidad.
- **Cuando existan varias alternativas válidas, exponer pros y contras antes de asumir una implementación.**
- **Cualquier decisión que afecte a rendimiento, seguridad, coste de LLM o mantenibilidad debe justificarse.**
- **No implementar funcionalidad que no esté explícitamente requerida por el enunciado.**
- **Considerar siempre las cuatro dimensiones de seguridad**: SQL injection, XSS, prompt injection y control de coste de LLM — en cada cambio relevante, no solo una vez.
- **El README forma parte de la evaluación.** Toda decisión importante debe poder rastrearse y justificarse allí.
- **El transcript completo de la conversación con IA se entregará junto con el proyecto.** Favorecer respuestas claras, bien razonadas y bien documentadas durante esta prueba.

---

## Definition of Done (Definición de terminado)

Una pieza de trabajo en este proyecto se considera terminada cuando:

- Satisface un requisito explícito del enunciado — no uno asumido o extrapolado.
- Las consideraciones de seguridad relevantes (SQL injection, XSS, prompt injection, control de coste) se han abordado o conscientemente pospuesto con razonamiento documentado.
- Toda decisión no trivial (esquema, enfoque de búsqueda, elección de modelo, indexación) tiene una justificación correspondiente que pueda incluirse en el README.
- Evita complejidad, dependencias o abstracciones innecesarias más allá de lo que el requisito necesita.
- Si se ha dejado deliberadamente a medias o simplificado por limitaciones de tiempo, ese hecho y su razonamiento están documentados, no ocultos.

---

## Important Notes (Notas importantes)

- Este documento no define ni implica ninguna arquitectura, esquema, stack tecnológico o elección de librería. Esas siguen siendo decisiones abiertas a tomar (y justificar) durante el desarrollo.
- Ante la duda entre dos enfoques válidos, pausar y exponer el tradeoff en vez de elegir uno en silencio.
- El time-boxing importa: el enunciado da estimaciones de tiempo aproximadas por sección; tratarlas como señal de la profundidad esperada en cada área.
- Los datos de muestra (`sample_articles.json`) contienen casos límite deliberados: inyección HTML/script (artículos 6, 18), idiomas no ingleses — árabe y chino (artículos 8, 9), y un headline vacío (artículo 17). Son intencionados y deben manejarse, no tratarse como errores de datos.
