// ---------------------------------------------------------------------------
//  Configuración del experimento. Edita solo este archivo.
// ---------------------------------------------------------------------------
window.CONFIG = {

  // 1) URL de la aplicación web de Apps Script (termina en /exec).
  //    Mientras esté vacía, el experimento funciona igual pero no envía datos:
  //    cada estudiante descarga su archivo CSV al terminar.
  endpoint: "https://script.google.com/macros/s/AKfycbyyLuvf-PCPvhbsbX5xkKRkItJzZvg8CpcrLcEUgtG3AA_RCuApGFVN7U3GKvMOLEnz/exec",

  // 2) URL del CSV publicado de la planilla, para la página de resultados.
  //    En la planilla: Archivo > Compartir > Publicar en la web > CSV.
  csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8O3YDyaLGz_Lq0V525drBEnAQtmYb2EwMi9QHaEZOKv8XwI4DyAjVYeGaTuN6guOqDHo1iJrtY5Rp/pub?gid=1970666272&single=true&output=csv",

  // 3) Etiqueta que se guarda con cada respuesta (útil si aplicas el
  //    experimento en más de una sección o en más de un año).
  curso: "PAME 2026 - Seccion 2"
};
