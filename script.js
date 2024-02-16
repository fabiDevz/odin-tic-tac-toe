function Gameboard() {

  let filas = 3;
  let columnas = 3;
  let tablero = [];

  const inicializarTablero = () => {
    for (let i = 0; i < filas; i++) {
      tablero[i] = [];
      for (let j = 0; j < columnas; j++) {
        tablero[i].push(Celda());
      }
    }
  };
  inicializarTablero();

  const getTablero = () => tablero;

  const marcarJugada = (fila, columna, jugador) => {
    if (tablero[fila][columna].getValor() === 0) {
      tablero[fila][columna].hacerJugada(jugador)

    } else {
      console.log(tablero[fila][columna].getValor);
      console.log('<<<< celda ocupada >>>>>')
      return
    }
  }


  const imprimirTablero = () => {
    const tableroConValoresDeCelda = tablero.map((fila) => fila.map((celda) => celda.getValor()))
    console.log(tableroConValoresDeCelda);
  };

  return { getTablero, marcarJugada, imprimirTablero, inicializarTablero }
}

function Celda() {
  let valor = 0;

  const hacerJugada = (jugador) => {
    valor = jugador;
  }

  const getValor = () => valor;

  return { hacerJugada, getValor };
}

function controlFlujoDeJuego(nombreJugador1 = 'Jugador 1', nombreJugador2 = 'Jugador 2') {
  const tablero = Gameboard();

  const jugadores = [
    {
      nombre: nombreJugador1,
      marca: 'X'
    },
    {
      nombre: nombreJugador2,
      marca: 'O'
    }
  ];

  const setNombreJugador = (nombreJugador1, nombreJugador2) => {
    jugadores[0].nombre = nombreJugador1;
    jugadores[1].nombre = nombreJugador2;
  };

  let jugadorActivo = jugadores[0];
  let ganador = '';
  let jugadaGanadora = '';
  let empate;
  

  const cambiarTurnoJugador = () => {
    jugadorActivo = jugadorActivo === jugadores[0] ? jugadores[1] : jugadores[0];
  };

  const getGanador = () => ganador;

  const getEmpate = () => empate;

  const setTrueEmpate = () => {
    empate = true;
  }

  const obtenerJugadorActivo = () => jugadorActivo;

  const getJugadaGanadora = () => jugadaGanadora;

  const imprimirNuevaRonda = () => {
    tablero.imprimirTablero();
    console.log(`Turno de ${obtenerJugadorActivo().nombre}.`);
  };
  let gameOver = false
  const getGameOver = () => gameOver;
  const setFalseGameOver = () => {
    gameOver = false;
  }

  const reiniciarJuego = () => {
    tablero.inicializarTablero();
    jugadorActivo = jugadores[0];
  };

  const jugarRonda = (fila, columna) => {
    empate = true;
    if (gameOver != true) {
      tablero.marcarJugada(fila, columna, obtenerJugadorActivo().marca);
    } else {
      inicializarTablero();
      console.log('juego terminado nada que hacer');
    }




    // Comprobar filas
    for (let i = 0; i < 3; i++) {
      if (tablero.getTablero()[i][0].getValor() != 0 && tablero.getTablero()[i][0].getValor() === tablero.getTablero()[i][1].getValor() && tablero.getTablero()[i][0].getValor() === tablero.getTablero()[i][2].getValor()) {
        console.log('Hay un ganador en la fila ' + (i + 1) + ': ' + tablero.getTablero()[i][0].getValor());
        gameOver = true;
        ganador = obtenerJugadorActivo().nombre;
        jugadaGanadora = 'f' + i;
      }
    }

    // Comprobar columnas
    for (let j = 0; j < 3; j++) {
      if (tablero.getTablero()[0][j].getValor() != 0 && tablero.getTablero()[0][j].getValor() === tablero.getTablero()[1][j].getValor() && tablero.getTablero()[0][j].getValor() === tablero.getTablero()[2][j].getValor()) {
        console.log('Hay un ganador en la columna ' + (j + 1) + ': ' + tablero.getTablero()[0][j].getValor());
        gameOver = true;
        ganador = obtenerJugadorActivo().nombre;
        jugadaGanadora = 'c' + j;
      }
    }

    // // Comprobar diagonal principal
    if (tablero.getTablero()[0][0].getValor() != 0 && tablero.getTablero()[0][0].getValor() === tablero.getTablero()[1][1].getValor() && tablero.getTablero()[0][0].getValor() === tablero.getTablero()[2][2].getValor()) {
      console.log('Hay un ganador en la diagonal principal: ' + tablero.getTablero()[0][0].getValor());
      gameOver = true;
      ganador = obtenerJugadorActivo().nombre;
      jugadaGanadora = 'd' + 1;
    }

    // // Comprobar diagonal secundaria
    if (tablero.getTablero()[0][2].getValor() != 0 && tablero.getTablero()[0][2].getValor() === tablero.getTablero()[1][1].getValor() && tablero.getTablero()[0][2].getValor() === tablero.getTablero()[2][0].getValor()) {
      console.log('Hay un ganador en la diagonal secundaria: ' + tablero.getTablero()[0][2].getValor());
      gameOver = true;
      ganador = obtenerJugadorActivo().nombre;
      jugadaGanadora = 'd' + 2;
    }

    // COmprobar el empate

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tablero.getTablero()[i][j].getValor() === 0) {
          
          empate = false;
          break;
        }
      }
      if (!empate) {
        break;
      }
    }

    console.log('game over '+gameOver);
    console.log('empate : '+empate);
    if (gameOver == false && empate == true) {
      console.log('Empate');
      
    }
    
    cambiarTurnoJugador();
    imprimirNuevaRonda();
  };

  imprimirNuevaRonda();


  return {
    jugarRonda,
    obtenerJugadorActivo,
    getGameOver,
    setFalseGameOver,
    getEmpate,
    setTrueEmpate,
    reiniciarJuego,
    setNombreJugador,
    getGanador,
    getJugadaGanadora
  };
}

const juego = controlFlujoDeJuego();
const modal = document.getElementById('modal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const formulario = document.querySelector('#formulario');
const inputJugador1 = document.getElementById('input-jugador-1');
const inputJugador2 = document.getElementById('input-jugador-2');
const tablonInfo = document.getElementById('info-tablon');
const celdas = document.querySelectorAll('.celda');

btnOpenModal.addEventListener('click', () => {
  modal.showModal();
});

btnCloseModal.addEventListener('click', () => {
  modal.close();
});

function gameOver() {

if(juego.getEmpate())
{
  celdas.forEach((celda) => {
    celda.style.pointerEvents = 'none';
    tablonInfo.textContent = 'Fin del juego. ¡Ha sido un empate!';
  });
}else{
  celdas.forEach((celda) => {
    celda.style.pointerEvents = 'none';
    tablonInfo.textContent = 'Fin del juego !!\n Felicidades ' + juego.getGanador() + ' ganaste';
  });

  switch (juego.getJugadaGanadora()) {
    case 'c0':
      console.log('COLUMNA 1');
      for (let i = 0; i < 3; i++) {
        let celda = document.getElementById(`c-${i}0`);
        celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
        celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
      }
      break;
    case 'c1':
      console.log('COLUMNA 2');
      for (let i = 0; i < 3; i++) {
        let celda = document.getElementById(`c-${i}1`);
        celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
        celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
      }
      break;
    case 'c2':
      console.log('COLUMNA 3');
      for (let i = 0; i < 3; i++) {
        let celda = document.getElementById(`c-${i}2`);
        celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
        celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
      }
      break;
    
      case 'f0':
        console.log('FILA 1');
        for (let j = 0; j < 3; j++) {
          let celda = document.getElementById(`c-0${j}`);
          celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
          celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
        }
        break;
      case 'f1':
        console.log('FILA 2');
        for (let j = 0; j < 3; j++) {
          let celda = document.getElementById(`c-1${j}`);
          celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
          celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
        }
        break;
      case 'f2':
        console.log('FILA 3');
        for (let j = 0; j < 3; j++) {
          let celda = document.getElementById(`c-2${j}`);
          celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
          celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
        }
        break;
      
        case 'd1':
          console.log('DIAGONAL PRINCIPAL');
          for (let i = 0; i < 3; i++) {
            let celda = document.getElementById(`c-${i}${i}`);
            celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
            celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
          }
          break;
        case 'd2':
          console.log('DIAGONAL SECUNDARIA');
          for (let i = 0; i < 3; i++) {
            let celda = document.getElementById(`c-${i}${2 - i}`);
            celda.style.textShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
            celda.style.boxShadow = '0 0 10px green, 0 0 20px green, 0 0 30px green, 0 0 40px green';
          }
          break;
    default:
      console.log('No se reconoce el patrón de jugada ganadora');
  }
}

}


function celdaClickeada(event, fila, columna) {
  tablonInfo.textContent = inputJugador1.value + " v/s " + inputJugador2.value;
  if (juego.getGameOver() != true) {
    juego.jugarRonda(fila, columna);



    event.target.textContent = juego.obtenerJugadorActivo().marca;
    console.log('jugador activo : ' + juego.obtenerJugadorActivo().marca);

  }

  if (juego.getEmpate() && juego.getGameOver() == false) {
    // Si hay un empate y el juego no ha terminado, mostrar el mensaje de empate
   
    gameOver();
  }
  if (juego.getGameOver()) {
    gameOver();
  }

 


}

function reiniciarJuego() {
  juego.setFalseGameOver();
  juego.reiniciarJuego();
  btnOpenModal.textContent = 'Reiniciar';

  celdas.forEach(celda => {
    celda.textContent = '';
    celda.style.pointerEvents = "auto";
    celda.style.boxShadow = '0 0 10px #0800f980, 0 0 20px #0800f980, 0 0 40px #0800f980';
    celda.style.textShadow = '0 0 10px #0800f980, 0 0 20px #0800f980, 0 0 40px #0800f980';
  });
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  juego.setNombreJugador(inputJugador1.value, inputJugador2.value);
  console.log('evento submit \n Jugador 1 : ' + inputJugador1.value + ' \n Jugador 2 : ' + inputJugador2.value);
  modal.close();
  tablonInfo.textContent = inputJugador1.value + " v/s " + inputJugador2.value;
});



document.addEventListener('DOMContentLoaded', () => {
  celdas.forEach((celda) => {
    celda.style.pointerEvents = 'none';
  });


});