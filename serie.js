class Serie 
{
  constructor(id, url, name, language, genres, image) 
  {
    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.genres = genres;
    this.image = image;
  }

  toJsonString() 
  {
    const datos = {
      id: this.id,
      url: this.url,
      name: this.name,
      language: this.language,
      genres: this.genres,
      image: this.image
    };
    return JSON.stringify(datos);
  }

  static createFromJsonString(json) 
  {
    const obj = JSON.parse(json);
    
    const serie = new Serie(
      obj.id,
      obj.url,
      obj.name,
      obj.language,
      obj.genres,
      obj.image
    );
    
    return serie;
  }

  createHtmlElement() 
  {
    const card = document.createElement('div');
    card.className = 'serie';

    const poster = document.createElement('img');
    poster.src = this.image;
    poster.alt = this.name;

    const url = this.url;
    poster.addEventListener('click', function() 
    {
      window.open(url, '_blank');
    });

    const texto = document.createElement('div');
    texto.className = 'serie-info';

    const titulo = document.createElement('h3');
    titulo.textContent = this.name;

    const idioma = document.createElement('p');
    idioma.textContent = 'Idioma: ' + this.language;

    const generos = document.createElement('p');
    generos.textContent = 'Generos: ' + this.genres.join(' / ');

    const boton = document.createElement('button');
    const serie = this;

    if (Serie.estaGuardada(this.id)) 
    {
      boton.textContent = 'borrar';
    } 
    else 
    {
      boton.textContent = 'guardar';
    }

    boton.addEventListener('click', function() 
    {
      if (Serie.estaGuardada(serie.id)) 
      {
        Serie.borrarSerie(serie.id);
        boton.textContent = 'guardar';
      } 
      else 
      {
        Serie.guardarSerie(serie);
        boton.textContent = 'borrar';
      }
    });

    texto.appendChild(titulo);
    texto.appendChild(idioma);
    texto.appendChild(generos);
    texto.appendChild(boton);

    card.appendChild(poster);
    card.appendChild(texto);

    return card;
  }

  static estaGuardada(id) 
  {
    const CLAVE = 'seriesGuardadas';

    const guardadasRaw = localStorage.getItem(CLAVE);
    const guardadas = guardadasRaw ? JSON.parse(guardadasRaw) : [];

    return guardadas.some(function(s) 
    {
      return s.id === id;
    });
  }

  static guardarSerie(serie) 
  {
    const CLAVE = 'seriesGuardadas';

    const guardadasRaw = localStorage.getItem(CLAVE);
    const guardadas = guardadasRaw ? JSON.parse(guardadasRaw) : [];

    const yaExiste = guardadas.some(function(s) 
    {
      return s.id === serie.id;
    });

    if (yaExiste) 
    {
      return;
    }

    guardadas.push({
      id: serie.id,
      url: serie.url,
      name: serie.name,
      language: serie.language,
      genres: serie.genres,
      image: serie.image
    });

    localStorage.setItem(CLAVE, JSON.stringify(guardadas));
  }

  static borrarSerie(id) 
  {
    const CLAVE = 'seriesGuardadas';

    const guardadasRaw = localStorage.getItem(CLAVE);
    const guardadas = guardadasRaw ? JSON.parse(guardadasRaw) : [];

    const filtradas = guardadas.filter(function(s) 
    {
      return s.id !== id;
    });

    localStorage.setItem(CLAVE, JSON.stringify(filtradas));
  }
}