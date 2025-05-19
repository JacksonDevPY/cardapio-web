document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionar = document.querySelectorAll('.adicionar');
    const listaPedido = document.getElementById('pedido-lista');
    const totalPedidoElement = document.getElementById('pedido-total');
    const enderecoInput = document.getElementById('endereco');
    const pagamentoSelect = document.getElementById('pagamento');
    const botaoFinalizarPedido = document.getElementById('finalizar-pedido');

    let pedido = [];
    let total = 0;
    const numeroWhatsapp = 'SEU_NUMERO_DE_WHATSAPP'; // Substitua pelo seu número

    function atualizarPedido() {
        listaPedido.innerHTML = '';
        total = 0;
        pedido.forEach(item => {
            const listItem = document.createElement('li');
            const subtotal = item.preco * item.quantidade;
            listItem.textContent = `${item.nome} x ${item.quantidade} - R$ ${subtotal.toFixed(2)}`;
            listaPedido.appendChild(listItem);
            total += subtotal;
        });
        totalPedidoElement.textContent = total.toFixed(2);
    }

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function() {
            const nome = this.dataset.nome;
            const preco = parseFloat(this.dataset.preco);
            const produtoDiv = this.closest('.produto');
            const quantidadeInput = produtoDiv.querySelector('input[type="number"]');
            const quantidade = parseInt(quantidadeInput.value);

            if (quantidade > 0) {
                const itemExistente = pedido.find(item => item.nome === nome);
                if (itemExistente) {
                    itemExistente.quantidade += quantidade;
                } else {
                    pedido.push({ nome, preco, quantidade });
                }
                atualizarPedido();
                quantidadeInput.value = 1;
            }
        });
    });

    botaoFinalizarPedido.addEventListener('click', () => {
        if (pedido.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        const endereco = enderecoInput.value.trim();
        const formaPagamento = pagamentoSelect.value;

        if (!endereco) {
            alert('Por favor, informe o endereço de entrega.');
            return;
        }

        let mensagem = '🛒 Pedido da Distribuidora:\n\n';
        pedido.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            mensagem += `- ${item.quantidade} x ${item.nome} - R$ ${subtotal.toFixed(2)}\n`;
        });
        mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n\n`;
        mensagem += `*Endereço de Entrega:* ${endereco}\n`;
        mensagem += `*Forma de Pagamento:* ${formaPagamento}`;

        const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
        window.open(linkWhatsapp, '_blank');

        pedido = [];
        atualizarPedido();
        enderecoInput.value = '';
    });
});
