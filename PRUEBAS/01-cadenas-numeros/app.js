/*generarSlug(titulo): 'Canción de Navidad (edición 2026)' → 'cancion-de-navidad-edicion-2026'.
normalizarNombre(texto): ' aDA loveLACE ' → 'Ada Lovelace' (sin espacios sobrantes, cada palabra capitalizada).
aleatorioEntre(min, max): entero, ambos incluidos.
leerNumero(texto): devuelve el número o null si no es válido. Debe dar null con '', 'abc' y ' ', y 42 con '42'.
Muestra con console.table al menos 5 casos de prueba de cada función. */

/**
 * 1. generarSlug(titulo)
 * Convierte un título en un identificador apto para URLs o nombres de ficheros.
 * @param {string} titulo - Texto de entrada.
 * @returns {string} Slug generado.
 */
function generarSlug(titulo) {
  if (typeof titulo !== 'string') return '';
  return titulo
    .normalize('NFD')                     // Descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '')     // Elimina los signos diacríticos (tildes)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')        // Elimina caracteres especiales salvo espacios y guiones
    .replace(/[\s_]+/g, '-')             // Reemplaza espacios y guiones bajos por guiones
    .replace(/-+/g, '-');                // Agrupa múltiples guiones consecutivos
}

/**
 * 2. normalizarNombre(texto)
 * Limpia espacios sobrantes y capitaliza cada palabra del nombre.
 * @param {string} texto - Nombre desestructurado o con espacios.
 * @returns {string} Nombre normalizado.
 */
function normalizarNombre(texto) {
  if (typeof texto !== 'string') return '';
  return texto
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(' ');
}

/**
 * 3. aleatorioEntre(min, max)
 * Genera un número entero aleatorio entre min y max, ambos incluidos.
 * @param {number} min - Valor mínimo.
 * @param {number} max - Valor máximo.
 * @returns {number} Número entero aleatorio.
 */
function aleatorioEntre(min, max) {
  const minEntero = Math.ceil(min);
  const maxEntero = Math.floor(max);
  return Math.floor(Math.random() * (maxEntero - minEntero + 1)) + minEntero;
}

/**
 * 4. leerNumero(texto)
 * Convierte un texto a número, validando espacios y cadenas vacías.
 * @param {string|number} texto - Entrada a evaluar.
 * @returns {number|null} El número parseado o null si no es válido.
 */
function leerNumero(texto) {
  if (typeof texto !== 'string' && typeof texto !== 'number') return null;
  const textoLimpio = String(texto).trim();
  if (textoLimpio === '') return null;
  
  const num = Number(textoLimpio);
  return Number.isNaN(num) ? null : num;
}

// ==========================================
// CASOS DE PRUEBA (console.table)
// ==========================================

console.log('=== CASOS DE PRUEBA: E01 · Cadenas y números ===\n');

// Pruebas 1: generarSlug
console.log('--- 1. Pruebas de generarSlug ---');
const pruebasSlug = [
  { entrada: 'Canción de Navidad (edición 2026)', esperado: 'cancion-de-navidad-edicion-2026', obtenido: generarSlug('Canción de Navidad (edición 2026)') },
  { entrada: '  ¡Hola, mundo!  ', esperado: 'hola-mundo', obtenido: generarSlug('  ¡Hola, mundo!  ') },
  { entrada: 'JavaScript & Node.js -- Avanzado', esperado: 'javascript-nodejs-avanzado', obtenido: generarSlug('JavaScript & Node.js -- Avanzado') },
  { entrada: 'C&A, B&B y A.B.C.', esperado: 'ca-bb-y-abc', obtenido: generarSlug('C&A, B&B y A.B.C.') },
  { entrada: '---Programación 101---', esperado: 'programacion-101', obtenido: generarSlug('---Programación 101---') }
];
console.table(pruebasSlug);

// Pruebas 2: normalizarNombre
console.log('--- 2. Pruebas de normalizarNombre ---');
const pruebasNombre = [
  { entrada: '  aDA   loveLACE ', esperado: 'Ada Lovelace', obtenido: normalizarNombre('  aDA   loveLACE ') },
  { entrada: 'JUAN carlos DE LA rosa', esperado: 'Juan Carlos De La Rosa', obtenido: normalizarNombre('JUAN carlos DE LA rosa') },
  { entrada: '  mArÍa    gARCíA  ', esperado: 'María García', obtenido: normalizarNombre('  mArÍa    gARCíA  ') },
  { entrada: 'ALAN', esperado: 'Alan', obtenido: normalizarNombre('ALAN') },
  { entrada: '   eLIZABETH   tAYLOR  ', esperado: 'Elizabeth Taylor', obtenido: normalizarNombre('   eLIZABETH   tAYLOR  ') }
];
console.table(pruebasNombre);

// Pruebas 3: aleatorioEntre
console.log('--- 3. Pruebas de aleatorioEntre [1, 5] ---');
const pruebasAleatorio = Array.from({ length: 5 }, (_, i) => {
  const min = 1;
  const max = 5;
  const obtenido = aleatorioEntre(min, max);
  return {
    intento: i + 1,
    rango: `[${min}, ${max}]`,
    obtenido: obtenido,
    valido: obtenido >= min && obtenido <= max
  };
});
console.table(pruebasAleatorio);

// Pruebas 4: leerNumero
console.log('--- 4. Pruebas de leerNumero ---');
const pruebasLeerNumero = [
  { entrada: '42', esperado: 42, obtenido: leerNumero('42') },
  { entrada: '"" (vacío)', esperado: null, obtenido: leerNumero('') },
  { entrada: '"abc"', esperado: null, obtenido: leerNumero('abc') },
  { entrada: '"   " (espacios)', esperado: null, obtenido: leerNumero('   ') },
  { entrada: '"  -15.5 "', esperado: -15.5, obtenido: leerNumero('  -15.5 ') }
];
console.table(pruebasLeerNumero);