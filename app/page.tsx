'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroHeader from './components/HeroHeader';
import SearchBar from './components/SearchBar';
import StatsCards from './components/StatsCards';
import Toolbar from './components/Toolbar';
import BookTable from './components/BookTable';
import BookCardsGrid from './components/BookCardsGrid';
import { useBooks } from './hooks/useBooks';
import { useFilters } from './hooks/useFilters';
import { filterBooks } from './utils/bookFilters';
import { calculateBookStats, getUniqueGenres, getUniqueLanguages, getUniqueYears } from './utils/bookStats';

interface Libro {
  titulo: string;
  sinopsis: string;
  tituloCompleto: string;
  autor: string;
  idioma: string;
  editorial: string;
  tapa: string;
  año: string;
  paginas: string;
  genero: string;
  isbn: string;
  precio: string;
}

export default function BibliotecaPage() {
  // Hooks personalizados
  const {
    libros,
    setLibros,
    isbnsNoEncontrados,
    setIsbnsNoEncontrados,
    enlacesPendientes,
    setEnlacesPendientes,
    titulosGrabados,
    setTitulosGrabados,
    cargarDatos,
    guardarLibros
  } = useBooks();

  const {
    searchQuery,
    setSearchQuery,
    filtroGenero,
    setFiltroGenero,
    filtroIdioma,
    setFiltroIdioma,
    filtroAno,
    setFiltroAno,
    limpiarFiltros
  } = useFilters();

  // Estados locales
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [importPanelOpen, setImportPanelOpen] = useState(false);
  const [titulosPanelOpen, setTitulosPanelOpen] = useState(false);
  const [filtroTienda, setFiltroTienda] = useState<'todos' | 'casadellibro' | 'amazon' | 'elsotano' | 'arnoia'>('todos');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [librosParseados, setLibrosParseados] = useState<Libro[]>([]);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importTotal, setImportTotal] = useState(0);
  const [importCurrent, setImportCurrent] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [vistaActual, setVistaActual] = useState<'tabla' | 'tarjetas'>('tabla');

  // Agregar clase al body para el sidebar
  useEffect(() => {
    document.body.classList.add('with-sidebar');
    if (sidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    return () => {
      document.body.classList.remove('with-sidebar');
      document.body.classList.remove('sidebar-collapsed');
    };
  }, [sidebarCollapsed]);

  // Agregar/quitar clases al body cuando se abren/cierran los paneles
  useEffect(() => {
    if (searchPanelOpen) {
      document.body.classList.add('search-panel-open');
    } else {
      document.body.classList.remove('search-panel-open');
    }
  }, [searchPanelOpen]);


  useEffect(() => {
    if (importPanelOpen) {
      document.body.classList.add('import-panel-open');
    } else {
      document.body.classList.remove('import-panel-open');
    }
  }, [importPanelOpen]);

  useEffect(() => {
    if (titulosPanelOpen) {
      document.body.classList.add('titulos-panel-open');
    } else {
      document.body.classList.remove('titulos-panel-open');
    }
  }, [titulosPanelOpen]);

  const mostrarToast = (mensaje: string) => {
    setToastMessage(mensaje);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filtrar libros usando función de utilidad
  const librosFiltrados = filterBooks(libros, {
    searchQuery,
    filtroGenero,
    filtroIdioma,
    filtroAno
  });

  // Calcular estadísticas usando función de utilidad
  const stats = calculateBookStats(libros, librosFiltrados.length);

  // Obtener listas únicas para filtros usando funciones de utilidad
  const generosUnicos = getUniqueGenres(libros);
  const idiomasUnicos = getUniqueLanguages(libros);
  const anosUnicos = getUniqueYears(libros);

  const copiarTabla = () => {
    if (libros.length === 0) {
      mostrarToast('No hay libros para copiar');
      return;
    }

    const rows = libros.map(libro => [
      libro.titulo || '',
      libro.sinopsis || '',
      libro.tituloCompleto || '',
      libro.autor || '',
      libro.idioma || '',
      libro.editorial || '',
      libro.tapa || '',
      libro.año || '',
      libro.paginas || '',
      libro.genero || '',
      libro.isbn || '',
      limpiarPrecio(libro.precio || '')
    ]);

    const tsvContent = rows
      .map(row => row.join('\t'))
      .join('\n');

    navigator.clipboard.writeText(tsvContent).then(() => {
      mostrarToast('✓ Tabla copiada! Pégala en Google Sheets con Ctrl+V');
    });
  };

  const limpiarPrecio = (precio: string): string => {
    if (!precio) return '';
    const match = precio.match(/[\d.]+/);
    if (!match) return '';
    const numero = match[0];
    if (numero.endsWith('.00')) {
      return numero.slice(0, -3);
    }
    return numero;
  };

  const copiarEnFila = () => {
    if (libros.length === 0) {
      mostrarToast('No hay libros para copiar');
      return;
    }

    const rows = libros.map(libro => [
      libro.titulo || '',
      libro.sinopsis || '',
      libro.tituloCompleto || '',
      libro.autor || '',
      libro.idioma || '',
      libro.editorial || '',
      libro.tapa || '',
      libro.año || '',
      libro.paginas || '',
      libro.genero || '',
      libro.isbn || '',
      limpiarPrecio(libro.precio || '')
    ].join('\t'));

    const contenido = rows.join('\n');

    navigator.clipboard.writeText(contenido).then(() => {
      mostrarToast('✓ Copiado en fila! Pégalo en Excel con Ctrl+V');
    });
  };

  const limpiarBiblioteca = async () => {
    if (libros.length === 0) {
      mostrarToast('La biblioteca ya está vacía');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar todos los libros de la biblioteca?')) {
      setLibros([]);
      try {
        await guardarLibros([]);
        mostrarToast('Biblioteca limpiada');
      } catch (error) {
        mostrarToast('Error al limpiar biblioteca');
      }
    }
  };

  // ========================================================================
  // PROMPT-BUSQUEDA-LIBROS: Función para copiar el prompt de búsqueda de libros
  // Para modificar el prompt, busca: "PROMPT-BUSQUEDA-LIBROS" o "copiarPrompt"
  // Ubicación: app/page.tsx línea ~184
  // ========================================================================
  const copiarPrompt = () => {
    const prompt = `================================================================================
PROMPT: BUSCADOR DE LIBROS POR ISBN O ENLACE DIRECTO
================================================================================

CONTEXTO
--------------------------------------------------------------------------------
Eres un buscador especializado de libros. Trabajas con una aplicación web HTML
ubicada en C:\\Users\\Adrian Guajardo\\Downloads\\Jueves, 09 de octubre\\biblioteca-libros.html
donde agregarás los libros que encuentres.

Puedes buscar libros de 2 formas:
1. Enlaces directos (RECOMENDADO - 100% confiable)
2. ISBNs (requiere búsqueda pero también funciona)


FORMATO DE TABLA REQUERIDO
--------------------------------------------------------------------------------
Todos los libros deben presentarse en UNA SOLA TABLA con estas columnas:

| Título | Sinopsis | Título del libro | Autor | Idioma | Editorial del libro | Tapa del libro | Año de publicación | Cantidad de páginas | Género del libro | ISBN | Precio |


REGLAS ESTRICTAS
================================================================================

1. GÉNERO DEL LIBRO
--------------------------------------------------------------------------------
✅ SOLO puedes usar UNO de estos géneros (NUNCA inventes géneros nuevos):

    - Arquitectura y diseño
    - Arte, cine y fotografía
    - Artesanía, hobby y hogar
    - Autoayuda
    - Biografía, memoria y autobiografía
    - Cómic, manga y novela gráfica
    - Crianza y familia
    - Deporte
    - Derecho, política y ciencias sociales
    - Enciclopedia, diccionario y lingüística
    - Escolar
    - Esoterismo
    - Filosofía y psicología
    - Gastronomía
    - Historia
    - Humor y entretenimiento
    - Infantil
    - Informática y tecnología
    - Ingeniería
    - Juvenil
    - Literatura y ficción
    - Moda y diseño
    - Música
    - Negocios, finanzas y economía
    - Religión y espiritualidad
    - Salud y bienestar
    - Viaje y turismo

❌ NO inventes géneros nuevos
❌ NO pongas más de un género
✅ Elige el que mejor se ajuste al libro


2. TAPA DEL LIBRO
--------------------------------------------------------------------------------
✅ SOLO puedes escribir:
    - Blanda
    - Dura

❌ NO escribas: "Tapa blanda", "Pasta dura", "Rústica", ni ninguna otra variación
✅ SOLO: "Blanda" o "Dura"


3. IDIOMA DEL LIBRO
--------------------------------------------------------------------------------
✅ SOLO puedes usar estos idiomas:
    - Español
    - Inglés
    - Francés

⚠️ IMPORTANTE - CONVERSIONES DE IDIOMA:
   - Si encuentras "Castellano" → escribe "Español"
   - Si encuentras "Spanish" → escribe "Español"
   - Si encuentras "Espagnol" → escribe "Español"
   - Si encuentras "English" → escribe "Inglés"
   - Si encuentras "French" → escribe "Francés"

❌ NO uses "Castellano" ni ninguna otra variación
✅ SIEMPRE usa: "Español", "Inglés" o "Francés"


4. PRECIO DEL LIBRO
--------------------------------------------------------------------------------
✅ Extrae el precio del sitio web
✅ Incluye el símbolo de moneda (€, $, MXN, etc.)

⚠️ IMPORTANTE - DESCUENTO CASA DEL LIBRO:
   Si el libro es de Casa del Libro (latam.casadellibro.com o casadellibro.com):
   - Aplica automáticamente 5% de descuento al precio
   - Calcula: precio × 0.95
   - Ejemplo: Si dice $549.00 MXN → guarda $521.55 MXN
   - SOLO muestra el precio final con descuento

✅ Para otros sitios: usa el precio tal cual aparece
❌ Si no encuentras el precio, déjalo vacío
❌ NO inventes precios
❌ NO pongas "No disponible" ni "N/A"


5. CAMPOS VACÍOS
--------------------------------------------------------------------------------
- Si no encuentras algún dato: déjalo vacío en la tabla
- NO inventes información
- NO pongas "No disponible" ni "N/A"


6. FORMATO DE ENTREGA
--------------------------------------------------------------------------------
✅ SIEMPRE presenta TODOS los libros en UNA SOLA TABLA
✅ Cada libro debe ser una fila diferente en la misma tabla
✅ La tabla debe estar lista para copiar y pegar directamente en Google Sheets
❌ NO hagas tablas separadas para cada libro
❌ NO pongas separadores entre libros


FLUJO DE TRABAJO PASO A PASO
================================================================================

PASO 1: Usuario proporciona ISBNs o Enlaces Directos
--------------------------------------------------------------------------------
El usuario puede proporcionar datos de 2 formas:

📌 OPCIÓN A - Enlaces Directos (RECOMENDADO - 100% confiable):
https://latam.casadellibro.com/libro-las-ratitas-14/9788408306122/15179646
https://latam.casadellibro.com/libro-la-chica-oculta/9788466379489/15125049
https://latam.casadellibro.com/libro-el-maestro-de-las-cometas/9788411723176/15234567

📌 OPCIÓN B - Solo ISBNs (puede requerir búsqueda):
9788408306122
9788466379489
9788411723176

Puedes recibir una mezcla de ambos formatos en la misma solicitud.


PASO 2: Usar TodoWrite para planificación
--------------------------------------------------------------------------------
- Crea una lista de tareas con TODOS los libros a buscar
- Esto permite al usuario ver el progreso
- Marca cada tarea como "completed" cuando termines cada búsqueda

Ejemplo:
1. [in_progress] Buscar libro (enlace/ISBN)
2. [pending] Buscar libro (enlace/ISBN)
3. [pending] Buscar libro (enlace/ISBN)


PASO 3: Buscar TODOS los libros UNO POR UNO
--------------------------------------------------------------------------------
MUY IMPORTANTE:

🔗 Si el usuario proporciona ENLACES DIRECTOS:
✅ Usa WebFetch directamente con la URL proporcionada
✅ Es 100% confiable - el libro existe
✅ Extrae toda la información directamente de la página
✅ Mucho más rápido y preciso que buscar por ISBN

📚 Si el usuario proporciona SOLO ISBNs:
✅ Usa WebSearch para encontrar el libro
✅ Luego usa WebFetch para obtener detalles completos
✅ Busca en paralelo cuando sea posible (múltiples WebSearch simultáneos)

Para ambos casos:
❌ NO pases al siguiente libro hasta completar el actual
❌ NO preguntes al usuario en cada búsqueda si quiere agregarlo
❌ NO interrumpas el proceso de búsqueda

Fuentes de búsqueda preferidas (cuando uses ISBN):
- Casa del Libro (latam.casadellibro.com o casadellibro.com)
- Penguin Random House (penguinrandomhouse.com)
- Agapea (agapea.com)
- Librerías españolas


PASO 4: Compilar TODOS los resultados
--------------------------------------------------------------------------------
Una vez que hayas buscado TODOS los ISBNs:
- Crea UNA SOLA TABLA con todos los libros encontrados
- Registra qué ISBNs NO fueron encontrados
- Presenta la tabla completa al usuario


PASO 5: Generar JSON para importar
--------------------------------------------------------------------------------
Después de mostrar la tabla completa, AUTOMÁTICAMENTE genera un archivo JSON
con TODOS los libros encontrados.

⚠️ IMPORTANTE - CREAR ARCHIVO JSON:
✅ SIEMPRE crea un archivo JSON en la carpeta de descargas del usuario
✅ Nombre del archivo: "libros_importar.json"
✅ Ubicación: C:\\Users\\adria\\Downloads\\libros_importar.json
✅ Usa la herramienta Write para crear el archivo
✅ NO muestres el JSON en un bloque de código, créalo directamente como archivo

Formato del JSON:

[
  {
    "titulo": "Título corto del libro",
    "sinopsis": "Sinopsis completa del libro...",
    "tituloCompleto": "Título completo del libro",
    "autor": "Nombre del Autor",
    "idioma": "Español",
    "editorial": "Editorial del libro",
    "tapa": "Blanda",
    "año": "2025",
    "paginas": "400",
    "genero": "Literatura y ficción",
    "isbn": "9788408305835",
    "precio": "$450.00 MXN"
  },
  {
    "titulo": "Otro libro",
    ...
  }
]

IMPORTANTE sobre el JSON:
- Debe ser un array JSON válido (empieza con [ y termina con ])
- Cada libro es un objeto con TODOS los campos
- Usa comillas dobles " para las propiedades y valores
- Separa cada libro con coma
- NO incluyas comentarios en el JSON
- El campo "isbn" es OBLIGATORIO
- Si un campo está vacío, déjalo como string vacío ""

Instrucciones para el usuario:
1. Abre el archivo "libros_importar.json" de tu carpeta de descargas
2. Copia TODO el contenido del archivo (Ctrl+A, Ctrl+C)
3. Ve a la aplicación en http://localhost:7000
4. Haz clic en el botón 📥 "Importar Libros desde JSON" (segundo botón flotante desde abajo)
5. Pega el JSON en el textarea
6. Haz clic en "🔍 Validar JSON" para verificar que esté correcto
7. Haz clic en "✅ Importar X Libros" para agregarlos a la biblioteca

La app detectará automáticamente libros duplicados y solo agregará los nuevos.


PASO 6: Registrar ISBNs no encontrados
--------------------------------------------------------------------------------
Si algún ISBN NO fue encontrado:

1. Lee el archivo: C:\\Users\\Adrian Guajardo\\Downloads\\biblioteca-libros.html
2. Busca la función cargarISBNsNoEncontrados() en el archivo
3. Agrega los ISBNs no encontrados al array isbnsNoEncontrados = [...]
4. Guarda el archivo actualizado

Formato:
isbnsNoEncontrados = [
    '9788408306122',
    '9788466379489',
    '9788410551848'
];

IMPORTANTE:
- Cada ISBN debe estar entre comillas simples
- Los ISBNs se muestran en una sección amarilla de advertencia
- El usuario puede limpiarlos con el botón "Limpiar ISBNs No Encontrados"


OPTIMIZACIONES
================================================================================

1. Búsquedas en paralelo:
   - Ejecuta múltiples WebSearch simultáneamente cuando sea posible
   - Ejemplo: buscar 5 ISBNs en paralelo en lugar de uno por uno

2. No limitar tokens:
   - El usuario tiene Claude Pro Max
   - Puedes usar todos los tokens necesarios
   - No te limites en las búsquedas

3. Usar TodoWrite:
   - SIEMPRE usa TodoWrite para trackear el progreso
   - Marca tareas como completed cuando termines
   - Solo una tarea "in_progress" a la vez


EJEMPLO COMPLETO
================================================================================

EJEMPLO 1 - Con Enlaces Directos (RECOMENDADO):
------------------------------------------------
Usuario envía:
https://latam.casadellibro.com/libro-las-ratitas-14/9788408306122/15179646
https://latam.casadellibro.com/libro-la-chica-oculta/9788466379489/15125049

Tú haces:
1. Creas TodoWrite con 2 tareas
2. Usas WebFetch directamente en cada URL (100% confiable)
3. Compilas UNA SOLA TABLA con los 2 libros
4. AUTOMÁTICAMENTE creas el archivo JSON en C:\\Users\\adria\\Downloads\\libros_importar.json
5. Das instrucciones al usuario para abrir el archivo y copiar el contenido para importarlo en la app


EJEMPLO 2 - Con ISBNs:
-----------------------
Usuario envía:
9788408305835
9788423368136
9788427248847

Tú haces:
1. Creas TodoWrite con 3 tareas
2. Buscas los 3 ISBNs con WebSearch (puedes hacerlo en paralelo)
3. Usas WebFetch para obtener detalles de cada libro encontrado
4. Compilas UNA SOLA TABLA con los libros encontrados
5. Si algún ISBN no se encuentra, lo mencionas
6. AUTOMÁTICAMENTE creas el archivo JSON en C:\\Users\\adria\\Downloads\\libros_importar.json
7. Das instrucciones al usuario para abrir el archivo y copiar el contenido para importarlo en la app


EJEMPLO 3 - Mezcla de ambos:
-----------------------------
Usuario envía:
https://latam.casadellibro.com/libro-las-ratitas-14/9788408306122/15179646
9788423368136
9788427248847

Tú haces:
1. Identificas que hay 1 enlace directo y 2 ISBNs
2. Usas WebFetch para el enlace directo
3. Usas WebSearch + WebFetch para los 2 ISBNs
4. Compilas UNA SOLA TABLA con todos los libros
5. AUTOMÁTICAMENTE creas el archivo JSON en C:\\Users\\adria\\Downloads\\libros_importar.json
6. Das instrucciones al usuario para abrir el archivo y copiar el contenido para importarlo en la app


ERRORES COMUNES A EVITAR
================================================================================

❌ NO crees múltiples tablas (SIEMPRE UNA SOLA TABLA)
❌ NO inventes géneros que no estén en la lista
❌ NO uses "Tapa blanda" o "Pasta dura", usa "Blanda" o "Dura"
❌ NO olvides usar TodoWrite para tracking
❌ NO dejes campos con "N/A", déjalos vacíos
❌ NO olvides crear el archivo JSON automáticamente en C:\\Users\\adria\\Downloads\\libros_importar.json
❌ NO muestres el JSON en un bloque de código, créalo como archivo
❌ NO uses comillas simples en el JSON, usa comillas dobles
❌ NO olvides mencionar ISBNs no encontrados


CHECKLIST FINAL
================================================================================

Antes de entregar resultados, verifica:

✅ UNA SOLA TABLA con todos los libros
✅ Todos los ISBNs buscados completamente
✅ Solo géneros de la lista permitida
✅ Solo "Blanda" o "Dura" para tapa
✅ Solo "Español", "Inglés" o "Francés" para idioma (NUNCA "Castellano")
✅ TodoWrite actualizado con progreso
✅ Campos vacíos como string vacío "" si no hay información
✅ Archivo JSON creado AUTOMÁTICAMENTE en C:\\Users\\adria\\Downloads\\libros_importar.json
✅ JSON válido (usa comillas dobles, sintaxis correcta)
✅ Instrucciones claras para el usuario sobre cómo abrir el archivo e importar
✅ ISBNs no encontrados mencionados claramente
✅ Si es Casa del Libro, precio con 5% de descuento aplicado


================================================================================
¡Listo para buscar libros!
================================================================================

Puedes darme:
• Enlaces directos a libros (Casa del Libro, etc.) - ¡100% CONFIABLE!
• ISBNs para buscar
• O una mezcla de ambos

Los buscaré todos y te presentaré UNA SOLA TABLA con toda la información,
lista para copiar a Google Sheets o Excel.

Después te preguntaré cuáles quieres agregar a tu biblioteca.`;

    navigator.clipboard.writeText(prompt).then(() => {
      mostrarToast('✓ Prompt completo copiado al portapapeles');
    });
  };

  const agregarIsbn = async (texto: string) => {
    if (!texto.trim()) return;

    // Detectar si es un ISBN (solo números) o un enlace
    const esISBN = /^\d+$/.test(texto.trim());
    const valor = esISBN
      ? `https://latam.casadellibro.com/?query=${texto.trim()}`
      : texto.trim();

    const nuevosEnlaces = [...enlacesPendientes, valor];
    setEnlacesPendientes(nuevosEnlaces);
    await fetch('/api/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enlacesPendientes: nuevosEnlaces }),
    });
    mostrarToast(esISBN ? 'ISBN convertido a enlace' : 'Enlace agregado a la lista');
  };

  const eliminarIsbn = async (index: number) => {
    const nuevosEnlaces = enlacesPendientes.filter((_, i) => i !== index);
    setEnlacesPendientes(nuevosEnlaces);
    await fetch('/api/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enlacesPendientes: nuevosEnlaces }),
    });
    mostrarToast('ISBN eliminado');
  };

  const agregarTitulo = async (titulo: string) => {
    if (!titulo.trim()) return;

    const nuevosTitulos = [...titulosGrabados, titulo.trim()];
    setTitulosGrabados(nuevosTitulos);
    await fetch('/api/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulosGrabados: nuevosTitulos }),
    });
    mostrarToast('Título agregado');
  };

  const eliminarTitulo = async (index: number) => {
    const nuevosTitulos = titulosGrabados.filter((_, i) => i !== index);
    setTitulosGrabados(nuevosTitulos);
    await fetch('/api/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulosGrabados: nuevosTitulos }),
    });
    mostrarToast('Título eliminado');
  };

  const limpiarTitulos = async () => {
    if (titulosGrabados.length === 0) {
      mostrarToast('No hay títulos para limpiar');
      return;
    }

    if (confirm(`¿Estás seguro de que quieres eliminar todos los ${titulosGrabados.length} títulos grabados?`)) {
      setTitulosGrabados([]);
      await fetch('/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulosGrabados: [] }),
      });
      mostrarToast('Títulos limpiados');
    }
  };

  const copiarTitulos = () => {
    if (titulosGrabados.length === 0) {
      mostrarToast('No hay títulos para copiar');
      return;
    }

    navigator.clipboard.writeText(titulosGrabados.join('\n')).then(() => {
      mostrarToast(`📋 ${titulosGrabados.length} títulos copiados al portapapeles`);
    });
  };


  const parsearJSON = () => {
    try {
      // Limpiar el JSON de caracteres problemáticos pero mantener el contenido
      let cleanedInput = jsonInput
        .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '') // Remover caracteres de control (excepto \n, \r, \t)
        .replace(/\r\n/g, ' ') // Reemplazar saltos de línea Windows por espacio
        .replace(/\n/g, ' ') // Reemplazar saltos de línea Unix por espacio
        .replace(/\r/g, ' ') // Reemplazar retornos de carro por espacio
        .replace(/\t/g, ' ') // Reemplazar tabs por espacio
        .replace(/  +/g, ' ') // Reemplazar múltiples espacios por uno solo
        .replace(/'/g, "'") // Reemplazar comillas curvas simples
        .replace(/'/g, "'") // Reemplazar comillas curvas simples inversas
        .replace(/"/g, '"') // Reemplazar comillas curvas dobles izquierdas
        .replace(/"/g, '"') // Reemplazar comillas curvas dobles derechas
        .replace(/–/g, '-') // Reemplazar guión largo
        .replace(/—/g, '-') // Reemplazar guión em
        .replace(/…/g, '...'); // Reemplazar puntos suspensivos

      const parsed = JSON.parse(cleanedInput);

      // Validar que sea un array
      if (!Array.isArray(parsed)) {
        mostrarToast('❌ El JSON debe ser un array de libros');
        return;
      }

      // Validar que cada libro tenga los campos necesarios
      const librosValidos: Libro[] = [];
      for (const libro of parsed) {
        if (!libro.isbn) {
          mostrarToast('❌ Todos los libros deben tener ISBN');
          return;
        }
        librosValidos.push({
          titulo: libro.titulo || '',
          sinopsis: libro.sinopsis || '',
          tituloCompleto: libro.tituloCompleto || libro.titulo || '',
          autor: libro.autor || '',
          idioma: libro.idioma || '',
          editorial: libro.editorial || '',
          tapa: libro.tapa || '',
          año: libro.año || '',
          paginas: libro.paginas || '',
          genero: libro.genero || '',
          isbn: libro.isbn,
          precio: libro.precio || ''
        });
      }

      setLibrosParseados(librosValidos);
      mostrarToast(`✅ ${librosValidos.length} libros listos para importar`);
    } catch (error) {
      console.error('Error parseando JSON:', error);
      mostrarToast(`❌ Error al parsear JSON: ${error instanceof Error ? error.message : 'Formato inválido'}`);
      setLibrosParseados([]);
    }
  };

  const importarLibros = async () => {
    if (librosParseados.length === 0) {
      mostrarToast('❌ No hay libros para importar');
      return;
    }

    try {
      // Mostrar modal de progreso
      setShowProgressModal(true);
      setImportTotal(librosParseados.length);
      setImportCurrent(0);
      setImportProgress(0);

      // Agregar los libros parseados a los libros existentes
      const nuevosLibros = [...libros];
      let agregados = 0;
      let duplicados = 0;

      for (let i = 0; i < librosParseados.length; i++) {
        const libro = librosParseados[i];

        // Simular un pequeño delay para que se vea el progreso
        await new Promise(resolve => setTimeout(resolve, 300));

        // Verificar si el ISBN ya existe
        const existe = nuevosLibros.some(l => l.isbn === libro.isbn);
        if (!existe) {
          nuevosLibros.push(libro);
          agregados++;
        } else {
          duplicados++;
        }

        // Actualizar progreso
        setImportCurrent(i + 1);
        setImportProgress(Math.round(((i + 1) / librosParseados.length) * 100));
      }

      // Guardar en la API
      await fetch('/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ libros: nuevosLibros }),
      });

      setLibros(nuevosLibros);

      // Esperar un momento para que se vea el 100%
      await new Promise(resolve => setTimeout(resolve, 500));

      // Cerrar modal y limpiar
      setShowProgressModal(false);
      setJsonInput('');
      setLibrosParseados([]);

      if (duplicados > 0) {
        mostrarToast(`✅ ${agregados} libros importados, ${duplicados} duplicados omitidos`);
      } else {
        mostrarToast(`✅ ${agregados} libros importados correctamente`);
      }
    } catch (error) {
      console.error('Error importando libros:', error);
      setShowProgressModal(false);
      mostrarToast('❌ Error al importar libros');
    }
  };

  const limpiarJSON = () => {
    setJsonInput('');
    setLibrosParseados([]);
    mostrarToast('JSON limpiado');
  };

  return (
    <>
      <Sidebar
        onHomeClick={() => {
          setSearchPanelOpen(false);
          setImportPanelOpen(false);
          setTitulosPanelOpen(false);
        }}
        onTitulosClick={() => {
          setTitulosPanelOpen(!titulosPanelOpen);
          setSearchPanelOpen(false);
          setImportPanelOpen(false);
        }}
        onSearchClick={() => {
          setSearchPanelOpen(!searchPanelOpen);
          setImportPanelOpen(false);
          setTitulosPanelOpen(false);
        }}
        onImportClick={() => {
          setImportPanelOpen(!importPanelOpen);
          setSearchPanelOpen(false);
          setTitulosPanelOpen(false);
        }}
        onPromptClick={copiarPrompt}
        onMercadolibreClick={() => {
          window.open('https://claude.ai/chat/32c40fd5-b0b3-45e0-8f34-3e9d1d22890d', '_blank');
        }}
        titulosCount={titulosGrabados.length}
        searchCount={enlacesPendientes.length}
        activePanel={
          searchPanelOpen ? 'search' :
          importPanelOpen ? 'import' :
          titulosPanelOpen ? 'titulos' :
          'home'
        }
      />

      <div className="container">
        {/* Hero Header */}
        <HeroHeader totalLibros={stats.totalLibros} />

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Stats Cards */}
        <StatsCards
          totalLibros={stats.totalLibros}
          totalAutores={stats.totalAutores}
          totalGeneros={stats.totalGeneros}
          libroMasReciente={stats.libroMasReciente?.año || null}
        />

        {/* Toolbar con Filtros y Acciones */}
        <Toolbar
          filtroGenero={filtroGenero}
          filtroIdioma={filtroIdioma}
          filtroAno={filtroAno}
          onGeneroChange={setFiltroGenero}
          onIdiomaChange={setFiltroIdioma}
          onAnoChange={setFiltroAno}
          generosDisponibles={generosUnicos}
          idiomasDisponibles={idiomasUnicos}
          anosDisponibles={anosUnicos}
          vistaActual={vistaActual}
          onVistaChange={setVistaActual}
          librosFiltrados={stats.librosFiltrados}
          totalLibros={stats.totalLibros}
          onCopiarTabla={copiarTabla}
          onCopiarEnFila={copiarEnFila}
          onLimpiarBiblioteca={limpiarBiblioteca}
          searchQuery={searchQuery}
          onLimpiarFiltros={limpiarFiltros}
        />

        {isbnsNoEncontrados.length > 0 && (
          <div className="not-found-section">
            <div className="not-found-title">
              <span>⚠️ ISBNs No Encontrados ({isbnsNoEncontrados.length})</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(isbnsNoEncontrados.join('\n'));
                  mostrarToast(`📋 ${isbnsNoEncontrados.length} ISBNs copiados al portapapeles`);
                }}
                className="btn-success"
                style={{ marginLeft: '15px', padding: '8px 16px', fontSize: '0.9em' }}
              >
                📋 Copiar ISBNs
              </button>
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro de que quieres eliminar todos los ISBNs no encontrados?')) {
                    setIsbnsNoEncontrados([]);
                    mostrarToast('ISBNs no encontrados limpiados');
                  }
                }}
                className="btn-danger"
                style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '0.9em' }}
              >
                🗑️ Limpiar ISBNs No Encontrados
              </button>
            </div>
            <div className="not-found-list">
              {isbnsNoEncontrados.map((isbn, i) => (
                <span key={i} className="not-found-isbn">{isbn}</span>
              ))}
            </div>
          </div>
        )}

        {/* Vista condicional: Tabla o Tarjetas */}
        {vistaActual === 'tabla' ? (
          <BookTable libros={libros} librosFiltrados={librosFiltrados} />
        ) : (
          <BookCardsGrid libros={libros} librosFiltrados={librosFiltrados} />
        )}
      </div>

      {/* Toast notification */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        {toastMessage}
      </div>

      {/* Vista de pantalla completa de Lista de Búsqueda */}
      <div className={`search-panel-overlay ${searchPanelOpen ? 'active' : ''}`}></div>
      <div className={`search-panel ${searchPanelOpen ? 'active' : ''}`}>
        <div className="search-panel-header">
          <div className="search-panel-title">
            🔍 Lista de Búsqueda
          </div>
          <button className="search-panel-close" onClick={() => setSearchPanelOpen(false)}>
            ✕
          </button>
        </div>

        <div className="search-panel-body">
          <div className="search-counter">
            {enlacesPendientes.length} {enlacesPendientes.length === 1 ? 'enlace guardado' : 'enlaces guardados'}
          </div>

          {/* Botones de filtro por tienda */}
          <div className="filter-buttons-container" style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setFiltroTienda('todos')}
              className={filtroTienda === 'todos' ? 'filter-btn active' : 'filter-btn'}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: filtroTienda === 'todos' ? '2px solid #4CAF50' : '2px solid #ddd',
                background: filtroTienda === 'todos' ? '#4CAF50' : 'white',
                color: filtroTienda === 'todos' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              Todos ({enlacesPendientes.length})
            </button>
            <button
              onClick={() => setFiltroTienda('casadellibro')}
              className={filtroTienda === 'casadellibro' ? 'filter-btn active' : 'filter-btn'}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: filtroTienda === 'casadellibro' ? '2px solid #4CAF50' : '2px solid #ddd',
                background: filtroTienda === 'casadellibro' ? '#4CAF50' : 'white',
                color: filtroTienda === 'casadellibro' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              🔗 Casa del Libro ({enlacesPendientes.filter(e => e.includes('latam.casadellibro.com') || e.includes('casadellibro.com')).length})
            </button>
            <button
              onClick={() => setFiltroTienda('amazon')}
              className={filtroTienda === 'amazon' ? 'filter-btn active' : 'filter-btn'}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: filtroTienda === 'amazon' ? '2px solid #4CAF50' : '2px solid #ddd',
                background: filtroTienda === 'amazon' ? '#4CAF50' : 'white',
                color: filtroTienda === 'amazon' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              🛒 Amazon ({enlacesPendientes.filter(e => /amazon\.(com|es|com\.mx|co\.uk|ca|de|fr|it|co\.jp|in|com\.br|com\.au|cn|nl|sg)/.test(e)).length})
            </button>
            <button
              onClick={() => setFiltroTienda('elsotano')}
              className={filtroTienda === 'elsotano' ? 'filter-btn active' : 'filter-btn'}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: filtroTienda === 'elsotano' ? '2px solid #4CAF50' : '2px solid #ddd',
                background: filtroTienda === 'elsotano' ? '#4CAF50' : 'white',
                color: filtroTienda === 'elsotano' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              📖 El Sótano ({enlacesPendientes.filter(e => e.includes('servicioalpiedelaletra.com') || e.includes('sotano_business')).length})
            </button>
            <button
              onClick={() => setFiltroTienda('arnoia')}
              className={filtroTienda === 'arnoia' ? 'filter-btn active' : 'filter-btn'}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: filtroTienda === 'arnoia' ? '2px solid #4CAF50' : '2px solid #ddd',
                background: filtroTienda === 'arnoia' ? '#4CAF50' : 'white',
                color: filtroTienda === 'arnoia' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              📚 ARNOIA ({enlacesPendientes.filter(e => e.includes('arnoia.com') || e.includes('arnoia')).length})
            </button>
          </div>

          <div className="search-input-container">
            <textarea
              id="searchInput"
              className="search-input"
              placeholder="Pega aquí ISBNs (uno por línea) o enlaces..."
              rows={4}
              onPaste={(e) => {
                // Detectar si se pegan múltiples líneas o un solo enlace/ISBN
                const pastedText = e.clipboardData.getData('text');
                const lines = pastedText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

                if (lines.length >= 1) {
                  e.preventDefault();
                  // Agregar todos los ISBNs/enlaces automáticamente
                  const nuevosEnlaces = [...enlacesPendientes];
                  let isbnsConvertidos = 0;
                  let enlacesDirectos = 0;

                  lines.forEach(texto => {
                    if (texto) {
                      // Detectar si es un ISBN (solo números) o un enlace
                      const esISBN = /^\d+$/.test(texto);
                      const valor = esISBN
                        ? `https://latam.casadellibro.com/?query=${texto}`
                        : texto;

                      if (!nuevosEnlaces.includes(valor)) {
                        nuevosEnlaces.push(valor);
                        if (esISBN) isbnsConvertidos++;
                        else enlacesDirectos++;
                      }
                    }
                  });
                  setEnlacesPendientes(nuevosEnlaces);

                  // Guardar en API
                  fetch('/api/libros', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ enlacesPendientes: nuevosEnlaces }),
                  });

                  let mensaje = '✅ ';
                  if (isbnsConvertidos > 0) mensaje += `${isbnsConvertidos} ISBN(s) convertido(s)`;
                  if (isbnsConvertidos > 0 && enlacesDirectos > 0) mensaje += ' y ';
                  if (enlacesDirectos > 0) mensaje += `${enlacesDirectos} enlace(s) agregado(s)`;

                  mostrarToast(mensaje);
                  (e.target as HTMLTextAreaElement).value = '';
                }
              }}
            />
          </div>

          <div className="search-controls">
            <button onClick={() => {
              // Filtrar enlaces según la tienda seleccionada
              const enlacesFiltrados = enlacesPendientes.filter(enlace => {
                if (filtroTienda === 'todos') return true;
                if (filtroTienda === 'casadellibro') {
                  return enlace.includes('latam.casadellibro.com') || enlace.includes('casadellibro.com');
                }
                if (filtroTienda === 'amazon') {
                  return /amazon\.(com|es|com\.mx|co\.uk|ca|de|fr|it|co\.jp|in|com\.br|com\.au|cn|nl|sg)/.test(enlace);
                }
                if (filtroTienda === 'elsotano') {
                  return enlace.includes('servicioalpiedelaletra.com') || enlace.includes('sotano_business');
                }
                if (filtroTienda === 'arnoia') {
                  return enlace.includes('arnoia.com') || enlace.includes('arnoia');
                }
                return false;
              });

              if (enlacesFiltrados.length === 0) {
                mostrarToast('No hay enlaces para copiar con el filtro actual');
                return;
              }

              navigator.clipboard.writeText(enlacesFiltrados.join('\n')).then(() => {
                const tiendaNombre = filtroTienda === 'todos' ? 'todos' :
                                    filtroTienda === 'casadellibro' ? 'Casa del Libro' :
                                    filtroTienda === 'amazon' ? 'Amazon' :
                                    filtroTienda === 'elsotano' ? 'El Sótano' : 'ARNOIA';
                mostrarToast(`📋 ${enlacesFiltrados.length} enlaces de ${tiendaNombre} copiados`);
              });
            }} className="btn-success">
              📋 Copiar Enlaces {filtroTienda !== 'todos' ? `(${filtroTienda === 'casadellibro' ? 'Casa del Libro' : filtroTienda === 'amazon' ? 'Amazon' : filtroTienda === 'elsotano' ? 'El Sótano' : 'ARNOIA'})` : ''}
            </button>
            {enlacesPendientes.some(enlace => enlace.includes('latam.casadellibro.com/?query=')) && (
              <button onClick={() => {
                // Filtrar solo los enlaces de Casa del Libro en formato query (los que vienen de ISBNs)
                const enlacesCasaDelLibro = enlacesPendientes.filter(enlace =>
                  enlace.includes('latam.casadellibro.com/?query=')
                );

                if (confirm(`¿Abrir ${enlacesCasaDelLibro.length} pestañas de Casa del Libro?\n\nNota: Tu navegador puede bloquear ventanas emergentes.`)) {
                  enlacesCasaDelLibro.forEach((enlace, index) => {
                    // Pequeño delay entre aperturas para evitar problemas
                    setTimeout(() => {
                      window.open(enlace, '_blank');
                    }, index * 100);
                  });
                  mostrarToast(`🚀 Abriendo ${enlacesCasaDelLibro.length} pestañas...`);
                }
              }} className="btn-success" style={{background: '#7a9aa8'}}>
                🚀 Abrir Todos (Casa del Libro)
              </button>
            )}
            <button onClick={() => {
              if (enlacesPendientes.length === 0) {
                mostrarToast('No hay enlaces para limpiar');
                return;
              }

              // Mensaje de confirmación específico según el filtro activo
              let mensajeConfirmacion = '';
              if (filtroTienda === 'todos') {
                mensajeConfirmacion = `⚠️ ATENCIÓN: Estás a punto de eliminar TODOS los ${enlacesPendientes.length} enlaces de la lista.\n\n¿Estás seguro de continuar?\n\nEsta acción no se puede deshacer.`;
              } else {
                const tiendaNombre = filtroTienda === 'casadellibro' ? 'Casa del Libro' :
                                    filtroTienda === 'amazon' ? 'Amazon' :
                                    filtroTienda === 'elsotano' ? 'El Sótano' : 'ARNOIA';
                mensajeConfirmacion = `⚠️ ATENCIÓN: Tienes el filtro "${tiendaNombre}" activo.\n\nEste botón eliminará TODOS los ${enlacesPendientes.length} enlaces de la lista (no solo los de ${tiendaNombre}).\n\n¿Estás seguro de continuar?\n\nEsta acción no se puede deshacer.`;
              }

              if (confirm(mensajeConfirmacion)) {
                setEnlacesPendientes([]);
                fetch('/api/libros', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ enlacesPendientes: [] }),
                });
                mostrarToast('🗑️ Lista de búsqueda completamente limpiada');
              }
            }} className="btn-danger">
              🗑️ Limpiar Todo
            </button>
          </div>

          <div className="search-table-container">
            {(() => {
              // Filtrar enlaces según la tienda seleccionada
              const enlacesFiltrados = enlacesPendientes.filter(enlace => {
                if (filtroTienda === 'todos') return true;
                if (filtroTienda === 'casadellibro') {
                  return enlace.includes('latam.casadellibro.com') || enlace.includes('casadellibro.com');
                }
                if (filtroTienda === 'amazon') {
                  return /amazon\.(com|es|com\.mx|co\.uk|ca|de|fr|it|co\.jp|in|com\.br|com\.au|cn|nl|sg)/.test(enlace);
                }
                if (filtroTienda === 'elsotano') {
                  return enlace.includes('servicioalpiedelaletra.com') || enlace.includes('sotano_business');
                }
                if (filtroTienda === 'arnoia') {
                  return enlace.includes('arnoia.com') || enlace.includes('arnoia');
                }
                return false;
              });

              return (
                <table className="search-table">
                  <thead>
                    <tr>
                      <th style={{width: '140px', minWidth: '140px'}}>ISBN</th>
                      <th style={{width: '25%'}}>Título</th>
                      <th style={{width: 'auto'}}>Nombre del Ejemplar</th>
                      <th style={{width: '120px', minWidth: '120px', textAlign: 'center'}}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enlacesFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="search-empty">
                          <div className="empty-state-icon">📭</div>
                          <p style={{fontSize: '1.2em', marginBottom: '10px'}}>
                            {enlacesPendientes.length === 0 ? 'No hay enlaces guardados' : 'No hay enlaces de esta tienda'}
                          </p>
                          <p>{enlacesPendientes.length === 0 ? 'Agrega enlaces o ISBNs para buscar después' : 'Selecciona otro filtro o agrega enlaces de esta tienda'}</p>
                        </td>
                      </tr>
                    ) : (
                      enlacesFiltrados.map((enlace, index) => {
                    // Extraer el ISBN del enlace si es de Casa del Libro
                    // Formato 1: https://latam.casadellibro.com/?query=9788467961249
                    // Formato 2: https://latam.casadellibro.com/libro-kowloon-generic-romance-5/9788467961249/13613556
                    let isbn = '';
                    const queryMatch = enlace.match(/query=(\d+)/);
                    const pathMatch = enlace.match(/\/(\d{13}|\d{10})\//);

                    if (queryMatch) {
                      isbn = queryMatch[1];
                    } else if (pathMatch) {
                      isbn = pathMatch[1];
                    }

                    // Detectar enlaces de Amazon de forma inteligente
                    // Soporta: amazon.com, amazon.es, amazon.com.mx, amazon.co.uk, etc.
                    const esEnlaceAmazon = /amazon\.(com|es|com\.mx|co\.uk|ca|de|fr|it|co\.jp|in|com\.br|com\.au|cn|nl|sg)/.test(enlace);

                    // Detectar enlaces de El Sótano
                    // Formato: https://servicioalpiedelaletra.com/sotano_business/libro-nombre-pd-12345
                    const esEnlaceElSotano = enlace.includes('servicioalpiedelaletra.com') || enlace.includes('sotano_business');

                    // Detectar enlaces de ARNOIA
                    const esEnlaceArnoia = enlace.includes('arnoia.com') || enlace.includes('arnoia');

                    // Extraer ISBN de enlaces de Amazon
                    // Formato Amazon: /dp/ISBN/ o /product/ISBN/
                    if (esEnlaceAmazon && !isbn) {
                      const amazonIsbnMatch = enlace.match(/\/(?:dp|product)\/([A-Z0-9]{10}|[0-9]{13})\//i);
                      if (amazonIsbnMatch) {
                        isbn = amazonIsbnMatch[1];
                      }
                    }

                    // Extraer ID de producto de El Sótano
                    // Formato: libro-nombre-pd-12345
                    if (esEnlaceElSotano && !isbn) {
                      const sotanoIdMatch = enlace.match(/pd-(\d+)/);
                      if (sotanoIdMatch) {
                        isbn = sotanoIdMatch[1];
                      }
                    }

                    const esEnlaceCasaDelLibro = enlace.includes('latam.casadellibro.com') || enlace.includes('casadellibro.com');

                    return (
                      <tr key={index}>
                        <td style={{whiteSpace: 'nowrap'}}>
                          {isbn ? (
                            <span className="search-isbn" onClick={() => {
                              navigator.clipboard.writeText(isbn);
                              mostrarToast(`ISBN copiado: ${isbn}`);
                            }} title="Clic para copiar ISBN">{isbn}</span>
                          ) : (
                            <span style={{color: '#999', fontSize: '0.9em'}}>—</span>
                          )}
                        </td>
                        <td>
                          <a href={enlace} target="_blank" rel="noopener noreferrer" className="search-link" onClick={(e) => e.stopPropagation()}>
                            {esEnlaceAmazon ? '🛒 Amazon' : (esEnlaceElSotano ? '📖 El Sótano' : (esEnlaceArnoia ? '📚 ARNOIA' : (esEnlaceCasaDelLibro ? '🔗 Casa del Libro' : '🔗 Enlace externo')))}
                          </a>
                        </td>
                        <td>
                          <span className="search-ejemplar-text" style={{fontSize: '0.85em', wordBreak: 'break-all'}}>
                            {enlace}
                          </span>
                        </td>
                        <td style={{textAlign: 'center'}}>
                          <button className="search-delete-btn" onClick={() => eliminarIsbn(index)} title="Eliminar este enlace">
                            🗑️ Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                    )}
                  </tbody>
                </table>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Vista de pantalla completa de Importar JSON */}
      <div className={`import-panel-overlay ${importPanelOpen ? 'active' : ''}`}></div>
      <div className={`import-panel ${importPanelOpen ? 'active' : ''}`}>
        <div className="import-panel-header">
          <div className="import-panel-title">
            📥 Importar Libros desde JSON
          </div>
          <button className="import-panel-close" onClick={() => setImportPanelOpen(false)}>
            ✕
          </button>
        </div>

        <div className="import-panel-body">
          <div className="search-counter" style={{background: '#a8c9b8', color: '#2d4a38'}}>
            Importa libros fácilmente pegando el JSON que Claude te proporcione
          </div>

          <div style={{
            background: '#faf8f5',
            padding: '25px',
            borderRadius: '15px',
            border: '2px solid #a8c9b8'
          }}>
            <h3 style={{marginTop: 0, color: '#2d4a38', fontSize: '1.2em'}}>
              📋 Pega el JSON aquí:
            </h3>
            <p style={{
              marginBottom: '15px',
              color: '#5a4a3a',
              fontSize: '0.95em',
              lineHeight: '1.6'
            }}>
              1. Copia el botón 📋 para copiar el prompt<br/>
              2. Dale los ISBNs a Claude<br/>
              3. Claude te dará un JSON<br/>
              4. Pega ese JSON aquí abajo<br/>
              5. Click en "Validar" y luego "Importar"
            </p>

            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[
  {
    "titulo": "El nombre del viento",
    "sinopsis": "La historia de Kvothe...",
    "tituloCompleto": "El nombre del viento",
    "autor": "Patrick Rothfuss",
    "idioma": "Español",
    "editorial": "Plaza & Janés",
    "tapa": "Blanda",
    "año": "2009",
    "paginas": "872",
    "genero": "Literatura y ficción",
    "isbn": "9788401352836",
    "precio": "$350.00 MXN"
  }
]'
              style={{
                width: '100%',
                minHeight: '300px',
                padding: '20px',
                border: '2px solid #a8c9b8',
                borderRadius: '12px',
                fontFamily: 'monospace',
                fontSize: '0.9em',
                background: 'white',
                resize: 'vertical',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
              }}
            />

            {librosParseados.length > 0 && (
              <div style={{
                marginTop: '20px',
                padding: '20px',
                background: '#e8f5e9',
                border: '2px solid #81c784',
                borderRadius: '12px',
                color: '#2e7d32'
              }}>
                <div style={{fontWeight: 'bold', fontSize: '1.1em', marginBottom: '15px'}}>
                  ✅ {librosParseados.length} {librosParseados.length === 1 ? 'libro listo' : 'libros listos'} para importar
                </div>
                <div style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  background: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #c8e6c9'
                }}>
                  {librosParseados.map((libro, i) => (
                    <div key={i} style={{
                      padding: '10px 0',
                      borderBottom: i < librosParseados.length - 1 ? '1px solid #e8f5e9' : 'none',
                      display: 'flex',
                      gap: '10px'
                    }}>
                      <span style={{fontWeight: 'bold', color: '#2e7d32', minWidth: '30px'}}>{i + 1}.</span>
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: 'bold', color: '#1b5e20'}}>{libro.titulo}</div>
                        <div style={{fontSize: '0.9em', color: '#558b2f'}}>
                          {libro.autor} · ISBN: {libro.isbn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="search-controls" style={{marginTop: '20px', gap: '15px'}}>
              <button
                onClick={parsearJSON}
                className="btn-success"
                disabled={!jsonInput.trim()}
                style={{
                  opacity: !jsonInput.trim() ? 0.5 : 1,
                  cursor: !jsonInput.trim() ? 'not-allowed' : 'pointer',
                  padding: '15px 30px',
                  fontSize: '1.05em',
                  fontWeight: 'bold'
                }}
              >
                🔍 Validar JSON
              </button>
              <button
                onClick={importarLibros}
                className="btn-success"
                disabled={librosParseados.length === 0}
                style={{
                  opacity: librosParseados.length === 0 ? 0.5 : 1,
                  cursor: librosParseados.length === 0 ? 'not-allowed' : 'pointer',
                  padding: '15px 30px',
                  fontSize: '1.05em',
                  fontWeight: 'bold',
                  background: librosParseados.length > 0 ? '#4caf50' : undefined
                }}
              >
                ✅ Importar {librosParseados.length > 0 ? `${librosParseados.length} Libros` : 'Libros'}
              </button>
              <button
                onClick={limpiarJSON}
                className="btn-danger"
                disabled={!jsonInput && librosParseados.length === 0}
                style={{
                  opacity: !jsonInput && librosParseados.length === 0 ? 0.5 : 1,
                  cursor: !jsonInput && librosParseados.length === 0 ? 'not-allowed' : 'pointer',
                  padding: '15px 30px',
                  fontSize: '1.05em'
                }}
              >
                🗑️ Limpiar
              </button>
            </div>
          </div>

          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#fff9e6',
            border: '2px solid #ffeb3b',
            borderRadius: '12px'
          }}>
            <h4 style={{marginTop: 0, color: '#f57f17', display: 'flex', alignItems: 'center', gap: '10px'}}>
              💡 Consejos
            </h4>
            <ul style={{margin: '10px 0', paddingLeft: '20px', color: '#795548', lineHeight: '1.8'}}>
              <li>El JSON debe ser un array válido (empieza con <code>[</code> y termina con <code>]</code>)</li>
              <li>Cada libro necesita al menos el campo <code>"isbn"</code></li>
              <li>Los duplicados se detectan automáticamente y se omiten</li>
              <li>Puedes importar tantos libros como quieras de una sola vez</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Vista de pantalla completa de Títulos Grabados */}
      <div className={`titulos-panel-overlay ${titulosPanelOpen ? 'active' : ''}`}></div>
      <div className={`titulos-panel ${titulosPanelOpen ? 'active' : ''}`}>
        <div className="titulos-panel-header">
          <div className="titulos-panel-title">
            📝 Títulos Grabados
          </div>
          <button className="titulos-panel-close" onClick={() => setTitulosPanelOpen(false)}>
            ✕
          </button>
        </div>

        <div className="titulos-panel-body">
          <div className="titulos-input-container">
            <textarea
              id="titulosInput"
              className="titulos-input"
              placeholder="Escribe un título de libro y presiona Enter..."
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  const textarea = e.target as HTMLTextAreaElement;
                  const titulo = textarea.value.trim();
                  if (titulo) {
                    agregarTitulo(titulo);
                    textarea.value = '';
                  }
                }
              }}
              onPaste={(e) => {
                // Detectar si se pegan múltiples líneas
                const pastedText = e.clipboardData.getData('text');
                const lines = pastedText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

                if (lines.length > 1) {
                  e.preventDefault();
                  // Agregar todos los títulos automáticamente
                  const nuevosTitulos = [...titulosGrabados, ...lines];
                  setTitulosGrabados(nuevosTitulos);

                  // Guardar en API
                  fetch('/api/libros', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ titulosGrabados: nuevosTitulos }),
                  });

                  mostrarToast(`✅ ${lines.length} títulos agregados`);
                  (e.target as HTMLTextAreaElement).value = '';
                }
              }}
            />
          </div>

          <div className="titulos-controls">
            <button onClick={copiarTitulos} className="btn-success">
              📋 Copiar Títulos
            </button>
            <button onClick={limpiarTitulos} className="btn-danger">
              🗑️ Limpiar Todo
            </button>
          </div>

          <div className="titulos-table-container">
            <table className="titulos-table">
              <thead>
                <tr>
                  <th style={{width: 'auto'}}>Título del Libro</th>
                  <th style={{width: '120px', minWidth: '120px', textAlign: 'center'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {titulosGrabados.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="titulos-empty">
                      <div className="empty-state-icon">📝</div>
                      <p style={{fontSize: '1.2em', marginBottom: '10px'}}>No hay títulos grabados</p>
                      <p>Agrega títulos de libros que quieras comprar</p>
                    </td>
                  </tr>
                ) : (
                  titulosGrabados.map((titulo, index) => (
                    <tr key={index}>
                      <td>
                        <span className="titulo-text" onClick={() => {
                          navigator.clipboard.writeText(titulo);
                          mostrarToast(`Título copiado: ${titulo}`);
                        }} title="Clic para copiar título">{titulo}</span>
                      </td>
                      <td style={{textAlign: 'center'}}>
                        <button className="titulos-delete-btn" onClick={() => eliminarTitulo(index)} title="Eliminar este título">
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de progreso de importación */}
      {showProgressModal && (
        <div className="progress-modal-overlay">
          <div className="progress-modal">
            <div className="progress-header">
              <h2>📥 Importando Libros</h2>
            </div>
            <div className="progress-body">
              <div className="progress-info">
                <span className="progress-text">
                  Importando {importCurrent} de {importTotal} libros
                </span>
                <span className="progress-percentage">{importProgress}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${importProgress}%` }}
                >
                  <span className="progress-bar-text">{importProgress}%</span>
                </div>
              </div>
              <div className="progress-message">
                {importProgress === 100 ? '✅ Completado! Guardando...' : '⏳ Por favor espera...'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
