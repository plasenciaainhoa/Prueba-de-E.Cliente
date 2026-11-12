// Ejecuta la función UNA vez, pasados 2000 ms
const idAviso = setTimeout(() => {
 console.log('Han pasado dos segundos');
}, 2000);
// Ejecuta la función CADA 1000 ms, hasta que se cancele
let segundos = 0;
const idReloj = setInterval(() => {
 segundos += 1;
 console.log(`${segundos} s`);
}, 1000);
// Cancelar: con el identificador que devolvieron
clearTimeout(idAviso);
clearInterval(idReloj);

//utilizar una funcion ya declarada 
function saludar() {
 console.log('Hola');
}
setTimeout(saludar, 1000); // correcto: entregas la función
setTimeout(saludar(), 1000); // ERROR típico: la llamas ahora y entregas undefined

//cancelar lo que se repita
let restantes = 10;
const id = setInterval(() => {
    restantes -= 1;
 console.log(restantes);
 if (restantes === 0) {
 clearInterval(id); // se cancela a sí misma
 console.log('¡Tiempo!');
 }
}, 1000);

//lo que el temporizador enseña sobre el navegador
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Salida: 1, 3, 2