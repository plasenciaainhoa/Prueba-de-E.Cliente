/**
 * 5. Alternar tema (claro/oscuro) y actualizar el título de la página.
 */
const btnTema = document.getElementById('tema');

btnTema.addEventListener('click', () => {
  // Comprobar el tema actual en el dataset del body
  const temaActual = document.body.dataset.tema;
  const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';

  // Aplicar el nuevo tema
  document.body.dataset.tema = nuevoTema;

  // Reflejar el tema activo en el document.title de la pestaña
  document.title = `UD3 · Tema ${nuevoTema.charAt(0).toUpperCase() + nuevoTema.slice(1)}`;
});