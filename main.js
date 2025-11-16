function getCart() { return JSON.parse(localStorage.getItem('cart')||'[]'); }
function setCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); }
function addToCart(pid){
  let cart = getCart();
  let found = cart.find(item => item.id === pid);
  if (found) { found.qty += 1; } else { cart.push({ id: pid, qty: 1 }); }
  setCart(cart);
  updateCartCount(); alert("Added to cart!");
}
function updateCartCount(){
  let cart = getCart();
  var c = document.getElementById('cart-count');
  if (c) c.innerText = cart.reduce((tot,i)=>tot+i.qty,0) || '';
}
window.onload = updateCartCount;

// Cart page logic:
if (location.pathname.endsWith("cart.html")) {
  let cartList = document.getElementById('cart-list');
  let cart = getCart();
  let PRODUCTS = {
    'p1': { name: "Marven Azure", price: 124999, img: "assets/IMG-20251106-WA0008.jpg"},
    // add more as needed (must match all pids)
  };
  let total = 0;
  cartList.innerHTML = cart.map(item => {
    let prod = PRODUCTS[item.id] || {};
    total += prod.price * item.qty;
    return `<div class="cart-item">
      <img src="${prod.img}" />
      <div class="cart-item-details">
        <div><b>${prod.name||item.id}</b></div>
        <div>Qty: ${item.qty}</div>
        <div>${prod.price ? "₹" + prod.price : ""}</div>
      </div>
      <button class="remove-btn" onclick="removeCart('${item.id}')">✕</button>
    </div>`;
  }).join('') + `<div style="font-size:1.18em;text-align:right"><b>Total: ₹${total.toLocaleString('en-IN')}</b></div>`;
}
function removeCart(pid){
  let cart = getCart().filter(i=>i.id!==pid); setCart(cart);
  location.reload();
}
