/*Ejemplos de código para inspeccionar el entorno y los objetos globales del navegador (location, localStorage y navigator). */

console.dir(location);
Object.keys(localStorage); // las claves guardadas (de momento, ninguna)
typeof navigator.language; // 'string'
typeof navigator.share; // 'function' (o 'undefined' si el navegador no lo soporta)


/*
Para la línea console.dir(location);

    Posible pregunta de la profesora: "Escribe una instrucción en JavaScript para volcar y explorar de forma estructurada en la consola del navegador toda la información sobre la URL actual (puerto, host, ruta, etc.)."

2. Para la línea Object.keys(localStorage);

    Posible pregunta de la profesora: "¿Cómo obtendrías un array con los nombres de todas las claves (keys) que hay guardadas actualmente en el almacenamiento local (localStorage) del navegador?"

3. Para la línea typeof navigator.language;

    Posible pregunta de la profesora: "Imagina que necesitas saber el tipo de dato que devuelve la propiedad del navegador que indica el idioma del sistema del usuario. ¿Cómo lo comprobarías?"

4. Para la línea typeof navigator.share;

    Posible pregunta de la profesora: "¿Cómo comprobarías mediante código si el navegador actual soporta nativamente la funcionalidad de compartir contenido (share) antes de intentar utilizarla?"

*/