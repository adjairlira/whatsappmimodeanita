const loadProducts = (produtos, idDivParent) => {
    const parentDiv = document.querySelector(idDivParent)
    produtos.forEach(produto => {

        const html = `
            <article class="produto">
                <img src="${produto.image}" alt="${produto.title}">
                <h4>${produto.title}</h4>
                <h4>R$ ${produto.value}</h4>
                <p>${produto.description}</p>
                <button type="button" onclick="modalTrigger(${produto.id})">Quero comprar</button>
            </article>
        `

        parentDiv.insertAdjacentHTML('beforeend', html)
    })
}

const modalTrigger = (productId) => {
    const modal = document.querySelector('.modal')

    if (productId != null) {
        const produto = produtos.filter( produto => produto.id == productId )[0]

        if (produto != null) {
            modal.querySelector('#title').value = produto.title
        }
    }

    /*if (modal.classList.contains('hide')) {
        modal.classList.remove('hide')
    } else {
        modal.classList.add('hide')
    }*/

    /* Operador ternário */
    modal.classList.contains('hide') == true ? modal.classList.remove('hide') : modal.classList.add('hide')
}

const whatsappLinkGenerator = (phoneNumber, productTitle, productQuantity, buyerName, BuyerAddress, buyerPayment) => `https://api.whatsapp.com/
send?phone=${phoneNumber}&text=Olá eu quero:${productQuantity} ${productTitle} - Entregar para ${buyerName} no endereço: ${BuyerAddress} - A forma
de pagamento será: ${buyerPayment}`

/*https://api.whatsapp.com/send?phone=5581983487307&text=Ol%C3%A1%2C%20eu%20quero%3A*/


const checkout = phoneNumber => {
    const form = document.querySelector('#form-product')

    form.addEventListener('submit', e => {
        e.preventDefault()

        const productTitle = form.querySelector('input#title').value
        const productQuantity = form.querySelector('input#quantity').value
        const buyerName = form.querySelector('input#name').value
        const BuyerAddress = form.querySelector('input#address').value
        const buyerPayment = form.querySelector('select#payment').value

        const whatsappUrl = whatsappLinkGenerator(phoneNumber, productTitle, productQuantity, buyerName, BuyerAddress, buyerPayment)
        window.location.href = whatsappUrl
    })
}

loadProducts(produtos, '#product-div')
checkout('5581983487307')