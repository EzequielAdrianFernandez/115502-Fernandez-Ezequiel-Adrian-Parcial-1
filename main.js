const SERIES_POR_PAGINA = 6;

let idInicio = 1;

const contenedor = document.getElementById('series');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');

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

async function cargarPagina() 
{
  const series = [];
  
  for (let i = 0; i < SERIES_POR_PAGINA; i++) 
  {
    const id = idInicio + i;
    const datos = await traerSerie(id);
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

async function paginaSiguiente() 
{
  idInicio = idInicio + SERIES_POR_PAGINA;
  
  try 
  {
    const series = await cargarPagina();
    mostrarSeries(series);
  } 
  catch (error) 
  {
    console.error('Error en paginaSiguiente:', error);
  }
}

async function paginaAnterior() 
{
  if (idInicio - SERIES_POR_PAGINA < 1) 
  {
    return;
  }
  
  idInicio = idInicio - SERIES_POR_PAGINA;
  
  try 
  {
    const series = await cargarPagina();
    mostrarSeries(series);
  } 
  catch (error) 
  {
    console.error('Error en paginaAnterior:', error);
  }
}

btnSiguiente.addEventListener('click', paginaSiguiente);
btnAnterior.addEventListener('click', paginaAnterior);

document.addEventListener('DOMContentLoaded', async function() 
{
  try 
  {
    const series = await cargarPagina();
    mostrarSeries(series);
  } 
  catch (error) 
  {
    console.error('Algo salio mal:', error);
  }
});