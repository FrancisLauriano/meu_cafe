// script_macchiato.js
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
            document.getElementById('macchiato-quantidade').value = produto.quantidade;
            document.getElementById('macchiato-tipo').value = produto.cafe;
            document.getElementById('macchiato-leite').value = produto.leite;
            document.getElementById('macchiato-observacoes').value = produto.observacoes;
        } else {
            console.error("Índice de produto inválido.");
        }
    }
};

function adicionarAoCarrinho(carrinhoUrl) {
    // Captura informações do produto
    const nomeProduto = "Macchiato";
    const valorProduto = 8.99;
    const quantidadeProduto = parseInt(document.getElementById('macchiato-quantidade').value);
    const tipoCafe = document.getElementById('macchiato-tipo').value;
    const tipoLeite = document.getElementById('macchiato-leite').value;
    const observacoes = document.getElementById('macchiato-observacoes').value;

    // Constrói o objeto do item do carrinho
    const item = {
        nome: nomeProduto,
        preco: valorProduto,
        quantidade: quantidadeProduto,
        cafe: tipoCafe,
        leite: tipoLeite,
        observacoes: observacoes,
        imagem: "../static/image/menu-3.png" 
    };

    // Obtém o carrinho do armazenamento local
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o produto já está no carrinho
    const index = carrinho.findIndex(prod => prod.nome === nomeProduto);
    if (index !== -1) {
        // Se o produto já estiver no carrinho, substitui a quantidade existente pela nova quantidade
        carrinho[index].quantidade = quantidadeProduto;
        carrinho[index].leite = tipoLeite;
        carrinho[index].cafe = tipoCafe;
        carrinho[index].observacoes = observacoes;
    } else {
        // Se o produto não estiver no carrinho, adiciona o novo item
        carrinho.push(item);
    }

    // Atualiza o carrinho no armazenamento local
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página do carrinho
    window.location.href = carrinhoUrl;
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




