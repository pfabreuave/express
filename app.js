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
        name: 'coxinha',
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
    
  ]
var acumulador = 0;
var item_acumulador = 0;
var comandElement = document.getElementById("comand");
const btnClearStorage = document.querySelector("#btnClearStorage"); // botón para eliminar todos los registros
btnClearStorage.addEventListener("click", () => {
    // Llama a una función para eliminar los datos almacenados
    clearStorage();
  });
// Obtén una referencia al elemento con la clase "total" en tu HTML
const totalElement = document.querySelector(".total");
const cantItemsElement = document.querySelector(".cantItems");

// Obtén una referencia al elemento select en tu HTML
const selectElement = document.getElementById("miSelect");
const comandaInput = document.getElementById("Comanda");

document.addEventListener("DOMContentLoaded", function() {
    const foodTable = document.getElementById("foodTable");
  
    for (let i = 0; i < foodItem.length; i++) {
      const newRow = document.createElement("tr");
  
      newRow.innerHTML = `
        <td><input autofocus type="number" class="inputField cantidadInput" style="width:40px;"></td>
        <td><img src="${foodItem[i].img}" alt="Imagen del artículo seleccionado" style="width: 50px; height: 30px;"></td>
        <td>${foodItem[i].id}</td>
        <td>${foodItem[i].name}</td>
        <td>R$${foodItem[i].price.toFixed(2)}</td>
        <td><button class="deleteButton" title="¡Botón de eliminar!"><i class='bx bx-trash'></i></button></td> <!-- Botón de eliminar -->
      `;
  
      // Agrega la nueva fila a la tabla
      selectedItemsTableBody.appendChild(newRow);

    }
    
  });

document.addEventListener("DOMContentLoaded", function() {
    const foodTable = document.getElementById("foodTable");
    const selections = []; // Array para almacenar las selecciones del usuario
  

  });
  

const selectedItemsTableBody = document.getElementById("selectedItemsTableBody");

// Consultar el Local Storage para obtener el último número de comanda
var lastPedidoNumber = parseInt(localStorage.getItem("lastPedido")) || 0;

// Verificar si no hay ningún ítem cargado
if (lastPedidoNumber === 0) {
  // Si no hay ningún pedido en el Local Storage, establecer el número de comanda inicial a 1
  lastPedidoNumber = 1;
  localStorage.setItem("lastPedido", lastPedidoNumber)
} else {
        // Si hay un pedido en el Local Storage, incrementar el número de comanda para la nueva comanda
        lastPedidoNumber += 1;
        //localStorage.setItem("lastPedido", lastPedidoNumber)
        totalElement.innerHTML = '';
        cantItemsElement.innerHTML = '';
        acumulador = 0;
        item_acumulador = 0;
    }

// Mostrar el número de comanda en el campo de input
comandElement.textContent = ("("+ lastPedidoNumber + ")");


// Función para guardar en Local Storage
function saveToLocalStorage(item, cantidad, precioTotal) {
    // Obtén los pedidos existentes del Local Storage o crea un array vacío si no hay pedidos
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  
    // Agrega la cantidad y el precioTotal al objeto del pedido
    item.cantidad = cantidad;
    item.precioTotal = precioTotal;
  
    // Agrega el nuevo pedido al array
    pedidos.push(item);
  
    // Guarda el array actualizado en el Local Storage
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }
  

// Obtén una referencia al botón "salvar" en tu HTML
const salvarButton = document.getElementById("btnCer");


function clearStorage() {
    if (confirm("¿Seguro deseas ELIMINAR todos los registros, no quiero LLORADERA?")) {
      // Borra los datos almacenados en localStorage
      localStorage.removeItem("pedidos");
      localStorage.removeItem("lastPedido");
      
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
      //comandaInput.value = 0;
      numeroComanda = 0;
      location.reload();
  
    }
  }