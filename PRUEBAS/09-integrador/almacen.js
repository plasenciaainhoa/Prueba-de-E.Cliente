/**
 * Utilidades de almacenamiento seguro (almacen.js)
 */

function guardar(clave, valor, usarSession = false) {
  try {
    const almacenamiento = usarSession ? sessionStorage : localStorage;
    almacenamiento.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error('Error al guardar:', error);
    return false;
  }
}

function cargar(clave, porDefecto) {
  try {
    // Buscar primero en localStorage; si no está, comprobar sessionStorage (caso rechazo de cookies/consentimiento)
    let texto = localStorage.getItem(clave);
    if (texto === null) {
      texto = sessionStorage.getItem(clave);
    }
    return texto === null ? porDefecto : JSON.parse(texto);
  } catch (error) {
    console.warn('Error al cargar (datos corruptos), usando valor por defecto:', error);
    return porDefecto;
  }
}