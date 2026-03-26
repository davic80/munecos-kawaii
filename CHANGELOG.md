# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-03-26

### Added
- **Diseño responsive mobile-first.** Rediseño completo de la interfaz para funcionar en móviles y tablets además de escritorio. Tres breakpoints: móvil (<768px), tablet (768-1024px), escritorio (>1024px)
- **Bottom sheet deslizable (móvil).** Panel de personalización como hoja inferior tipo Google Maps con drag handle, snap a 3 posiciones (cerrado/peek/abierto) y overlay oscuro. Se abre con el botón hamburguesa ☰ en el header
- **Barra de slots fija (móvil).** Los 4 slots de muñecos aparecen como barra fija en la parte inferior de la pantalla, siempre visible para cambiar rápidamente entre muñecos
- **Menú de acciones ⋮ (móvil).** Botón de tres puntos verticales en el header que despliega un menú con Guardar PNG, Escena PNG y Compartir
- **Sección "Configuración" en bottom sheet.** Los controles del panel derecho (nombre, color de fondo, selector de escena, añadir/quitar de escena, resetear) se integran como sección acordeón dentro del bottom sheet en móvil
- **Touch targets ampliados.** Todos los elementos interactivos cumplen el mínimo de 48px en móvil (44px en tablet): sliders más gruesos (24px con thumb de 24px), swatches de piel 36px, chips de mascota más grandes, botones más altos
- **Soporte viewport-fit=cover.** Safe area para dispositivos con notch (padding inferior respeta `env(safe-area-inset-bottom)`)
- **Supresión de tap highlight.** `-webkit-tap-highlight-color: transparent` en dispositivos táctiles
- **Handler touchcancel.** Limpieza automática de estados de drag cuando el sistema cancela un toque (llamada entrante, notificación, etc.)
- **Handler de redimensionado.** Detección automática de cambio entre móvil/tablet/escritorio con `matchMedia` listeners para reconstruir la interfaz al girar el dispositivo o redimensionar la ventana

### Changed
- **Breakpoints actualizados.** Reemplazo de los 3 breakpoints antiguos (480px/520px/700px) por el sistema de 3 tiers (móvil/tablet/escritorio)
- **Panel izquierdo redirigido en móvil.** `buildPanel()` inyecta el contenido en `#bottom-sheet-content` en lugar de `#left-panel` cuando la pantalla es <768px
- **`syncRightPanel()` dual.** Sincroniza tanto los controles del panel derecho (escritorio) como los controles de la sección Configuración (móvil)
- **Header compacto en móvil.** Altura reducida a 48px, título más pequeño, botones de acción reemplazados por hamburguesa + menú ⋮

### Removed
- **Breakpoint 480px** que ocultaba el footer (ahora el footer se oculta como parte del breakpoint móvil <768px)
- **Breakpoint 520px** que encogía el panel y los muñecos (ya no necesario con el diseño mobile-first)
- **Breakpoint 700px** que ocultaba el panel derecho sin alternativa (ahora los controles están en el bottom sheet)

---

## [1.12.1] - 2026-03-25

### Added
- **Sonidos de varitas.** Cada una de las 9 varitas tiene un sonido único sintetizado (Web Audio API, cero archivos) que se reproduce al hacer clic/tap sobre la varita en la escena:
  - **Elder:** zumbido profundo y antiguo con detuning sutil
  - **Holly:** ráfaga brillante de destellos agudos
  - **Elm:** campana cálida con armónicos suaves
  - **Willow:** whoosh etéreo (ruido filtrado con barrido)
  - **Vine:** cascada pentatónica de campanitas naturales
  - **Phoenix:** llamarada ascendente con crepitar de fuego
  - **Unicorn:** glissando resplandeciente con osciladores desintonizados
  - **Oak:** golpe resonante de madera con transiente de clic
  - **Crystal:** campana de cristal aguda con largo sustain

---

## [1.12.0] - 2026-03-25

### Added
- **Mascotas (rata, sapo, gato).** Nuevo sistema de mascotas con 3 animales kawaii en SVG. Cada mascota se puede equipar en 4 posiciones: suelo, mano derecha, mano izquierda y correa. Incluye trajes de las 4 casas de Hogwarts (Gryffindor, Slytherin, Ravenclaw, Hufflepuff) con rayas en los colores de la casa. Control de tamaño con slider -50%..+50%
- **Conflictos de mano inteligentes.** La mascota en "mano derecha" oculta la varita automáticamente; en "mano izquierda" o "correa" oculta el objeto de mano izquierda (datos sin tocar, solo render)
- **Correa con línea curva.** La posición "correa" dibuja una línea curva discontinua desde la mano izquierda hasta la mascota
- **Audio sintetizado (Web Audio API, cero archivos).** `AudioManager` global con sintetizador de sonidos de animales (squeak para rata, croak para sapo, meow para gato) al hacer clic en la mascota en escena
- **Hedwig's Theme sintetizado.** Melodía del tema de Hedwig con oscilador triangular estilo celesta que se reproduce en loop al seleccionar la escena "Gran Comedor"
- **Efecto de estadio.** Silbato con vibrato + ráfaga de ruido de multitud (ruido blanco filtrado) al seleccionar la escena "Quidditch"
- **Panel de mascota completo.** Subsección especial en "Harry Potter & Extras" con selección de animal, posición, traje de casa y slider de tamaño. Se muestra/oculta dinámicamente según si hay mascota equipada

---

## [1.11.1] - 2026-03-25

### Changed
- **Botones con emojis.** "Guardar PNG" → "🧍 Guardar", "Escena PNG" → "🌅 Escena" para mayor claridad visual
- **Cursor prohibido al arrastrar muñeco ya en escena.** Arrastrar una pestaña de slot que ya está en el canvas muestra cursor de prohibido en lugar de `+`, y no se muestra el hint de drop

### Added
- **Deseleccionar muñeco.** Clic en el fondo del canvas (fuera de cualquier muñeco) elimina visualmente la selección (contorno rojo). Los paneles siguen mostrando el último muñeco editado
- **Papelera al arrastrar.** Al arrastrar un muñeco en la escena aparece una zona roja en la parte inferior del canvas ("🗑️ Quitar de escena"). Soltar el muñeco sobre ella lo elimina de la escena

---

## [1.11.0] - 2026-03-25

### Added
- **Escena multi-muñeco.** Hasta 4 muñecos vestidos independientemente pueden compartir el mismo canvas. Cada muñeco se arrastra libremente por la escena y se selecciona con clic (contorno rojo en el muñeco activo)
- **Modelo de datos `inScene`.** Cada muñeco tiene un campo `inScene` que controla si aparece en el canvas. Slot 0 está en escena por defecto; los demás se añaden arrastrando su pestaña al canvas o con el botón "Añadir/Quitar de escena"
- **Estado global de escena.** `bgColor` y `bgScene` se han movido del muñeco individual a un objeto `sceneState` global (persistido en `localStorage` clave `munecos_kawaii_scene`), con migración automática desde el formato anterior
- **Pestañas de slot arrastrables.** Las pestañas de los 4 slots son `draggable`: arrastrar una pestaña al canvas añade ese muñeco a la escena. Indicador amarillo (`.in-scene`) marca los muñecos presentes en escena
- **Exportar escena completa.** Nuevo botón "Escena PNG" (`#btn-scene-save`) exporta el canvas entero con fondo + todos los muñecos posicionados. "Guardar PNG" sigue exportando solo el muñeco activo individual
- **2 nuevos fondos genéricos.** Escenas `Parque` y `Playa` con arte SVG original, sumando 7 fondos totales (5 HP + 2 genéricos)
- **Botón toggle escena.** `#btn-toggle-scene` en el panel derecho permite añadir/quitar el muñeco activo de la escena con un clic
- **Etiqueta de nombre.** Cada muñeco en escena muestra su nombre debajo (`.doll-name-tag`)

### Changed
- **Contenedor de escena.** `#doll-wrap` reemplazado por `#scene-dolls` con elementos `.doll-wrap[data-slot=N]` creados dinámicamente por JS
- **`renderSceneDolls()` + `renderActiveDoll()`.** Nuevas funciones que crean/actualizan/eliminan los wrappers de muñecos en escena según su estado `inScene`
- **`initDollDrag()` reescrito.** Eventos delegados en `#scene-dolls` para arrastrar cada muñeco independientemente
- **`initDragDrop()` actualizado.** El drop de ítems de ropa ahora apunta al contenedor `#scene-dolls` y equipa al muñeco sobre el que se suelta
- **`renderBgScene()` / `applyBgColor()`.** Ahora leen de `sceneState` en lugar del muñeco individual
- **`syncRightPanel()`.** Usa `sceneState` para sincronizar controles de fondo y actualiza el botón toggle
- **`DOMContentLoaded` reescrito.** Inicialización completa adaptada al modelo multi-muñeco

---

## [1.10.1] - 2026-03-24

### Added
- **Tatuajes HP.** Nueva categoría `tattoo` con 6 diseños de Harry Potter: `lightning` (cicatriz), `heart`, `deathly_hallows`, `dark_mark`, `golden_snitch` y `always`. Se renderiza encima de la piel y por debajo de toda la ropa y accesorios
- **Panel Tatuaje.** Subsección "Tatuaje" en el acordeón "Harry Potter & Extras" con: selector de color, slider de tamaño (-50..+50), slider de posición horizontal X (-80..+80), slider de posición vertical Y (-80..+80), slider de rotación (-180..+180°), botón espejo y botón de reset
- **Slider X universal.** Nuevo `xOffsetField` en el sistema de panel (`buildPanel`), con helper `xo()` en `renderDoll()` y mapa `CATEGORY_XOFFSET_MAP`. Otros sliders (Y, rotación) ahora aceptan min/max personalizados mediante `yOffsetMin/Max` y `rotateMin/Max` en la definición de subsección

---

## [1.10.0] - 2026-03-24

### Changed
- **Escoba con efecto de profundidad.** La escoba ahora pasa por detrás de la pierna izquierda y por delante de la pierna derecha. Implementado dividiendo cada modelo en dos partes con línea de corte en `x=105` (punto `(105,285)` sobre el palo): `back` se renderiza antes de `svgBase` (debajo del cuerpo completo) y `front` se renderiza entre `bottom` y `belt` como antes. Ambas partes comparten los mismos controles de escala, posición y rotación
- **Eliminado el botón de espejo (flip) para escobas.** Con el split de capas el flip rompería la ilusión de profundidad, por lo que se ha eliminado `broomFlip` completamente del modelo de datos y del panel

---

## [1.9.9] - 2026-03-24

### Fixed
- **Escobas rediseñadas (orientación correcta).** El palo ahora va de `(30,270)` arriba-izquierda a `(215,308)` abajo-derecha. El mango/punta de vuelo queda a la izquierda y las cerdas a la derecha, en diagonal ~20°. Los 6 modelos (Nimbus 2000/2001, Firebolt, Cleansweep 11, Comet 260, Oakshaft 79) han sido redibujados con la nueva geometría
- **Thumbnails de escobas.** Añadido `case 'broom':` en `buildPreviewSvg()` con `viewBox="0 255 240 80"`. Las miniaturas en el panel ahora muestran correctamente el SVG de cada escoba en lugar de una caja gris
- **Hover preview de escobas.** Añadido `broom: 'broom'` al `FIELD_MAP` local en `buildPanel()`. El hover sobre los chips de escoba ahora activa la preview en el doll

### Added
- **Slider de rotación para escobas.** Nuevo slider `↻ Rotación` (-45°..+45°) en la subsección Escoba del panel. Gira la escoba alrededor del pivote `(120,288)` sin afectar otras categorías. Soporta reset junto con tamaño y posición. Implementado con `rotateWrap()`, `CATEGORY_ROTATE_MAP` y `CATEGORY_ROTATE_ORIGIN`

---

## [1.9.8] - 2026-03-24

### Added
- **Escobas HP (6 modelos).** Nuevo accesorio `Escoba` en la sección Harry Potter & Extras. La escoba se renderiza entre la capa pantalón y el cinturón, cruzando el cuerpo en diagonal como si el muñeco estuviera montado. Modelos disponibles: Nimbus 2000, Nimbus 2001, Firebolt, Cleansweep 11, Comet 260 y Oakshaft 79. Cada modelo tiene colores fijos auténticos. Soporta flip horizontal, escala y offset vertical

---

## [1.9.7] - 2026-03-24

### Fixed
- **Tren del Andén 9¾ ya no aparece cortado.** El tren se ha movido de la capa `svgSky` a `svgGround` con `groundH:140`. El viewBox del suelo es ahora `0 0 240 140`: `y=0..60` es el cuerpo del tren, `y=60` es la línea ruedas/andén, `y=60..140` es el andén de piedra. El tren siempre se renderiza completo y alineado con el suelo independientemente del tamaño de pantalla
- **Muñeco se para sobre el suelo.** La posición por defecto del muñeco cambia de `aH × 90%` a `aH × 80%` (base del muñeco al 80% de la altura del canvas), coincidiendo con la línea superior del layer de suelo que ocupa el 20% inferior

---

## [1.9.6] - 2026-03-24

### Fixed
- **Suelo de escenas de fondo sin barras laterales.** El SVG del suelo ahora usa `preserveAspectRatio="none"` y altura fija del `20%` del canvas, en lugar de `xMidYMax meet` con porcentaje derivado de `groundH`. Esto elimina las barras laterales en pantallas anchas y garantiza que el suelo siempre ocupe exactamente el 20% inferior del canvas a todo ancho

---

## [1.9.5] - 2026-03-23

### Added
- **Escenas de fondo — suelo y cielo anclados.** Cada escena ahora define dos capas SVG independientes: `svgSky` (anclado arriba, `preserveAspectRatio="xMidYMin slice"`) y `svgGround` (anclado abajo, altura fija en píxeles). El suelo siempre se ve en la parte inferior de la pantalla y el cielo/ambiente siempre en la parte superior, independientemente del tamaño o ratio de pantalla

### Changed
- **Quidditch rediseñado** — cielo azul brillante (`#4a9fd4`) con nubes blancas esponjosas, snitch dorada, portería con 3 aros a cada lado. El suelo muestra el campo en perspectiva con trapezoide verde, líneas de fuga convergentes al horizonte, círculo central elíptico y bases de postes
- **Estructura `BG_SCENES`**: cada escena pasa de `{ label, svg }` a `{ label, svgSky, svgGround, groundH }`. Los chips de escena también usan el nuevo formato combinando ambas capas en el thumbnail

---

## [1.9.4] - 2026-03-23

### Added
- **Muñeco arrastrable** — el muñeco puede moverse libremente por el canvas arrastrándolo con ratón o dedo (touch). La posición se guarda por slot en localStorage y persiste entre sesiones. Al resetear el muñeco, la posición vuelve a la posición por defecto

### Changed
- **Posición inicial del muñeco** — en lugar de estar centrado verticalmente, el muñeco aparece con su base al 90% de la altura del canvas (pegado a la base), alineado horizontalmente al centro

---

## [1.9.3] - 2026-03-23

### Changed
- **Escenas de fondo — capa independiente** — el fondo ya no se renderiza dentro del SVG del muñeco (donde quedaba limitado al tamaño del canvas 240×340). Ahora se renderiza en un `<div id="bg-scene-layer">` propio con `preserveAspectRatio="xMidYMid slice"`, llenando todo el área central de la pantalla. El muñeco flota encima como capa independiente
- **`applyBgColor()`** — cuando hay una escena activa el `.canvas-bg` se pone a `transparent` para no bloquear la escena; sin escena sigue mostrando el gradiente del color personalizado

---

## [1.9.2] - 2026-03-23

### Added
- **Mejillas** — nueva categoría de rasgos con 6 estilos: `soft` (óvalo clásico), `round` (círculo), `heart` (corazón), `star` (estrella), `freckles` (pecas), `lines` (trazos anime). Color, tamaño y posición vertical ajustables. Siempre visible (mandatory)

### Fixed
- **Chips de escena** — revertido el tamaño del thumbnail al original `50×71px` (en v1.9.1 se había aumentado a `100×142px` por error)

### Changed
- **Mejillas desacopladas de `svgBase()`** — las mejillas ya no están hardcodeadas en la base del muñeco; ahora se renderizan como capa independiente entre boca y ropa inferior, lo que permite cambiar estilo, color, tamaño y posición

---

## [1.9.1] - 2026-03-23

### Added
- **Bufanda libre — espejo** — nuevo botón "⇄ Espejo" en la subsección "Bufanda libre" para reflejar horizontalmente el estilo `scarf2`

### Fixed
- **Escenas de fondo** — los rectángulos de fondo de las escenas `platform_934` (Andén 9¾) y `quidditch` usaban `fill="none"`; ahora usan el color correcto (`#b0b8c8` y `#1a3a1a` respectivamente) para que la miniatura del selector muestre el fondo
- **SCENE_BG duplicado** — eliminada la declaración `const SCENE_BG` local dentro de `buildScenePicker()` (ahora solo existe la constante global)

### Changed
- **Capa / Abrigo — sin espejo** — eliminado el botón "⇄ Espejo" de la subsección "Capa / Abrigo" (la capa es simétrica; el flip no aportaba valor)
- **Zapatos más centrados** — todos los estilos de calzado (`sneaker`, `boot`, `sandal`, `heel`, `boot_high`, `slipper`) ajustados ~7 px hacia el centro para alinearlos mejor con las piernas del muñeco
- **Panel derecho simplificado** — "Género" y "Color de piel" eliminados del panel derecho; quedan únicamente: Nombre, Color de fondo, Escena de fondo, Resetear muñeco

---

## [1.9.0] - 2026-03-23

### Added
- **Nuevos ojos** — `closed` (ojos cerrados con pestañas), `angry_eyes` (cejas fruncidas + iris pequeño), `dollar` (ojos con símbolo $)
- **Nuevas capas** — `short_cape` (capa corta con cierre dorado), `cloak` (túnica con capucha), `vest_leather` (chaleco de cuero con botones)
- **Bufanda libre — nuevos estilos** — `checker` (cuadros), `stripes` (rayas), `knit` (punto trenzado) añadidos a los ya existentes `solid` y `diagonal`
- **Escenas de fondo HP** — 5 escenas Harry Potter renderizadas dentro del propio SVG del muñeco: `hogwarts`, `great_hall` (Gran Comedor), `forbidden_forest` (Bosque Prohibido), `platform_934` (Andén 9¾), `quidditch` (campo de quidditch). Selector de escena en el panel derecho con previsualización en miniatura
- **Voltear / Espejo** — botón "⇄ Espejo" por categoría para reflejar horizontalmente: pelo, sombrero, capa, varita y mano izquierda
- **Resetear ajustes** — botón "↺ Resetear ajustes" por categoría para volver tamaño y posición a cero sin afectar al ítem equipado
- **Selector de piel en panel izquierdo** — los 8 tonos de piel preestablecidos + selector personalizado ahora aparecen en la sección "Rasgos" del panel izquierdo, además del panel derecho
- **Previsualización hover** — al pasar el cursor sobre una ficha de ítem en el panel izquierdo se muestra una previsualización instantánea en el muñeco (solo escritorio)

### Changed
- **Panel izquierdo — sección Rasgos** — reordenada: Piel → Género → Ojos → Cejas → Nariz → Boca → Pelo
- **Categorías con volteo** — `hair`, `hat`, `cape`, `wand`, `lefthand` disponen del botón "⇄ Espejo"

---

## [1.8.1] - 2026-03-23

### Fixed
- **Slider de posición** — rango reducido de -30..+30 a -15..+15 para evitar que los elementos se salgan del área visible del muñeco

---

## [1.8.0] - 2026-03-23

### Added
- **Slider de posición vertical** — nuevo control "Posición ↕" debajo del slider de tamaño en cada categoría (rasgos, ropa y extras); rango -30..+30 px SVG (0 = posición original). Permite subir o bajar cualquier elemento de forma independiente sin afectar a los demás. Los valores se guardan en `localStorage` y se incluyen en la URL compartida.

---

## [1.7.1] - 2026-03-23

### Fixed
- **Cinturón bajo camiseta** — el cinturón/tirantes ahora se renderizan entre el pantalón y la camiseta; la camiseta lo tapa correctamente
- **Libro (mano izq.)** — tamaño inicial incrementado un 50% mediante escala interna
- **Flor (mano izq.)** — tamaño inicial incrementado un 10%; tallo alargado (~57% más largo) con hojas reposicionadas
- **Poción (mano izq.)** — tamaño inicial incrementado un 10%
- **Sombreros** — subidos 8px en la cabeza (todos los valores Y reducidos en 8)
- **Faldas** — rediseñadas como trapecio oblicuo (estrecho en cintura, ancho en bajo): `skirt` larga hasta `y=340`, `skirt_mini` corta hasta `y=314`; dobladillo oscuro en la base

---

## [1.7.0] - 2026-03-23

### Added
- **Objeto mano izquierda** — nueva categoría "Objeto mano izq." en Harry Potter & Extras con 3 ítems y selector de color + slider de tamaño:
  - `potion` — frasco redondo con cuello corto, líquido semitransparente del color elegido, corcho marrón claro fijo, brillo de cristal
  - `flower` — flor de 6 pétalos del color elegido, tallo y hojas verdes fijos, centro amarillo
  - `book` — libro cerrado con tapas del color elegido, páginas blancas en el lomo, líneas decorativas en cubierta

---

## [1.6.3] - 2026-03-23

### Fixed
- **Varita** — origen movido de `translate(196,256)` a `translate(184,258)`: la varita arranca ahora del centro de la mano en lugar del borde exterior del brazo

---

## [1.6.2] - 2026-03-23

### Fixed
- **Cinturón debajo de la capa** — el cinturón/tirantes ahora se renderizan antes que la capa, quedando cubiertos por ella en lugar de encima
- **Cejas opcionales** — las cejas ya no son obligatorias; se pueden deseleccionar haciendo clic sobre la ceja equipada (valor inicial sigue siendo `arched`)

---

## [1.6.1] - 2026-03-23

### Fixed
- **Color de ojos** — eliminado el picker duplicado del panel derecho; el selector de color de ojos vive únicamente en el panel izquierdo (subsección Ojos)
- **Tirantes (suspenders)** — rediseñados como dos tirantes verticales paralelos (izquierdo y derecho) que van del hombro a la cintura; eliminada la barra inferior horizontal y el cruce diagonal
- **Varitas** — corregida la dirección: ahora apuntan hacia afuera en diagonal (alejándose del cuerpo) en lugar de hacia el interior

---

## [1.6.0] - 2026-03-22

### Added
- **Nuevos estilos de cejas** — `worried` (preocupado) y `cross` (enojado con V)
- **Nuevas narices** — `cat` (triángulo kawaii), `pig` (círculo con orificios), `freckles` (pecas)
- **Nuevas bocas** — `grin` (sonrisa amplia con dientes) y `cat_mouth` (boca gatuna en W)
- **Nuevos tops** — `vest` (chaleco sin mangas unisex)
- **Nuevos pantalones/faldas** — `leggings`, `skirt_mini`, `joggers`
- **Nuevos zapatos** — `heel` (tacón), `boot_high` (bota alta), `slipper` (pantufla)
- **Nuevo cinturón** — `suspenders` (tirantes cruzados sobre la camiseta)
- **Nueva varita** — `crystal` (punta de cristal facetado)
- **Nueva capa** — `poncho` (poncho con costados simétricos)
- **Bufanda libre** — nueva categoría "Bufanda libre" con estilos `solid` y `diagonal` (franja diagonal con clipPath); 2 selectores de color independientes (Color 1 / Color 2)

### Fixed
- **Etiquetas de color en el panel** — el primer picker de color de cada subsección ahora usa `colorFieldLabel` (ej. "Color ojos") en lugar de mostrar siempre "Color"

---

## [1.5.0] - 2026-03-22

### Added
- **Color de cejas** — selector de color independiente para las cejas; todos los estilos de ceja (straight, arched, angry, kawaii, thin, bushy, raised) ahora usan el color elegido en lugar de tener colores fijos
- **Color de pestañas** — selector de color "Pestañas" en la sección Ojos; aplica a los estilos: `half` (arco cerrado), `wink` (arco del ojo guiñado), `sparkle` (rayos de brillo), `sleepy` (párpado caído). El valor por defecto hereda el color de pelo
- Los estilos kawaii ahora son totalmente personalizables: los círculos decorativos y el trazo responden al mismo picker de color de cejas

---

## [1.4.0] - 2026-03-21

### Added
- **Exportar PNG** — el botón "Guardar PNG" exporta el muñeco actual como imagen PNG descargable (480×680 px, fondo incluido) usando `XMLSerializer` + `<canvas>`
- **Toast de confirmación** — "Compartir" muestra ahora una notificación flotante "¡URL copiada!" en lugar de solo cambiar el texto del botón

### Fixed
- **Sliders de Tamaño** — movidos debajo del grid de items de cada subsección, con separador visual y icono ⤢, para que sean fáciles de encontrar y usar
- **Compartir — portapapeles robusto** — usa `navigator.clipboard` con fallback a `document.execCommand('copy')` (textarea trick) para funcionar en HTTP y navegadores sin permiso `clipboard-write`
- **Estilo btn-share** — homogeneizado al estilo del resto de botones del header (color plano `--accent2` en lugar de gradiente azul)

---

## [1.3.0] - 2026-03-21

### Added
- **URL sharing** — "Compartir 🔗" button in the header generates a shareable link with the current doll state compressed via LZString into the URL hash (`#d=...`); URL is copied to clipboard (falls back to a prompt on HTTP)
- **Load from URL hash** — opening a shared link auto-loads the encoded doll into the active slot before rendering, then cleans the hash from the address bar

### Fixed
- **Ravenclaw scarf** secondary color corrected from `#946b2d` (gold/brown) to `#aaaaaa` (silver), matching house colours

---

## [1.2.0] - 2026-03-21

### Added
- **Eyes** × 4 new styles → 9 total: `sparkle` (anime glints), `sleepy` (drooping lid), `pixel` (3×3 retro grid), `teary` (teardrop kawaii)
- **Eyebrows** × 3 new styles → 7 total: `thin` (fine 90s arch), `bushy` (thick natural), `raised` (skeptical asymmetric)
- **Hair** × 8 new styles → 18 total: `side_ponytail`, `braids`, `pixie`, `wavy_long`, `top_knot`, `mohawk`, `twin_tails`, `undercut`
- **Scale sliders** for every item category (-50% to +50%) — each panel section now shows a "Tamaño" range slider that scales the element via SVG transform around its natural center point
- **Background color picker** in the right panel — per-doll color saved in localStorage, renders as a radial gradient on the canvas background

### Changed
- `renderDoll()` now wraps every layer in `scaleWrap()` for per-category scaling
- `defaultDoll()` includes 13 new `*Scale` fields (all default 0) and `bgColor: '#1a2a4a'`
- `syncRightPanel()` now syncs the `#bg-color` input when switching slots

---

## [1.1.0] - 2026-03-21

### Added
- **Hats** × 2 new styles → 6 total: `crown`, `top_hat`
- **Wands** × 4 new styles → 8 total: `vine`, `phoenix`, `unicorn`, `oak`
- **Tops** × 4 new styles → 8 total: `striped`, `dress`, `jacket`, `uniform`
- **Glasses** × 4 new styles → 6 total: `cat_eye`, `aviator`, `hp_round`, `sunglasses`

### Fixed
- **Wands** reoriented to originate from doll's right hand (`translate(196,256) rotate(-38)`) pointing upward
- **Hats** raised further ~10px (brim bottoms now ~y=79)

---

## [1.0.1] - 2026-03-21

### Added
- **Hair** — 10 styles with per-item color picker (Harry, Hermione, Ron, Draco-inspired + short_spiky, long_straight, curly, buns, ponytail, bob)
- **README.md** — simple project overview with live URL, features, local dev instructions and Docker image info

### Fixed
- **Head size** reduced 15% (`rx 82→70`, `ry 90→77`) for better Funko proportions
- **Scarf** repositioned from mouth level (`y=156`) to neck zone (`y=180`) — now wraps correctly between head and body
- **Hats** raised ~12px — brims now sit above the eyebrows instead of at eye level
- **Footer** centered, smaller font (`0.6rem`), version badge styled with accent color to match page theme

---

## [1.0.0] - 2026-03-21

### Added

#### Doll customization
- Funko-style kawaii SVG doll with 14 fully customizable layers
- Gender selection: **boy** (straight silhouette) and **girl** (rounded hips silhouette) with dedicated body shapes
- **Eyes** × 5 variants: round, star, half-closed, wink, heart
- **Eyebrows** × 4 variants: straight, arched, angry, kawaii
- **Nose** × 3 variants: dot, button, heart
- **Mouth** × 4 variants: smile, line, surprise, UwU
- **Tops** × 4: t-shirt, crop top, hoodie, tank top
- **Bottoms** × 3: pants, skirt, shorts (gender-aware shapes)
- **Shoes** × 3: sneaker, boot, sandal
- **Hats** × 4: beanie, wizard hat, beret, cap
- **Capes/coats** × 2: coat, HP cape
- **Glasses** × 2: round, square
- **Belt** × 2: thin, wide
- **HP scarves** for all 4 Hogwarts houses: Gryffindor (red/gold), Slytherin (green/silver), Ravenclaw (blue/bronze), Hufflepuff (yellow/black) with stripe detail and fringe
- **HP wands** × 4: Elder Wand, Holly, Elm, Willow (each with unique SVG shape)

#### Interaction
- Drag & drop items onto the doll from the left panel
- Click-to-equip/unequip (also works on mobile via touch)
- Automatic category replacement: equipping an item removes any previous item of the same category
- Skin tone picker: 8 presets (light → dark + kawaii pink/mint) plus free color picker
- Per-item color picker for all clothing and accessory categories
- Eye color picker

#### Collection & persistence
- Collection of **4 named dolls** — tabs in the header with live mini-previews
- Editable doll name (up to 24 characters)
- Auto-save on every change via `localStorage`
- Manual save button with confirmation feedback
- Reset button to clear a doll back to defaults

#### Infrastructure
- Flask backend (Python 3.12) serving the SPA on **port 8934**
- Multi-architecture Docker image (`linux/amd64` + `linux/arm64/v8`) published to `ghcr.io/davic80/munecos-kawaii`
- `docker-compose.yml` with **Cloudflare Tunnel** integration (`cloudflared` service)
- GitHub Actions CI/CD: push to `main` → build & push `:latest`; tag `v*` → versioned image + GitHub Release

#### UI
- Dark gaming/kawaii theme with CSS custom properties
- Collapsible accordion sections in the left panel with inline color pickers
- Doll drop zone with animated highlight on drag-over
- Responsive layout (panel hidden on small screens)
- Footer bar with version number, GitHub link, and donation link

