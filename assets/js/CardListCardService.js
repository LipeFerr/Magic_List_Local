export function generateList(id) {
    const endpointURL = 'http://44.203.181.82:8080/CardListCard/infoTxt/'+id;
  
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
  
    return fetch(endpointURL, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // Retorna uma Promise com os dados JSON
      })
      .catch(error => {
        console.error('Erro durante a requisição:', error);
        throw error; // Rejeita a Promise com o mesmo erro
      });
  }

  export function insertCardListCard(CardListCard) {
    const endpointURL = 'http://44.203.181.82:8080/CardListCard';
    //console.log(CardListCard);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(CardListCard), // Converte o objeto para JSON
    };
  
    return fetch(endpointURL, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // Retorna uma Promise com os dados JSON
      })
      .catch(error => {
        console.error('Erro durante a requisição:', error);
        throw error; // Rejeita a Promise com o mesmo erro
      });
  }
