const salida = document.getElementById('salida'); // el <main id="salida"> del index.html
salida.textContent = 'Hola desde JavaScript'; // sustituye su contenido por texto

const salida = document.getElementById('salida');
const nombre1 = 'Ada';
const edad = 36;
salida.innerHTML = `<h2>Ficha</h2><p>${nombre1} tiene ${edad} años.</p>`;
salida.insertAdjacentHTML('beforeend', '<p><em>Generado por JavaScript</em></p>');

const lenguajes = 'HTML,CSS,JavaScript,TypeScript';
let html = '<ul>';
for (const lenguaje of lenguajes.split(',')) {
 html += `<li>${lenguaje}</li>`;
}
html += '</ul>';
salida.innerHTML = html;

//problemas

const nombre = prompt('¿Cómo te llamas?') ?? 'anónimo';
salida.innerHTML = '<h2>Hola, <span id="quien"></span></h2>'; // marcado propio, seguro
document.getElementById('quien').textContent = nombre; // texto del usuario, seguro

//titulos y detalles de documento
document.title = 'Carrito (3)'; // cambia el texto de la pestaña
document.title; // y se puede leer
document.lang; // 'es' (del atributo lang del <html>)
document.documentElement.lang = 'en'; // cambiarlo (documentElement es el <html>)
document.body.dataset.tema = 'oscuro'; // escribe data-tema="oscuro" en el <body>
document.URL; // la dirección de la página (como location.href)
document.referrer; // de dónde venía el usuario ('' si escribió la URL)
document.visibilityState; // 'visible' o 'hidden' (¿está la pestaña a la vista?)





//cinco peligrosos 
/**
* Escapa los caracteres con significado en HTML para poder insertar
* texto del usuario dentro de una plantilla de innerHTML sin riesgo de XSS.
* @param {string} texto - Texto sin procesar.
* @returns {string} Texto seguro para insertar como HTML.
*/
function escaparHtml(texto) {
 return String(texto)
 .replaceAll('&', '&amp;')
 .replaceAll('<', '&lt;')
 .replaceAll('>', '&gt;')
 .replaceAll('"', '&quot;')
 .replaceAll("'", '&#39;');
}
salida.innerHTML = `<h2>Hola, ${escaparHtml(nombre)}</h2>`;