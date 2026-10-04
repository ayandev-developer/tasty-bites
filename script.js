const menuItems = [
    {
        name: "Zinger Burger",
        price: 800,
        category: "Burgers",
    },
    {
        name: "Beaf Burger",
        price: 900,
        category: "Burgers",
    },
    {
        name: "Chiken Burger",
        price: 900,
        category: "Burgers",
    },
    {
        name: "Double Paty Zinger",
        price: 900,
        category: "Burgers",
    },
    {
        name: "Paproni Pizza",
        price: 1300,
        category: "Pizza",
    },
    {
        name: "Chiken Tika Pizza",
        price: 1200,
        category: "Pizza",
    },
    {
        name: "Chiken Fajita Pizza",
        price: 1200,
        category: "Pizza",
    },
    {
        name: "Chiken Cheesy Pizza",
        price: 1200,
        category: "Pizza",
    },
    {
        name: "Lemonade",
        price: 400,
        category: "Drinks",
    },
    {
        name: "Brownie",
        price: 500,
        category: "Desserts",
    },
    {
        name: " Mint Lemonade",
        price: 500,
        category: "Drinks",
    },
    {
        name: "Brownie Shake",
        price: 600,
        category: "Desserts",

    }

]
const menuContainer = document.querySelector(".menu-container");
const menuSection = document.querySelector("#menu");
const searchInput = document.querySelector(".search-container input");
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value;
    const filteredItems = menuItems.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase())
    });
    menuContainer.innerHTML = "";
    displayMenu(filteredItems);
});
const cart = [];
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart.push(...JSON.parse(savedCart));
}
const cartCount = document.querySelector("#cart-count");
function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
}
function updateCart() {
    updateCartCount();
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function calculateCartTotal() {
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}
const cartContainer = document.querySelector("#cart-container");
const orderItems = document.querySelector(".order-items");
const orderTotal = document.querySelector("#order-total");
const customerName = document.querySelector(".checkout-box input[type='text']");
const customerNumber = document.querySelector(".checkout-box input[type='number']");
const placeOrderButton = document.querySelector(".checkout-box button");
const orderMessage = document.querySelector("#order-message");
placeOrderButton.addEventListener("click", () => {
    const name = customerName.value;
    const number = customerNumber.value;

    if (name === "") {
        console.log("Please enter your name");
    }

    if (number === "") {
        console.log("Please enter your number");
    }
    if (name !== "" && number !== "") {
        console.log("Order placed successfully");
        orderMessage.textContent = "Order placed successfully";
        orderMessage.style.display = "block";
        cart.length = 0;
        localStorage.removeItem("cart");
        customerName.value = "";
        customerNumber.value = "";
        updateCartCount();
        orderItems.textContent = "";
        orderTotal.textContent = "";
        renderCart();
    }
})
function renderCart() {
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        const emptyCart = document.createElement("div");
        const emptyMessage = document.createElement("h3");
        emptyMessage.textContent = "Your cart is empty";
        const textMessage = document.createElement("p");
        textMessage.textContent = "Add some delicious food from our menu";
        const browseMenu = document.createElement("button");
        browseMenu.textContent = "Browse Menu";
        emptyCart.classList.add("empty-cart");
        emptyCart.appendChild(emptyMessage);
        emptyCart.appendChild(textMessage);
        emptyCart.appendChild(browseMenu);

        cartContainer.appendChild(emptyCart);
        browseMenu.addEventListener("click", () => {


            menuSection.scrollIntoView();

        });
        return;
    }
    cart.forEach((item) => {
        const cartItem = createCartItem(item);
        cartContainer.appendChild(cartItem);
    });

    const cartTotal = calculateCartTotal();
    const totalCart = document.createElement("h3");
    totalCart.textContent = `Total: Rs. ${cartTotal}`;

    cartContainer.appendChild(totalCart);
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "CheckOut";
    checkoutButton.classList.add("checkout-btn");
    cartContainer.appendChild(checkoutButton);

    checkoutButton.addEventListener("click", () => {

        orderItems.innerHTML = "";

        cart.forEach((item) => {
            const orderItem = createOrderItem(item);
            orderItems.appendChild(orderItem);


        });
        const total = calculateCartTotal();
        orderTotal.textContent = `Total: Rs. ${total}`;
    });
}
function displayMenu(items) {
    items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("menu-card");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const card1 = document.createElement("p");
        card1.textContent = `Rs. ${item.price}`;

        const card2 = document.createElement("p");
        card2.textContent = item.category;

        const button = document.createElement("button");
        button.textContent = "Add to Cart"

        button.addEventListener("click", () => {
            const existingItem = cart.find((cartItem) => {
                return cartItem.name === item.name;
            })
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...item,
                    quantity: 1
                });
            }

            updateCart()

        });
        card.appendChild(name);
        card.appendChild(card1);
        card.appendChild(card2);
        card.appendChild(button);

        menuContainer.appendChild(card);
    });
}
function createCartItem(item) {

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemName = document.createElement("h3");
    itemName.textContent = item.name;

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;
    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Rs. ${item.price}`;
    const itemSubtotal = document.createElement("p");
    itemSubtotal.textContent = `Subtotal: Rs. ${item.price * item.quantity}`;
    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.classList.add("increase-btn");


    increaseButton.addEventListener("click", () => {
        item.quantity += 1;
        updateCart()
    });
    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.classList.add("decrease-btn");
    decreaseButton.addEventListener("click", () => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCart()

        } else {
            const index = cart.findIndex((cartItem) => {
                return cartItem.name === item.name;
            });

            cart.splice(index, 1);
            updateCart()
        }
    });
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", () => {
        const index = cart.findIndex((cartItem) => {
            return cartItem.name === item.name;
        });

        cart.splice(index, 1);
        updateCart()
    });
    cartItem.appendChild(itemName);
    cartItem.appendChild(itemQuantity);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(itemSubtotal);
    cartItem.appendChild(removeButton);
    cartItem.appendChild(decreaseButton);
    cartItem.appendChild(increaseButton);
    return cartItem;
}

displayMenu(menuItems);
function createOrderItem(item) {

    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");

    const itemName = document.createElement("h3");
    itemName.textContent = item.name;
    orderItem.appendChild(itemName);

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;
    orderItem.appendChild(itemQuantity);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Price: Rs. ${item.price}`;
    orderItem.appendChild(itemPrice);

    const itemSubtotal = document.createElement("p");
    itemSubtotal.textContent = `Subtotal: Rs. ${item.price * item.quantity}`;
    orderItem.appendChild(itemSubtotal);

    return orderItem;
}
renderCart();
updateCartCount();
const categoryButtons = document.querySelectorAll(".category-container button");
categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.textContent;
        menuContainer.innerHTML = "";
        categoryButtons.forEach((button) => {
            button.classList.remove("active");
        });
        button.classList.add("active");
        if (selectedCategory === "ALL") {
            displayMenu(menuItems);
        } else {
            const filteredItems = menuItems.filter((item) => {
                return item.category === selectedCategory;
            });
            displayMenu(filteredItems);
        }
    });
});


const form = document.querySelector("form");
const nameInput = document.querySelector(".contact input[type='text']");
const emailInput = document.querySelector(".contact input[type='email']");
const messageInput = document.querySelector(".contact textarea");
const contactMessage = document.querySelector("#contact-message")
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
   if (name === "") {
    contactMessage.textContent = "Please enter your name";
} else if (email === "") {
    contactMessage.textContent = "Please enter your email";
} else if (!email.includes("@")) {
    contactMessage.textContent = "Please enter a valid email";
} else if (message === "") {
    contactMessage.textContent = "Please enter your message";
} else {
    contactMessage.textContent = "Message sent successfully!";

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
}
});
const menuButton = document.querySelector(".hero button");
menuButton.addEventListener("click", () => {
    menuSection.scrollIntoView({ behavior: "smooth" });
});
