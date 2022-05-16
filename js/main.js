let libros = JSON.parse(localStorage.getItem("ARRAY_LIBROS"));
let librosEnFavoritos = JSON.parse(
  localStorage.getItem("ARRAY_LIBROS_FAVORITOS" || [])
);
// console.log(librosEnFavoritos);
guardarStorage("ARRAY_LIBROS_FAVORITOS", librosEnFavoritos);

function init() {
  console.log(librosEnFavoritos);
  recorrerArrayLibrosYMostrarFavoritos(librosEnFavoritos);
  ocultarMenuAgregarLibro();
}

function ocultarMenuAgregarLibro() {
  let menuAgregarLibro = document.querySelector("#agregarLibro");
  menuAgregarLibro.style.display = "none";
}
function mostrarMenuAgregarLibro() {
  let menuAgregarLibro = document.querySelector("#agregarLibro");
  menuAgregarLibro.style.display = "block";
}

function recorrerArrayLibrosYMostrarFavoritos(librosFav) {
  librosFav = JSON.parse(
    localStorage.getItem("ARRAY_LIBROS_FAVORITOS") || librosFav
  );

  console.log("librosEnFavoritos NICOOO", librosFav);

  for (let i = 0; i < librosFav.length; i++) {
    mostrarLibroFavorito(
      librosFav[i].ID,
      librosFav[i].title,
      librosFav[i].author,
      librosFav[i].thumbnail
    );
  }
  guardarStorage("ARRAY_LIBROS_FAVORITOS", librosFav);
}

function mostrarLibroFavorito(id, nombre, autor, thumbnail) {
  // console.log(id, nombre, autor, thumbnail);

  let listaDeNodos = document.querySelector("#mostrarLibrosFavoritos");
  let nodo = document.createElement("li");

  nodo.innerHTML = ` 
  <div class="card" style="width: 18rem ; heigth=18rem;">
  <div class="card-body">
    <img weight="110px" height="153px" src=${thumbnail || ""}>
    <h5 class="card-title mt-3">Título : ${nombre} </h5>
    <h6 class="card-subtitle mb-2 text-muted">Autor : ${autor}</h6>
    <p class="card-text">ID : ${id}</p>   
  </div>
  </div>`;

  listaDeNodos.appendChild(nodo);
}

let btnDesplegarMenu = document.getElementById("menuDeAdicion");
btnDesplegarMenu.addEventListener("click", probarBoton);
function probarBoton() {
  mostrarMenuAgregarLibro();
  agregarBotonAgregarLibro();
}

function recorrerArrayLibrosYMostrar(libros) {
  libros = JSON.parse(localStorage.getItem("ARRAY_LIBROS")) || libros;

  for (let i = 0; i < libros.length; i++) {
    mostrarLibro(
      libros[i].ID,
      libros[i].title,
      libros[i].author,
      libros[i].thumbnail
    );
  }
}

function mostrarLibro(id, nombre, autor, thumbnail) {
  // console.log(id, nombre, autor, thumbnail);

  let listaDeNodos = document.querySelector("#mostrarLibros");
  let nodo = document.createElement("li");

  nodo.innerHTML = ` 
  <div class="card" style="width: 18rem ; heigth=18rem;">
  <div class="card-body">
    <img weight="110px" height="153px" src=${thumbnail || ""}>
    <h5 class="card-title mt-3">Título : ${nombre} </h5>
    <h6 class="card-subtitle mb-2 text-muted">Autor : ${autor}</h6>
    <p class="card-text">ID : ${id}</p>

    <button class="btn btn-success" onClick="agregarAFavoritos(${id})">⭐</button> <br>    
  </div>
  </div>`;

  listaDeNodos.appendChild(nodo);
}

function agregarBotonAgregarLibro() {
  let btnAgregarLibro = document.querySelector("#btnAgregarLibro");
  btnAgregarLibro.className += "btn btn-info";

  btnAgregarLibro.addEventListener("click", agregarLibro);
}

function agregarAFavoritos(id) {
  console.log(librosEnFavoritos);
  if (librosEnFavoritos.some((libro) => parseInt(libro.ID) === id)) {
    swal({
      title: "Tu libro se agrego anteriormente a la lista!",
      icon: "info",
      button: "OK",
    });
  } else {
    const libroFavorito = libros.find(
      (libro) => parseInt(libro.ID) === parseInt(id)
    );

    librosEnFavoritos = JSON.parse(
      localStorage.getItem("ARRAY_LIBROS_FAVORITOS")
    );

    librosEnFavoritos.push(libroFavorito);

    guardarStorage("ARRAY_LIBROS_FAVORITOS", librosEnFavoritos);

    console.log("LIBROS QUE TENGO EN FAVORITOS", librosEnFavoritos);

    limpiarListaFavoritos();
    recorrerArrayLibrosYMostrarFavoritos(librosEnFavoritos);
    swal({
      title: "Tu libro se agrego correctamente a Favoritos!",
      icon: "success",
      button: "OK",
    });
  }
}
class Libro {
  constructor(idLibro, autor, title, thumbnail) {
    this.ID = idLibro;
    this.author = autor;
    this.title = title;
    this.thumbnail = thumbnail;
  }
}

function agregarLibro(e) {
  e.preventDefault();

  let idIngresado = document.querySelector("#idLibro").value;
  let autorIngresado = document.querySelector("#autor").value;
  let titleIngresado = document.querySelector("#title").value;
  let thumbnail = document.querySelector("#thumbnail").value;

  let nuevoLibro = new Libro(
    idIngresado,
    autorIngresado,
    titleIngresado,
    thumbnail
  );

  libros.push(nuevoLibro);

  guardarStorage("ARRAY_LIBROS", libros);
  libros = JSON.parse(localStorage.getItem("ARRAY_LIBROS"));

  limpiarLista();
  recorrerArrayLibrosYMostrar();

  swal({
    title: "Tu libro se agrego correctamente a la lista!",
    icon: "success",
    button: "OK",
  });
}
function limpiarLista() {
  let lista = document.querySelector("#mostrarLibros");
  lista.innerHTML = "";
}
function limpiarListaFavoritos() {
  let lista = document.querySelector("#mostrarLibrosFavoritos");
  lista.innerHTML = "";
}
function guardarStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

fetch(`./data/arrayLibros.json`)
  // Exito
  .then((response) => response.json()) // convertir a json
  .then((json) => {
    guardarStorage("ARRAY_LIBROS", json);
    libros = JSON.parse(localStorage.getItem("ARRAY_LIBROS"));
    recorrerArrayLibrosYMostrar(json);
  });
