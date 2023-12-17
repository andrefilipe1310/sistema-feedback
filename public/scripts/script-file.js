
nomesArquivos = []
let fechar = () => {
  let iconesFechar = [...document.querySelectorAll(".fechar-icone")];
  iconesFechar.map((icone) => {
    icone.addEventListener("click", () => {
      let label = icone.parentNode.parentNode;
      label.remove();
    });
  });
};

function lerArquivo() {
  const fileInput = document.getElementById("adicionar-input");

  // Verifica se um arquivo foi selecionado
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const leitor = new FileReader();

    leitor.onload = function (e) {
      const titulo = file.name;
      nomesArquivos.push(titulo);

      const criarLabel = (texto) => {
        const label = document.createElement("label");
        label.setAttribute("class", "mb-3 adicionar ");
        label.setAttribute("style", "margin-right: 0.5rem");

        const textoNode = document.createTextNode(texto);
        label.appendChild(textoNode);

        const span = document.createElement("span");
        span.setAttribute("class", "icone-anexo");

        const icon = document.createElement("i");
        icon.setAttribute("class", "fechar-icone fas fa-times mr-1");
        span.appendChild(icon);
        label.appendChild(span);

        return label;
      };

      const resultado = document.querySelector(".anexos");

      if (nomesArquivos.length < 4) {
        const quantidadeLetras = nomesArquivos.reduce((acc, element) => acc + element.length, 0);
        const quantidadePode = 25 - quantidadeLetras;

        if (quantidadePode >= 0) {
          resultado.appendChild(criarLabel(titulo));
        } else if (36 - (quantidadeLetras - titulo.length) > 6) {
          const label2 = criarLabel(titulo.substring(0, 3) + "...");
          resultado.appendChild(label2);
        }
      }

      fechar();
    };

    leitor.readAsText(file);
  } else {
    console.error("Nenhum arquivo selecionado.");
  }
}
