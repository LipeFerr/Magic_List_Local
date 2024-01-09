document.addEventListener('DOMContentLoaded', function () {
    // Função para atualizar as classes das divs com base nas seleções
    function updateCategoryClasses() {
      const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
      const visibleCategories = [];
  
      checkboxes.forEach((checkbox, index) => {
        const categoryId = checkbox.id.replace('filter-', '');
        const categoryDiv = document.getElementById(categoryId);
  
        if (categoryDiv) {
          if (checkbox.checked) {
            visibleCategories.push(categoryDiv);
          }
          categoryDiv.style.display = checkbox.checked ? 'flex' : 'none';
        }
      });
  
      // Atribui classes 'claro' e 'escuro' alternadamente às divs visíveis
      visibleCategories.forEach((categoryDiv, index) => {
        const categoryClass = index % 2 === 0 ? 'claro' : 'escuro';
        categoryDiv.className = 'button-list ' + categoryClass;
      });
    }
  
    // Adiciona um listener para as caixas de seleção no menu lateral
    const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateCategoryClasses);
    });
  
    // Chama a função inicialmente para garantir que as classes estejam corretas no carregamento
    updateCategoryClasses();
  });
  