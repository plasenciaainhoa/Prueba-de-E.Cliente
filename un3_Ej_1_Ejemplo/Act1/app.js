/* =====================================================================
   UD3 · A1 · Explorando los objetos predefinidos (CE a, h)
   Qué hace: clasifica objetos predefinidos por familia y comprueba
             en qué entorno existen, sin fallar en Node.js.
   Autoría:  Raquel (profesora) · octubre de 2026
   ---------------------------------------------------------------------
   ENUNCIADO
     1) typeof y familia de 14 nombres (en NOTAS.md, al final).
     2) console.table con tipo y familia de al menos ocho.
     3) Ejecutar con Node: anotar los ReferenceError y evitarlos con typeof.
     4) Tres propiedades de navigator no vistas en los apuntes.
     5) Object.keys(Math).length, Math.max y Math.abs.

   CÓMO EJECUTARLO
     Navegador: index.html con Live Server y la consola (F12).
     Terminal:  node app.js   (no falla: usa typeof, que nunca lanza error)
   ===================================================================== */
'use strict';

// ----- 2) y 3) TABLA DE OBJETOS ---------------------------------------
// Primera versión (la que FALLA en Node): acceder al nombre directamente.
//   console.log(typeof window);   // en Node: ReferenceError: window is not defined
// Segunda versión: typeof NOMBRE no lanza error aunque el nombre no exista,
// devuelve 'undefined'. Pero typeof necesita el identificador escrito tal
// cual, así que no podemos recorrer una lista de textos... salvo con
// globalThis, que es el objeto global en TODOS los entornos (window en el
// navegador, global en Node).
const nombres = 'Math,Date,JSON,Intl,window,document,location,navigator,screen,history,localStorage,console,setTimeout,alert';

const familias = {
  Math: 'nativo', Date: 'nativo', JSON: 'nativo', Intl: 'nativo',
  window: 'navegador', location: 'navegador', navigator: 'navegador', screen: 'navegador',
  history: 'navegador', localStorage: 'navegador', console: 'navegador', setTimeout: 'navegador',
  alert: 'navegador', document: 'documento',
};

const filas = [];
for (const nombre of nombres.split(',')) {
  filas.push({
    nombre,
    tipo: typeof globalThis[nombre], // 'undefined' si no existe en este entorno
    familia: familias[nombre],
    existeAqui: nombre in globalThis,
  });
}
console.table(filas);

// ----- 5) MATH ----------------------------------------------------------
console.log('Math tiene', Object.keys(Math).length, 'propiedades y métodos');
// Ojo: Object.keys solo cuenta las ENUMERABLES. En la mayoría de navegadores
// da 0, porque las propiedades de Math no son enumerables. La forma completa:
console.log('Con los no enumerables:', Object.getOwnPropertyNames(Math).length); // 44 aprox.
console.log('Math.max(3, 9, 4) =', Math.max(3, 9, 4)); // 9
console.log('Math.abs(-7) =', Math.abs(-7)); // 7

// Si estamos en el navegador, también lo escribimos en la página (anticipo del apartado 5)
if (typeof document !== 'undefined') {
  let html = '<table><tr><th>Nombre</th><th>typeof</th><th>Familia</th></tr>';
  for (const f of filas) {
    html += `<tr><td>${f.nombre}</td><td>${f.tipo}</td><td>${f.familia}</td></tr>`;
  }
  document.getElementById('salida').innerHTML = `${html}</table>`;
}

/* ---------------------------------------------------------------------
   NOTAS.md (solución orientativa)

   1) Clasificación (typeof en el navegador):
      Math 'object' nativo · Date 'function' nativo · JSON 'object' nativo ·
      Intl 'object' nativo · window 'object' navegador · document 'object' documento ·
      location 'object' navegador · navigator 'object' navegador ·
      localStorage 'object' navegador · console 'object' navegador (también en Node) ·
      setTimeout 'function' navegador (también en Node) · alert 'function' navegador ·
      screen 'object' navegador · history 'object' navegador.
      Date es 'function' porque es un constructor (se usa con new).

   3) En Node dan ReferenceError: window, document, location, navigator*,
      screen, history, localStorage, alert. (*navigator existe en Node 21+
      como objeto reducido: buen tema de conversación). console, setTimeout
      y los nativos existen. Con typeof nombre (o typeof globalThis[nombre])
      no hay error: devuelve 'undefined'.

   4) Ejemplos: navigator.hardwareConcurrency (núcleos de CPU),
      navigator.maxTouchPoints (puntos táctiles), navigator.pdfViewerEnabled
      (si puede abrir PDF), navigator.cookieEnabled, navigator.webdriver
      (si lo controla un programa de automatización).

   5) Object.keys(Math).length suele ser 0 (propiedades no enumerables);
      Object.getOwnPropertyNames(Math).length ≈ 44. Math.max(3, 9, 4) = 9;
      Math.abs(-7) = 7.
   --------------------------------------------------------------------- */
