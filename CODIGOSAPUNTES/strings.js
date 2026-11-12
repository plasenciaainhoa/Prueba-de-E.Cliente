const nombre = ' ada LOVELACE ';
const limpio = nombre.trim(); // 'ada LOVELACE'
const partes = limpio.split(' '); // ['ada', 'LOVELACE']
const inicial = partes[0].at(0).toUpperCase(); // 'A'

const resto = partes[0].slice(1).toLowerCase(); // 'da'
console.log(`${inicial}${resto} ${partes[1].toUpperCase()}`); // 'Ada LOVELACE'