
//Para leer parametros de la url para no tener que analizar a mano

const params = new URLSearchParams(location.search);
params.get('pagina'); // '2' (siempre texto, o null si no existe)
params.has('orden'); // true
Number(params.get('pagina') ?? 1); // 2, con valor por defecto si falta
// Y para construir una URL con parámetros, al revés:
const nuevos = new URLSearchParams({ pagina: 3, orden: 'fecha' });
nuevos.toString(); // 'pagina=3&orden=fecha'

//Navegar desde el codigo

ocation.href = 'detalle.html?id=7'; // navega (queda en el historial)
location.assign('detalle.html?id=7'); // lo mismo
location.replace('login.html'); // navega SIN dejar la página actual en el historial
location.reload(); // recarga
location.hash = 'resultados'; // salta al elemento con id="resultados" sin recargar

//Moverse por el historial

history.length; // cuántas entradas hay en esta pestaña
history.back(); // como el botón Atrás
history.forward(); // como Adelante
history.go(-2); // dos páginas atrás

navigator.language; // 'es-ES': idioma preferido (apartado 3.4)
navigator.languages; // ['es-ES', 'es', 'en']: todos, por orden de preferencia
navigator.onLine; // true/false: ¿hay conexión?
navigator.userAgent; // texto largo con el navegador y el sistema... poco fiable
navigator.hardwareConcurrency; // núcleos de CPU
navigator.maxTouchPoints; // > 0 en pantallas táctiles
navigator.cookieEnabled; // ¿acepta cookies?