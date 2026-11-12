/*almacen.js: escribe de memoria guardar(clave, valor) y cargar(clave, porDefecto) con JSON, try…catch y JSDoc.
Contador de visitas triple: cookie (con max-age), localStorage y sessionStorage. Escribe leerCookie(nombre).
Guarda un objeto preferencias con version, un número y un booleano; recupéralo y muestra cada propiedad con su typeof.
Corrompe el valor a mano en Application y comprueba que la página no se rompe.
Escucha el evento storage y escribe en la página qué clave cambió en otra pestaña.
En un comentario, completa: duración, si viaja al servidor y si se comparte entre pestañas, para cookie, localStorage y sessionStorage. */

/**
 * UD3 · A9. Utilidades de almacenamiento (almacen.js)
 */

/**
 * Guarda un valor cualquiera en localStorage como JSON de forma segura.
 * @param {string} clave - Clave bajo la cual se guardará el dato.
 * @param {unknown} valor - Valor a guardar.
 * @returns {boolean} true si se ha guardado con éxito, false si hubo error.
 */
function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error('No se pudo guardar la clave:', clave, error);
    return false;
  }
}

/**
 * Lee un valor guardado en localStorage como JSON; si no existe o está corrupto, devuelve porDefecto.
 * @param {string} clave - Clave a leer.
 * @param {unknown} porDefecto - Valor por defecto si falla o no existe.
 * @returns {unknown} El valor recuperado o el valor por defecto.
 */
function cargar(clave, porDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    return texto === null ? porDefecto : JSON.parse(texto);
  } catch (error) {
    console.warn('Valor corrupto o ilegible en la clave:', clave, error);
    return porDefecto;
  }
}

/**
 * Devuelve el valor de una cookie específica o null si no existe.
 * @param {string} nombre - Nombre de la cookie.
 * @returns {string | null} El valor decodificado o null.
 */
function leerCookie(nombre) {
  for (const par of document.cookie.split('; ')) {
    const [clave, valor] = par.split('=');
    if (clave === nombre) {
      return decodeURIComponent(valor);
    }
  }
  return null;
}