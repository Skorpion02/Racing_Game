// Creamos las constantes qe estarán relacionadas con nuestro documento HTML
const contenedorPrincipal = document.querySelector(".container");
const iniciar = document.createElement("button");
const reiniciar = document.createElement("button");
const cambiarCoches = document.createElement("button"); 
const enviarNum = document.createElement("button");
const menu = document.createElement("div"); 

// Creamos los arrays donde guardamos los elementos del DOM y las posiciones finales
let arrJugadores = [];
let arrPosiciones = [];
let ResultadoCarrera = [];

//Comenzamos creando una funcion para el menu principal con su respectivo título (h1)
const mainMenu = () => {
  menu.classList.add("menu");
  menu.innerHTML = "<h1 id='TituloMenu'>RACING GAME</h1>";

  //Creamos una constante para seleccionar el número de jugadores que participarán en la carrera. Van del 1 al 10
  const seleccionarJugadores = document.createElement("div");
  seleccionarJugadores.innerHTML = `
  <!-- Párrafo para indicar que seleccione a los jugadores -->
    <h3>Selecciona el número de jugadores:</h3> 
  <!-- Abrimos un select para que nos muestre las distintas opciones -->
    <select class="selector" id="jugadores" name="jugadores">
      <option value="1">1 jugador</option>
      <option value="2">2 jugadores</option>
      <option value="3">3 jugadores</option>
      <option value="4">4 jugadores</option>
      <option value="5">5 jugadores</option>
      <option value="6">6 jugadores</option>
      <option value="7">7 jugadores</option>
      <option value="8">8 jugadores</option>
      <option value="9">9 jugadores</option>
    </select>`;

  //Botón  para iniciar la carrera de coches
  enviarNum.innerText = "Iniciar";
  enviarNum.classList.add("enviar-btn");

  //Registramos un evento para el boton de iniciar, donde, al hacer click:
  enviarNum.addEventListener("click", (event) => {
    const prueba = document.querySelector(".selector").value;
    menu.style.display = "none"; //Escondemos el menu 
    return comenzarCarrera(prueba); //y llamamos a una función que mostrará la carrera
  });

  //Añadimos elementos hijos al contenedor principal
  menu.appendChild(seleccionarJugadores);
  menu.appendChild(enviarNum);
  contenedorPrincipal.appendChild(menu);
};

//Función  principal que dará inicio a la carrera
const comenzarCarrera = (jugadores) => {
  //Creamos un nuevo elemento para colocar los elementos que habíamos seleccionado en el menu
  const menuCarrera = document.createElement("div");

  //Bucle para crear los coches que seleccionamos al principio
  for (let i = 0; i < jugadores; i++) {
    //Creamos un div por cada dorsal (el número que aparece arriba de la carretera)
    let dorsal = document.createElement("div");
    dorsal.innerHTML = `<p>${i + 1}</p>`;
    dorsal.classList.add("dorsal");
    //Creamos un div pot cada carretera
    let position = document.createElement("div");
    position.classList.add("carretera");
    //Creamos una etiqueta img por cada coche 
    let car = document.createElement("img");
    car.classList.add("vehiculos");
    car.classList.add(`jquery-carrera${i}`);
    car.src = `./img/car${i + 1}.png`;
    car.name = i + 1; // Añadimos una propiedad para identificarlo mas facilmente
    arrJugadores.push(car);

    //Ponemos el coche dentro de la carretera
    position.appendChild(car);
    contenedorPrincipal.appendChild(dorsal);
    contenedorPrincipal.appendChild(position);
  }

  //Estilos y evetos del botón para iniciar
  iniciar.classList.add("enviar-btn");
  iniciar.innerText = "iniciar";
  iniciar.id = "carrera-btn";
  iniciar.style.display = "initial";

  //Estilos y eventos del botón reiniciar 
  reiniciar.classList.add("enviar-btn");
  reiniciar.id = "reiniciar-carrera";
  reiniciar.innerText = "Reiniciar";
  reiniciar.style.display = "none";

  //Estilos y eventos del boton Numero de coches
  cambiarCoches.classList.add("enviar-btn");
  cambiarCoches.innerText = "Menu";
  cambiarCoches.style.display = "initial";
  cambiarCoches.onclick = () => location.reload();
  //---------------------------------------------- inicio código JQuery -----------------------------------------------------------
  // Funcion para reiniciar la carrera
  $(document).ready(function () {
    $("#reiniciar-carrera").click(function () {
      for (let p = 0; p < arrJugadores.length; p++) {
        //Detenemos y devolvemos a la posicion inicial a cada elemento
        $(`.jquery-carrera${p}`).stop();
        $(`.jquery-carrera${p}`).animate({ marginLeft: "0px" }, 50);
      }
      //Mostramos y ocultamos botones de nuevo
      reiniciar.style.display = "none";
      iniciar.style.display = "initial";
      cambiarCoches.style.display = "initial";
    });
  });
  //--------------------------------------------------fin código JQuery -------------------------------------------------------

  //Elemento donde colocaremos los botones
  menuCarrera.classList.add("menu-carrera");
  menuCarrera.appendChild(iniciar);
  menuCarrera.appendChild(reiniciar);
  menuCarrera.appendChild(cambiarCoches);
  //Añadimos al contenedor principal el elemento
  contenedorPrincipal.appendChild(menuCarrera);

  //---------------------------------------------- inicio código JQuery -----------------------------------------------------------
  $(document).ready(function () {
    $("#carrera-btn").click(function () {
      //Cuando comienza la carrera, escondemos el boton de iniciar y el de cambiar coches y mostramos el de reiniciar
      setTimeout(() => {
        iniciar.style.display = "none";
        cambiarCoches.style.display = "none";
        reiniciar.style.display = "initial";
      }, 100);
      //Creamos un elemento para mostrar las posiciones finales y ponemos el título de nuestra lista de posiciones
      const tablaPosiciones = document.createElement("div");
      tablaPosiciones.innerHTML = "<h1 id='positionsTitle'>Posiciones</h1>";

      //Bucle for para asignar las animaciones
      for (let y = 0; y < arrJugadores.length; y++) {
        //Variable para asignar una duración aleatoria al movimiento de los coches
        let duracion = Math.random() * (10 - 1) + 1;
        duracion = Math.round(duracion) * 1000;
        //Aplicamos metodo .animate a cada vehiculo con una duración aleatoria
        $(`.jquery-carrera${y}`).animate(
          { marginLeft: "90%" },
          duracion,
          null,
          function () {
            /* //Al completarse, a medida que van llegando los coches los agregamos en un array, que almacenará las 
            posiciones y luego las imprimimos */
            arrPosiciones.push(this.name);
            console.log(arrPosiciones);

            /*Condición que comprueba si el array de posiciones tiene el mismo número que array de juadores
              o sea, que todos los coches llegan a la meta*/
            if (arrPosiciones.length == arrJugadores.length) {
              //Quitamos el boton de reiniciar y activamos el botón para iniciar
              reiniciar.style.display = "none";
              iniciar.style.display = "initial";
              //Pasamos las posiciones al array final donde mostraremos los resultados de la carrera
              ResultadoCarrera = arrPosiciones;
              //Vaciamos el array para poder usarlo en la partida siguiente
              arrPosiciones = [];
              //Ocultamos los coches y la pista para mostrar los resultados
              let coches = document.querySelectorAll(".carretera");
              let dorsales = document.querySelectorAll(".dorsal");
              coches.forEach((coche) => {
                coche.style.display = "none";
              });
              //Usamos un foreach para ocultar los número que aparecen arriba de la carretera de los coches
              dorsales.forEach((drsl) => {
                drsl.style.display = "none";
              });
              //Bucle para mostrar la lista de posiciones
              //Bucle for que recorre el array de resultados para luego mostrar las posiciones en el orden que vayan llegando los coches
              for (let i = 0; i < ResultadoCarrera.length; i++) {
                let pos = document.createElement("div");
                pos.classList.add("posiciones");
                pos.innerHTML = `<p><u>Posicion ${i + 1} :</u> Coche ${
                  ResultadoCarrera[i]
                }</p></br>`;
                tablaPosiciones.appendChild(pos);
              }
              //Ocultamos el boton iniciar en los resultados y mostramos la tabla por pantalla
              iniciar.style.display = "none"; 
              contenedorPrincipal.appendChild(tablaPosiciones);
              /* Creo una función para que muestre por pantalla los resultados y que dure 6 segundos, luego de eso
              volveremos a la pantalla inicial de nuestro juego para volver a comenzar*/
               setTimeout(() => {
                 window.location.reload();
               }, 6000);
            }
          }
        );
      }
    });
  });

  //--------------------------------------------------fin código JQuery -------------------------------------------------------

};

//Ejecutamos nuevamente la función mainMenu para que se cargue de nuevo nuestro archivo JS.
mainMenu();