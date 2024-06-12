window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const editarIndex = urlParams.get('editar');

    if (editarIndex !== null) {
        const index = parseInt(editarIndex);

        fetch('/meu_cafe/carrinho')
            .then(response => response.json())
            .then(carrinho => {
                if (index >= 0 && index < carrinho.length) {
                    const produto = carrinho[index];

                    switch (produto.nome) {
                        case "Cappuccino Italiano":
                            document.getElementById('cappuccino-quantidade').value = produto.quantidade;
                            document.getElementById('cappuccino-tipo').value = produto.tipo;
                            document.getElementById('cappuccino-leite').value = produto.leite;
                            document.getElementById('cappuccino-observacoes').value = produto.observacoes;
                              break;
                        case "Espresso":
                            document.getElementById('espresso-quantidade').value = item.quantidade;
                            document.getElementById('espresso-tipo').value = item.cafe;
                            document.getElementById('espresso-leite').value = "";
                            document.getElementById('espresso-observacoes').value = item.observacoes;
                            break;
                        case "Macchiato":
                            document.getElementById('macchiato-quantidade').value = item.quantidade;
                            document.getElementById('macchiato-tipo').value = item.cafe;
                            document.getElementById('macchiato-leite').value = item.leite;
                            document.getElementById('macchiato-observacoes').value = item.observacoes;
                            break;
                        case "Americano":
                            document.getElementById('americano-quantidade').value = item.quantidade;
                            document.getElementById('americano-tipo').value = item.cafe;
                            document.getElementById('americano-leite').value = "";
                            document.getElementById('americano-observacoes').value = item.observacoes;
                            break;
                        case "Latte":
                            document.getElementById('latte-quantidade').value = item.quantidade;
                            document.getElementById('latte-tipo').value = item.cafe;
                            document.getElementById('latte-leite').value = item.leite;
                            document.getElementById('latte-observacoes').value = item.observacoes;
                            break;
                        case "Moka":
                            document.getElementById('moka-quantidade').value = item.quantidade;
                            document.getElementById('moka-tipo').value = item.cafe;
                            document.getElementById('moka-leite').value = item.leite;
                            document.getElementById('moka-observacoes').value = item.observacoes;
                            break;
                        default:
                            console.error("Produto não encontrado.");
                    }

                } else {
                    console.error("Índice de produto inválido.");
                }
            })
            .catch(error => console.error("Erro ao obter carrinho:", error));
    }
}

function criarItemHTML(item, index) {
    return `
        <tr>
            <td>
                <div class="product">
                    <img src="${item.imagem}" alt="${item.nome}" />
                    <div class="info">
                        <div class="name">${item.nome}</div>
                    </div>
                </div>
                <abbr title="Excluir produto"><button class="btn-excluir" onclick="removerItem(${index})"><i class="fas fa-trash-alt"></i></button></abbr>
                <abbr title="Editar compra"><button class="btn-editar" onclick="abrirModalEditar(${index})"><i class="fas fa-pencil-alt"></i></button></abbr>
            </td>
            <td>${item.cafe}</td>
            <td>${item.leite}</td>
            <td>${item.observacoes}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
        </tr>
    `;
}

function atualizarCarrinho(carrinho) {
    const carrinhoDiv = document.getElementById('carrinho'); 
    let total = 0;

    carrinhoDiv.innerHTML = '';

    carrinho.forEach((item, index) => {
        carrinhoDiv.innerHTML += criarItemHTML(item, index);
        total += item.preco * item.quantidade;
    });

    document.getElementById('sub-total').textContent = 'R$ ' + total.toFixed(2);
    document.getElementById('total').textContent = 'R$ ' + total.toFixed(2);
}

fetch('/meu_cafe/carrinho')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao obter carrinho.');
    })
    .then(carrinho => {
        atualizarCarrinho(carrinho);
    })
    .catch(error => console.error(error.message));

function removerItem(index) {
    fetch('/remover_item', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: index })
    })
    .then(response => response.json())
    .then(() => window.location.reload())
    .catch(error => console.error('Erro ao remover item do carrinho:', error.message));
}

function editarItem(index, tipoCafe) {
    window.location.href = `/meu_cafe/${tipoCafe}?editar=${index}`;
}

function abrirModalEditar(index) {
    fetch('/meu_cafe/carrinho')
        .then(response => response.json())
        .then(carrinho => {
            if (index >= 0 && index < carrinho.length) {
                const produto = carrinho[index];
                const tipoCafe = produto.nome.toLowerCase().replace(' ', '_');
                editarItem(index, tipoCafe);
            } else {
                console.error("Índice de produto inválido.");
            }
        })
        .catch(error => console.error("Erro ao obter carrinho:", error));
}


function concluirCompra(e) {
    e.preventDefault();
    
    fetch('/meu_cafe/carrinho', { method: 'GET' })
    .then(response => response.json())
    .then(carrinho => {
        if (carrinho.length === 0) {
            alert("O carrinho está vazio. Não é possível concluir a compra.");
            return; 
        }
        
        fetch('/concluir_compra', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.removeItem('carrinho');
                window.location.href = '/meu_cafe/compra_concluida';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Erro ao concluir a compra:', error.message));
    })
    .catch(error => console.error('Erro ao verificar o carrinho:', error.message));
}
document.getElementById('concluirCompraBtn').onclick = concluirCompra;


document.getElementById('esvaziarCarrinhoBtn').onclick = function() {
    fetch('/esvaziar_carrinho', { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('carrinho');
            window.location.reload();
        })
        .catch(error => console.error('Erro ao esvaziar o carrinho:', error.message));
};

function adicionarAoCarrinho(produto) {
    fetch('/adicionar_ao_carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto: produto })
    })
    .then(response => response.json())
    .then(() => window.location.href = '/meu_cafe/carrinho')
    .catch(error => console.error('Erro ao adicionar item ao carrinho:', error.message));
}
