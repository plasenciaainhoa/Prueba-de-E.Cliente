/**
 * UD3 · A9. Lógica de almacenamiento, contadores y eventos (CE g, h)
 */

// =========================================================================
// 1. CONTADOR DE VISITAS TRIPLE (Cookie con max-age, localStorage, sessionStorage)
// =========================================================================
function gestionarVisitas() {
  // A. COOKIE (duración de 1 año con max-age)
  let visCookie = Number(leerCookie('visitas_cookie')) || 0;
  visCookie++;
  document.cookie = `visitas_cookie=${visCookie}; max-age=31536000; path=/; SameSite=Lax`;
  document.getElementById('visitasCookie').textContent = `Cookie (1 año): ${visCookie} visitas`;

  // B. LOCALSTORAGE (persiste indefinidamente)
  let visLocal = Number(localStorage.getItem('visitas_local')) || 0;
  visLocal++;
  localStorage.setItem('visitas_local', visLocal);
  document.getElementById('visitasLocal').textContent = `localStorage (indefinido): ${visLocal} visitas`;

  // C. SESSIONSTORAGE (vive solo mientras dure la pestaña)
  let visSession = Number(sessionStorage.getItem('visitas_session')) || 0;
  visSession++;
  sessionStorage.setItem('visitas_session', visSession);
  document.getElementById('visitasSession').textContent = `sessionStorage (pestaña): ${visSession} visitas`;
}

gestionarVisitas();


// =========================================================================
// 2 & 3. GUARDAR OBJETO CON VERSION, NUM Y BOOLEANO, Y MOSTRAR SUS typeof
// =========================================================================
const objetoPreferenciasDefecto = {
  version: 1,
  porPagina: 10,       // número
  modoOscuro: false    // booleano
};

// Guardamos el objeto utilizando la función segura de almacen.js
guardar('preferencias_proyecto', objetoPreferenciasDefecto);

// Recuperamos el objeto usando cargar() (si corrompes el JSON en Application, cargará por defecto sin romper la app)
const prefsRecuperadas = cargar('preferencias_proyecto', objetoPreferenciasDefecto);

const contenedorPrefs = document.getElementById('salidaPreferencias');
contenedorPrefs.innerHTML = `
  <h3>Objeto Recuperado de localStorage</h3>
  <p><strong>version:</strong> ${prefsRecuperadas.version} (typeof: ${typeof prefsRecuperadas.version})</p>
  <p><strong>porPagina:</strong> ${prefsRecuperadas.porPagina} (typeof: ${typeof prefsRecuperadas.porPagina})</p>
  <p><strong>modoOscuro:</strong> ${prefsRecuperadas.modoOscuro} (typeof: ${typeof prefsRecuperadas.modoOscuro})</p>
`;


// =========================================================================
// 5. ESCUCHAR EL EVENTO STORAGE (Sincronización entre pestañas)
// =========================================================================
window.addEventListener('storage', (evento) => {
  const aviso = document.getElementById('avisoStorage');
  if (evento.key) {
    aviso.textContent = `Aviso: La otra pestaña ha modificado la clave "${evento.key}" (Nuevo valor: ${evento.newValue})`;
    
    // Si la clave modificada fue la de preferencias, podemos recargarla en pantalla automáticamente
    if (evento.key === 'preferencias_proyecto') {
      console.log('Preferencias actualizadas desde otra pestaña.');
    }
  }
});


// =========================================================================
// 6. TABLA COMPARATIVA (Comentario teórico requerido)
// =========================================================================
/*
  TABLA COMPARATIVA DE MECANISMOS DE ALMACENAMIENTO:
  -----------------------------------------------------------------------------------------
  Mecanismo     | Duración                                  | ¿Viaja al servidor? | ¿Se comparte entre pestañas?
  -----------------------------------------------------------------------------------------
  Cookie        | Lo que indique max-age/expires (o sesión) | SÍ (en cada petición)| SÍ (mismo dominio/ruta)
  localStorage  | Indefinida (hasta que se borre)           | NO                  | SÍ (mismo origen)
  sessionStorage| Hasta cerrar la pestaña                   | NO                  | NO (exclusivo de cada pestaña)
  -----------------------------------------------------------------------------------------
*/