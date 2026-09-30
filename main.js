const IDS = [1, 2, 3, 4, 5, 6];

const contenedor = document.getElementById('series');

async function traerSerie(id) 
{
  const respuesta = await fetch('https://api.tvmaze.com/shows/' + id);
  
  if (!respuesta.ok) 
  {
    throw new Error('Error al traer serie ' + id);
  }
  
  const datos = await respuesta.json();
  return datos;
}

function crearSerieDesdeApi(datos) 
{
  const imagen = datos.image ? datos.image.medium : '';
  
  const serie = new Serie(
    datos.id,
    datos.url,
    datos.name,
    datos.language,
    datos.genres,
    imagen
  );
  
  return serie;
}

async function cargarSeries() 
{
  const series = [];
  
  for (let i = 0; i < IDS.length; i++) 
  {
    const datos = await traerSerie(IDS[i]);
    const serie = crearSerieDesdeApi(datos);
    series.push(serie);
  }
  
  return series;
}

function mostrarSeries(series) 
{
  contenedor.innerHTML = '';
  
  series.forEach(function(serie) 
  {
    const card = serie.createHtmlElement();
    contenedor.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async function() 
{
  try 
  {
    const series = await cargarSeries();
    mostrarSeries(series);
  } 
  catch (error) 
  {
    console.error('Algo salio mal:', error);
  }
});