// admin.js

document.addEventListener("DOMContentLoaded", () => {
  carregarMusicas();

  const form = document.getElementById("uploadForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("../php/admin.php", {
      method: "POST",
      body: formData
    });

    const resultado = await response.text();
    alert(resultado);
    form.reset();
    carregarMusicas();
  });
});

async function carregarMusicas() {
  const lista = document.getElementById("listaMusicas");
  lista.innerHTML = "Carregando...";

  const response = await fetch("../php/musicas.php");
  const musicas = await response.json();

  if (musicas.length === 0) {
    lista.innerHTML = "Nenhuma música enviada ainda.";
    return;
  }

  lista.innerHTML = "";
  musicas.forEach(musica => {
    const item = document.createElement("li");
    item.textContent = `${musica.titulo}`;
    lista.appendChild(item);
  });
}
