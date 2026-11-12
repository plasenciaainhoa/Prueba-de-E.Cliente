// Condicional (if / else)
let rating = 4;

if (rating >= 4) {
    console.log("¡Reseña excelente!");
} else {
    console.log("Reseña normal o baja.");
}

// Bucle for para recorrer un array
let tracks = ["Track 1", "Track 2", "Track 3"];

for (let i = 0; i < tracks.length; i++) {
    console.log(`Pista: ${tracks[i]}`);
}

// Bucle moderno (forEach)
tracks.forEach((track, index) => {
    console.log(`${index + 1}: ${track}`);
});