//FUNCIONES
//Funcion IVA + Int

function costoTotalSueldo (iva, int1) {
    costoFinalSueldo = iva + int1;
    return costoFinalSueldo;
}

function costoTotalNoSueldo (iva, int2) {
    costoFinalNoSueldo = iva + int2;
    return costoFinalNoSueldo;
}

//Contacto

function mensajeEnviado (){
    console.log("El usuario ha enviado una consulta");
}

function datosContacto (email){
    let emailIngresado = email.value;
    console.log("El cliente ha dejado contacto");
}

//Cotización

$(document).ready(function(){
    obtenerCotizacion();
})

function obtenerCotizacion() {
    $.get("https://mercados.ambito.com/dolar/%22+tipo+%22/variacion", function(respuesta, estado) {
        console.log(respuesta);
        if (estado == "success") {
            var tablaCotiz = document.createElement("table");
            tablaCotiz.setAttribute("class","table");
            var tablaCotiz_body = document.createElement("tbody");
            var filaCotiz = document.createElement("tr");
            var celdaCotiz = document.createElement("td");
            filaCotiz.appendChild(celdaCotiz);
            tablaCotiz_body.appendChild(filaCotiz);
            tablaCotiz.appendChild(tablaCotiz_body);
            document.getElementById("cotiz").appendChild(tablaCotiz);
            celdaCotiz.innerText = "DOLAR HOY: Compra: $" + JSON.stringify(Object.values(respuesta)[0]) + " // Venta: $" + JSON.stringify(Object.values(respuesta)[1]);
        }
    })
}

//Contacto

var consulta = document.getElementById("exampleDropdownFormEmail1");
var submit = document.createElement("button");
var parrafoFinal = document.createElement("p");
var boton = document.getElementById("button");