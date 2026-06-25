const grid=document.getElementById("manualGrid");

const buscador=document.getElementById("searchInput");

const filtro=document.getElementById("categoryFilter");

function cargarCategorias(){

const categorias=[
"Todos",
...new Set(manuales.map(x=>x.categoria))
];

filtro.innerHTML=categorias.map(c=>

`<option>${c}</option>`

).join("");

}

function mostrar(){

const texto=buscador.value.toLowerCase();

const categoria=filtro.value;

const datos=manuales.filter(m=>{

const okTexto=

m.titulo.toLowerCase().includes(texto)||

m.descripcion.toLowerCase().includes(texto)||

m.categoria.toLowerCase().includes(texto);

const okCategoria=

categoria==="Todos"||

m.categoria===categoria;

return okTexto&&okCategoria;

});

grid.innerHTML=datos.map(m=>`

<div class="card ${m.importante?"importante":""}">

<div class="tag">

${m.categoria}

</div>

<h2>

${m.titulo}

</h2>

<p>

${m.descripcion}

</p>

<a
class="btn"
target="_blank"
href="${m.archivo}">

Abrir manual

</a>

</div>

`).join("");

}

buscador.addEventListener("input",mostrar);

filtro.addEventListener("change",mostrar);

cargarCategorias();

mostrar();
