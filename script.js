const malla = {
  'Primer año': {
    'Primer semestre': [
      { nombre: 'Anatomía humana', desbloqueado: true },
      { nombre: 'Biología celular', desbloqueado: true },
      { nombre: 'Laboratorio de biología celular', desbloqueado: true },
      { nombre: 'Química general', desbloqueado: true },
      { nombre: 'Introducción a la tecnología médica', desbloqueado: true },
      { nombre: 'Álgebra y cálculo', desbloqueado: true },
    ],
    'Segundo semestre': [
      { nombre: 'Histoembriología', desbloqueado: false },
      { nombre: 'Física general', desbloqueado: false },
      { nombre: 'Química orgánica', desbloqueado: true },
      { nombre: 'Inglés I', desbloqueado: true },
      { nombre: 'Habilidades comunicativas', desbloqueado: true },
    ]
  },
  'Segundo año': {
    'Tercer semestre': [
      { nombre: 'Fisiología humana', desbloqueado: false },
      { nombre: 'Bioquímica', desbloqueado: false },
      { nombre: 'Bioética', desbloqueado: false },
      { nombre: 'Infectología', desbloqueado: false },
      { nombre: 'Inglés II', desbloqueado: false },
      { nombre: 'Razonamiento científico', desbloqueado: false },
    ],
    'Cuarto semestre': [
      { nombre: 'Fisiopatología', desbloqueado: false },
      { nombre: 'Farmacología general', desbloqueado: false },
      { nombre: 'Inglés III', desbloqueado: false },
      { nombre: 'Protección radiológica', desbloqueado: false },
      { nombre: 'Radiodiagnóstico I', desbloqueado: false },
      { nombre: 'Física electromagnética', desbloqueado: false },
    ]
  }
};

const contenedor = document.getElementById("malla-container");
const barra = document.getElementById("barra");
const btnReiniciar = document.getElementById("btnReiniciar");

function cargarMalla() {
  contenedor.innerHTML = "";
  let totalRamos = 0;
  let completados = 0;

  for (const [anio, semestres] of Object.entries(malla)) {
    const divAnio = document.createElement("div");
    divAnio.classList.add("anio");

    const h2 = document.createElement("h2");
    h2.textContent = anio;
    divAnio.appendChild(h2);

    const fila = document.createElement("div");
    fila.classList.add("fila-semestres");

    for (const [semestre, ramos] of Object.entries(semestres)) {
      const divSemestre = document.createElement("div");
      divSemestre.classList.add("semestre");

      const h3 = document.createElement("h3");
      h3.textContent = semestre;
      divSemestre.appendChild(h3);

      for (const ramo of ramos) {
        totalRamos++;
        const divRamo = document.createElement("div");
        divRamo.classList.add("ramo", ramo.desbloqueado ? "desbloqueado" : "bloqueado");
        divRamo.textContent = ramo.nombre;
        divSemestre.appendChild(divRamo);
        if (ramo.desbloqueado) completados++;
      }

      fila.appendChild(divSemestre);
    }

    divAnio.appendChild(fila);
    contenedor.appendChild(divAnio);
  }

  const porcentaje = Math.round((completados / totalRamos) * 100);
  barra.style.width = porcentaje + "%";
  barra.textContent = porcentaje + "%";
}

btnReiniciar.addEventListener("click", () => {
  for (const anio of Object.values(malla)) {
    for (const semestres of Object.values(anio)) {
      for (const ramo of semestres) {
        ramo.desbloqueado = false;
      }
    }
  }
  cargarMalla();
});

cargarMalla();
