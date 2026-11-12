// Escribir: nombre=valor; atributos separados por punto y coma
document.cookie = 'tema=oscuro; max-age=31536000; path=/; SameSite=Lax';
document.cookie = 'idioma=es-ES; max-age=31536000; path=/; SameSite=Lax';

// Leer: una única cadena con TODAS las cookies accesibles
console.log(document.cookie); // 'tema=oscuro; idioma=es-ES'

// Borrar: la misma cookie con caducidad cero
document.cookie = 'tema=; max-age=0; path=/';

//Solo guarda texto. Si guardas un número, recuperas una cadena
const preferencias = { tema: 'oscuro', idioma: 'es-ES', moneda: 'EUR', porPagina: 10 };

// Guardar: objeto → texto JSON
localStorage.setItem('preferencias', JSON.stringify(preferencias));
// En Application → Local Storage verás: {"tema":"oscuro","idioma":"es-ES","moneda":"EUR","porPagina":10}
// Leer: texto JSON → objeto (o null si no había nada)

const guardadas = JSON.parse(localStorage.getItem('preferencias'));
console.log(guardadas?.tema); // 'oscuro' (?. evita el error si guardadas es null)


//Cuando una pestaña modifica localStorage, las demás pestañas del mismo origen reciben un evento storage
addEventListener('storage', (evento) => {
if (evento.key === 'preferencias') {
const nuevas = JSON.parse(evento.newValue);
document.body.dataset.tema = nuevas.tema;
}
});



//Como leer una cookie concreta obliga a trocear la cadena

/**
* Devuelve el valor de una cookie o null si no existe.
* @param {string} nombre
* @returns {string | null}
*/
function leerCookie(nombre) {
for (const par of document.cookie.split('; ')) {
const [clave, valor] = par.split('='); // desestructuración: lo verás en la UD4
if (clave === nombre) {
return decodeURIComponent(valor);
}
}
return null;
}

//Los dos tienen la misma API, sencillísima, y solo se diferencian en cuánto duran y en si se comparten entre pestañas

localStorage.setItem('tema', 'oscuro'); // guardar (clave y valor, ambos texto)
localStorage.getItem('tema'); // 'oscuro' (o null si no existe)
localStorage.removeItem('tema'); // borrar una clave
localStorage.clear(); // borrar todo lo de este origen
localStorage.length; // cuántas claves hay
localStorage.key(0); // nombre de la primera clave