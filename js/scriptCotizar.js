//Cotizar

function guardar(e) {
    var fecha = new Date ();
    sessionStorage.setItem('Fecha', fecha);

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var nombreOrdenado = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase() +" " + apellido[0].toUpperCase() + apellido.slice(1).toLowerCase();
    sessionStorage.setItem('Nombre', nombreOrdenado);
    
    var edad = document.getElementById("edad").value;
    sessionStorage.setItem('Edad', JSON.stringify(edad));

    var cliente = document.getElementById("cliente").value;
    var clienteUp = cliente.toUpperCase();
    sessionStorage.setItem('Cliente', clienteUp);

    var seguro = document.getElementById("seguro").value;
    var seguroUp = seguro.toUpperCase();
    sessionStorage.setItem('Seguro', seguroUp);

    var meses = document.getElementById("meses").value;
    var anios = parseInt(meses/12);
    sessionStorage.setItem('Años', JSON.stringify(anios));

    var cobro1 = document.getElementById("cobro1").value;
    var cobro2 = document.getElementById("cobro2").value;
    var cobro3 = document.getElementById("cobro3").value;
    sessionStorage.setItem('Sueldo 1', JSON.stringify(cobro1));
    sessionStorage.setItem('Sueldo 2', JSON.stringify(cobro2));
    sessionStorage.setItem('Sueldo 3', JSON.stringify(cobro3));

    var promedio = parseInt((+cobro1 + +cobro2 + +cobro3)/3);
    sessionStorage.setItem('Promedio', JSON.stringify(promedio));

    //Por ley puedo estimar que puede pagar hasta el 30% de su sueldo mensual
    var estimableAnual = parseInt(promedio*0.3);

    //Interes, seguro, IVA y cantidad de años
    var ivaAnual = 0.21;
    var intSueldoAnual = 0.16;
    var intNoSueldoAnual = 0.18;
    var atmAnual = parseInt(35*12);
    var carteraAnual = parseInt(100*12);

    //Calculo final
    var finalSAtm = parseInt((estimableAnual - estimableAnual * intSueldoAnual - estimableAnual * ivaAnual - atmAnual) * anios);
    var finalNSAtm = parseInt((estimableAnual - estimableAnual * intNoSueldoAnual - estimableAnual * ivaAnual - atmAnual) * anios);
    var finalSCartera = parseInt((estimableAnual - estimableAnual * intSueldoAnual - estimableAnual * ivaAnual - carteraAnual) * anios);
    var finalNSCartera = parseInt((estimableAnual - estimableAnual * intNoSueldoAnual - estimableAnual * ivaAnual - carteraAnual) * anios);

    if ((clienteUp == "SI") && (seguroUp == "ATM") && (finalSAtm > 0) && (finalSAtm < 1000000)) {
        sessionStorage.setItem('Máximo', JSON.stringify(finalSAtm))
    } else if ((clienteUp == "NO") && (seguroUp == "ATM") && (finalNSAtm > 0) && (finalNSAtm < 1000000)) {
        sessionStorage.setItem('Máximo', JSON.stringify(finalNSAtm))
    } else if ((clienteUp == "SI") && (seguroUp == "CARTERA") && (finalSCartera > 0) && (finalSCartera < 1000000)) {
        sessionStorage.setItem('Máximo', JSON.stringify(finalSCartera))
    } else if ((clienteUp == "NO") && (seguroUp == "CARTERA") && (finalNSCartera > 0) && (finalNSCartera < 1000000)) {
        sessionStorage.setItem('Máximo', JSON.stringify(finalNSCartera))
    } else if ((finalSAtm >= 1000000) || (finalNSAtm >= 1000000) || (finalSCartera >= 1000000) || (finalNSCartera >= 1000000)) {
        sessionStorage.setItem('Máximo', '1000000')
    }   else {
        sessionStorage.setItem('Máximo', '0')
    }

    var tablaCot = document.createElement("table");
    tablaCot.setAttribute("class","table");
    var tablaCot_body = document.createElement("tbody");
    var filaCot = document.createElement("tr");
    var celdaCot = document.createElement("td");
    celdaCot.innerText = "Máx. a solicitar: $" + sessionStorage.getItem('Máximo');
    filaCot.appendChild(celdaCot);
    var celdaCot2=document.createElement("td");
    celdaCot2.innerText = "Cant. de años: " + sessionStorage.getItem('Años');
    filaCot.appendChild(celdaCot2);
    var celdaCot3=document.createElement("td");
    celdaCot3.innerText = "Seguro solicitado: " + sessionStorage.getItem('Seguro');
    filaCot.appendChild(celdaCot3);
    tablaCot_body.appendChild(filaCot);
    tablaCot.appendChild(tablaCot_body);
    document.getElementById("cot3").appendChild(tablaCot);

    e.preventDefault();
};

var cotizador = document.getElementById("formC");
cotizador.addEventListener("submit", guardar);

let volver = document.getElementById("cot");
let refresh = document.getElementById("cot2");

volver.onmouseover = () => {console.log("Volver a la página principal")};
refresh.onmouseover = () => {console.log("Cargar nuevamente la página")};

$(".form-control").change(function(e) {
    console.log("Input " + e.target.type + ": " + e.target.value);
});

$("#parrafo").hide();

$("#requisitos").click(() => {
    $("#parrafo").fadeToggle(1000, function() {
        if($("#requisitos").html() == "Mostrar requisitos"){
            $("#requisitos").html("Ocultar requisitos"); 
        } else {
            $("#requisitos").html("Mostrar requisitos");    
        }
    })
});