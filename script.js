document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".cart-btn");
    const cartCountElement = document.querySelector(".cart-item-count");

    // ✅ Update the cart icon count
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalItems;
        cartCountElement.style.display = totalItems > 0 ? "flex" : "none";
    }

    // ✅ Handle Add to Cart button click
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product");

            const product = {
                title: productElement.querySelector(".title").innerText.trim(),
                price: productElement.querySelector(".price").innerText.replace("Offer price: ₹", "").trim(),
                image: productElement.querySelector("img").src,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = cart.find(item => item.title === product.title);

            if (existingItem) {
                // Don't increase quantity here — user can update in cart.html
                alert("This item is already in your cart. You can update the quantity in the cart.");
            } else {
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                
            }
        });
    });

    // ✅ Initialize cart count on page load
    updateCartCount();
});
