// Número do WhatsApp com código do país e DDD, só números. Ex.: 5511999998888
const WHATSAPP = "5500000000000";

const MENSAGENS = {
  "geral": "Olá! Vim pelo site da BrilhaCar e gostaria de agendar um serviço.",
  "orcamento": "Olá! Vim pelo site da BrilhaCar e gostaria de pedir um orçamento."
};

function abrirWhatsApp(texto) {
  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
}

document.querySelectorAll("[data-servico]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    abrirWhatsApp(MENSAGENS[el.dataset.servico] || MENSAGENS.geral);
  });
});

// Seleção de vários serviços
const opcoes = document.querySelectorAll('input[name="servico"]');
const cart = document.getElementById("cart");

function selecionados() {
  return [...opcoes].filter(o => o.checked).map(o => o.value);
}

function atualizarCart() {
  const lista = selecionados();
  cart.hidden = lista.length === 0;
  document.body.classList.toggle("tem-selecao", lista.length > 0);
  document.getElementById("cart-qtd").textContent =
    lista.length === 1 ? "1 serviço selecionado" : lista.length + " serviços selecionados";
  document.getElementById("cart-lista").textContent = lista.join(" + ");
}

opcoes.forEach(o => o.addEventListener("change", atualizarCart));

document.getElementById("cart-enviar").addEventListener("click", () => {
  const lista = selecionados();
  if (!lista.length) return;
  const texto =
    "Olá! Vim pelo site da BrilhaCar e gostaria de agendar:\n" +
    lista.map(s => "• *" + s + "*").join("\n") +
    "\n\nQual o valor e os horários disponíveis?";
  abrirWhatsApp(texto);
});

atualizarCart();

// Ampliar fotos da galeria
const zoom = document.getElementById("zoom");
const zoomImg = zoom.querySelector("img");

document.querySelectorAll(".midia img").forEach(img => {
  img.addEventListener("click", () => {
    zoomImg.src = img.src;
    zoomImg.alt = img.alt;
    zoom.showModal();
  });
});

zoom.addEventListener("click", () => zoom.close());

document.getElementById("ano").textContent = new Date().getFullYear();
