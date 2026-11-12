/*Pide con prompt una fecha de nacimiento ISO. Muestra la edad en años cumplidos, el día de la semana en que nació (español, con Intl) y los días que faltan para el próximo cumpleaños. Valida fechas inválidas y trata null (cancelar).
Días hasta el 18 de diciembre de 2026, con Intl.RelativeTimeFormat («dentro de N días» / «hace N días»).
console.table de un importe (1234.5) en es-ES/EUR, en-US/USD, de-DE/EUR y ja-JP/JPY. Un formateador por idioma, creado una sola vez.
De '12.5,8,1250,0.99', genera una tabla en la página con cada precio en euros, con IGIC del 7 % y el porcentaje con style: 'percent'. */

console.log('=== INICIO DE LA ACTIVIDAD: Fechas, Intl e Importes ===\n');

// =========================================================================
// 1. EDAD EXACTA, DÍA DE LA SEMANA Y DÍAS PARA EL PRÓXIMO CUMPLEAÑOS
// =========================================================================
function procesarFechaNacimiento() {
  const entrada = prompt('Introduce tu fecha de nacimiento en formato ISO (AAAA-MM-DD):');

  // Tratar cancelación (null) o cadena vacía
  if (entrada === null) {
    console.log('[1. Edad] Operación cancelada por el usuario.');
    return;
  }
  
  const textoLimpio = entrada.trim();
  if (textoLimpio === '') {
    console.warn('[1. Edad] No se introdujo ningún texto.');
    return;
  }

  const fechaNacimiento = new Date(textoLimpio);

  // Validar si la fecha es inválida (getTime() da NaN) o el formato no es correcto
  if (Number.isNaN(fechaNacimiento.getTime())) {
    console.error('[1. Edad] Error: La fecha introducida no es válida o el formato es incorrecto.');
    return;
  }

  const hoy = new Date();
  
  // Calcular años cumplidos
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  // Día de la semana en que nació (usando Intl en español)
  const formateadorDia = new Intl.DateTimeFormat('es-ES', { weekday: 'long' });
  const diaNacimiento = formateadorDia.format(fechaNacimiento);

  // Calcular días para el próximo cumpleaños
  const proximoCumple = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());
  if (proximoCumple < hoy) {
    proximoCumple.setFullYear(hoy.getFullYear() + 1);
  }
  const diferenciaMs = proximoCumple - hoy;
  const diasFaltantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

  console.log('--- 1. Datos de Nacimiento ---');
  console.table({
    'Fecha Introducida': textoLimpio,
    'Edad Cumplida': `${edad} años`,
    'Día de la Semana': diaNacimiento,
    'Días para el Próximo Cumpleaños': diasFaltantes
  });
}

// Ejecutar el punto 1
procesarFechaNacimiento();


// =========================================================================
// 2. CUENTA DE DÍAS HASTA EL 18 DE DICIEMBRE DE 2026 (Relativo)
// =========================================================================
function calcularCuentaAtrasDiciembre() {
  const hoy = new Date();
  // Limpiar horas para comparar solo días naturales
  hoy.setHours(0, 0, 0, 0);
  
  const fechaObjetivo = new Date(2026, 11, 18); // Mes 11 es diciembre
  fechaObjetivo.setHours(0, 0, 0, 0);

  const diferenciaDias = Math.round((fechaObjetivo - hoy) / (1000 * 60 * 60 * 24));

  // Usar Intl.RelativeTimeFormat con numeric: 'auto'
  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  const textoRelativo = rtf.format(diferenciaDias, 'day');

  console.log('--- 2. Cuenta atrás para el 18 de diciembre de 2026 ---');
  console.log(`Días exactos: ${diferenciaDias}`);
  console.log(`Formato relativo (Intl): "${textoRelativo}"`);
}

calcularCuentaAtrasDiciembre();


// =========================================================================
// 3. MISMO IMPORTE EN CUATRO PAÍSES (console.table)
// =========================================================================
function compararImportesInternacionales() {
  const importe = 1234.5;

  // Crear formateadores una sola vez por idioma/moneda según las buenas prácticas
  const fmtEspana = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
  const fmtEEUU = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const fmtAlemania = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  const fmtJapon = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });

  const resultadosImportes = [
    { Pais: 'España (es-ES)', Moneda: 'EUR', Formato: fmtEspana.format(importe) },
    { Pais: 'Estados Unidos (en-US)', Moneda: 'USD', Formato: fmtEEUU.format(importe) },
    { Pais: 'Alemania (de-DE)', Moneda: 'EUR', Formato: fmtAlemania.format(importe) },
    { Pais: 'Japón (ja-JP)', Moneda: 'JPY', Formato: fmtJapon.format(importe) }
  ];

  console.log('--- 3. Comparativa internacional de importes ---');
  console.table(resultadosImportes);
}

compararImportesInternacionales();


// =========================================================================
// 4. TABLA DE PRECIOS LOCALIZADA CON IGIC (7%) EN LA PÁGINA
// =========================================================================
function generarTablaPreciosIgic() {
  const cadenaPrecios = '12.5,8,1250,0.99';
  const arrayPrecios = cadenaPrecios.split(',').map(Number);
  const porcentajeIgic = 0.07;

  // Formateadores reutilizables
  const fmtMoneda = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
  const fmtPorcentaje = new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 0 });

  let htmlTabla = `
    <table border="1" cellpadding="8" style="border-collapse: collapse; font-family: sans-serif;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th>Precio Base</th>
          <th>IGIC (${fmtPorcentaje.format(porcentajeIgic)})</th>
          <th>Total con IGIC</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const base of arrayPrecios) {
    const igic = base * porcentajeIgic;
    const total = base + igic;

    htmlTabla += `
      <tr>
        <td>${fmtMoneda.format(base)}</td>
        <td>${fmtMoneda.format(igic)}</td>
        <td><strong>${fmtMoneda.format(total)}</strong></td>
      </tr>
    `;
  }

  htmlTabla += `
      </tbody>
    </table>
  `;

  // Insertar en la página de forma segura buscando el contenedor <main id="salida">
  const contenedorSalida = document.getElementById('salida');
  if (contenedorSalida) {
    contenedorSalida.innerHTML = `<h3>Tabla de Precios con IGIC</h3>` + htmlTabla;
    console.log('--- 4. Tabla de precios generada correctamente en el elemento #salida de la página ---');
  } else {
    console.warn('--- 4. No se encontró el elemento #salida en el DOM, se muestra el HTML por consola: ---');
    console.log(htmlTabla);
  }
}

generarTablaPreciosIgic();