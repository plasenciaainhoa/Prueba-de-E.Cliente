/*Con prompt, confirm y alert: pide un nombre y trata tres casos distintos (texto, vacío, cancelado) con mensajes diferentes.
Botón Añadir: abre un <dialog> modal con un <input required>. Al aceptar añade un <li> (seguro); al cancelar o con Esc, no hace nada.
Botón Vaciar lista: <dialog> de confirmación con <form method="dialog"> que lee returnValue en el evento close.
avisar(texto): escribe en <p id="mensaje" role="status"> y lo borra a los 3 s. Si se llama dos veces seguidas, cancela el borrado anterior. Úsala en 2 y 3. */

/**
 * UD3 · A7. Diálogos propios y del navegador (CE e, h)
 */

// Variable global para almacenar el identificador del setTimeout del toast
let temporizadorToast = null;

/**
 * Función auxiliar para escapar caracteres HTML y prevenir ataques XSS.
 * @param {string} texto - Texto sin procesar.
 * @returns {string} Texto seguro.
 */
function escaparHtml(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * Muestra un mensaje temporal (toast) en <p id="mensaje" role="status">
 * Si se llama dos veces seguidas, cancela el borrado anterior.
 * @param {string} texto - Mensaje a mostrar.
 */
function avisar(texto) {
  const pMensaje = document.getElementById('mensaje');
  
  // Cancelar el temporizador anterior si existía
  if (temporizadorToast !== null) {
    clearTimeout(temporizadorToast);
  }

  pMensaje.textContent = texto;

  // Programar el borrado a los 3 segundos y guardar el id
  temporizadorToast = setTimeout(() => {
    pMensaje.textContent = '';
    temporizadorToast = null;
  }, 3000);
}


// =========================================================================
// 1. LOS TRES DIÁLOGOS DE SIEMPRE (prompt, confirm, alert)
// =========================================================================
const btnPrompt = document.getElementById('btnPrompt');

btnPrompt.addEventListener('click', () => {
  const nombre = prompt('Introduce tu nombre:', 'Usuario por defecto');

  // Tratar los 3 casos de prompt
  if (nombre === null) {
    // Caso 1: Cancelado
    avisar('Has cancelado la introducción del nombre.');
    alert('Operación cancelada.');
  } else if (nombre.trim() === '') {
    // Caso 2: Vacío
    avisar('No has escrito ningún nombre (cadena vacía).');
    alert('¡Hola, anónimo sin nombre!');
  } else {
    // Caso 3: Texto válido
    avisar(`Bienvenido/a, ${nombre}.`);
    
    // Continuar con confirmación
    const continuar = confirm(`¿Deseas confirmar tu nombre como "${nombre}"?`);
    if (continuar) {
      alert(`¡Perfecto! Registro completado para ${nombre}.`);
    } else {
      alert('Has decidido no confirmar el registro.');
    }
  }
});


// =========================================================================
// 2. DIÁLOGO PROPIO PARA VACIAR LISTA (<dialog>)
// =========================================================================
const dialogoConfirmar = document.getElementById('dialogoConfirmar');
const btnVaciar = document.getElementById('btnVaciar');
const listaElementos = document.getElementById('listaElementos');

btnVaciar.addEventListener('click', () => {
  dialogoConfirmar.showModal();
});

dialogoConfirmar.addEventListener('close', () => {
  // Leer el returnValue del botón del formulario dentro del diálogo
  if (dialogoConfirmar.returnValue === 'vaciar') {
    listaElementos.innerHTML = ''; // Vaciar la lista
    avisar('La lista ha sido vaciada correctamente.');
  } else {
    avisar('Acción cancelada.');
  }
});


// =========================================================================
// 3 & 4. DIÁLOGO PROPIO PARA AÑADIR UN DATO CON <input> Y TOAST
// =========================================================================
const dialogoNombre = document.getElementById('dialogoNombre');
const btnAnadir = document.getElementById('btnAnadir');
const inputNombreElemento = document.getElementById('inputNombreElemento');

btnAnadir.addEventListener('click', () => {
  inputNombreElemento.value = ''; // Limpiar input previo
  dialogoNombre.showModal();
});

dialogoNombre.addEventListener('close', () => {
  // Si se cerró aceptando ('ok') y el input es válido
  if (dialogoNombre.returnValue === 'ok') {
    const textoIngresado = inputNombreElemento.value.trim();
    
    if (textoIngresado !== '') {
      // Crear el <li> de forma segura con textContent para evitar XSS
      const nuevoLi = document.createElement('li');
      nuevoLi.textContent = textoIngresado;
      listaElementos.appendChild(nuevoLi);

      avisar(`Elemento "${textoIngresado}" añadido con éxito.`);
    }
  } else {
    avisar('Se canceló la adición del elemento.');
  }
});