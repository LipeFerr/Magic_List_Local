import { insertCard } from './CardService.js';
import { insertListCard } from './ListCardsService.js';
import { insertCardListCard } from './CardListCardService.js'
import { loadListCards, clearListCards } from './main.js';

export function downloadTxtFile(data) {
    const filename = `${data.name.replace(/\s/g, '_')}_${data.color}.txt`;
    let content = '';
  
    // Itera sobre os cards e adiciona ao conteúdo
    data.cards.forEach(card => {
      content += `${card.qtd} ${card.name}\n`;
    });
  
    // Cria um link para download
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
  
    // Simula um clique no link para iniciar o download
    link.click();
  }
  export async function UploadList() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = async function (e) {
        const fileContent = e.target.result;
  
        try {
          // Aguarde a conclusão do processamento do arquivo antes de recarregar os botões
          await processFileContent(fileContent);
          clearListCards();
          loadListCards();
          alert('uploading successful');
        } catch (error) {
          // Trate o erro, se necessário
          console.error('Erro durante o upload do arquivo:', error);
        }
      };
  
      reader.readAsText(file);
    } else {
      alert('Por favor, selecione um arquivo.');
    }
  }
// Função para processar o conteúdo do arquivo
async function processFileContent(content) {
    const lines = content.split('\r\n');
  
    if (lines.length >= 1) {
      // Processa os dados do ListCard a partir da primeira linha
      const [listCardName, listCardColor] = lines[0].split(', ');
  
      try {
        // Insere o ListCard e aguarda a conclusão
        const insertedListCard = await insertListCard({ name: listCardName, color: listCardColor });
        const listCardId = insertedListCard.id;
  
        for (let index = 1; index < lines.length; index++) {
          // Processa os dados do Card a partir da segunda linha
          const [qtdCard, cardName] = lines[index].split(', ');
  
          if (cardName && qtdCard !== null) {
            // Insere o Card e aguarda a conclusão
            const insertedCard = await insertCard({ name: cardName });
            const cardId = insertedCard.id;
  
            // Monta o objeto CardListCard com os IDs do ListCard e Card
            const cardListCard = {
              id: { id_list_card: listCardId, id_card: cardId },
              qtdCard: parseInt(qtdCard),
            };
  
            //console.log(cardListCard);
  
            // Insere o CardListCard e aguarda a conclusão
            const insertedCardListCard = await insertCardListCard(cardListCard);
          } else {
            console.log('Nome do card ou qtdCard inválidos. Ignorando a inserção do Card e CardListCard.');
          }
        }
  
        //console.log('Dados inseridos com sucesso.');
      } catch (error) {
        console.error('Erro durante a inserção:', error);
      }
    } else {
      alert('O arquivo deve conter pelo menos uma linha.');
    }
  }
  