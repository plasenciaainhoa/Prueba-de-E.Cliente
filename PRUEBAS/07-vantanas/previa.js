/**
 * UD3 · A8. Ventana Secundaria / Previa (CE b, f, h)
 */

window.addEventListener('message', (evento) => {
  // 1. Comprobar rigurosamente el origen del mensaje
  if (evento.origin !== location.origin) {
    console.warn('Origen no autorizado:', evento.origin);
    return;
  }

  const datos = evento.data;
  const contenedor = document.getElementById('salidaPrevia');

  // 2. Formatear con Intl (según los estándares de la UD3)
  const fmtMoneda = new Intl.NumberFormat('es-ES', { 
    style: 'currency', 
    currency: 'EUR' 
  });
  
  const fmtFecha = new Intl.DateTimeFormat('es-ES', { 
    dateStyle: 'long', 
    timeStyle: 'short' 
  });

  const fechaFormateada = fmtFecha.format(new Date(datos.fecha));
  const precioFormateado = fmtMoneda.format(datos.precio);

  // 3. Mostrar en la página de forma segura
  contenedor.innerHTML = `
    <h2>Ficha Recibida</h2>
    <p><strong>Título:</strong> ${datos.titulo}</p>
    <p><strong>Precio:</strong> ${precioFormateado}</p>
    <p><strong>Fecha:</strong> ${fechaFormateada}</p>
  `;

  // 4. Responder 'ok' a la ventana principal utilizando evento.source
  if (evento.source) {
    evento.source.postMessage({ tipo: 'ok' }, evento.origin);
  }
});