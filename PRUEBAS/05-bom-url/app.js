/**
 * UD3 · A6. Radiografía del navegador (CE b, c, h)
 */

// Función auxiliar para escapar HTML y evitar XSS
function escaparHtml(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// =========================================================================
// 1. PANEL DE INFORMACIÓN EN TABLA (BOM y Screen)
// =========================================================================
function generarPanelBom() {
  const panel = document.getElementById('panel-bom');
  
  // Lectura de capacidades y propiedades del BOM
  const idioma = navigator.language;
  const conexion = navigator.onLine ? 'Conectado (Online)' : 'Desconectado (Offline)';
  const pantalla = `${screen.width} x ${screen.height} px`;
  const viewport = `${window.innerWidth} x ${window.innerHeight} px`;
  const orientacion = screen.orientation ? screen.orientation.type : 'No soportada';
  const origen = location.origin;
  const ruta = location.pathname;
  
  // Comprobar preferencia de tema oscuro mediante matchMedia
  const prefiereOscuro = matchMedia('(prefers-color-scheme: dark)').matches;
  const temaOscuroSistema = prefiereOscuro ? 'Sí (Oscuro)' : 'No (Claro)';

  const htmlTabla = `
    <table>
      <thead>
        <tr><th>Propiedad</th><th>Valor</th></tr>
      </thead>
      <tbody>
        <tr><td>Idioma preferido</td><td>${escaparHtml(idioma)}</td></tr>
        <tr><td>Conexión</td><td>${escaparHtml(conexion)}</td></tr>
        <tr><td>Tamaño de pantalla</td><td>${escaparHtml(pantalla)}</td></tr>
        <tr><td>Tamaño del viewport</td><td>${escaparHtml(viewport)}</td></tr>
        <tr><td>Orientación</td><td>${escaparHtml(orientacion)}</td></tr>
        <tr><td>Origen (Origin)</td><td>${escaparHtml(origen)}</td></tr>
        <tr><td>Ruta (Pathname)</td><td>${escaparHtml(ruta)}</td></tr>
        <tr><td>Preferencia tema oscuro (Sistema)</td><td>${escaparHtml(temaOscuroSistema)}</td></tr>
      </tbody>
    </table>
  `;
  panel.innerHTML = htmlTabla;
}

generarPanelBom();


// =========================================================================
// 2. LECTURA DE PARÁMETROS URL, SALUDO SEGURO Y APLICACIÓN DE TEMA
// =========================================================================
const params = new URLSearchParams(location.search);

// A. Saludar al nombre de forma segura
const nombre = params.get('nombre');
const contenedorSaludo = document.getElementById('saludo');
if (nombre) {
  contenedorSaludo.innerHTML = `<h2>Hola, <span id="nombre-usuario"></span></h2>`;
  document.getElementById('nombre-usuario').textContent = nombre; // Evita XSS
}

// B. Aplicar tema (parámetro o por defecto el del sistema con matchMedia)
const temaParam = params.get('tema');
if (temaParam === 'claro' || temaParam === 'oscuro') {
  document.body.dataset.tema = temaParam;
} else {
  // Si falta el parámetro, usamos el del sistema operativo
  const prefiereOscuro = matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.dataset.tema = prefiereOscuro ? 'oscuro' : 'claro';
}

// C. Leer página actual como número con valor por defecto 1
const paginaActual = Number(params.get('pagina')) ?? 1;
document.getElementById('num-pagina').textContent = paginaActual;
document.getElementById('historial-length').textContent = history.length;


// =========================================================================
// 3. NAVEGACIÓN E HISTORIAL
// =========================================================================
const btnSiguiente = document.getElementById('btnSiguiente');
const btnAtras = document.getElementById('btnAtras');
const btnReplace = document.getElementById('btnReplace');

// Botón Siguiente: incrementa la página manteniendo los parámetros actuales
btnSiguiente.addEventListener('click', () => {
  params.set('pagina', paginaActual + 1);
  if (nombre) params.set('nombre', nombre);
  if (temaParam) params.set('tema', document.body.dataset.tema);
  
  location.href = `?${params.toString()}`;
});

// Botón Atrás
btnAtras.addEventListener('click', () => {
  history.back();
});

/* 
  EXPLICACIÓN SOBRE location.replace (Nota para el historial):
  A diferencia de location.href (o location.assign) que añade una entrada nueva 
  en la pila del historial del navegador (permitiendo volver atrás con la flecha), 
  location.replace SUSTITUYE la entrada actual del historial por la nueva URL. 
  Por lo tanto, la página actual desaparece del historial y el botón "Atrás" del 
  navegador saltará directamente a la página anterior a esta.
*/
btnReplace.addEventListener('click', () => {
  params.set('pagina', paginaActual + 5); // Ejemplo de salto con replace
  location.replace(`?${params.toString()}`);
});


// =========================================================================
// 4. ANÁLISIS DE URL (Comentarios teóricos)
// =========================================================================
/*
  Para la URL: https://tienda.es/catalogo/index.html?cat=libros&pag=2#top
  
  - origin:   "https://tienda.es" (incluye esquema, host y puerto si lo hubiera)
  - pathname: "/catalogo/index.html" (la ruta absoluta del recurso)
  - search:   "?cat=libros&pag=2" (la cadena de consulta o parámetros)
  - hash:     "#top" (el fragmento o ancla final)
*/


// =========================================================================
// 5. DETECCIÓN DE CARACTERÍSTICAS Y PORTAPAPELES
// =========================================================================
const btnCopiar = document.getElementById('btnCopiar');
const mensajeCopia = document.getElementById('mensaje-copia');

// Detección de características (navigator.clipboard)
if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
  btnCopiar.style.display = 'inline-block';
  
  btnCopiar.addEventListener('click', () => {
    navigator.clipboard.writeText(location.href)
      .then(() => {
        mensajeCopia.textContent = '¡URL copiada al portapapeles con éxito!';
        setTimeout(() => { mensajeCopia.textContent = ''; }, 3000);
      })
      .catch(err => {
        console.error('Error al copiar: ', err);
      });
  });
}

// (Opcional) Verificación de navigator.share por consola para constatar capacidades
if (navigator.share) {
  console.log('navigator.share está disponible en este entorno.');
} else {
  console.log('navigator.share no está soportado.');
}