function Gameboard() {

  let filas = 3;
  let columnas = 3;
  let tablero = [];

  for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (let j = 0; j < columnas; j++) {
      tablero[i].push(Celda());
    }
  }

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

  return { getTablero, marcarJugada, imprimirTablero }
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

  let jugadorActivo = jugadores[0];

  const cambiarTurnoJugador = () => {
    jugadorActivo = jugadorActivo === jugadores[0] ? jugadores[1] : jugadores[0];
  };

  const obtenerJugadorActivo = () => jugadorActivo;

  const imprimirNuevaRonda = () => {
    tablero.imprimirTablero();
    console.log(`Turno de ${obtenerJugadorActivo().nombre}.`);
  };

  const jugarRonda = (fila, columna) => {

    tablero.marcarJugada(fila, columna, obtenerJugadorActivo().marca);

    /*  Aquí es donde comprobaríamos si hay un ganador y manejaríamos esa lógica,
        como un mensaje de victoria. */

    // Comprobar filas
    for (let i = 0; i < 3; i++) {
      if (tablero.getTablero()[i][0].getValor() != 0 && tablero.getTablero()[i][0].getValor() === tablero.getTablero()[i][1].getValor() && tablero.getTablero()[i][0].getValor() === tablero.getTablero()[i][2].getValor()) {
        console.log('Hay un ganador en la fila ' + (i + 1) + ': ' + tablero.getTablero()[i][0].getValor());
      }
    }

    // Comprobar columnas
     for (let j = 0; j < 3; j++) {
       if (tablero.getTablero()[0][j].getValor() != 0 && tablero.getTablero()[0][j].getValor() === tablero.getTablero()[1][j].getValor() && tablero.getTablero()[0][j].getValor() === tablero.getTablero()[2][j].getValor()) {
         console.log('Hay un ganador en la columna ' + (j + 1) + ': ' + tablero.getTablero()[0][j].getValor());
       }
     }

    // // Comprobar diagonal principal
    if (tablero.getTablero()[0][0].getValor() !== 0 && tablero.getTablero()[0][0].getValor() === tablero.getTablero()[1][1].getValor() && tablero.getTablero()[0][0].getValor() === tablero.getTablero()[2][2].getValor()) {
       console.log('Hay un ganador en la diagonal principal: ' + tablero.getTablero()[0][0].getValor());
     }

    // // Comprobar diagonal secundaria
     if (tablero.getTablero()[0][2] !== 0 && tablero.getTablero()[0][2].getValor() === tablero.getTablero()[1][1].getValor() && tablero.getTablero()[0][2].getValor() === tablero.getTablero()[2][0].getValor()) {
       console.log('Hay un ganador en la diagonal secundaria: ' + tablero.getTablero()[0][2].getValor());
     }
   
    // Cambiar el turno del jugador
    cambiarTurnoJugador();
    imprimirNuevaRonda();
  };

  imprimirNuevaRonda();

  // Para la versión de consola, solo usaremos jugarRonda, pero necesitaremos
  // obtenerJugadorActivo para la versión de IU, así que la estoy revelando ahora
  return {
    jugarRonda,
    obtenerJugadorActivo
  };
}


const juego = controlFlujoDeJuego();

//Comprueba fila superior : ganador X
/* juego.jugarRonda(0, 0);
juego.jugarRonda(1, 0);
juego.jugarRonda(0, 1);
juego.jugarRonda(1, 1);
juego.jugarRonda(0, 2); */

//Fila media : ganador O
/*  juego.jugarRonda(0, 0);
 juego.jugarRonda(1, 0);
 juego.jugarRonda(0, 1);
 juego.jugarRonda(1, 1);
 juego.jugarRonda(2, 2);
 juego.jugarRonda(1, 2);
 */
// //fila inferior
 /* juego.jugarRonda(2, 0);
 juego.jugarRonda(0, 0);
 juego.jugarRonda(2, 1);
 juego.jugarRonda(1, 1);
 juego.jugarRonda(2, 2);
 */
// //columna izquierda
/*  juego.jugarRonda(0, 0);
 juego.jugarRonda(0, 1);
 juego.jugarRonda(1, 0);
 juego.jugarRonda(0, 2);
 juego.jugarRonda(2, 0); */

// //columna central 
/*  juego.jugarRonda(0, 1);
 juego.jugarRonda(0, 0);
 juego.jugarRonda(1, 1);
 juego.jugarRonda(0, 2);
 juego.jugarRonda(2, 1); */

// //columna derecha
/*  juego.jugarRonda(0, 2);
 juego.jugarRonda(0, 0);
 juego.jugarRonda(1, 2);
 juego.jugarRonda(1, 0);
 juego.jugarRonda(2, 2); */

// //diagonal principal 
/* juego.jugarRonda(0, 0);
juego.jugarRonda(0, 1);
juego.jugarRonda(1, 1);
juego.jugarRonda(0, 2);
juego.jugarRonda(2, 2); */

// //diagonal secundaria
/* juego.jugarRonda(0, 2);
juego.jugarRonda(0, 0);
juego.jugarRonda(1, 1);
juego.jugarRonda(0, 1);
juego.jugarRonda(2, 0); */
