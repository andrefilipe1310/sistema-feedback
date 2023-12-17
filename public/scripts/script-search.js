// Função para exibir um alerta na interface
function exibirAlerta(mensagem) {
  const searchDiv = document.querySelector("#search_div");
  const textoHtml = document.createElement("p");

  textoHtml.innerHTML = mensagem;
  textoHtml.classList.add("alerta");

  if (searchDiv.lastChild.innerHTML !== mensagem) {
    searchDiv.append(textoHtml);
  }
}

// Função para remover alerta da interface
function retirarAlerta() {
  const searchDiv = document.querySelector("#search_div");
  const primeiroFilho = searchDiv.lastElementChild;

  if (primeiroFilho !== null && primeiroFilho.tagName.toLowerCase() === "p") {
    const textoHtml = searchDiv.querySelector("p");
    textoHtml.innerHTML = "";
    textoHtml.classList.remove("alerta");
  }
}

// Função principal para filtrar feedbacks
function buscarFeedback() {
  const pesquisa = document.querySelector("#search_bar");
  const feed = document.querySelector("#feed");
  const filtroSelect = document.querySelector(".form-select");

  pesquisa.addEventListener("input", () => {
    const cards = feed.querySelectorAll(".card");
    const comentarios = feed.querySelectorAll(".espaco-feedback");
    const nomes = feed.querySelectorAll(".espaco-curtidas");

    if (filtroSelect.value == "1" || filtroSelect.value == "2") {
      retirarAlerta();
      const tipoPesquisa = filtroSelect.value == "1" ? comentarios : nomes;

      let pesquisaDigitado = pesquisa.value.trim().toLowerCase();

      cards.forEach((card, i) => {
        let conteudo = tipoPesquisa[i].textContent.trim().toLowerCase();
        card.style.display = conteudo.includes(pesquisaDigitado)
          ? "block"
          : "none";
      });
    } else {
      exibirAlerta("Selecione um filtro!");
    }
  });
}

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
  // Inicia a função principal
  buscarFeedback();
});

document.getElementById("btnBarra").addEventListener("click", function(event) {
  // Evita a ação padrão (recarregar a página)
  event.preventDefault();

});