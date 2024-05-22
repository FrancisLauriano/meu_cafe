// avaliacao_registro.js
var stars = document.querySelectorAll('.star-icon');

document.addEventListener('click', function(e){
    var classStar = e.target.classList;

    //Verifica qual estrela está ativa para remover
    if(!classStar.contains('ativo')){
        stars.forEach(function(star){
            star.classList.remove('ativo');
        });

        //Ativa a estrela em que houve o click e guarda a informação
        classStar.add('ativo');
        console.log(e.target.getAttribute('data-avaliacao'));
    }
})