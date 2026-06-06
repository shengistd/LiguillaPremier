// =====================
// DATOS POR CATEGORÍA
// =====================

const categorias = {

  primera: {

    equipos: [
      { nombre: "Amateur FC", escudo: "imagenes/1.png" },
      { nombre: "Def.Las Chimbas", escudo: "imagenes/2.png" },
      { nombre: "Beto FC", escudo: "imagenes/3.png" },
      { nombre: "Incas Futbol", escudo: "imagenes/4.png" },
    
    ],

    fechas: {

      fecha1: [
        { local: "Amateur FC", visitante: "Beto FC",golesL: 2, golesV: 0, cancha: " predio los pinos", hora: "14:00", estado: "vivo" },
        { local: "Def.Las Chimbas", visitante: "Incas Futbol",golesL: 0, golesV: 0,cancha: "predio los pinos", hora: "16:00", estado: "proximo" },
      ]
    
    },

    goleadores: [
      { nombre: "Gaston Diaz", goles: 2, equipo: "Amateur FC" },
     
    ]

  },

  segunda: {

    equipos: [
      { nombre: "San Martin", escudo: "imagenes/1b.png" },
      { nombre: "La Frontera", escudo: "imagenes/2b.png" },
      { nombre: "San Roque", escudo: "imagenes/3b.png" },
      { nombre: "Independiente", escudo: "imagenes/4b.png" },
      { nombre: "San Blas", escudo: "imagenes/5b.png" },
      { nombre: "Otra Banda", escudo: "imagenes/6b.png" },
      { nombre: "Huaco", escudo: "imagenes/7b.png" },
      { nombre: "Boca del Medano", escudo: "imagenes/8b.png" },
      { nombre: "Calle Varas", escudo: "imagenes/9b.png" },
      { nombre: "La Falda", escudo: "imagenes/10b.png" }
    ],

    fechas: {

      fecha1: [
        { local: "La Frontera", visitante: "Independiente",cancha: "pampa",golesL: 0, golesV: 1, hora: "16:30", estado: "finalizado" },
        { local: "San Martin", visitante: "Boca del Medano", golesL: 2, golesV: 1, cancha: "pampa", hora: "14:00", estado: "finalizado" },
        { local: "La Falda", visitante: "Otra Banda",golesL: 2, golesV: 1,cancha: "la falda", hora: "16:30", estado: "finalizado" },
        { local: "San Blas", visitante: "San Roque",golesL: 0, golesV: 0, cancha: "la falda", hora: "14:00", estado: "finalizado" },
        { local: "Calle Varas", visitante: "Huaco",cancha: "libre", hora: "libre", estado: "libres" }
      ],

     
    },

    goleadores: [
      { nombre: "  Franco Pereyra", goles: 3, equipo:"Otra Banda" },
     
    ]

  },

  femenino: {

    equipos: [
      { nombre: "Pampa", escudo: "imagenes/1.png" },
      { nombre: "Andacollo", escudo: "imagenes/11.png" },
      { nombre: "Peñarol", escudo: "imagenes/10.png" },
      { nombre: "Florida", escudo: "imagenes/8.png" },
      { nombre: "Estrella", escudo: "imagenes/3.png" },
      { nombre: "Racing", escudo: "imagenes/6.png" },
      { nombre: "Independiente", escudo: "imagenes/4b.png" }
    ],

    
    

    goleadores: [
      { nombre: "jugadora1", goles: 0 },
      { nombre: "jugadora2", goles: 0 }
    ]

  }

};

let categoriaActual = "primera";
let mostrarTodosGoleadores = false;
// =====================
// ELEMENTOS
// =====================

const tabla = document.getElementById("tabla");
const contenedor = document.getElementById("lista-partidos");
const listaGoleadores = document.getElementById("lista-goleadores");

// =====================
// OBTENER EQUIPO
// =====================

function obtenerEquipo(nombre) {

  return categorias[categoriaActual].equipos.find(
    e => e.nombre.toLowerCase().trim() === nombre.toLowerCase().trim()
  );

}

// =====================
// MOSTRAR PARTIDOS
// =====================

function mostrarFecha(fecha) {

  contenedor.innerHTML = "";

  const fechas = categorias[categoriaActual].fechas;

  if (!fechas[fecha]) return;

  fechas[fecha].forEach(p => {

    const local = obtenerEquipo(p.local);
    const visitante = obtenerEquipo(p.visitante);

    if (!local || !visitante) return;

    contenedor.innerHTML += `
      <div class="partido-card">

        <div class="estado ${p.estado}">
          ${p.estado.toUpperCase()}
        </div>

        <div class="equipos">

          <div class="team">
            <img src="${local.escudo}">
            <span>${local.nombre}</span>
          </div>

          <div class="marcador">
            ${p.golesL} - ${p.golesV}
          </div>

          <div class="team">
            <img src="${visitante.escudo}">
            <span>${visitante.nombre}</span>
          </div>

        </div>

        <div class="info">
          <span>Cancha: ${p.cancha}</span>
          <span>Hora: ${p.hora}</span>
        </div>

      </div>
    `;
  });
}

// =====================
// TABLA
// =====================

function generarTabla() {

  tabla.innerHTML = "";

  const equipos = categorias[categoriaActual].equipos;
  const fechas = categorias[categoriaActual].fechas;

  let stats = {};

  equipos.forEach(e => {

    stats[e.nombre] = {
      equipo: e.nombre,
      gf: 0,
      gc: 0,
      dg: 0,
      pts: 0
    };

  });

  Object.values(fechas).forEach(lista => {

    lista.forEach(p => {

      const local = stats[p.local];
      const visitante = stats[p.visitante];

      if (!local || !visitante) return;
      if (p.golesL == null || p.golesV == null) return;

      local.gf += p.golesL;
      local.gc += p.golesV;

      visitante.gf += p.golesV;
      visitante.gc += p.golesL;

      if (p.golesL > p.golesV) {
        local.pts += 3;
      }
      else if (p.golesV > p.golesL) {
        visitante.pts += 3;
      }
      else {
        local.pts += 1;
        visitante.pts += 1;
      }

    });

  });

  Object.values(stats).forEach(e => {
    e.dg = e.gf - e.gc;
  });

  const ordenados = Object.values(stats).sort((a, b) => {

    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    return b.gf - a.gf;

  });

  ordenados.forEach(e => {

    const equipo = obtenerEquipo(e.equipo);

    tabla.innerHTML += `
      <div class="fila">

        <span class="equipo-tabla">
          <img src="${equipo.escudo}">
          ${equipo.nombre}
        </span>

        <span>${e.gf}</span>
        <span>${e.gc}</span>
        <span>${e.dg > 0 ? "+" + e.dg : e.dg}</span>
        <span>${e.pts}</span>

      </div>
    `;

  });

}

// =====================
// =====================
// GOLEADORES
// =====================
function cargarGoleadores() {

  listaGoleadores.innerHTML = "";

  const goleadoresOrdenados =
    [...categorias[categoriaActual].goleadores]
    .sort((a, b) => b.goles - a.goles);

  const goleadoresAMostrar = mostrarTodosGoleadores
    ? goleadoresOrdenados
    : goleadoresOrdenados.slice(0, 12);

  goleadoresAMostrar.forEach((g, i) => {

    const equipo = obtenerEquipo(g.equipo || "");

    listaGoleadores.innerHTML += `
      <div class="goleador-fila">

        <span>${i + 1}</span>

        <span class="goleador-info">
          ${
            equipo
              ? `<img src="${equipo.escudo}" class="escudo-goleador">`
              : ""
          }
          ${g.nombre}
        </span>

        <span>${g.goles}</span>

      </div>
    `;
  });

  if (!mostrarTodosGoleadores && goleadoresOrdenados.length > 12) {

    listaGoleadores.innerHTML += `
      <div style="text-align:center; margin-top:20px;">
        <button id="btn-ver-mas">Ver más</button>
      </div>
    `;

    document
      .getElementById("btn-ver-mas")
      .addEventListener("click", () => {

        mostrarTodosGoleadores = true;
        cargarGoleadores();

      });

  }

  if (mostrarTodosGoleadores && goleadoresOrdenados.length > 12) {

    listaGoleadores.innerHTML += `
      <div style="text-align:center; margin-top:20px;">
        <button id="btn-ver-menos">Ver menos</button>
      </div>
    `;

    document
      .getElementById("btn-ver-menos")
      .addEventListener("click", () => {

        mostrarTodosGoleadores = false;
        cargarGoleadores();

      });

  }

}


// =====================
// CAMBIAR CATEGORÍA
// =====================

const botonesCategorias = document.querySelectorAll(".MAS-btn");

botonesCategorias.forEach(btn => {

  btn.addEventListener("click", () => {

    botonesCategorias.forEach(b =>
      b.classList.remove("activa-cat")
    );

    btn.classList.add("activa-cat");

    categoriaActual = btn.dataset.cat;

    generarTabla();
    cargarGoleadores();
    mostrarFecha("fecha1");

  });

});

// =====================
// BOTONES FECHAS
// =====================

const botonesFechas = document.querySelectorAll(".fechas span");

botonesFechas.forEach((btn, i) => {

  btn.addEventListener("click", () => {

    botonesFechas.forEach(b =>
      b.classList.remove("activa")
    );

    btn.classList.add("activa");

    mostrarFecha("fecha" + (i + 1));

  });

});

// =====================
// NAVEGACIÓN
// =====================

const btnPartidos = document.getElementById("btn-partidos");
const btnPosiciones = document.getElementById("btn-posiciones");
const btnGoleadores = document.getElementById("btn-goleadores");

const secPartidos = document.getElementById("partidos-section");
const secPosiciones = document.getElementById("posiciones-section");
const secGoleadores = document.getElementById("goleadores-section");

function activarBoton(activo) {

  btnPartidos.classList.remove("activo");
  btnPosiciones.classList.remove("activo");
  btnGoleadores.classList.remove("activo");

  activo.classList.add("activo");

}

btnPartidos.onclick = () => {

  secPartidos.style.display = "block";
  secPosiciones.style.display = "none";
  secGoleadores.style.display = "none";

  activarBoton(btnPartidos);

};

btnPosiciones.onclick = () => {

  secPartidos.style.display = "none";
  secPosiciones.style.display = "block";
  secGoleadores.style.display = "none";

  activarBoton(btnPosiciones);

};

btnGoleadores.onclick = () => {

  secPartidos.style.display = "none";
  secPosiciones.style.display = "none";
  secGoleadores.style.display = "block";

  activarBoton(btnGoleadores);

};

// =====================
// INICIO
// =====================

mostrarFecha("fecha1");
generarTabla();
cargarGoleadores();
