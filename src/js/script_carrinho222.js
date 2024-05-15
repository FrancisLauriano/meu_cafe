// script_carrinho.js
window.onload = function() {
  // Verifica se há parâmetros na URL para determinar se o usuário está editando um produto
  const urlParams = new URLSearchParams(window.location.search);
  const editarIndex = urlParams.get('editar');
  
  if (editarIndex !== null) {
      // Obtém o índice do produto a ser editado
      const index = parseInt(editarIndex);
      
      // Obtém o carrinho do armazenamento local
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      
      // Verifica se o índice está dentro dos limites do carrinho
      if (index >= 0 && index < carrinho.length) {
          const produto = carrinho[index];
          
          // Preenche os campos da página com os detalhes do produto
          document.getElementById('cappuccino-quantidade').value = produto.quantidade;
          document.getElementById('cappuccino-tipo').value = produto.cafe;
          document.getElementById('cappuccino-leite').value = produto.leite;
          document.getElementById('cappuccino-observacoes').value = produto.observacoes;
      } else {
          console.error("Índice de produto inválido.");
      }
  }

  // Preenche o carrinho na página
  let carrinhoDiv = document.getElementById('carrinho');
  let total = 0;
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.forEach((item, index) => {
      carrinhoDiv.innerHTML += `
          <tr>
              <td>
                  <div class="product">
                      <img src="${item.imagem}" alt="${item.nome}" />
                      <div class="info">
                          <div class="name">${item.nome}</div>
                      </div>
                  </div>
              </td>
              <td>${item.cafe}</td>
              <td>${item.leite}</td>
              <td>${item.observacoes}</td>
              <td>R$ ${item.preco.toFixed(2)}</td>
              <td>${item.quantidade}</td>
              <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
              <td>
                  <button class="btn-excluir" onclick="removerItem(${index})">Excluir</button>
                  <button class="btn-editar" onclick="editarItem(${index})">Editar</button>
              </td>
          </tr>
      `;
      total += item.preco * item.quantidade;
  });
  document.getElementById('total').textContent = 'R$ ' + total.toFixed(2);
};

function adicionarAoCarrinho() {
  // Implemente a lógica para adicionar o produto ao carrinho
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1); // Remove o item do carrinho
  localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o carrinho no armazenamento local

  // Atualiza a exibição do carrinho na página removendo o item da tabela
  let carrinhoDiv = document.getElementById('carrinho');
  let total = 0;
  carrinhoDiv.innerHTML = ''; // Limpa a tabela antes de recriá-la
  carrinho.forEach((item, index) => {
      carrinhoDiv.innerHTML += `
          <tr>
              <td>
                  <div class="product">
                      <img src="${item.imagem}" alt="${item.nome}" />
                      <div class="info">
                          <div class="name">${item.nome}</div>
                      </div>
                  </div>
              </td>
              <td>${item.cafe}</td>
              <td>${item.leite}</td>
              <td>${item.observacoes}</td>
              <td>R$ ${item.preco.toFixed(2)}</td>
              <td>${item.quantidade}</td>
              <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
              <td>
                  <button class="btn-excluir" onclick="removerItem(${index})">Excluir</button>
                  <button class="btn-editar" onclick="editarItem(${index})">Editar</button>
              </td>
          </tr>
      `;
      total += item.preco * item.quantidade;
  });
  document.getElementById('total').textContent = 'R$ ' + total.toFixed(2);
}

function editarItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let item = carrinho[index];
  switch (item.nome) {
      case "Cappuccino Italiano":
          // Adiciona o parâmetro 'editar' na URL para indicar que estamos editando o produto
          window.location.href = `cappuccino_italiano.html?editar=${index}`;
          break;
      case "Espresso":
          window.location.href = `espresso.html?editar=${index}`;
          break;
      case "Macchiato":
          window.location.href = `macchiato.html?editar=${index}`;
          break;
      case "Americano":
          window.location.href = `americano.html?editar=${index}`;
          break;
      case "Latte":
          window.location.href = `latte.html?editar=${index}`;
          break;
      case "Moka":
          window.location.href = `moka.html?editar=${index}`;
          break;
      default:
          console.error("Produto não encontrado.");
  }
}

function concluirCompra() {
  // Implemente a lógica para concluir a compra aqui
}



