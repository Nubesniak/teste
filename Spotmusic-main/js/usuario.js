document.addEventListener("DOMContentLoaded", () => {
  carregarMusicas();
});

async function carregarMusicas() {
  const lista = document.getElementById("listaMusicas");
  const player = document.getElementById("audioPlayer");

  try {
    const response = await fetch("../php/usuario.php");

    if (!response.ok) {
      throw new Error("Erro ao buscar músicas");
    }

    const musicas = await response.json();

    if (musicas.length === 0) {
      lista.innerHTML = "<li>Nenhuma música disponível.</li>";
      return;
    }

    lista.innerHTML = "";
    musicas.forEach(musica => {
      const li = document.createElement("li");
      li.textContent = musica.titulo;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        player.src = `../uploads/${musica.arquivo}`;
        player.play();
      });
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar músicas:", erro);
    lista.innerHTML = "<li>Erro ao carregar músicas.</li>";
  }
}
