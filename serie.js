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

    const texto = document.createElement('div');
    texto.className = 'serie-info';

    const titulo = document.createElement('h3');
    titulo.textContent = this.name;

    const idioma = document.createElement('p');
    idioma.textContent = 'Idioma: ' + this.language;

    const generos = document.createElement('p');
    generos.textContent = 'Generos: ' + this.genres.join(' / ');

    texto.appendChild(titulo);
    texto.appendChild(idioma);
    texto.appendChild(generos);

    card.appendChild(poster);
    card.appendChild(texto);

    return card;
  }
}