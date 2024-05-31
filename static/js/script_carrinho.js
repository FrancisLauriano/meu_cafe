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
            switch (produto.nome) {
                case "Cappuccino Italiano":
                    preencherCamposCappuccino(produto);
                    break;
                case "Espresso":
                    preencherCamposEspresso(produto);
                    break;
                case "Macchiato":
                    preencherCamposMacchiato(produto);
                    break;
                case "Americano":
                    preencherCamposAmericano(produto);
                    break;
                case "Latte":
                    preencherCamposLatte(produto);
                    break;
                case "Moka":
                    preencherCamposMoka(produto);
                    break;
                default:
                    console.error("Produto não encontrado.");
            }
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
                    <abbr title="Excluir produto"><button class="btn-excluir" onclick="removerItem(${index})"><i class="fas fa-trash-alt"></i></button></abbr>
                    <abbr title="Editar compra"><button class="btn-editar" onclick="editarItem(${index})"><i class="fas fa-pencil-alt"></i></button></abbr>
                </td>
                <td>${item.cafe}</td>
                <td>${item.leite}</td>
                <td>${item.observacoes}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
                
            </tr>
        `;

        total += item.preco * item.quantidade;
    });
    document.getElementById('sub-total').textContent = 'R$ ' + total.toFixed(2);

    document.getElementById('total').textContent = 'R$ ' + total.toFixed(2);
    
};

function preencherCamposCappuccino(item) {
    document.getElementById('cappuccino-quantidade').value = item.quantidade;
    document.getElementById('cappuccino-tipo').value = item.cafe;
    document.getElementById('cappuccino-leite').value = item.leite;
    document.getElementById('cappuccino-observacoes').value = item.observacoes;
}

function preencherCamposEspresso(item) {
    document.getElementById('espresso-quantidade').value = item.quantidade;
    document.getElementById('espresso-tipo').value = item.cafe;
    document.getElementById('espresso-leite').value = "";
    document.getElementById('espresso-observacoes').value = item.observacoes;
}

function preencherCamposMacchiato(item) {
    document.getElementById('macchiato-quantidade').value = item.quantidade;
    document.getElementById('macchiato-tipo').value = item.cafe;
    document.getElementById('macchiato-leite').value = item.leite;
    document.getElementById('macchiato-observacoes').value = item.observacoes;
}

function preencherCamposAmericano(item) {
    document.getElementById('americano-quantidade').value = item.quantidade;
    document.getElementById('americano-tipo').value = item.cafe;
    document.getElementById('americano-leite').value = "";
    document.getElementById('americano-observacoes').value = item.observacoes;
}

function preencherCamposLatte(item) {
    document.getElementById('latte-quantidade').value = item.quantidade;
    document.getElementById('latte-tipo').value = item.cafe;
    document.getElementById('latte-leite').value = item.leite;
    document.getElementById('latte-observacoes').value = item.observacoes;
}

function preencherCamposMoka(item) {
    document.getElementById('moka-quantidade').value = item.quantidade;
    document.getElementById('moka-tipo').value = item.cafe;
    document.getElementById('moka-leite').value = item.leite;
    document.getElementById('moka-observacoes').value = item.observacoes;
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
                    <abbr title="Excluir produto"><button class="btn-excluir" onclick="removerItem(${index})"><i class="fas fa-trash-alt"></i></button></abbr>
                    <abbr title="Editar compra"><button class="btn-editar" onclick="editarItem(${index})"><i class="fas fa-pencil-alt"></i></button></abbr>
                </td>
                <td>${item.cafe}</td>
                <td>${item.leite}</td>
                <td>${item.observacoes}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
            </tr>
        `;
        total += item.preco * item.quantidade;
    });
    document.getElementById('sub-total').textContent = 'R$ ' + total.toFixed(2);

    document.getElementById('total').textContent = 'R$ ' + total.toFixed(2);
}



// Função para esvaziar o carrinho
function esvaziarCarrinho() {
    localStorage.removeItem('carrinho'); // Remove o carrinho do armazenamento local
    
    // Atualiza a exibição do carrinho na página
    let carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = ''; // Limpa a tabela
    
    // Atualiza o resumo da compra
    document.getElementById('sub-total').textContent = 'R$ 0.00';
    document.getElementById('total').textContent = 'R$ 0.00';
}

// Vincular o evento de clique ao botão "Esvaziar Carrinho"
document.getElementById('esvaziarCarrinhoBtn').addEventListener('click', esvaziarCarrinho);



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
    localStorage.removeItem('carrinho'); // Remove o carrinho do armazenamento local
   
}

// Vincular o evento de clique ao botão "Esvaziar Carrinho"
document.getElementById('concluirCompraBtn').addEventListener('click', concluirCompra);

