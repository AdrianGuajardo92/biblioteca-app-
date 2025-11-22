// Script para agregar libros nuevos a la biblioteca
const librosNuevos = [
  {
    titulo: "Bluey. Un cuento - Mal humor",
    sinopsis: "Bluey tiene un mal día y se siente enfadada. Su padre le enseña que es normal sentirse así y cómo manejar el mal humor.",
    tituloCompleto: "Bluey. Un cuento - Mal humor",
    autor: "Bluey",
    idioma: "Español",
    editorial: "Beascoa",
    tapa: "Tapa dura",
    año: "2025",
    paginas: "32",
    genero: "Literatura Infantil",
    isbn: "9788448871765",
    precio: ""
  },
  {
    titulo: "Bluey. Cuento. Barbacoa",
    sinopsis: "Bluey y su familia organizan una barbacoa. Una divertida historia sobre la familia, la comida y los pequeños imprevistos.",
    tituloCompleto: "Bluey. Cuento. Barbacoa",
    autor: "Bluey",
    idioma: "Español",
    editorial: "Beascoa",
    tapa: "Tapa dura",
    año: "2025",
    paginas: "32",
    genero: "Literatura Infantil",
    isbn: "9788448871741",
    precio: ""
  },
  {
    titulo: "Amanda Black Escape Book 2",
    sinopsis: "¡Una nueva aventura interactiva! Ayuda a Amanda Black a resolver acertijos y escapar de las ruinas perdidas antes de que sea tarde.",
    tituloCompleto: "Amanda Black Escape Book: Las ruinas perdidas",
    autor: "Juan Gómez-Jurado / Bárbara Montes",
    idioma: "Español",
    editorial: "B de Blok",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "96",
    genero: "Juvenil",
    isbn: "9791387695026",
    precio: ""
  },
  {
    titulo: "Petirrojo (Edición Black Friday)",
    sinopsis: "El inspector Harry Hole se enfrenta a una conspiración internacional que conecta el frente oriental de la Segunda Guerra Mundial con la Noruega actual.",
    tituloCompleto: "Petirrojo (Harry Hole 3)",
    autor: "Jo Nesbø",
    idioma: "Español",
    editorial: "Reservoir Books",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "544",
    genero: "Thriller",
    isbn: "9788410352667",
    precio: ""
  },
  {
    titulo: "Me llamo Goa 8",
    sinopsis: "Goa sigue creciendo y enfrentándose a nuevos retos de la adolescencia en esta octava entrega de la exitosa serie de Miriam Tirado.",
    tituloCompleto: "Me llamo Goa 8",
    autor: "Miriam Tirado",
    idioma: "Español",
    editorial: "B de Blok",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "208",
    genero: "Juvenil",
    isbn: "9791387695170",
    precio: ""
  },
  {
    titulo: "Persiguiendo las estrellas",
    sinopsis: "Primera entrega de la saga \"Las mujeres Hard\". Cuatro mujeres parten de Escocia a finales del siglo XIX para conquistar el mundo y forjar su destino.",
    tituloCompleto: "Persiguiendo las estrellas (Las mujeres Hard 1)",
    autor: "Sarah Lark",
    idioma: "Español",
    editorial: "Ediciones B",
    tapa: "Tapa dura",
    año: "2025",
    paginas: "576",
    genero: "Novela Histórica",
    isbn: "9788466681391",
    precio: ""
  },
  {
    titulo: "God of Ruin",
    sinopsis: "Landon King es un artista genial y una pesadilla. Mia quiere venganza, pero entra en un juego peligroso de obsesión y ruina mutua.",
    tituloCompleto: "God of Ruin (Legado de dioses 4)",
    autor: "Rina Kent",
    idioma: "Español",
    editorial: "Montena",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "480",
    genero: "Romance",
    isbn: "9791387724429",
    precio: ""
  },
  {
    titulo: "El juicio final de Carl",
    sinopsis: "Carl y la princesa Donut regresan a la mazmorra en una secuela más madura y salvaje, mezclando rol, humor y acción apocalíptica.",
    tituloCompleto: "El juicio final de Carl (Carl el Mazmorrero 2)",
    autor: "Matt Dinniman",
    idioma: "Español",
    editorial: "Nova",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "384",
    genero: "Fantasía",
    isbn: "9788410466081",
    precio: ""
  },
  {
    titulo: "Tu cuerpo sabe tu historia",
    sinopsis: "Aprende a escuchar el lenguaje de tu cuerpo para sanar traumas y regular tu sistema nervioso. Un enfoque integrador de ciencia y alma.",
    tituloCompleto: "Tu cuerpo sabe tu historia",
    autor: "Lorena Cuendias",
    idioma: "Español",
    editorial: "Zenith",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "256",
    genero: "Autoayuda",
    isbn: "9788402428790",
    precio: ""
  },
  {
    titulo: "Rubius. Japón 2009",
    sinopsis: "El Rubius relata su legendario primer viaje a Japón en 2009. Fotos inéditas, curiosidades y secretos de una época sin smartphones.",
    tituloCompleto: "Rubius. Japón 2009",
    autor: "El Rubius",
    idioma: "Español",
    editorial: "MR Ediciones",
    tapa: "Tapa dura",
    año: "2025",
    paginas: "240",
    genero: "Biografía",
    isbn: "9788427054189",
    precio: ""
  },
  {
    titulo: "Blue Lock Episode Nagi 4",
    sinopsis: "Spin-off centrado en Nagi Seishiro. Nagi, Isagi y Barou se enfrentan a Reo, Kunigami y Chigiri en una batalla total de egos.",
    tituloCompleto: "Blue Lock Episode Nagi 4",
    autor: "Muneyuki Kaneshiro",
    idioma: "Español",
    editorial: "Planeta Cómic",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "192",
    genero: "Manga",
    isbn: "9791387779498",
    precio: ""
  },
  {
    titulo: "Me quiero mucho",
    sinopsis: "Un álbum ilustrado sobre la autoestima. Enseña a los niños a mirarse con cariño y entender que quererse a uno mismo es un superpoder.",
    tituloCompleto: "Me quiero mucho",
    autor: "Lucía Serrano",
    idioma: "Español",
    editorial: "Beascoa",
    tapa: "Tapa dura",
    año: "2025",
    paginas: "36",
    genero: "Literatura Infantil",
    isbn: "9788448871864",
    precio: ""
  },
  {
    titulo: "Blue Lock 26 (Ed. Especial)",
    sinopsis: "Edición especial del volumen 26. El partido entre Bastard München y Ubers llega a su clímax. Isagi busca superar a Kaiser y Barou. Incluye extras.",
    tituloCompleto: "Blue Lock 26 Edición Especial",
    autor: "Muneyuki Kaneshiro",
    idioma: "Español",
    editorial: "Planeta Cómic",
    tapa: "Tapa blanda",
    año: "2025",
    paginas: "192",
    genero: "Manga",
    isbn: "9788410492257",
    precio: ""
  },
  {
    titulo: "Nico Di Angelo 2",
    sinopsis: "Nico y Will continúan su peligroso viaje a través del Tártaro para rescatar a Bob, el titán. Deben enfrentar sus miedos y demonios internos.",
    tituloCompleto: "Las aventuras de Nico Di Angelo 2: La corte de la muerte",
    autor: "Rick Riordan",
    idioma: "Español",
    editorial: "Montena",
    tapa: "Tapa dura",
    año: "2025",
    paginas: "496",
    genero: "Fantasía Juvenil",
    isbn: "9788418594816",
    precio: ""
  },
  {
    titulo: "Diario de Greg 20",
    sinopsis: "Greg Heffley regresa en una nueva y divertidísima aventura. Cuando las cosas no salen como espera, Greg intenta no ser un aguafiestas.",
    tituloCompleto: "Diario de Greg 20 - Aguafiestas",
    autor: "Jeff Kinney",
    idioma: "Español",
    editorial: "Molino",
    tapa: "Tapa dura",
    año: "2025",
    paginas: "224",
    genero: "Literatura Infantil",
    isbn: "9788427249530",
    precio: ""
  },
  {
    titulo: "Sandman Deluxe 5",
    sinopsis: "Contiene los arcos finales de la serie original, incluyendo \"Las Benévolas\", donde Morfeo enfrenta las consecuencias definitivas de sus actos.",
    tituloCompleto: "Sandman: Edición Deluxe Vol. 5",
    autor: "Neil Gaiman",
    idioma: "Español",
    editorial: "ECC Ediciones",
    tapa: "Tapa dura",
    año: "2018",
    paginas: "608",
    genero: "Cómic",
    isbn: "9788417401313",
    precio: ""
  },
  {
    titulo: "Sandman Deluxe 4",
    sinopsis: "Incluye \"Estación de Nieblas\", donde Lucifer abandona el Infierno y deja a Sueño con la llave y la responsabilidad de decidir su destino.",
    tituloCompleto: "Sandman: Edición Deluxe Vol. 4",
    autor: "Neil Gaiman",
    idioma: "Español",
    editorial: "ECC Ediciones",
    tapa: "Tapa dura",
    año: "2018",
    paginas: "512",
    genero: "Cómic",
    isbn: "9788417276904",
    precio: ""
  },
  {
    titulo: "Sandman Deluxe 3",
    sinopsis: "Presenta el arco \"Juego a ser tú\", donde Barbie viaja a un reino de fantasía que está siendo amenazado por el Cuco, y otras historias cortas.",
    tituloCompleto: "Sandman: Edición Deluxe Vol. 3",
    autor: "Neil Gaiman",
    idioma: "Español",
    editorial: "ECC Ediciones",
    tapa: "Tapa dura",
    año: "2017",
    paginas: "432",
    genero: "Cómic",
    isbn: "9788417206420",
    precio: ""
  },
  {
    titulo: "Sandman Deluxe 2",
    sinopsis: "Contiene \"Casa de Muñecas\", donde Rose Walker busca a su hermano perdido mientras un vórtice de sueños amenaza con destruir al Reino de los Sueños.",
    tituloCompleto: "Sandman: Edición Deluxe Vol. 2",
    autor: "Neil Gaiman",
    idioma: "Español",
    editorial: "ECC Ediciones",
    tapa: "Tapa dura",
    año: "2017",
    paginas: "480",
    genero: "Cómic",
    isbn: "9788416998784",
    precio: ""
  }
];

async function agregarLibros() {
  try {
    console.log('Obteniendo datos actuales...');

    // Obtener los libros actuales
    const response = await fetch('http://localhost:7000/api/libros');
    const data = await response.json();

    console.log(`Libros actuales: ${data.libros.length}`);

    // Combinar libros existentes con nuevos (evitando duplicados por ISBN)
    const isbnsExistentes = new Set(data.libros.map(libro => libro.isbn));
    const librosParaAgregar = librosNuevos.filter(libro => !isbnsExistentes.has(libro.isbn));

    console.log(`Libros nuevos a agregar: ${librosParaAgregar.length}`);

    if (librosParaAgregar.length === 0) {
      console.log('No hay libros nuevos para agregar (todos los ISBNs ya existen)');
      return;
    }

    const todosLosLibros = [...data.libros, ...librosParaAgregar];

    // Guardar los datos actualizados
    const saveResponse = await fetch('http://localhost:7000/api/libros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        libros: todosLosLibros,
        isbnsNoEncontrados: data.isbnsNoEncontrados,
        enlacesPendientes: data.enlacesPendientes,
        enlacesGuardados: data.enlacesGuardados,
        titulosGrabados: data.titulosGrabados
      }),
    });

    const result = await saveResponse.json();

    if (result.success) {
      console.log('✅ Libros agregados exitosamente!');
      console.log(`Total de libros en la biblioteca: ${todosLosLibros.length}`);
      console.log('\nLibros agregados:');
      librosParaAgregar.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.titulo} - ${libro.genero}`);
      });
    } else {
      console.error('❌ Error al guardar los libros:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Asegúrate de que el servidor esté corriendo (npm run dev)');
  }
}

agregarLibros();
