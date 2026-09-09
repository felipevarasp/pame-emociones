# Experimento: reconocimiento de expresiones emocionales

Actividad breve para la clase **1.5 Introducción al estudio de las emociones**
(Psicología del Aprendizaje, Motivación y Emoción, Universidad de O'Higgins).
Los estudiantes son los participantes: identifican expresiones faciales, y el
curso ve después su propio resultado agregado.

```
experimento-emociones/
├── index.html        el experimento (lo que abren los estudiantes)
├── resultados.html   resultados agregados del curso, en vivo
├── config.js         lo único que hay que editar
├── apps-script.gs    script que guarda las respuestas en tu planilla
├── img/              36 fotografías (FACES, subconjunto de acceso público)
└── README.md
```

---

## Diseño del experimento

| | |
|---|---|
| Tarea | Elección forzada entre seis etiquetas: alegría, tristeza, miedo, ira, asco, neutral |
| Estímulos | 6 modelos (3 grupos de edad × 2 sexos) × 6 expresiones = 36 fotografías |
| Ensayos | 2 de práctica con retroalimentación + 18 experimentales |
| Selección | Por participante se sortean 3 modelos distintos para cada expresión, y el orden se aleatoriza sin más de dos ensayos seguidos de la misma expresión |
| Presentación | Punto de fijación 600 ms → rostro sin límite de tiempo → 250 ms de intervalo |
| Medidas | Acierto y tiempo de reacción desde la aparición del rostro |
| Azar | 1/6 = **16,7 %**, porque hay seis alternativas de respuesta |
| Anonimato | No se pide nombre ni correo; cada sesión lleva un identificador aleatorio |

Las seis etiquetas están siempre en el mismo orden y con el mismo formato
visual: si una alternativa se destacara sobre las otras, el sesgo de respuesta
se confundiría con el reconocimiento.

La expresión neutra cumple aquí el papel de control: no es una emoción básica,
pero permite ver que el acierto alto no se debe simplemente a que cualquier
rostro reciba una etiqueta emocional.

---

## Puesta en marcha

### 1. Publicar el experimento en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `pame-emociones`), público.
2. Sube el contenido de esta carpeta a la raíz del repositorio.
3. En el repositorio: **Settings → Pages → Source: Deploy from a branch →
   `main` / `root`**.
4. En un par de minutos el experimento queda en
   `https://<tu-usuario>.github.io/pame-emociones/`.

### 2. Crear la planilla que recibe las respuestas

1. Crea una planilla nueva en Google Sheets.
2. **Extensiones → Apps Script**. Borra el contenido y pega `apps-script.gs`
   completo. Guarda.
3. **Implementar → Nueva implementación → Aplicación web**, con
   *Ejecutar como: Yo* y *Quién tiene acceso: Cualquier persona*. Autoriza
   cuando lo pida.
4. Copia la URL que termina en `/exec`: esa es tu `endpoint`.
   Ábrela en el navegador para comprobar: debe responder `{"ok":true,...}`.

### 3. Publicar la planilla para la página de resultados

1. En la planilla: **Archivo → Compartir → Publicar en la web**.
2. Elige la hoja `respuestas` y el formato **CSV**. Publica.
3. Copia esa URL: esa es tu `csvUrl`.

> La hoja `respuestas` se crea sola con el primer envío. Si quieres publicarla
> antes, haz una prueba desde el experimento y recién entonces publica.

### 4. Completar `config.js` y volver a subirlo

```js
window.CONFIG = {
  endpoint: "https://script.google.com/macros/s/AKfy.../exec",
  csvUrl:   "https://docs.google.com/spreadsheets/d/e/2PACX.../pub?gid=0&single=true&output=csv",
  curso:    "PAME 2026 - Seccion 1"
};
```

Sin `endpoint`, el experimento igual funciona: al terminar, cada estudiante
descarga un CSV con sus respuestas. Sin `csvUrl`, la página de resultados
muestra datos de ejemplo claramente marcados como tales.

---

## En clases

1. Comparte el link del experimento (o un QR) y dales unos cinco minutos.
2. Cada estudiante ve su propio porcentaje de acierto al terminar.
3. Proyecta `resultados.html`: se actualiza solo cada 20 segundos.

Tres cosas que suelen darse y que sirven para discutir:

- **El acierto global queda muy por encima del 16,7 %.** Es el argumento
  clásico a favor de un conjunto acotado de emociones básicas (Ekman et al.,
  1987, reportan entre 68 % y 98 % de acuerdo).
- **No todas las expresiones se reconocen igual.** Alegría suele ir cerca del
  techo; miedo y asco caen bastante más abajo. Si las seis fueran categorías
  igualmente discretas e innatas, no habría razón para esa diferencia.
- **Las confusiones no son aleatorias.** Miedo tiende a confundirse con
  sorpresa o tristeza, e ira con asco: justamente los pares cuyo estatus de
  emoción básica está más discutido (Panksepp, 2007; Scarpa et al., 2010).

El tiempo de reacción agrega un matiz: las expresiones que se reconocen peor
también se responden más lento, lo que sugiere una decisión más difícil y no
solo una etiqueta equivocada.

---

## Analizar los datos después

La planilla tiene una fila por ensayo, con estas columnas:

`fecha, sesion, curso, ensayo, archivo, emocion_mostrada, respuesta, correcto,
rt_ms, modelo, edad_modelo, sexo_modelo`

En R, partiendo del CSV publicado:

```r
library(tidyverse)
d <- read_csv("URL_DEL_CSV")

# acierto por expresión
d |> group_by(emocion_mostrada) |>
     summarise(n = n(), acierto = mean(correcto), rt = median(rt_ms))

# ¿el acierto global supera el azar?
binom.test(sum(d$correcto), nrow(d), p = 1/6, alternative = "greater")

# matriz de confusión
table(d$emocion_mostrada, d$respuesta) |> prop.table(margin = 1) |> round(2)
```

---

## Estímulos

Ebner, N. C., Riediger, M. y Lindenberger, U. (2010). FACES: A database of
facial expressions in young, middle-aged, and older women and men: Development
and validation. *Behavior Research Methods, 42*(1), 351–362.

Las imágenes provienen del subconjunto de acceso público de FACES y se
redimensionaron a 500 px de ancho para que la página cargue rápido. Se usan con
fines docentes y la fuente se cita en ambas páginas. Antes de dejar el
repositorio público conviene revisar que ese uso esté cubierto por las
condiciones bajo las que descargaste el set.
