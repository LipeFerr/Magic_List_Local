export function insertCard(card) {
    const endpointURL = 'http://44.203.181.82:8080/cards/card';
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card), // Converte o objeto para JSON
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
