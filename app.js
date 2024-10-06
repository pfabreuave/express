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

    // Consultar el Local Storage para obtener el último número de comanda
    var lastPedidoNumber = parseInt(localStorage.getItem("lastPedido")) || 0;

    // Función para actualizar el número de comanda en localStorage
    function actualizarNumeroComanda() {
        lastPedidoNumber++;
        localStorage.setItem("lastPedido", lastPedidoNumber);
        return lastPedidoNumber;
    }

    // Generación de filas dinámicamente
    for (let i = 0; i < foodItem.length; i++) {
        var newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><input autofocus type="number" class="inputField cantidadInput" style="width:40px;"></td>
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
        
        // Mostrar el número de comanda en el campo de input
        //comandElement.textContent = ("("+ lastPedidoNumber + ")");
        const inputFields = document.querySelectorAll(".cantidadInput");
        let orderList = []; // Lista de productos seleccionados

        inputFields.forEach(function(inputField, index) {
            const cantidad = parseInt(inputField.value);
            
            if (cantidad > 0) {
                const precioTotal = foodItem[index].price * cantidad;
                acumulador += precioTotal;
                item_acumulador += cantidad;

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
                    //fechaHora: new Date().toLocaleString(),
                    fechaHora: new Date().toLocaleString().replace(",", "").replace(/\//g, "-").replace(/ /g, "_"), // Corregir formato de fecha y hora
                    precioTotal: precioTotal.toFixed(2),
                    rating: foodItem[index].rating
                };

                orderList.push(orderItem);
            }
        });

        if (orderList.length > 0) {
            localStorage.setItem(`pedido_${lastPedidoNumber}`, JSON.stringify(orderList));
            //localStorage.setItem("orderList", JSON.stringify(orderList));
            //console.log(`Pedido ${lastPedidoNumber} almacenado en local storage:`, orderList);
            totalElement.innerHTML = acumulador.toFixed(2);
            cantItemsElement.innerHTML = item_acumulador;
            comandElement.innerHTML = lastPedidoNumber;
            //alert(`Comanda ${lastPedidoNumber},  ${item_acumulador} item, R$ ${acumulador.toFixed(2)} almacenado en local storage:`, orderList);
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
        csvContent += "Comanda,ID,Nome,Categoria,Quantidade,Preço unitário,Preço total,Data e hora,Dispositivo\n"; // Encabezado del CSV
        pedidos.forEach(item => {
            let row = [
                item.comanda,
                item.id,
                item.name,
                item.category,
                item.cantidad,
                item.price,
                item.precioTotal,
                item.fechaHora,
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
        localStorage.clear();
        alert("Todos los registros de localStorage han sido eliminados.");
    }
});
