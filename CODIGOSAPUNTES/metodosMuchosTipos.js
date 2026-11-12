const titulo = 'Canción de Navidad (edición 2026)';
const slug = titulo
 .normalize('NFD') // 'Cancio' + '´' + 'n de Navidad …'
 .replace(/[̀-ͯ]/g, '') // quita los acentos: 'Cancion de Navidad (edicion 2026)'
 .toLowerCase()
 .trim()
 .replace(/[^a-z0-9]+/g, '-') // todo lo que no sea letra o dígito → guion
 .replace(/^-+|-+$/g, ''); // quita guiones de los extremos
console.log(slug); // 'cancion-de-navidad-edicion-2026'
