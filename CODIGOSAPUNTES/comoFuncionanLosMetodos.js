typeof 'hola'; // 'string'
typeof new String('hola'); // 'object' ← no lo hagas
'hola' === 'hola'; // true
new String('hola') === new String('hola'); // false (son dos objetos distintos)