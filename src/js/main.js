document.addEventListener('DOMContentLoaded', function () {
    const decreaseButtons = document.querySelectorAll('.qty button:nth-of-type(1)');
    const increaseButtons = document.querySelectorAll('.qty button:nth-of-type(2)');
    const removeButtons = document.querySelectorAll('.remove');
    const totalElement = document.querySelector('footer span:nth-of-type(2)');
    const subTotalElement = document.querySelector('.info div:nth-of-type(1) span:nth-of-type(2)');
  
    let subTotal = parseFloat(subTotalElement.textContent.replace('R$ ', ''));
    let total = parseFloat(totalElement.textContent.replace('R$ ', ''));
  
    // Incrementar quantidade
    increaseButtons.forEach(button => {
      button.addEventListener('click', function () {
        const quantityElement = this.parentNode.querySelector('span');
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updateTotal();
      });
    });
  
    // Decrementar quantidade
    decreaseButtons.forEach(button => {
      button.addEventListener('click', function () {
        const quantityElement = this.parentNode.querySelector('span');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
          quantity--;
          quantityElement.textContent = quantity;
          updateTotal();
        }
      });
    });
  
    // Remover produto do carrinho
    removeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const row = this.parentNode.parentNode;
        const price = parseFloat(row.querySelector('td:nth-of-type(4)').textContent.replace('R$ ', ''));
        const quantity = parseInt(row.querySelector('.qty span').textContent);
        subTotal -= price * quantity;
        total -= price * quantity;
        row.remove();
        subTotalElement.textContent = `R$ ${subTotal.toFixed(2)}`;
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
      });
    });
  
    // Atualizar total
    function updateTotal() {
      let newSubTotal = 0;
      document.querySelectorAll('tbody tr').forEach(row => {
        const price = parseFloat(row.querySelector('td:nth-of-type(4)').textContent.replace('R$ ', ''));
        const quantity = parseInt(row.querySelector('.qty span').textContent);
        newSubTotal += price * quantity;
      });
      subTotal = newSubTotal;
      total = subTotal;
      subTotalElement.textContent = `R$ ${subTotal.toFixed(2)}`;
      totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
  });
  