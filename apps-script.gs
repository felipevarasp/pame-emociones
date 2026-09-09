/**
 * Recibe las respuestas del experimento y las escribe en la hoja "respuestas".
 *
 * Instalación (una sola vez):
 *   1. Crea una planilla nueva en Google Sheets.
 *   2. Extensiones > Apps Script. Borra lo que haya y pega este archivo completo.
 *   3. Implementar > Nueva implementación > tipo "Aplicación web".
 *        Ejecutar como:        Yo
 *        Quién tiene acceso:   Cualquier persona
 *   4. Copia la URL que termina en /exec y pégala en config.js (campo endpoint).
 *   5. En la planilla: Archivo > Compartir > Publicar en la web > hoja
 *      "respuestas", formato CSV. Copia esa URL y pégala en config.js (csvUrl).
 */

var ENCABEZADOS = ["fecha", "sesion", "curso", "ensayo", "archivo",
                   "emocion_mostrada", "respuesta", "correcto", "rt_ms",
                   "modelo", "edad_modelo", "sexo_modelo"];

function hoja_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var h = libro.getSheetByName("respuestas");
  if (!h) {
    h = libro.insertSheet("respuestas");
  }
  if (h.getLastRow() === 0) {
    h.appendRow(ENCABEZADOS);
    h.setFrozenRows(1);
  }
  return h;
}

function doPost(e) {
  var bloqueo = LockService.getScriptLock();
  bloqueo.waitLock(30000);
  try {
    var cuerpo = JSON.parse(e.postData.contents);
    var filas = cuerpo.filas || [];
    if (filas.length) {
      var h = hoja_();
      h.getRange(h.getLastRow() + 1, 1, filas.length, ENCABEZADOS.length).setValues(filas);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ok: true, filas: filas.length}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    bloqueo.releaseLock();
  }
}

/** Permite comprobar en el navegador que la implementación quedó activa. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ok: true, mensaje: "Endpoint activo"}))
    .setMimeType(ContentService.MimeType.JSON);
}
