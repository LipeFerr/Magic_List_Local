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

  generateList(buttonId)
  .then(jsonData => {
      downloadTxtFile(jsonData);
    })
    .catch(error => {
      console.error('Erro durante a requisição:', error);
    });
  
}

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
            generateButton(targetDiv.id, list.id, list.name);
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
  const buttons = document.querySelectorAll('.button-list button');

  // Para cada botão encontrado
  buttons.forEach(button => {
    // Remove o botão
    button.remove();
  });
}




