const products = [
 {id:1,name:"Elegant Pearl Necklace",category:"Necklaces",price:1499,image:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=85"},
 {id:2,name:"Classic Pearl Earrings",category:"Earrings",price:999,image:"https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=85"},
 {id:3,name:"Designer Gold Bangles",category:"Bangles",price:2499,image:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=85"},
 {id:4,name:"Royal Ruby Ring",category:"Rings",price:1899,image:"https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=85"},
 {id:5,name:"Graceful Ruby Pendant",category:"Pendants",price:1299,image:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85"}
];
let cart = [];
let activeCategory = "All";
const grid = document.getElementById("productGrid");
const rupees = n => "₹" + n.toLocaleString("en-IN");

function renderProducts(){
 const term = document.getElementById("searchInput").value.trim().toLowerCase();
 const shown = products.filter(p => (activeCategory==="All" || p.category===activeCategory) && (p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)));
 document.getElementById("resultLabel").textContent = shown.length ? `${shown.length} lovely ${shown.length===1?"piece":"pieces"} to explore` : "No matching pieces found";
 grid.innerHTML = shown.map(p => `<article class="product-card"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><h3>${p.name}</h3><div class="price">${rupees(p.price)}</div><button class="add-button" data-add="${p.id}">＋ Add to bag</button></article>`).join("");
 grid.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click",()=>addToCart(Number(btn.dataset.add))));
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...p,qty:1});renderCart();showToast(`${p.name} added to your bag`);}
function renderCart(){
 const count=cart.reduce((s,p)=>s+p.qty,0), total=cart.reduce((s,p)=>s+p.price*p.qty,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=rupees(total);
 const el=document.getElementById("cartItems");
 el.innerHTML=cart.length?cart.map(p=>`<div class="cart-line"><span>${p.name} × ${p.qty}<br><b>${rupees(p.price*p.qty)}</b></span><button data-remove="${p.id}">Remove</button></div>`).join(""):"<p>Your bag is waiting for a little sparkle.</p>";
 el.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart=cart.filter(p=>p.id!==Number(b.dataset.remove));renderCart();}));
 const message=cart.length?"Hello Sara Ma Jewellery! I would like to enquire about:\n"+cart.map(p=>`${p.name} x ${p.qty} — ${rupees(p.price*p.qty)}`).join("\n")+`\nSubtotal: ${rupees(total)}`:"Hello Sara Ma Jewellery, I would like to know more about your collection.";
 document.getElementById("checkoutLink").href="https://wa.me/919804334816?text="+encodeURIComponent(message);
}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);}
document.getElementById("searchInput").addEventListener("input",()=>{activeCategory="All";renderProducts();});
document.querySelectorAll("[data-category]").forEach(a=>a.addEventListener("click",()=>{activeCategory=a.dataset.category;renderProducts();}));
document.getElementById("clearFilter").addEventListener("click",()=>{activeCategory="All";document.getElementById("searchInput").value="";renderProducts();});
document.getElementById("cartButton").addEventListener("click",()=>document.getElementById("cartDrawer").classList.add("open"));
document.getElementById("closeCart").addEventListener("click",()=>document.getElementById("cartDrawer").classList.remove("open"));
document.getElementById("cartDrawer").addEventListener("click",e=>{if(e.target.id==="cartDrawer")e.currentTarget.classList.remove("open");});
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("navLinks");nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",nav.classList.contains("open"));});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();