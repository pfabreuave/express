
var numeroComanda
document.addEventListener("DOMContentLoaded", function() {
numeroComanda = varComanda
var fechaElement = document.getElementById("fecha");
var comandElement = document.getElementById("comand");
var today = new Date();
fechaElement.textContent = today.toLocaleString();
comandElement.textContent = ("("+ numeroComanda + ")");


// Función para generar y mostrar los elementos de la factura
function generarFactura(comanda) {
    
    var total = 0;
    var cant_items = 0;
    // Verificar si el número de comanda existe en LocalStorage
    const pedidoKey = `pedido_${numeroComanda}`;
    comanda = JSON.parse(localStorage.getItem(pedidoKey)) || [];
    const seleccion = comanda.filter((item) => item.comanda == numeroComanda);
    seleccion.forEach((item) => {
        cant_items += Number(item.cantidad);
        total += Number(item.precioTotal);
        document.getElementById("tabla").innerHTML +=
					'<tr><td>'+item.cantidad+'</td><td>'
					+item.name+'</td><td style="text-align: right;">'+item.precioTotal+'</td></tr>'	
        
    });
        document.getElementById("tabla").innerHTML +=
                    '<tr style="font-weight: bold;" ><td>'+cant_items+'</td><td>'
                    +"TOTAL"+'</td><td style="text-align: right;">'+total.toFixed(2)+'</td></tr>'
        
}
// Llamar a la función para generar la factura usando la comanda obtenida del Local Storage
generarFactura(numeroComanda);

})

function imprimir() {
    window.print();
    
  }