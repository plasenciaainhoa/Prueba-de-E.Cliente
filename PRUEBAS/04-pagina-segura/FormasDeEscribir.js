/*Con textContent, innerHTML e insertAdjacentHTML('beforeend', …) escribe <b>Hola</b> en #salida de tres formas distintas, y explica en un comentario la diferencia.
Pide un nombre con prompt y una lista de tecnologías separadas por comas. Genera con una plantilla literal un <article> con <h2> y <ul>, acumulando el HTML en un bucle y asignándolo una sola vez.
Primero hazlo vulnerable e intenta <img src=x onerror="alert('XSS')">. Después arréglalo de las dos formas (dos ficheros): textContent y escaparHtml (con JSDoc, escribiéndola tú).
Botón Cambiar tema: alterna document.body.dataset.tema entre claro y oscuro (con CSS [data-tema="oscuro"]) y refleja el tema en document.title. */


/**
 * 1. Tres formas de escribir en la página
 */
const salida = document.getElementById('salida');
// A. Usando textContent (Trata las etiquetas HTML como texto plano)
salida.textContent = '<b>Hola</b> (textContent)';

// B. Usando innerHTML (Interpreta el texto como etiquetas HTML y sustituye el contenido)
salida.innerHTML = '<b>Hola</b> (innerHTML)';

// C. Usando insertAdjacentHTML (Añade HTML en la posición indicada sin borrar lo anterior)
salida.insertAdjacentHTML('beforeend', '<p><b>Hola</b> (insertAdjacentHTML)</p>');

/*
  DIFERENCIAS EXPLICADAS:
  - textContent: Inserta estrictamente texto plano. Si le pasas etiquetas como <b>, 
    las mostrará literalmente en la pantalla en lugar de aplicarlas. Es seguro frente a XSS.
  - innerHTML: Analiza el texto como marcado HTML y sustituye todo el contenido previo 
    del elemento por el nuevo. Si el contenido viene de un usuario, es peligroso (vulnerable a XSS).
  - insertAdjacentHTML: Permite insertar marcado HTML en una posición específica 
    ('beforebegin', 'afterbegin', 'beforeend', 'afterend') sin borrar el contenido existente 
    en el contenedor.
*/