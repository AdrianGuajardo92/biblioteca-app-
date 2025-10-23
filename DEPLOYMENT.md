# 🚀 Guía Rápida de Deployment en Vercel

## Paso 1: Preparar el Proyecto

Asegúrate de estar en la carpeta del proyecto:
```bash
cd biblioteca-app
```

## Paso 2: Instalar Vercel CLI (si no lo tienes)

```bash
npm install -g vercel
```

## Paso 3: Hacer Login en Vercel

```bash
vercel login
```

## Paso 4: Desplegar

```bash
vercel
```

Sigue las instrucciones en pantalla:
- ✓ Set up and deploy "biblioteca-app"? **Y**
- ? Which scope do you want to deploy to? **Selecciona tu cuenta**
- ? Link to existing project? **N**
- ? What's your project's name? **biblioteca-app**
- ? In which directory is your code located? **./**

## Paso 5: Configurar Vercel KV (Base de Datos)

1. Ve a tu proyecto en https://vercel.com
2. Click en la pestaña **"Storage"**
3. Click en **"Create Database"**
4. Selecciona **"KV"** (Redis)
5. Dale un nombre (ej: `biblioteca-db`)
6. Click en **"Create"**
7. Conecta la base de datos a tu proyecto

## Paso 6: Redesplegar con la Base de Datos

```bash
vercel --prod
```

## ✅ ¡Listo!

Tu aplicación estará disponible en una URL como:
```
https://biblioteca-app-xxxx.vercel.app
```

## 📱 Acceso desde Múltiples PCs

1. Guarda la URL de tu deployment
2. Accede desde cualquier dispositivo
3. Todos los datos se sincronizan automáticamente

## 🔄 Actualizar la Aplicación

Cada vez que hagas cambios:
```bash
vercel --prod
```

## 📊 Añadir Libros Manualmente

Desde la consola del navegador (F12):

```javascript
fetch('/api/libros', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    libros: [{
      titulo: 'Título corto',
      sinopsis: 'Sinopsis del libro',
      tituloCompleto: 'Título completo del libro',
      autor: 'Nombre del Autor',
      idioma: 'Español',
      editorial: 'Editorial',
      tapa: 'Blanda',
      año: '2024',
      paginas: '300',
      genero: 'Literatura y ficción',
      isbn: '9788408306122',
      precio: '$450.00 MXN'
    }]
  })
}).then(r => r.json()).then(console.log)
```

## 🆘 Problemas Comunes

### Error: "KV is not available"
- Asegúrate de haber creado y conectado la base de datos KV
- Redespliega con `vercel --prod`

### La aplicación no guarda datos
- Verifica que KV esté conectado en el dashboard de Vercel
- Revisa los logs en Vercel Dashboard > Deployments > Logs

---

¡Disfruta tu biblioteca en la nube! 📚
