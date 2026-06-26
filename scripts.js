const grid = document.getElementById("manualGrid");
const buscador = document.getElementById("searchInput");
const filtro = document.getElementById("categoryFilter");
const featuredList = document.getElementById("featuredList");

function cargarCategorias() {
  const categorias = ["Todos", ...new Set(manuales.map(m => m.categoria))];

  filtro.innerHTML = categorias
    .map(categoria => `<option value="${categoria}">${categoria}</option>`)
    .join("");
}

function mostrarManuales() {
  const texto = buscador.value.toLowerCase();
  const categoria = filtro.value;

  const datos = manuales.filter(m => {
    const coincideTexto =
      m.titulo.toLowerCase().includes(texto) ||
      m.descripcion.toLowerCase().includes(texto) ||
      m.categoria.toLowerCase().includes(texto);

    const coincideCategoria =
      categoria === "Todos" || m.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  grid.innerHTML = datos.map(m => `
    <article class="card ${m.importante ? "importante" : ""}">
      <div class="icon">${m.icono}</div>
      <h3>${m.titulo}</h3>
      <span class="tag">${m.categoria}</span>
      <p>${m.descripcion}</p>
      <a class="btn" href="${m.archivo}" target="_blank">→</a>
    </article>
  `).join("");

  if (datos.length === 0) {
    grid.innerHTML = "<p>No se encontraron manuales.</p>";
  }
}

function mostrarDestacados() {
  const destacados = manuales.filter(m => m.importante);

  featuredList.innerHTML = destacados
    .map(m => `<li>${m.titulo}</li>`)
    .join("");
}

buscador.addEventListener("input", mostrarManuales);
filtro.addEventListener("change", mostrarManuales);

cargarCategorias();
mostrarManuales();
mostrarDestacados();