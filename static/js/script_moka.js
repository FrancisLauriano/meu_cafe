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

                    document.getElementById('moka-quantidade').value = produto.quantidade;
                    document.getElementById('moka-tipo').value = produto.cafe;
                    document.getElementById('moka-leite').value = produto.leite;
                    document.getElementById('moka-observacoes').value = produto.observacoes;
                } else {
                    console.error("Índice de produto inválido.");
                }
            })
            .catch(error => console.error("Erro ao obter carrinho:", error));
    }
};


// redireciona para a página correta de edição do item
function editarItem(index, tipoCafe) {
    fetch(`/meu_cafe/carrinho/editar/${index}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: index })
    })
    .then(response => {
        if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
            return response.json();
        }
        throw new Error('Erro ao atualizar item do carrinho.');
    })
    .then(() => {
        // redireciona para a página de edição do item com o parâmetro 'editar' na URL
        window.location.href = `/meu_cafe/${tipoCafe}?editar=${index}`;
    })
    .catch(error => console.error(error.message));
}



function adicionarAoCarrinho() {
    // captura informações do produto
    const nomeProduto = "Moka";
    const valorProduto = 8.99;
    const quantidadeProduto = parseInt(document.getElementById('moka-quantidade').value);
    const tipoCafe = document.getElementById('moka-tipo').value;
    const tipoLeite = document.getElementById('moka-leite').value;
    const observacoes = document.getElementById('moka-observacoes').value;

    // constrói o objeto do item do carrinho
    const item = {
        nome: nomeProduto,
        preco: valorProduto,
        quantidade: quantidadeProduto,
        cafe: tipoCafe,
        leite: tipoLeite,
        observacoes: observacoes,
        imagem: "../static/image/menu-1.png" 
    };

    // envia a solicitação para adicionar ao carrinho para o servidor
    fetch('/adicionar_ao_carrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // redireciona para a página do carrinho
            window.location.href = '/meu_cafe/carrinho_page';
        } else {
            console.error("Erro ao adicionar ao carrinho:", data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao adicionar ao carrinho:", error);
    });
}

function increaseQuantity(elementId) {
    var inputElement = document.getElementById(elementId);
    var currentValue = parseInt(inputElement.value);
    inputElement.value = currentValue + 1;
}

function decreaseQuantity(elementId) {
    var inputElement = document.getElementById(elementId);
    var currentValue = parseInt(inputElement.value);
    if (currentValue > 1) {
        inputElement.value = currentValue - 1;
    }
}




