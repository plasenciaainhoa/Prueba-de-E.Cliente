/*preferencias.html + index.html con:

R1: 4 controles (tema claro/oscuro/sistema, idioma, moneda, elementos por página).
R2: «Guardar» guarda un objeto JSON {version, tema, idioma, moneda, porPagina} con tus funciones.
R3: al cargar cualquier página, se aplican las preferencias: dataset.tema (con matchMedia si es «sistema») y lang del <html>.
R4: vista previa con 1234.5 formateado, la fecha de hoy con dateStyle: 'full' y un RelativeTimeFormat.
R5: aviso de consentimiento con «Aceptar» y «Rechazar» igual de visibles. Si rechaza, las preferencias van solo a sessionStorage.
R6: «Borrar mis datos» (localStorage.clear() + sessionStorage.clear()), vuelve a los valores por defecto, reaparece el aviso y un toast confirma cada acción.
R7: reloj en index.html en el idioma de las preferencias.
Extra (si te sobra tiempo): sincroniza el tema entre pestañas con el evento storage. */

/**
 * Lógica de la página de preferencias
 */

const PREFS_DEFECTO = {
  version: 1,
  tema: 'sistema',
  idioma: 'es-ES',
  moneda: 'EUR',
  porPagina: 10
};

// Cargar estado inicial o valores por defecto
let preferenciasActuales = cargar('preferencias_proyecto', PREFS_DEFECTO);
let consentimientoOtorgado = localStorage.getItem('consentimiento');

const dialogoConsentimiento = document.getElementById('dialogoConsentimiento');
const toast = document.getElementById('toast');

function mostrarToast(texto) {
  toast.textContent = texto;
  setTimeout(() => { toast.textContent = ''; }, 3000);
}

// R3: Aplicar preferencias al cargar la página
function aplicarPreferencias(prefs) {
  // Aplicar idioma al HTML
  document.documentElement.lang = prefs.idioma;

  // Aplicar tema
  if (prefs.tema === 'sistema') {
    const prefiereOscuro = matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.dataset.tema = prefiereOscuro ? 'oscuro' : 'claro';
  } else {
    document.body.dataset.tema = prefs.tema;
  }
}

// R4: Actualizar la vista previa con Intl
function actualizarVistaPrevia(prefs) {
  // 1. Importe formateado
  const fmtMoneda = new Intl.NumberFormat(prefs.idioma, { style: 'currency', currency: prefs.moneda });
  document.getElementById('pvImporte').textContent = `Importe de ejemplo: ${fmtMoneda.format(1234.5)}`;

  // 2. Fecha de hoy con dateStyle: 'full'
  const fmtFecha = new Intl.DateTimeFormat(prefs.idioma, { dateStyle: 'full' });
  document.getElementById('pvFecha').textContent = `Fecha actual: ${fmtFecha.format(new Date())}`;

  // 3. RelativeTimeFormat (ejemplo: hace 3 días)
  const rtf = new Intl.RelativeTimeFormat(prefs.idioma, { numeric: 'auto' });
  document.getElementById('pvRelativo').textContent = `Tiempo relativo: ${rtf.format(-3, 'day')}`;
}

// Inicializar formulario con los valores actuales
function rellenarFormulario() {
  document.getElementById('selectTema').value = preferenciasActuales.tema;
  document.getElementById('selectIdioma').value = preferenciasActuales.idioma;
  document.getElementById('selectMoneda').value = preferenciasActuales.moneda;
  document.getElementById('selectPorPagina').value = preferenciasActuales.porPagina;
}

// R5: Control del aviso de consentimiento al cargar
window.addEventListener('DOMContentLoaded', () => {
  if (!consentimientoOtorgado) {
    dialogoConsentimiento.showModal();
  }
  aplicarPreferencias(preferenciasActuales);
  rellenarFormulario();
  actualizarVistaPrevia(preferenciasActuales);
});

// Manejo de botones de consentimiento
document.getElementById('btnAceptar').addEventListener('click', () => {
  localStorage.setItem('consentimiento', 'aceptado');
  dialogoConsentimiento.close();
  mostrarToast('Consentimiento aceptado.');
});

document.getElementById('btnRechazar').addEventListener('click', () => {
  localStorage.setItem('consentimiento', 'rechazado');
  dialogoConsentimiento.close();
  mostrarToast('Consentimiento rechazado. Las preferencias solo durarán esta sesión.');
});

// R2 & R5: Guardar preferencias
document.getElementById('formPreferencias').addEventListener('submit', (e) => {
  e.preventDefault();

  preferenciasActuales = {
    version: 1,
    tema: document.getElementById('selectTema').value,
    idioma: document.getElementById('selectIdioma').value,
    moneda: document.getElementById('selectMoneda').value,
    porPagina: Number(document.getElementById('selectPorPagina').value)
  };

  const esRechazado = localStorage.getItem('consentimiento') === 'rechazado';
  // Si rechazó el consentimiento, guardamos estrictamente en sessionStorage (R5)
  guardar('preferencias_proyecto', preferenciasActuales, esRechazado);

  aplicarPreferencias(preferenciasActuales);
  actualizarVistaPrevia(preferenciasActuales);
  mostrarToast('¡Preferencias guardadas con éxito!');
});

// R6: Botón Borrar mis datos
document.getElementById('btnBorrar').addEventListener('click', () => {
  localStorage.clear();
  sessionStorage.clear();
  preferenciasActuales = { ...PREFS_DEFECTO };
  
  aplicarPreferencias(preferenciasActuales);
  rellenarFormulario();
  actualizarVistaPrevia(preferenciasActuales);
  
  mostrarToast('Datos borrados. Se han restaurado los valores por defecto.');
  dialogoConsentimiento.showModal(); // Reaparece el aviso
});

// Sincronización entre pestañas (Extra / O1)
window.addEventListener('storage', (evento) => {
  if (evento.key === 'preferencias_proyecto' && evento.newValue) {
    preferenciasActuales = JSON.parse(evento.newValue);
    aplicarPreferencias(preferenciasActuales);
    rellenarFormulario();
    actualizarVistaPrevia(preferenciasActuales);
    mostrarToast('Preferencias sincronizadas desde otra pestaña.');
  }
});