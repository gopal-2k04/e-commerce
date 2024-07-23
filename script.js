document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.normal');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productDetails = event.target.closest('.single-pro-details');
        const product = {
            image: document.querySelector('.single-pro-image img').src,
            name: productDetails.querySelector('h4').innerText,
            price: productDetails.querySelector('h2').innerText,
            quantity: productDetails.querySelector('input[type="number"]').value,
            size: productDetails.querySelector('select').value
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Product added to cart!');
        updateCartTotals();
    }

    function loadCart() {
        const cartTableBody = document.querySelector('#cartItems');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartTableBody.innerHTML = '';
        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><a href="#" class="remove"><i class="fa fa-close"></i></a></td>
                <td><img src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" value="${item.quantity}" data-index="${index}"></td>
                <td>${calculateSubtotal(item.price, item.quantity)}</td>
            `;

            cartTableBody.appendChild(row);
        });

        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', function (event) {
                const row = event.target.closest('tr');
                const index = Array.from(cartTableBody.children).indexOf(row);
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                row.remove();
                updateCartTotals();
            });
        });

        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', function (event) {
                const index = event.target.dataset.index;
                cart[index].quantity = event.target.value;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
                updateCartTotals();
            });
        });

        updateCartTotals();
    }

    function calculateSubtotal(price, quantity) {
        const priceNumber = parseFloat(price.replace('$', ''));
        return (priceNumber * quantity).toFixed(2);
    }

    function updateCartTotals() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;

        cart.forEach(item => {
            const priceNumber = parseFloat(item.price.replace('$', ''));
            subtotal += priceNumber * item.quantity;
        });

        document.getElementById('cartSubtotal').innerText = `$${subtotal.toFixed(2)}`;
        document.getElementById('cartTotal').innerText = `$${subtotal.toFixed(2)}`;
    }

    if (document.querySelector('#cart')) {
        loadCart();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var MainImg = document.getElementById("MainImg");
    var SmallImg = document.getElementsByClassName("smallImg");

    for (var i = 0; i < SmallImg.length; i++) {
        SmallImg[i].onclick = function() {
            MainImg.src = this.src;
        }
    }
});
