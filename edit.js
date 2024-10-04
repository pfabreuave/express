
var numeroComanda2 = 0;
var numeroComanda = 0;
var comanda

document.addEventListener('DOMContentLoaded', function() {
  // Obtener el número de la comanda de la URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const comandaNumber = urlParams.get('comanda');  // Extrae el número de comanda de la URL
  var numeroComandaInput = document.querySelector(".numeroComandaInput");
  const selectedItemsTableBody = document.getElementById("selectedItemsTableBody");
  const totalElement = document.querySelector(".total");
  const cantItemsElement = document.querySelector(".cantItems");
  const comandElement = document.querySelector(".comand");
  numeroComanda2 =  comandaNumber;

  let totalItems = 0;
  let totalPrice = 0;

  // Verificar si el número de comanda existe en LocalStorage
  const pedidoKey = `pedido_${comandaNumber}`;
  if (localStorage.getItem(pedidoKey)) {
      const pedido = JSON.parse(localStorage.getItem(pedidoKey)); // Recupera la comanda del localStorage

      // Iterar sobre los ítems de la comanda y agregarlos a la tabla
      pedido.forEach(item => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
              <td>${item.cantidad}</td>
              <td><img src="${item.img}" alt="${item.name}" style="width: 50px; height: 30px;"></td>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>R$${item.price.toFixed(2)}</td>
          `;
          selectedItemsTableBody.appendChild(newRow);

          // Actualizar totales
          totalItems += item.cantidad;
          totalPrice += parseFloat(item.precioTotal);
      });

      // Mostrar los totales en el DOM
      cantItemsElement.textContent = totalItems;
      totalElement.textContent = `R$${totalPrice.toFixed(2)}`;
      comandElement.textContent = comandaNumber;
  } else {
      alert("No se encontró la comanda en localStorage.");
  }
});


