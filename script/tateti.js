const jugador1 = 'x';
const jugador2 = 'o';
const jugador1UpperCase = jugador1.toUpperCase()
const jugador2UpperCase = jugador2.toUpperCase()
const condiciones_vicotria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const items = document.querySelectorAll('[data-item]')
const wapperTateti = document.getElementById('wrapper-tateti')
const botonReiniciar = document.getElementById('boton-reiniciar')

const jugadorH2 = document.getElementById('jugador-turno')
const ganadorH2 = document.getElementById('mensaje-ganador')

const mensajeJugador = ['Turno del Jugador ' + jugador1UpperCase, 'Turno del jugador ' + jugador2UpperCase]
const ganadorJugador = ['El ganador es el jugador ' + jugador1UpperCase, 'El ganador es el jugador ' + jugador2UpperCase, 'Empate']

const sonidoClick = document.getElementById('sonido-click')
const sonidoHoverMouse = document.getElementById('sonido-hover')
const sonidoClickBoton = document.getElementById('sonido-click-boton')
const sonidoVictoria = document.getElementById('sonido-victoria')


let turnoCirculo

for (let i = 0; i < items.length; i++) {
  const element = items[i];
  element.classList.add("text-5xl")
}

comenzar()

// Eventos Boton
botonReiniciar.addEventListener('click', comenzar)
botonReiniciar.addEventListener('click', () => {
  sonidoClickBoton.play()
})
botonReiniciar.addEventListener('mouseover', () => {
  sonidoHoverMouse.play()
})


// Funciones
function comenzar() {
  turnoCirculo = true
  ganadorH2.textContent = ''
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.textContent = ''
    item.style.cursor = 'pointer'
    item.removeEventListener('click', clickMouse)
    item.addEventListener('click', clickMouse, { once: true })
  }
  mostrarTurnoJugadorH2(turnoCirculo)
}

function clickMouse(evento) {
  const item = evento.target
  item.style.cursor = 'not-allowed'
  let turnoJugador

  if (!item.innerText) {
    sonidoClick.play()
  }

  if (turnoCirculo) {
    item.innerText = jugador1
    turnoJugador = jugador1
  } else {
    item.innerText = jugador2
    turnoJugador = jugador2
  }

  if (esVictoria(turnoJugador)) {
    let i = turnoCirculo ? 0 : 1
    ganadorH2.innerText = ganadorJugador[i]
    sonidoVictoria.play()
    desabhilitarEventoClick()
    return
  }

  if (esEmpate()) {
    ganadorH2.innerText = ganadorJugador[2]
    return
  }

  turnoCirculo = !turnoCirculo
  mostrarTurnoJugadorH2(turnoCirculo)
}

function esVictoria(turnoJugador) {
  return condiciones_vicotria.some(condicion => {
    return condicion.every(i => {
      return items[i].innerHTML == turnoJugador
    })
  })
}

function esEmpate() {
  return [...items].every(item => {
    return item.innerText == jugador1 || item.innerText == jugador2
  })
}


function mostrarTurnoJugadorH2(turnoCirculo) {
  if (turnoCirculo) {
    jugadorH2.textContent = mensajeJugador[0]
  } else {
    jugadorH2.textContent = mensajeJugador[1]
  }
}

function desabhilitarEventoClick() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.removeEventListener('click', clickMouse)
  }
}
