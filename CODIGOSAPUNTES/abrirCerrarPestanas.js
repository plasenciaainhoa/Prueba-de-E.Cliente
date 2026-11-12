// Pestaña nueva (lo habitual)
const pestana = open('https://developer.mozilla.org', '_blank');
// Ventana emergente con tamaño y posición
const popup = open('vista-previa.html', 'previa', 'width=480,height=640,left=100,top=100');
// Volver a usar el mismo nombre reutiliza la ventana en lugar de abrir otra
open('vista-previa.html?id=2', 'previa');

const nueva = open('ayuda.html', '_blank');
if (nueva === null) {
avisar('El navegador ha bloqueado la ventana. Permite las ventanas emergentes para este sitio.');
}

//comunicación de ventanas
// En la ventana principal: abrir y enviar
const previa = open('previa.html', 'previa', 'width=480,height=640');
setTimeout(() => {
previa.postMessage({ tipo: 'ficha', titulo: 'Dune', precio: 12.5 }, location.origin);
}, 1000); // damos tiempo a que cargue (en la UD7 lo haremos bien, con el evento load)
// En previa.html: recibir
addEventListener('message', (evento) => {
if (evento.origin !== location.origin) {
return; // ignoramos mensajes de otros sitios
}
console.log('Recibido de', evento.origin, evento.data);
document.getElementById('salida').textContent = `${evento.data.titulo}: ${evento.data.precio} €`;
// Responder a quien nos abrió:
evento.source.postMessage({ tipo: 'ok' }, evento.origin);
});

//cominicación pestañas del mismo origen 

// BroadcastChannel: un «canal de radio» con nombre
const canal = new BroadcastChannel('preferencias');
canal.postMessage({ tema: 'oscuro' }); // emite a las demás pestañas (no a sí misma)
canal.addEventListener('message', (evento) => { // recibe en las demás
    document.body.dataset.tema = evento.data.tema;
});