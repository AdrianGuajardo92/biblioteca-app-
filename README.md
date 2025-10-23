# 📚 Biblioteca de Libros - Aplicación Web

Aplicación web moderna para gestionar tu biblioteca personal de libros con búsqueda por ISBN. Construida con Next.js y desplegable en Vercel.

## ✨ Características

- 📖 Gestión de biblioteca de libros
- 🔍 Búsqueda por ISBN
- 💾 Persistencia de datos en la nube (Vercel KV)
- 📊 Exportación a Google Sheets y Excel
- 🔗 Gestión de enlaces guardados
- 📝 Lista de búsqueda pendiente
- 🌐 Acceso desde múltiples dispositivos
- 📱 Diseño responsive

## 🚀 Deployment en Vercel

### Opción 1: Deployment Automático (Recomendado)

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Desde la carpeta del proyecto, ejecutar:**
   ```bash
   vercel
   ```

3. **Seguir las instrucciones:**
   - Confirmar que es un nuevo proyecto
   - Seleccionar tu cuenta de Vercel
   - El proyecto se desplegará automáticamente

4. **Configurar Vercel KV (Base de Datos):**
   - Ve a tu proyecto en [vercel.com](https://vercel.com)
   - En la pestaña "Storage", crea una nueva base de datos KV
   - Conecta la base de datos a tu proyecto
   - Redespliega el proyecto con `vercel --prod`

### Opción 2: Deployment desde la Web

1. **Subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/biblioteca-app.git
   git push -u origin main
   ```

2. **Importar en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configurar Vercel KV:**
   - En el dashboard del proyecto, ve a "Storage"
   - Crea una base de datos KV
   - Conecta la base de datos a tu proyecto

## 💻 Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📝 Añadir Libros Manualmente

### Desde la Aplicación Web

Puedes usar la API para añadir libros programáticamente. Ejemplo con fetch:

```javascript
// Añadir un libro
await fetch('/api/libros', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    libros: [
      {
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
      }
    ]
  })
});
```

### Usando la Consola del Navegador

1. Abre la consola del navegador (F12)
2. Pega el código JavaScript anterior
3. Los libros se añadirán automáticamente

## 🔧 Variables de Entorno (Vercel KV)

Cuando configures Vercel KV, las siguientes variables se crearán automáticamente:

```env
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

No necesitas configurarlas manualmente, Vercel las gestiona automáticamente.

## 📊 Estructura del Proyecto

```
biblioteca-app/
├── app/
│   ├── api/
│   │   └── libros/
│   │       └── route.ts      # API endpoints
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página principal
├── public/                   # Archivos estáticos
├── next.config.ts            # Configuración de Next.js
├── package.json              # Dependencias
├── tsconfig.json             # Configuración de TypeScript
└── README.md                 # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Vercel KV** - Base de datos Redis
- **React 19** - Librería UI

## 📱 Uso desde Múltiples PCs

Una vez desplegada en Vercel:

1. Accede desde cualquier dispositivo usando la URL de Vercel
2. Todos los cambios se sincronizan automáticamente
3. Los datos persisten entre sesiones y dispositivos
4. No se requiere configuración adicional

## 🔒 Seguridad

- Los datos se almacenan en Vercel KV (Redis)
- Conexión segura HTTPS
- Sin autenticación por defecto (puedes añadirla si lo necesitas)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 💡 Consejos

- **Backup:** Exporta tus datos regularmente usando el botón "Copiar Todo"
- **Performance:** Vercel KV es muy rápido, pero considera limitar a ~10,000 libros máximo
- **URLs:** Guarda la URL de tu deployment de Vercel para acceso rápido

## 🆘 Soporte

Si encuentras algún problema:

1. Verifica que Vercel KV esté correctamente configurado
2. Revisa los logs en el dashboard de Vercel
3. Asegúrate de estar usando la versión más reciente

---

Hecho con ❤️ para gestionar tu biblioteca personal
