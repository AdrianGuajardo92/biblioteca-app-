import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

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

interface Enlace {
  titulo: string;
  url: string;
  descripcion: string;
}

interface BibliotecaData {
  libros: Libro[];
  isbnsNoEncontrados: string[];
  enlacesPendientes: string[];
  enlacesGuardados: Enlace[];
  titulosGrabados: string[];
}

// Inicializar cliente Redis de Upstash
// Vercel puede generar diferentes nombres de variables dependiendo de la configuración
const redis = new Redis({
  url: process.env.KV_REST_API_URL ||
       process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ||
       process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN ||
         process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ||
         process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Datos por defecto
const defaultData: BibliotecaData = {
  libros: [],
  isbnsNoEncontrados: [],
  enlacesPendientes: [],
  enlacesGuardados: [],
  titulosGrabados: [],
};

// Usar memoria local si Redis no está disponible (desarrollo local)
let localData: BibliotecaData = { ...defaultData };

async function getData(): Promise<BibliotecaData> {
  try {
    // Intentar obtener de Upstash Redis
    const data = await redis.get<BibliotecaData>('biblioteca-data');
    if (data) {
      return data;
    }
    return localData;
  } catch (error) {
    // Fallback a datos locales si Redis no está disponible
    console.log('Using local data (Redis not configured)');
    return localData;
  }
}

async function saveData(data: BibliotecaData): Promise<void> {
  try {
    // Intentar guardar en Upstash Redis
    await redis.set('biblioteca-data', data);
  } catch (error) {
    // Fallback a datos locales si Redis no está disponible
    console.log('Saving to local data (Redis not configured)');
    localData = data;
  }
}

// GET: Obtener todos los datos
export async function GET() {
  try {
    const data = await getData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting data:', error);
    return NextResponse.json(defaultData, { status: 500 });
  }
}

// POST: Guardar datos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Obtener datos actuales
    const currentData = await getData();

    // Actualizar solo los campos proporcionados
    const updatedData: BibliotecaData = {
      libros: body.libros !== undefined ? body.libros : currentData.libros,
      isbnsNoEncontrados: body.isbnsNoEncontrados !== undefined ? body.isbnsNoEncontrados : currentData.isbnsNoEncontrados,
      enlacesPendientes: body.enlacesPendientes !== undefined ? body.enlacesPendientes : currentData.enlacesPendientes,
      enlacesGuardados: body.enlacesGuardados !== undefined ? body.enlacesGuardados : currentData.enlacesGuardados,
      titulosGrabados: body.titulosGrabados !== undefined ? body.titulosGrabados : currentData.titulosGrabados || [],
    };

    await saveData(updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ success: false, error: 'Error saving data' }, { status: 500 });
  }
}

// DELETE: Limpiar todos los datos
export async function DELETE() {
  try {
    await saveData(defaultData);
    return NextResponse.json({ success: true, data: defaultData });
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ success: false, error: 'Error deleting data' }, { status: 500 });
  }
}
