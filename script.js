const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace with shop WhatsApp number, country code + number, no + or spaces.
let cart = JSON.parse(localStorage.getItem("tractorCart") || "{}");
let selectedCategory = "All";
let searchTerm = "";

const money = n => n === null || n === undefined ? "Ask for price" : `₹${Number(n).toLocaleString("en-IN")}`;

function imageHTML(p, cls="") {
  return p.image ? `<img class="${cls}" src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.querySelector('.placeholder')?.classList.remove('hidden')">` : "";
}
function productCard(p) {
  return `<article class="product-card">
    <div class="product-image">${imageHTML(p)}<span class="placeholder ${p.image ? "hidden":""}">🔧</span></div>
    <div class="product-body">
      <span class="tag">${p.category}</span>
      <h3>${p.name}</h3>
      <div class="meta">${p.brand || ""}${p.partNumber ? " • " + p.partNumber : ""}</div>
      <div class="price">${money(p.price)}</div>
      <button class="add-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
    </div>
  </article>`;
}
function renderCategories() {
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.category).filter(Boolean))];
  document.getElementById("categories").innerHTML = cats.map(c =>
    `<button class="category ${selectedCategory===c?"active":""}" onclick="selectCategory('${c.replaceAll("'","\\'")}')">${c}</button>`
  ).join("");
}
function renderProducts() {
  const list = PRODUCTS.filter(p => {
    const catOK = selectedCategory === "All" || p.category === selectedCategory;
    const hay = `${p.name} ${p.brand||""} ${p.partNumber||""} ${p.description||""}`.toLowerCase();
    return catOK && hay.includes(searchTerm.toLowerCase());
  });
  document.getElementById("productGrid").innerHTML = list.map(productCard).join("");
  document.getElementById("emptyState").classList.toggle("hidden", list.length !== 0);
}
function selectCategory(c){selectedCategory=c;renderCategories();renderProducts()}
function saveCart(){localStorage.setItem("tractorCart", JSON.stringify(cart));updateCartCount()}
function addToCart(id){cart[id]=(cart[id]||0)+1;saveCart();renderCart();openCart()}
function changeQty(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];saveCart();renderCart()}
function cartProducts(){return Object.entries(cart).map(([id,qty])=>({p:PRODUCTS.find(x=>x.id===id),qty})).filter(x=>x.p)}
function updateCartCount(){document.getElementById("cartCount").textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function renderCart(){
  const items=cartProducts();
  const box=document.getElementById("cartItems");
  const foot=document.getElementById("cartFooter");
  if(!items.length){box.innerHTML='<div class="empty"><h3>Your cart is empty</h3><p>Add products from the catalog.</p></div>';foot.innerHTML="";return}
  box.innerHTML=items.map(({p,qty})=>`<div class="cart-line">
    <div class="cart-thumb">${imageHTML(p)}<span class="placeholder hidden">🔧</span></div>
    <div><h4>${p.name}</h4><small>${money(p.price)}</small><div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button><b>${qty}</b><button onclick="changeQty('${p.id}',1)">+</button></div></div>
    <button class="remove" onclick="changeQty('${p.id}',-${qty})">Remove</button>
  </div>`).join("");
  const total=items.reduce((s,{p,qty})=>s+(Number(p.price)||0)*qty,0);
  foot.innerHTML=`<div class="cart-total"><span>Total</span><span>${money(total)}</span></div>
    <button class="checkout" onclick="checkoutWhatsApp()">Send Order on WhatsApp</button>
    <div class="checkout-note">Prices/availability can be confirmed on WhatsApp.</div>`;
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("open")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
function checkoutWhatsApp(){
  const items=cartProducts(); if(!items.length)return;
  let lines=["Hello, I would like to place an order:",""];
  items.forEach(({p,qty})=>lines.push(`• ${p.name} — Qty: ${qty}${p.partNumber ? ` — Part No: ${p.partNumber}`:""}`));
  lines.push("","Please confirm availability and final price.","","Name: ","Location:");
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url,"_blank");
}
document.getElementById("search").addEventListener("input",e=>{searchTerm=e.target.value;renderProducts()});
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("heroWhatsApp").href=`https://wa.me/${WHATSAPP_NUMBER}`;
document.getElementById("contactWhatsApp").href=`https://wa.me/${WHATSAPP_NUMBER}`;
renderCategories();renderProducts();updateCartCount();renderCart();
