/*Reloj en la página HH:MM:SS (Intl) y la fecha completa debajo, actualizado cada segundo.
Cuenta atrás: un <input> con los segundos, y botones Iniciar y Parar. Muestra MM:SS en la página y en document.title. Al llegar a 0 muestra «¡Tiempo!» y cancela el intervalo.
Pulsar Iniciar dos veces seguidas no debe crear dos intervalos.
En un comentario, predice la salida de esto antes de ejecutarlo:
js
   console.log('A');
   setTimeout(() => console.log('B'), 100);
   setTimeout(() => console.log('C'), 0);
   setTimeout(() => console.log('D'), 50);
   console.log('E');
Escribe setTimeout(saludar(), 1000), anota por qué falla y corrígelo de las dos formas. */

/**
 * UD3 · Reloj, cuenta atrás y temporizadores (CE a, c, h)
 */

// =========================================================================
// 1. RELOJ EN LA PÁGINA (HH:MM:SS y fecha completa con Intl)
// =========================================================================
function iniciarReloj() {
  const contenedorReloj = document.getElementById('reloj') || crearContenedorReloj();

  // Formateadores Intl reutilizables (buenas prácticas UD3)
  const fmtHora = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const fmtFecha = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'full'
  });

  setInterval(() => {
    const ahora = new Date();
    const horaTexto = fmtHora.format(ahora);
    const fechaTexto = fmtFecha.format(ahora);

    contenedorReloj.innerHTML = `
      <div style="font-size: 2rem; font-weight: bold;">${horaTexto}</div>
      <div style="font-size: 1rem; color: #555;">${fechaTexto}</div>
    `;
  }, 1000);
}

function crearContenedorReloj() {
  const div = document.createElement('div');
  div.id = 'reloj';
  div.style.marginBottom = '20px';
  document.body.prepend(div);
  return div;
}

iniciarReloj();


// =========================================================================
// 2 & 3. CUENTA ATRÁS CON INPUT, BOTONES Y CONTROL DE DOBLE INTERVALO
// =========================================================================
let idIntervaloCuentaAtras = null;

function configurarCuentaAtras() {
  // Generar HTML de la cuenta atrás si no existe
  const seccion = document.createElement('section');
  seccion.innerHTML = `
    <h3>Cuenta Atrás</h3>
    <input type="number" id="inputSegundos" value="10" min="1" style="width: 60px;">
    <button id="btnIniciar">Iniciar</button>
    <button id="btnParar">Parar</button>
    <div id="displayCuentaAtras" style="font-size: 1.5rem; margin-top: 10px; font-weight: bold;">00:00</div>
  `;
  document.body.appendChild(seccion);

  const inputSegundos = document.getElementById('inputSegundos');
  const btnIniciar = document.getElementById('btnIniciar');
  const btnParar = document.getElementById('btnParar');
  const display = document.getElementById('displayCuentaAtras');

  let segundosRestantes = 0;

  function actualizarDisplayMMSS(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    const texto = `${m}:${sec}`;
    display.textContent = texto;
    document.title = `(${texto}) Cuenta atrás`;
  }

  btnIniciar.addEventListener('click', () => {
    // REQUISITO: Pulsar Iniciar dos veces seguidas no debe crear dos intervalos
    if (idIntervaloCuentaAtras !== null) return;

    // Si venía de cero o es la primera vez, leemos el input o mantenemos los que quedan
    if (segundosRestantes <= 0) {
      segundosRestantes = parseInt(inputSegundos.value, 10) || 10;
    }

    actualizarDisplayMMSS(segundosRestantes);

    idIntervaloCuentaAtras = setInterval(() => {
      segundosRestantes--;
      actualizarDisplayMMSS(segundosRestantes);

      if (segundosRestantes <= 0) {
        clearInterval(idIntervaloCuentaAtras);
        idIntervaloCuentaAtras = null;
        display.textContent = '¡Tiempo!';
        document.title = '¡Tiempo!';
      }
    }, 1000);
  });

  btnParar.addEventListener('click', () => {
    if (idIntervaloCuentaAtras !== null) {
      clearInterval(idIntervaloCuentaAtras);
      idIntervaloCuentaAtras = null;
    }
  });
}

configurarCuentaAtras();


// =========================================================================
// 4. PREDICCIÓN DEL ORDEN DE SALIDA (Event Loop / Cola de tareas)
// =========================================================================
/*
  PREDICCIÓN:
  1. 'A' (síncrono, se ejecuta de inmediato)
  2. 'E' (síncrono, se ejecuta justo después de A)
  3. 'C' (setTimeout con 0 ms; va a la cola de tareas y se ejecuta al terminar el hilo principal)
  4. 'D' (setTimeout con 50 ms)
  5. 'B' (setTimeout con 100 ms)

  Orden real esperado en consola: A, E, C, D, B
*/
console.log('A');
setTimeout(() => console.log('B'), 100);
setTimeout(() => console.log('C'), 0);
setTimeout(() => console.log('D'), 50);
console.log('E');


// =========================================================================
// 5. TRAMPA EN SETTIMEOUT Y SUS DOS CORRECCIONES
// =========================================================================
function saludar() {
  console.log('Hola desde la función saludar');
}

/* 
  ¿POR QUÉ FALLA ESTO?
  setTimeout(saludar(), 1000);
  
  Falla porque al poner los paréntesis `()`, la función `saludar` se ejecuta 
  DE INMEDIATO (ahora mismo), en lugar de entregar la referencia de la función 
  para que el navegador la ejecute más tarde. Como `saludar()` no devuelve nada 
  (devuelve `undefined`), setTimeout recibe `undefined` y no hace nada tras el segundo.
*/

// FORMA 1: Entregar la referencia de la función sin paréntesis
setTimeout(saludar, 1000);

// FORMA 2: Envolverla en una función flecha (callback anónimo)
setTimeout(() => {
  saludar();
}, 1000);