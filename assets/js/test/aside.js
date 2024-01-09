// Função para criar um checkbox
function createCheckbox(id, label, className, checked, tagName) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.className = className;
    checkbox.checked = checked;
  
    // Adiciona evento de mudança para chamar a função handleCheckboxChange
    checkbox.addEventListener('change', function () {
      handleCheckboxChange(this, tagName);
    });
  
    const checkboxLabel = document.createElement("label");
    checkboxLabel.className = "label-filho";
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(label));
  
    return checkboxLabel;
  }
  
  
  // Função para criar uma seção de filtro
  function createFilterSection(filterId, filterLabel, filterCheckboxes, filterClass) {
    const filterSection = document.createElement("div");
    filterSection.className = "filter-section";
  
    const filterCheckbox = document.createElement("input");
    filterCheckbox.type = "checkbox";
    filterCheckbox.id = filterId;
    filterCheckbox.checked = true;
  
    const filterHeader = document.createElement("label");
    filterHeader.className = "filter-label";
    filterHeader.setAttribute("for", filterId);
    filterHeader.appendChild(filterCheckbox);
    filterHeader.appendChild(document.createTextNode(` ${filterLabel} `));
  
    const filterButton = document.createElement("button");
    filterButton.className = "filter_switch";
    filterButton.dataset.target = filterId;
    filterButton.appendChild(document.createTextNode("▼"));
    
    filterButton.addEventListener("click", function () {
      const colorTypeFilter = filterSection.querySelector(".color-type-filter");
      const isFilterVisible = colorTypeFilter.style.display === "none" || colorTypeFilter.style.display === "";
    
      colorTypeFilter.style.display = isFilterVisible ? "block" : "none";
      filterButton.textContent = isFilterVisible ? "▲" : "▼";
    });
    
    filterHeader.appendChild(filterButton);
  
    const colorTypeFilter = document.createElement("div");
    colorTypeFilter.className = "color-type-filter";
    colorTypeFilter.style.paddingLeft = "15px";

    filterCheckboxes.forEach((checkbox) => {
      colorTypeFilter.appendChild(checkbox);
    });
  
    filterSection.appendChild(filterHeader);
    filterSection.appendChild(colorTypeFilter);
  
    return filterSection;
  }
  
  
  
  // Array para armazenar as configurações dos filtros
  const filters = [
    { id: "mono", label: "Mono Color", checkboxes: ["White", "Blue", "Black", "Red", "Green"], className: "filter-mono" },
    { id: "dual", label: "Dual Color", checkboxes: ["Azorius", "Boros", "Dimir", "Golgari", "Gruul", "Izzet", "Orzhov", "Rakdos", "Selesnya", "Simic"], className: "filter-dual" },
    { id: "three", label: "Three Color", checkboxes: ["Abzan", "Bant", "Esper", "Grixis", "Jeskai", "Jund", "Mardu", "Naya", "Sultai", "Temur"], className: "filter-three" },
    { id: "four", label: "Four Color", checkboxes: ["Ceta", "Dune", "Ink", "Sans", "Witch"], className: "filter-four" },
    { id: "five", label: "Five Color", checkboxes: ["Artifact", "Rainbow"], className: "filter-five" }
  ];
  
  // Container onde o aside será adicionado
  const dynamicAsideContainer = document.querySelector('.sidebar');
  
  // Criar e adicionar cada seção de filtro ao container
  filters.forEach((filter) => {
    const checkboxes = filter.checkboxes.map((checkboxLabel) =>
  createCheckbox(`filter-${checkboxLabel.toLowerCase()}`, checkboxLabel, filter.className, true, checkboxLabel)
);
  
    const filterSection = createFilterSection(`filter-${filter.id}`, filter.label, checkboxes, filter.className);
    dynamicAsideContainer.appendChild(filterSection);
  });

  

  

function handleCheckboxChange(checkbox, tagName) {
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    const cardTag = card.querySelector('.tag-color');
    
    if (cardTag && cardTag.textContent.toLowerCase() === tagName.toLowerCase()) {
    card.style.display = checkbox.checked ? 'block' : 'none';
    }
});
}

  // Adicione esse código ao final do seu arquivo JavaScript
  document.addEventListener('DOMContentLoaded', function () {
    const filterSwitches = document.querySelectorAll('.filter_switch');
  
    filterSwitches.forEach(switchElement => {
      switchElement.addEventListener('click', function () {
        const parentLabel = switchElement.parentElement;
        const colorTypeFilter = parentLabel.querySelector('.color-type-filter');
        colorTypeFilter.style.display = (colorTypeFilter.style.display === 'none' || colorTypeFilter.style.display === '') ? 'block' : 'none';
      });
    });
  
    const filterCheckboxes = document.querySelectorAll('.filter-pai input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const filterClass = this.id.replace('filter-', '');
        const allCheckboxes = document.querySelectorAll(`.${filterClass} input[type="checkbox"]`);
  
        allCheckboxes.forEach(childCheckbox => {
          childCheckbox.checked = this.checked;
        });
      });
    });
  });
  