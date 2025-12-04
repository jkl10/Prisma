// --- Seleção dos Elementos do HTML ---

// Conecta as variáveis do JavaScript com os elementos correspondentes no HTML
const form = document.querySelector('form'); // O formulário de entrada
const ul = document.getElementById('lista_itens'); // A lista não ordenada (<ul>) onde os itens aparecerão
const input = document.getElementById('item'); // O campo de texto onde o usuário digita
const mostrarButton = document.getElementById('mostrarRegistros'); // O botão para exibir os dados
const limparButton = document.getElementById('limparLista'); // O botão para apagar tudo

// --- Armazenamento de Dados ---
// Verifica se já existem itens salvos no navegador (no localStorage).
// Se sim, carrega esses itens para a variável 'itemsArray'.
// Se não, cria a variável como um array (lista) vazio.
//lembrar!!!>>> localStorage só consegue guardar texto (strings). Por isso usamos JSON para separar os items deste texto
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// --- Funções Auxiliares ---
// Função para criar um item de lista (<li>) e adicioná-lo na tela.
const liMaker = (text) => {
  const li = document.createElement('li'); // Cria um elemento <li>
  li.textContent = text; // Define o texto do elemento
  ul.appendChild(li); // append= adiciona. Adiciona o <li> dentro da lista <ul> no HTML
    if(itemsArray.length == 11){
      while (ul.firstChild) {
    // remova esse primeiro filho. O processo se repete até a lista ficar vazia.
        ul.removeChild(ul.firstChild);
      }
      itemsArray.length = 0;
    };
};


// Função para remover todos os itens da lista que está na tela.
const limparListaNaTela = () => {
  // Enquanto a lista <ul> tiver um primeiro filho (um <li>)...
  while (ul.firstChild) {
    // remova esse primeiro filho. O processo se repete até a lista ficar vazia.
    ul.removeChild(ul.firstChild);
  }
};
// --- Eventos dos Botões -------------------------------------------
//  Evento para o formulário de ADICIONAR item.
// É acionado quando o botão "Adicionar" (do tipo submit) é clicado.
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Impede que a página recarregue ao enviar o formulário.

  // Verifica se o campo de texto não está vazio.
  if (input.value) {
    // Adiciona o texto digitado ao nosso array 'itemsArray'.
    itemsArray.push(input.value);
    //para alvar o array atualizado no localStorage:
    // JSON.stringify converte o array para um formato de texto para poder ser salvo, ok?
    localStorage.setItem('items', JSON.stringify(itemsArray));
    
    // Limpa o campo de texto, deixando-o pronto para uma nova entrada.
    input.value = "";
  }
});


// Evento para o botão de MOSTRAR registros.
// É acionado quando o botão "Mostrar Registros" é clicado
mostrarButton.addEventListener('click', function () {
  // Primeiro, limpa a lista na tela para evitar itens duplicados
  limparListaNaTela();

  // Busca os dados mais recentes salvos no localStorage.
  // JSON.parse converte o texto de volta para um array.
  const dadosSalvos = JSON.parse(localStorage.getItem('items'));

  // Se houver dados salvos...
  if (dadosSalvos) {
    // ...passa por cada item e usa a função liMaker para exibr na tela.
    dadosSalvos.forEach(item => {
       document.getElementById('mostrar').innerHTML = 'Comentários anteriores:';
      liMaker(item);
    });
  }
});

// Evento para o botão de LIMPAR tudo.
// É acionado quando o botão "Limpar Tudo" é clicado.
limparButton.addEventListener('click', function () {
  // Apaga todos os dados do localStorage.
  localStorage.clear();
  // Remove todos os itens da lista na tela.
  limparListaNaTela();
  // Reinicia o array 'itemsArray' como uma lista vazia.
   document.getElementById('mostrar').innerHTML = ''; // Define o conteúdo como vazio
  itemsArray = [];
});
 