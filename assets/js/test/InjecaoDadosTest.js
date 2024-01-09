document.addEventListener('DOMContentLoaded', function () {
    // Dados fictícios para exemplificar
    const dados = [
      { nome: 'Mono Green Duel', cor: 'mono', tag_color: 'Green' },
      { nome: 'Mono Blue Duel', cor: 'mono', tag_color: 'Blue' },
      { nome: 'Mono Red Duel', cor: 'mono', tag_color: 'Red' },
      { nome: 'Mono Black Duel', cor: 'mono', tag_color: 'Black' },
      { nome: 'Mono White Duel', cor: 'mono', tag_color: 'White' },
      { nome: 'Mono REd Duel', cor: 'mono', tag_color: 'Red' },
      { nome: 'Simic cDEH', cor: 'dual', tag_color: 'Simic' },
      { nome: 'Five Color Duel', cor: 'five', tag_color: 'Blue' },
      { nome: 'Five Color Pionner', cor: 'five', tag_color: 'Red' },
      { nome: 'Five Color Pauper', cor: 'five', tag_color: 'Black' },
      { nome: 'Five Color CMD', cor: 'five', tag_color: 'White' },
      { nome: 'Five Color Conquest', cor: 'five', tag_color: 'Red' },
      { nome: 'Five Color cDEH', cor: 'five', tag_color: 'Simic' },
      // Adicione mais dados conforme necessário
    ];
  
    // Função para criar um card
    function criarCard(nome, cor, tag_color) {
      // Criar o elemento do card
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundColor = '#078E4D';//'#BDB76B';
  
      // Adicionar conteúdo ao card
      card.innerHTML = `
        <h2>${nome}</h2>
        <div class="tag-color">${tag_color}</div><br>
        <button class="download-button" style="padding: 10px">Download</button>
        <button class="view-button">View</button>
      `;
  
      // Adicionar card ao grupo correspondente
      const group = document.getElementById(cor);
      if (group) {
        group.appendChild(card);
      }
    }
  
    // Gerar cards aleatórios com base nos dados fictícios
    dados.forEach(item => {
      criarCard(item.nome, item.cor, item.tag_color);
    });
  });
  