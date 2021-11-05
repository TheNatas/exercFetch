// Crie um código em Javascript para obter os dados de um determinado carro
// através da API e mostre esses dados em uma página HTML. 
// Dados a serem obtidos: valor, marca, modelo e ano.
const tableOnlyRow = document.querySelector('tbody tr');

const initialURL = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

let codigoMarca;
let codigoModelo;
let codigoAno;

const getMarcasFromAPI = () => {
  return fetch(initialURL)
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);
};

const getModelosFromAPI = () => {
  return fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`)
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);
};

const getAnosFromAPI = () => {
  return fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`)
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);
};

const getValorFromAPI = () => {
  return fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`)
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);
}

const filterInfoAndDisplayOnTable = (vehicle) => {
  const tdMarca = document.createElement('td');
  tdMarca.textContent = vehicle.Marca;
  tableOnlyRow.appendChild(tdMarca);

  const tdModelo = document.createElement('td');
  tdModelo.textContent = vehicle.Modelo;
  tableOnlyRow.appendChild(tdModelo);

  const tdAno = document.createElement('td');
  tdAno.textContent = vehicle.AnoModelo;
  tableOnlyRow.appendChild(tdAno);

  const tdValor = document.createElement('td');
  tdValor.textContent = vehicle.Valor;
  tableOnlyRow.appendChild(tdValor);
};

getMarcasFromAPI().then(
  marcas => marcas.find(marca => marca.nome === 'Jeep')
).then(
  foundMarca => {
    codigoMarca = foundMarca.codigo; 
    return getModelosFromAPI();
  }
).then(
  modelosObj => modelosObj.modelos.find(modelo => modelo.nome === 'Renegade Custom 1.8 4x2 Flex 16V Mec.')
).then(
  foundModelo => {
    codigoModelo = foundModelo.codigo;
    return getAnosFromAPI();
  }
).then(
  anos => anos.find(ano => ano.nome === '2018 Gasolina')
).then(
  foundAno => {
    codigoAno = foundAno.codigo;
    return getValorFromAPI();
  }
).then(
  vehicleDetails => filterInfoAndDisplayOnTable(vehicleDetails)
)



