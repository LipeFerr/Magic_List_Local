import { getListCards} from './ListCardsService.js';
import { generateList } from './CardListCardService.js';
import { downloadTxtFile, UploadList } from './I-O.js';

export const existingDivs = {
  "Mono": document.getElementById("mono"),
  "Dual": document.getElementById("dual"),
  "Three": document.getElementById("three"),
  "Four": document.getElementById("four"),
  "Five": document.getElementById("five")
};


// Função para lidar com o clique nos botões
function handleButtonClick(buttonId) {
  // Exemplo: Imprimir o ID do botão no console
  //console.log('Botão clicado:', buttonId);

  const colorTypeFilter = document.querySelector(`.color-type-filter[data-toggle="${buttonId}"]`);

    if (colorTypeFilter) {
      colorTypeFilter.classList.toggle('active');

      // Adiciona ou remove a classe 'expanded' para alternar a seta
      if (colorTypeFilter.classList.contains('active')) {
          colorTypeFilter.parentElement.classList.add('expanded');
      } else {
          colorTypeFilter.parentElement.classList.remove('expanded');
      }

    }


  generateList(buttonId)
  .then(jsonData => {
      downloadTxtFile(jsonData);
    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
    });
  
}

/*
// Função para gerar botões dinamicamente
function generateButton(containerId, buttonId, buttonText) {
  const container = document.getElementById(containerId);
  const button = document.createElement('button');
  button.textContent = buttonText;
  button.id = buttonId;
  container.appendChild(button);

  // Adiciona um ouvinte de clique para cada botão
  button.addEventListener('click', function () {
    // Chama a função passando o ID do botão
    handleButtonClick(this.id);
  });
}*/



// Função para gerar cards dinamicamente
function generateCards(buttonId, titleList, tagName, color) {
  // Verificar se tagName existe antes de converter para minúsculas
  const lowerCaseTagName = tagName ? tagName.toLowerCase() : '';
  const lowerCasecolor = color ? color.toLowerCase() : '';
  // Criar o elemento do card
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.backgroundColor = '#078E4D'; //'#BDB76B';

  // Adicionar conteúdo ao card
  card.innerHTML = `
    <h4>${titleList}</h4>
    <div class="tag-color">${lowerCaseTagName}</div><br>
    <button id="btn_d_${buttonId}" class="download-button" style="padding: 10px">Download</button>
    <button id="btn_v_${buttonId}" class="view-button">View</button>
  `;

  // Adicionar evento de clique ao botão de download
  const downloadButton = card.querySelector(`#btn_d_${buttonId}`);
  if (downloadButton) {
    downloadButton.addEventListener('click', function () {
      // Chama a função passando o ID do botão
      const numero = this.id.replace("btn_d_", "");
      handleButtonClick(numero);
    });
  }

  // Adicionar card à div correspondente com base na cor
  const contentDiv = document.getElementById(lowerCasecolor);
  if (contentDiv) {
    contentDiv.appendChild(card);
  } else {
    console.warn(`A div com ID "${lowerCasecolor}" não foi encontrada.`);
  }
}






export function loadListCards () {
getListCards()
.then(lists => {
  if (Array.isArray(lists)) {
    lists.forEach(list => {
      //const divClass = colorMapping[list.color];
      const targetDiv = existingDivs[list.color];

      if (targetDiv) {

        // Adicione os botões diretamente à div alvo aqui
            //generateButton(targetDiv.id, list.id, list.name);
            
            console.log(list);
            generateCards(list.id, list.name, list.tag_color, list.color);
        } else {
          console.warn(`A lista "${list.name}" não se encaixa em nenhum contexto`);
        }
      }
    );
  } else {
    console.error('A lista de cards não é um array:', lists);
  }
})
.catch(error => {
  console.error('Erro durante a obtenção da lista de cards:', error);
});
}

document.addEventListener('DOMContentLoaded', function () {

  const uploadButton = document.getElementById('uploadButton');
  uploadButton.addEventListener('click', UploadList);
  
  loadListCards();
});


export function clearListCards() {
  // Seleciona todos os botões dentro das divs com a classe "button-list"
  const buttons = document.querySelectorAll('.button-list .card');

  // Para cada botão encontrado
  buttons.forEach(button => {
    // Remove o botão
    button.remove();
  });
}




