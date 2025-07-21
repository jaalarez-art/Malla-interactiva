const malla = {
  'Primer año - Primer semestre': [
    { id: 'anatomia_humana', nombre: 'Anatomía humana', prereq: [] },
    { id: 'biologia_celular', nombre: 'Biología celular', prereq: [] },
    { id: 'lab_bio_celular', nombre: 'Laboratorio de biología celular', prereq: [] },
    { id: 'quimica_general', nombre: 'Química general', prereq: [] },
    { id: 'intro_tec_med', nombre: 'Introducción a la tecnología médica', prereq: [] },
    { id: 'algebra_calculo', nombre: 'Elementos de álgebra y cálculo', prereq: [] }
  ],
  'Primer año - Segundo semestre': [
    { id: 'histoembriologia', nombre: 'Histoembriología', prereq: ['anatomia_humana', 'biologia_celular'] },
    { id: 'fisica_general', nombre: 'Física general', prereq: ['algebra_calculo'] },
    { id: 'quimica_organica', nombre: 'Química orgánica', prereq: [] },
    { id: 'ingles_1', nombre: 'Inglés I', prereq: [] },
    { id: 'habilidades_comunicativas', nombre: 'Habilidades comunicativas', prereq: [] }
  ]
};

let estado = JSON.parse(localStorage.getItem('mallaEstado')) || {};

function guardarEstado() {
  localStorage.setItem('mallaEstado', JSON.stringify(estado));
}

function puedeDesbloquear(ramo) {
  return ramo.prereq.every(pr => estado[pr]);
}

function crearTarjeta(ramo) {
  const div = document.createElement('div');
  div.id = ramo.id;
  div.textContent = ramo.nombre;
  div.classList.add('ramo');

  if (estado[ramo.id]) {
    div.classList.add('aprobado');
  } else if (puedeDesbloquear(ramo)) {
    div.classList.add('desbloqueado');
    div.addEventListener('click', () => {
      aprobarRamo(ramo.id);
    });
  } else {
    div.classList.add('bloqueado');
  }

  return div;
}

function aprobarRamo(id) {
  estado[id] = true;
  guardarEstado();
  actualizarMalla();
}

function actualizarMalla() {
  const container = document.getElementById('malla-container');
  container.innerHTML = '';

  // Solo mostrar los semestres del primer año
  ['Primer año - Primer semestre', 'Primer año - Segundo semestre'].forEach(semestre => {
    const divSemestre = document.createElement('div');
    divSemestre.classList.add('semestre');

    const titulo = document.createElement('h3');
    titulo.textContent = semestre;
    divSemestre.appendChild(titulo);

    malla[semestre].forEach(ramo => {
      const tarjeta = crearTarjeta(ramo);
      divSemestre.appendChild(tarjeta);
    });

    container.appendChild(divSemestre);
  });
}

actualizarMalla();
