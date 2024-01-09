document.addEventListener('DOMContentLoaded', function () {
    // Adiciona um evento de clique aos elementos com a classe "filter_switch"
    const filterSwitches = document.querySelectorAll('.filter_switch');
    filterSwitches.forEach(function (switchElement) {
      switchElement.addEventListener('click', function () {
        // Obtém o próximo elemento irmão, que é o div contendo os checkboxes
        const filterContainer = switchElement.nextElementSibling;

        // Alterna a visibilidade do container de filtro
        if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
          filterContainer.style.display = 'block';
        } else {
          filterContainer.style.display = 'none';
        }
      });
    });
  });