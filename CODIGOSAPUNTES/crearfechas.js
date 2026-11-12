/*Fechas */

const ahora = new Date(); // instante actual
const fijo = new Date(2026, 9, 13, 8, 30); // 13 de octubre de 2026, 8:30 (¡mes 9 = octubre!)
const iso = new Date('2026-10-13T08:30:00'); // desde texto ISO 8601, hora local
const soloFecha = new Date('2026-10-13'); // ¡cuidado! esto se interpreta como UTC
const desdeMs = new Date(0); // 1 de enero de 1970, 00:00 UTC
Date.now(); // milisegundos actuales, como número

const f = new Date(2026, 0, 31); // 31 de enero
f.setDate(f.getDate() + 1); // 1 de febrero: el desbordamiento pasa de mes solo
f.setMonth(f.getMonth() + 12); // un año después, 1 de febrero de 2027

// Diferencia en días entre dos fechas: restar da milisegundos
const inicio = new Date(2026, 8, 14);
const fin = new Date(2026, 11, 18);
const dias = Math.round((fin - inicio) / (1000 * 60 * 60 * 24)); // 95

//No hacer fechas a mano

const fecha = new Date(2026, 9, 13, 8, 30);
new Intl.DateTimeFormat('es-ES').format(fecha); // '13/10/2026'
new Intl.DateTimeFormat('en-US').format(fecha); // '10/13/2026'
new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(fecha);
// '13 de octubre de 2026'
new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeStyle: 'short' }).format(fecha);
// 'martes, 13 de octubre de 2026, 8:30'
new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'short' }).format(fecha);
// 'martes, 13 oct'
new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(fecha);
// '08:30:00'

const precio = 1234.5;
new Intl.NumberFormat('es-ES').format(precio); // '1234,5'
new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);
// '1234,50 €'
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(precio);
// '$1,234.50'
new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(precio);
// '1.234,50 €'
new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 1 }).format(0.1667);
// '16,7 %'
new Intl.NumberFormat('es-ES', { style: 'unit', unit: 'kilometer' }).format(42.195);
// '42,195 km'
new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(7);
// '7,00'

//Otrps formateadores
// Tiempo relativo: «hace 3 días», «dentro de 2 horas»
const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
rtf.format(-3, 'day'); // 'hace 3 días'
rtf.format(1, 'day'); // 'mañana' (gracias a numeric: 'auto')
rtf.format(2, 'hour'); // 'dentro de 2 horas'
// Listas: «a, b y c»
new Intl.ListFormat('es', { type: 'conjunction' }).format(['HTML', 'CSS', 'JavaScript']);
// 'HTML, CSS y JavaScript'
// Plurales: elegir la forma correcta
const pr = new Intl.PluralRules('es');
pr.select(1); // 'one'
pr.select(3); // 'other'