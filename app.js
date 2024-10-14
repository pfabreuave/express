/*https://www.youtube.com/watch?v=bGPvf6nG6Xc 
https://lookerstudio.google.com/navigation/reporting   */
const foodItem= [
    
    {
        id: 1,
        name: 'Carne',
        category : 'pastel',
        rating : 4.3,
        price: 6,
        img: 'images/pastel/carne.jpg',
        quantity: 1
    },
    {
        id: 2,
        name: 'Queijo',
        category : 'pastel',
        rating : 4.3,
        price: 6,
        img: 'images/pastel/queijo.jpg',
        quantity: 1
    },
    {
        id: 3,
        name: 'Frango',
        category : 'pastel',
        rating : 4.3,
        price: 6,
        img: 'images/pastel/frango.jpg',
        quantity: 1
    },
    {
        id: 4,
        name: 'Pizza',
        category : 'pastel',
        rating : 4.3,
        price: 6,
        img: 'images/pastel/pastel-pizza.jpg',
        quantity: 1
    },
    {
        id: 5,
        name: 'Aipim',
        category : 'pastel',
        rating : 4.3,
        price: 6,
        img: 'images/pastel/aipim-pastel.jpg',
        quantity: 1
    },
    {
        id: 6,
        name: 'Coxinha',
        category : 'pastel',
        rating : 4.3,
        price: 6,
        img: 'images/pastel/coxinha.jpg',
        quantity: 1
    },
    {
        id: 7,
        name: 'Kibe',
        category : 'pastel',
        rating : 4.3,
        price: 6,
        img: 'images/pastel/kibe.jpg',
        quantity: 1
    },
    {
        id: 8,
        name: 'Caldo de Cana',
        category : 'bebidas',
        rating : 4.3,
        price: 6,
        img: 'images/bebidas/caldo.jpg',
        quantity: 1
    },
    {
      id: 9,
      name: 'COCA/Sabores Lata',
      category : 'bebidas',
      rating : 4.3,
      price: 6,
      img: 'images/bebidas/COCA-SABORES-LATA.jpg',
      quantity: 1
  },
  {
    id: 10,
    name: 'Agua Natural',
    category : 'bebidas',
    rating : 4.3,
    price: 3,
    img: 'images/bebidas/agua-natural.jpg',
    quantity: 1
},
    
  ]
var numeroComanda2 = 0;
var comandElement = document.getElementById("comand");

document.addEventListener('deviceready', function() {
    var serialNumber = device.serial;
    alert("Serial Number: " + serialNumber);
}, false);

document.addEventListener("DOMContentLoaded", function() {
    const foodTable = document.getElementById("foodTable");
    var acumulador = 0;
    var item_acumulador = 0;
    const totalElement = document.querySelector(".total");
    const cantItemsElement = document.querySelector(".cantItems");
    const comandElement = document.querySelector(".comand");
    const downloadCSVButton = document.getElementById("downloadCSVButton");

    // Botón para obtener y almacenar los valores
    document.getElementById("refreshButton").addEventListener("click", function() {
        location.reload();
    });

    function actualizarNumeroComanda() {
        lastPedidoNumber = Number(parseInt(localStorage.getItem("lastPedido")) || 0);
        lastPedidoNumber++;
        localStorage.setItem("lastPedido", lastPedidoNumber);
        return lastPedidoNumber;
    }

    // Generación de filas dinámicamente
    for (let i = 0; i < foodItem.length; i++) {
        var newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><input autofocus type="number" id="carga${i}" class="inputField cantidadInput" style="width:40px;"></td>
            <td><img src="${foodItem[i].img}" alt="Imagen del artículo seleccionado" style="width: 50px; height: 30px;"></td>
            <td>${foodItem[i].id}</td>
            <td>${foodItem[i].name}</td>
            <td>R$${foodItem[i].price.toFixed(2)}</td>
        `;

        // Agrega la nueva fila a la tabla
        foodTable.appendChild(newRow);
    }

    // Función para almacenar el pedido en localStorage
    function storeOrder() {
        
        const inputFields = document.querySelectorAll(".cantidadInput");
        let orderList = []; // Lista de productos seleccionados
        inputFields.forEach(function(inputField, index) {
            const cantidad = parseInt(inputField.value);
            
            if (cantidad > 0) {
                const precioTotal = foodItem[index].price * cantidad;
                acumulador += precioTotal;
                item_acumulador += cantidad;
                fechaHora = new Date().toLocaleString();
                let [fecha1, hora1] = fechaHora.split(', ');
                const orderItem = {
                    id: foodItem[index].id,
                    name: foodItem[index].name,
                    category: foodItem[index].category,
                    rating: foodItem[index].rating,
                    price: foodItem[index].price,
                    img: foodItem[index].img,
                    quantity: foodItem[index].quantity,
                    comanda: lastPedidoNumber, // Mismo número de comanda para todos los productos
                    cantidad: cantidad,
                    dispositivo: navigator.hardwareConcurrency, // Número de núcleos de CPU
                    fecha: fecha1,
                    hora: hora1,
                    precioTotal: precioTotal.toFixed(2),
                    rating: foodItem[index].rating
                };

                orderList.push(orderItem);
            }
        });

        if (orderList.length > 0) {
            localStorage.setItem(`pedido_${lastPedidoNumber}`, JSON.stringify(orderList));
            totalElement.innerHTML = acumulador.toFixed(2);
            cantItemsElement.innerHTML = item_acumulador;
            comandElement.innerHTML = lastPedidoNumber;
        } else {
            alert("No se ha seleccionado ningún producto.");
        }
    }

    // Botón para obtener y almacenar los valores
    const getValuesButton = document.getElementById("getValuesButton");
    getValuesButton.addEventListener("click", function() {
        lastPedidoNumber = actualizarNumeroComanda(); // Actualiza el número de comanda antes de almacenar
        storeOrder(); // Almacena los productos seleccionados
        numeroComanda2 =  lastPedidoNumber;
        enviarComanda()
        location.reload();
    });

    // Función para limpiar el localStorage (asociada al botón de limpiar)
    const btnClearStorage = document.querySelector("#btnClearStorage");
    btnClearStorage.addEventListener("click", () => {
        clearStorage();
    });

    // Función para descargar los pedidos como archivo CSV
    downloadCSVButton.addEventListener("click", function() {
        // Recuperar todas las comandas del localStorage
        let pedidos = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('pedido_')) {
                let pedido = JSON.parse(localStorage.getItem(key));
                pedidos.push(...pedido); // Agregar los ítems del pedido a la lista general
            }
        }

        // Ordenar los pedidos por número de comanda
        pedidos.sort((a, b) => b.comanda - a.comanda);

        // Crear el CSV
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Comanda,ID,Nome,Categoria,Quantidade,Preco unitario,Venda,Data,hora,Dispositivo\n"; // Encabezado del CSV
        pedidos.forEach(item => {

            let row = [
                item.comanda,
                item.id,
                item.name,
                item.category,
                item.cantidad,
                item.price,
                item.precioTotal,
                item.fecha,
                item.hora,
                item.dispositivo
            ].join(",");
            csvContent += row + "\n";
        });

        // Crear un elemento de enlace para descargar el archivo CSV
        let encodedUri = encodeURI(csvContent);
        
        // Obtener la fecha y hora actuales para la etiqueta del archivo
        let now = new Date();

        let fechaHora = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
        
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `comandas_${fechaHora}.csv`);
        document.body.appendChild(link);

        // Hacer clic automáticamente en el enlace para iniciar la descarga
        link.click();
        
        // Eliminar el enlace después de la descarga
        document.body.removeChild(link);
        alert('descarga concluida')
    });

    function clearStorage() {
        if (confirm("¿Seguro deseas ELIMINAR todos los registros, no quiero LLORADERA?")) {
            localStorage.removeItem("lastPedido");
            localStorage.clear();
            // Limpia la tabla en la página
            selectedItemsTableBody.innerHTML = '';
  
            // Actualiza los totales para reflejar que no hay registros
            acumulador = 0;
            item_acumulador = 0;
            lastPedidoNumber = 0;
            totalElement.innerHTML = "";
            cantItemsElement.innerHTML = "";
            total.innerHTML = "0.00";
            // Limpia los campos de entrada
            Comanda.value = 0;
            alert("Todos los registros de localStorage han sido eliminados.");
        }
    }
});
