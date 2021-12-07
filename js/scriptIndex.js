//Tarjetas

const tarjetas = [
  { id: 1, tarjeta: "Clásica", costo: "$100" },
  { id: 2, tarjeta: "Gold", costo: "$250" },
  { id: 3, tarjeta: "Platinum", costo: "$500" },
  { id: 4, tarjeta: "Black", costo: "$1000" },
];

var tablaTar = document.createElement("table");
tablaTar.setAttribute("class", "table");
var tablaTar_body = document.createElement("tbody");

for (const tarjeta of tarjetas) {
  var filaTar = document.createElement("tr");
  var celdaTar = document.createElement("td");
  celdaTar.innerText = tarjeta.id;
  filaTar.appendChild(celdaTar);
  var celdaTar2 = document.createElement("td");
  celdaTar2.innerText = tarjeta.tarjeta;
  filaTar.appendChild(celdaTar2);
  var celdaTar3 = document.createElement("td");
  celdaTar3.innerText = tarjeta.costo;
  filaTar.appendChild(celdaTar3);
  tablaTar_body.appendChild(filaTar);
}

$("#inferior").hide();

$("#tc").click(() => {
  $("#inferior").fadeToggle(1000, function () {
    if ($("#tc").html() == "Mostrar tarjetas") {
      $("#tc").html("Ocultar tarjetas");
    } else {
      $("#tc").html("Mostrar tarjetas");
    }
  });
});

tablaTar.appendChild(tablaTar_body);
document.getElementById("inferior").appendChild(tablaTar);

//Cajas de seguridad

const cajas = [
  { id: 1, nombre: "Pequeña (30x30)", precio: 500 },
  { id: 2, nombre: "Mediana (40x40)", precio: 750 },
  { id: 3, nombre: "Grande (50x50)", precio: 1000 },
];

var carrito = [];

for (const caja of cajas) {
  $("#body__var2__cajas__append").append(`<div>
                                <h6>Tamaño: ${caja.nombre} - Precio: $ ${caja.precio}</h6>
                                <button type="button" class="btn btn-secondary btn-primary btn-sm" id="btn${caja.id}">Seleccionar</Button>
                                </div>`);

  $(`#btn${caja.id}`).on("click", function () {
    console.log(`Seleccionaste ${caja.nombre}`);
    carrito.push(cajas[caja.id - 1]);
    console.log(carrito);

    var tablaCarrito = document.createElement("table");
    tablaCarrito.setAttribute("class", "table");
    tablaCarrito.setAttribute("id", "carrito");
    var tablaCarrito_body = document.createElement("tbody");
    var filaCarrito = document.createElement("tr");
    var celdaCarrito = document.createElement("td");
    celdaCarrito.innerText = "Producto agregado: " + caja.nombre;
    filaCarrito.appendChild(celdaCarrito);
    var celdaCarrito2 = document.createElement("td");
    celdaCarrito2.innerText = "Costo total: $" + caja.precio;
    filaCarrito.appendChild(celdaCarrito2);
    sessionStorage.setItem("Carrito", JSON.stringify(carrito));
    tablaCarrito_body.appendChild(filaCarrito);
    tablaCarrito.appendChild(tablaCarrito_body);
    document
      .getElementById("body__var2__cajas__append")
      .appendChild(tablaCarrito);

    var carritoFinal = JSON.parse(sessionStorage.getItem("Carrito"));
    var costoFinal = carritoFinal.reduce((sum, value) => sum + value.precio, 0);
    console.log("Costo total de las Cajas de seguridad: $" + costoFinal);
    celdaTotal.innerText = "Precio Total = $" + costoFinal;
  });
}

function borrar(btn) {
  const carritoBorrado = document.getElementById("carrito");
  carritoBorrado.parentNode.removeChild(carritoBorrado);
  let popped = carrito.shift();
  sessionStorage.setItem("Carrito", JSON.stringify(carrito));
  var carritoFinal = JSON.parse(sessionStorage.getItem("Carrito"));
  var costoFinal = carritoFinal.reduce((sum, value) => sum + value.precio, 0);
  console.log("Costo total de las Cajas de seguridad: $" + costoFinal);
  celdaTotal.innerText = "Precio Total = $" + costoFinal;
}

var tablaTotal = document.createElement("table");
tablaTotal.setAttribute("class", "table");
var tablaTotal_body = document.createElement("tbody");
var filaTotal = document.createElement("tr");
var celdaTotal = document.createElement("td");
filaTotal.appendChild(celdaTotal);
tablaTotal_body.appendChild(filaTotal);
tablaTotal.appendChild(tablaTotal_body);
document.getElementById("body__var2__cajas").appendChild(tablaTotal);
celdaTotal.innerText = "";

$(document).ready(function () {
  $(".btn").click(function (e) {
    let cSeg = $(e.target).parent().children();
    $(e.target).parent().slideUp("fast").slideDown("slow");
  });

  const APIURL = "https://jsonplaceholder.typicode.com/posts";
  const envio = { texto: "Su mail se ha registrado con éxito" };

  $("#newsletter").prepend(
    '<button id="button2">Suscribirme a Newsletter</div>'
  );

  $("#button2").click(() => {
    $.ajax({
      method: "POST",
      url: APIURL,
      data: envio,
      success: function (respuesta) {
        $("#newsletter").prepend(`<div>${respuesta.texto}</div>`);
        console.log(respuesta);
      },
    });
  });
});

//Formulario

function validarFormulario(e) {
  console.log("Formulario enviado");
  e.preventDefault();
}

var formulario = document.getElementById("form");
formulario.addEventListener("submit", validarFormulario);

$(".form-control").change(function (e) {
  console.log("Input " + e.target.type + ": " + e.target.value);
});
