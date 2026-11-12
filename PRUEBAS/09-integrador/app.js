/**
 * Lógica de la página de inicio (Reloj y aplicación global de preferencias)
 */

const PREFS_DEFECTO_INICIO = {
  version: 1,
  tema: 'sistema',
  idioma: 'es-ES',
  moneda: 'EUR',
  porPagina: 10
};

// R3: Cargar y aplicar preferencias al iniciar cualquier página
const prefs = cargar('preferencias_proyecto', PREFS_DEFECTO_INICIO);

document.documentElement.lang = prefs.idioma;
if (prefs.tema === 'sistema') {
  const prefiereOscuro = matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.dataset.tema = prefiereOscuro ? 'oscuro' : 'claro';
} else {
  document.body.dataset.tema = prefs.tema;
}

// R7: Reloj actualizado cada segundo utilizando el idioma de las preferencias
function iniciarReloj() {
  const divHora = document.getElementById('relojHora');
  const divFecha = document.getElementById('relojFecha');

  const fmtHora = new Intl.DateTimeFormat(prefs.idioma, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const fmtFecha = new Intl.DateTimeFormat(prefs.idioma, {
    dateStyle: 'full'
  });

  setInterval(() => {
    const ahora = new Date();
    divHora.textContent = fmtHora.format(ahora);
    divFecha.textContent = fmtFecha.format(ahora);
  }, 1000);
}

iniciarReloj();

// Sincronización en tiempo real de pestañas abiertas (Extra / O1)
window.addEventListener('storage', (evento) => {
  if (evento.key === 'preferencias_proyecto' && evento.newValue) {
    location.reload(); // Recarga simple para aplicar cambios globales instantáneos en el inicio
  }
});