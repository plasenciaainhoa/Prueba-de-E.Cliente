/*index.html: botones Abrir vista previa (popup 480×640, nombre previa), Enfocar y Cerrar. Indica en pantalla si está abierta o cerrada (closed, cada segundo). Trata el caso null.
Botón Enviar: manda a previa.html un objeto {titulo, precio, fecha} con postMessage. La previa lo muestra formateado con Intl y responde «ok»; la principal escribe la confirmación. Comprueba el origen en ambos lados.
En un comentario: ¿qué pasa si el origen de destino no coincide y por qué?
Dos pestañas: botón de tema que se sincroniza con BroadcastChannel. La pestaña emisora no debe recibir su propio mensaje.*/

/**
 * UD3 · A8. Ventana Principal (CE b, f, h)
 */

let ventanaPrevia = null;

// =========================================================================
// 1. ABRIR, CONTROLAR Y COMPROBAR SI ESTÁ ABIERTA/CERRADA (.closed)
// =========================================================================
const btnAbrir = document.getElementById('btnAbrir');
const btnEnfocar = document.getElementById('btnEnfocar');
const btnCerrar = document.getElementById('btnCerrar');
const spanEstado = document.getElementById('estadoVentana');

btnAbrir.addEventListener('click', () => {
  // Abre la ventana emergente con tamaño de 480x640 y nombre 'previa'
  ventanaPrevia = open('previa.html', 'previa', 'width=480,height=640,left=100,top=100');
  
  // Tratar el caso null (bloqueador de popups)
  if (ventanaPrevia === null) {
    alert('El navegador ha bloqueado la ventana emergente. Permítelas para este sitio.');
  }
});

btnEnfocar.addEventListener('click', () => {
  if (ventanaPrevia && !ventanaPrevia.closed) {
    ventanaPrevia.focus();
  }
});

btnCerrar.addEventListener('click', () => {
  if (ventanaPrevia && !ventanaPrevia.closed) {
    ventanaPrevia.close();
  }
});

// Comprobar cada segundo si la ventana está abierta o cerrada
setInterval(() => {
  if (ventanaPrevia !== null && !ventanaPrevia.closed) {
    spanEstado.textContent = 'Abierta';
    spanEstado.style.color = 'green';
  } else {
    spanEstado.textContent = 'Cerrada';
    spanEstado.style.color = 'red';
  }
}, 1000);


// =========================================================================
// 2 & 3. ENVIAR FICHA CON postMessage Y RECIBIR CONFIRMACIÓN
// =========================================================================
const btnEnviar = document.getElementById('btnEnviar');
const pConfirmacion = document.getElementById('estadoConfirmacion');

btnEnviar.addEventListener('click', () => {
  if (ventanaPrevia === null || ventanaPrevia.closed) {
    alert('Primero debes abrir la ventana de vista previa.');
    return;
  }

  const objetoFicha = {
    titulo: 'Dune: Parte 2',
    precio: 14.99,
    fecha: new Date().toISOString()
  };

  // Enviar mensaje asegurando el origen de destino (location.origin)
  ventanaPrevia.postMessage(objetoFicha, location.origin);
});

// Escuchar la respuesta de la ventana secundaria
window.addEventListener('message', (evento) => {
  // Comprobar el origen por seguridad
  if (evento.origin !== location.origin) {
    console.warn('Mensaje ignorado de origen no confiable:', evento.origin);
    return;
  }

  if (evento.data && evento.data.tipo === 'ok') {
    pConfirmacion.textContent = 'Confirmación recibida: la vista previa procesó la ficha correctamente.';
  }
});

/*
  ¿Qué pasa si el origen de destino no coincide y por qué?
  -------------------------------------------------------------------------
  Si en `postMessage` se especifica un origen que no coincide con el de la ventana 
  receptora (o si el receptor descarta mensajes donde `evento.origin !== location.origin`), 
  el navegador bloquea la entrega del mensaje. 
  ¿Por qué? Por la **política de mismo origen (Same-Origin Policy)**. Es un pilar 
  fundamental de seguridad web para evitar que scripts maliciosos de dominios ajenos 
  intercepten o inyecten datos confidenciales en ventanas o pestañas abiertas del usuario.
*/


// =========================================================================
// 4. SINCRONIZACIÓN DE TEMA ENTRE PESTAÑAS (BroadcastChannel)
// =========================================================================
const canalPreferencias = new BroadcastChannel('preferencias_tema');
const btnCambiarTema = document.getElementById('btnCambiarTema');

btnCambiarTema.addEventListener('click', () => {
  const temaActual = document.body.dataset.tema;
  const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
  
  // Cambiar en la pestaña actual
  document.body.dataset.tema = nuevoTema;

  // Emitir por el canal (BroadcastChannel NUNCA recibe sus propios mensajes)
  canalPreferencias.postMessage({ tema: nuevoTema });
});

// Recibir mensajes de las otras pestañas
canalPreferencias.addEventListener('message', (evento) => {
  if (evento.data && evento.data.tema) {
    document.body.dataset.tema = evento.data.tema;
    console.log('Tema sincronizado desde otra pestaña:', evento.data.tema);
  }
});