const CLAVE = 'seriesGuardadas';

const contenedor = document.getElementById('series');

function cargarGuardadas() 
{
  const guardadasRaw = localStorage.getItem(CLAVE);
  const guardadas = guardadasRaw ? JSON.parse(guardadasRaw) : [];

  contenedor.innerHTML = '';

  guardadas.forEach(function(datos) 
  {
    const serie = new Serie(
      datos.id,
      datos.url,
      datos.name,
      datos.language,
      datos.genres,
      datos.image
    );

    const card = serie.createHtmlElement();
    contenedor.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', cargarGuardadas);