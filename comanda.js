
document.addEventListener("DOMContentLoaded", function() {
  const selectedItemsTableBody = document.getElementById("selectedItemsTableBody");
  const totalComandasElement = document.querySelector(".TotalComandas");
  const totalItemsElement = document.querySelector(".TotalItems");
  const totalFacturadoElement = document.querySelector(".totalFacturado");

  let totalComandas = 0;
  let totalItems = 0;
  let totalFacturado = 0;
  let comandasList = [];

  // Iterar sobre el Local Storage para obtener todas las comandas
  for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      // Filtrar solo las entradas que correspondan a pedidos (comandas)
      if (key.startsWith('pedido_')) {
          let pedido = JSON.parse(localStorage.getItem(key));
          let comandaTotalItems = 0;
          let comandaTotalPrice = 0;

          // Calcular total de ítems y total facturado por comanda
          pedido.forEach(item => {
              comandaTotalItems += item.cantidad;
              comandaTotalPrice += parseFloat(item.precioTotal);
          });

          // Guardar los datos de la comanda en un array para ordenar después
          comandasList.push({
              comanda: pedido[0].comanda, // Número de comanda
              items: comandaTotalItems,
              total: comandaTotalPrice
          });

          // Incrementar contadores globales
          totalItems += comandaTotalItems;
          totalFacturado += comandaTotalPrice;
          totalComandas++;
      }
  }

  // Ordenar la lista de comandas por número de comanda de mayor a menor
  comandasList.sort((a, b) => b.comanda - a.comanda);

  // Crear las filas de la tabla ordenadas
  comandasList.forEach(comanda => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${comanda.comanda}</td>
          <td>${comanda.items}</td>
          <td>R$${comanda.total.toFixed(2)}</td>
          <td class="columnAction"><button class="editaButton" title="Edita comanda"><i class="bx bxs-chevron-up-circle"></button></td>
        `;
      selectedItemsTableBody.appendChild(newRow);
  });

  // Mostrar los totales generales
  totalComandasElement.textContent = totalComandas;
  totalItemsElement.textContent = totalItems;
  totalFacturadoElement.textContent = `R$${totalFacturado.toFixed(2)}`;
 

  
    // Agregar evento de clic a los botones de edición
    const editButtons = document.querySelectorAll('.editaButton');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Obtener el número de comanda de la fila actual
        const comandaNumber = button.closest('tr').querySelector('td:first-child').textContent;
        
        window.open(`edit.html?comanda=${comandaNumber}`, '_blank');
      
      });
    });

});

