// avaliacao_registro.js

// 1- Captura de Elementos HTML: No início do script, deverá ser capturados os elementos HTML relevantes para interação. 
// Isso inclui as estrelas de avaliação, os campos de entrada para nome e comentário, e o formulário de envio.

// 2- Variável de Avaliação Selecionada: Uma variável, por exemplo avaliacaoSelecionada,  deverá ser inicializada com o valor 0, indicando que nenhuma estrela foi selecionada inicialmente.

// 3- Função para Atualizar Estrelas: Criar uma função, por exemplo  função atualizarEstrelas(), que é definida para atualizar a aparência das estrelas de acordo com a avaliação selecionada. Ela percorre todas as estrelas e adiciona a classe ativo às estrelas até o índice correspondente à avaliação selecionada, e remove essa classe das estrelas após esse índice.

// 4- Adição de Listeners de Evento para as Estrelas: Para cada estrela, são adicionados três listeners de evento: mouseover, mouseleave e click.
// - O mouseover atualizará a variável avaliacaoSelecionada com o índice da estrela que está sendo sobrevoada e chama a função atualizarEstrelas();
// - O mouseleave verifica se a avaliação selecionada corresponde à estrela atualmente sobrevoada e, se não, redefine avaliacaoSelecionada como 0 e chama atualizarEstrelas();
// - O click define avaliacaoSelecionada como o índice da estrela clicada e chama atualizarEstrelas().

// 5- Listener de Evento para o Envio do Formulário: Um listener de evento é adicionado ao formulário para interceptar o evento de envio.
// - Quando o formulário é enviado, a função verifica se uma avaliação foi selecionada. Se não, exibe um alerta pedindo para o usuário selecionar uma avaliação.
// - Se uma avaliação foi selecionada, os dados do formulário são capturados (nome, comentário e avaliação) e podem ser enviados para um servidor ou processados localmente.
// - Após o envio do formulário, os campos de entrada são resetados, a avaliação é resetada para 0 e a função atualizarEstrelas() é chamada para remover a classe ativo de todas as estrelas.
