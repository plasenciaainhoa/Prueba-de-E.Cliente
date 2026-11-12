/**
 * 2. Ficha del proyecto y lista generada con bucle
 */
const nombreUsuario = prompt('¿Cómo te llamas?') || 'Invitado';
const tecnologiasStr = prompt('Introduce tecnologías separadas por comas (ej: HTML, CSS, JavaScript):') || 'HTML, CSS, JavaScript';
const arrayTecnologias = tecnologiasStr.split(',').map(tech => tech.trim());

const contenedor = document.getElementById('salida');

// Acumular los <li> dentro de un bucle (evita repintados múltiples de innerHTML)
let htmlLista = '<ul>';
for (const tech of arrayTecnologias) {
  htmlLista += `<li>${tech}</li>`;
}
htmlLista += '</ul>';

// Generar el <article> con una plantilla literal
contenedor.innerHTML = `
  <article>
    <h2>Ficha técnica de ${nombreUsuario}</h2>
    <p>Tecnologías dominadas:</p>
    ${htmlLista}
  </article>
`;