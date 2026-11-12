// Función tradicional
function sumar(a, b) {
    return a + b;
}

// Función de flecha (Arrow function - muy usada hoy en día)
const multiplicar = (a, b) => {
    return a * b;
};

// Versión corta de una función de flecha
const saludar = nombre => `Hola, ${nombre}`;

console.log(sumar(5, 3));       // 8
console.log(saludar("Ainhoa")); // Hola, Ainhoa