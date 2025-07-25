# 🚌 Generador de Carnés de Transporte CTP Sabalito

<div align="center">
  <img src="assets/logo.png" alt="Logo CTP Sabalito" width="120"/>
  
  **Aplicación Web Progresiva (PWA) para Generación de Carnés de Transporte Estudiantil**
  
  [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-green?style=for-the-badge&logo=github)](https://francisco-campos-s.github.io/CTPGeneradorCarnets.githut.io/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-blueviolet?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
</div>

## 🌟 Características Principales

### � **Aplicación Web Progresiva (PWA)**
- 🔄 **Instalable** en dispositivos móviles y desktop
- 💾 **Funciona offline** después de la primera carga
- 🚀 **Service Worker** para caché inteligente
- 📲 **Banner de instalación** con opción de descartar
- ⚡ **Carga rápida** y experiencia nativa

### 🎨 **Interfaz Moderna 2025**
- 🌓 **Modo oscuro/claro** con alternancia y persistencia
- 📱 **100% Responsive** - Móviles, tablets y desktop
- ✨ **Efectos glassmorphism** y animaciones fluidas
- 🎯 **Indicadores de progreso** visuales paso a paso
- � **Sistema de notificaciones toast** con iconos

### 🔍 **Búsqueda y Filtros Avanzados**
- � **Búsqueda en tiempo real** con debouncing (300ms)
- 📍 **Filtros por ruta** con contadores dinámicos
- 📊 **Exportación de datos** filtrados a Excel
- � **Dashboard de estadísticas** con métricas completas
- ✅ **Validación de estado** por estudiante

### � **Funcionalidades Técnicas**
- 📁 **Drag & Drop** para archivos Excel
- � **Mapeo flexible** de columnas con reconocimiento inteligente
- 📊 **Vista previa interactiva** con paginación
- 🎯 **Generación de PDF** optimizada por rutas
- 💾 **Persistencia de configuración** en localStorage

## 🎯 Acceso Directo

### 🌐 **Usar Ahora (GitHub Pages)**
```
👉 https://francisco-campos-s.github.io/CTPGeneradorCarnets.githut.io/
```

### � **Instalar como App**
1. Visita el enlace en tu dispositivo
2. Aparecerá un banner de instalación
3. Toca "Instalar" para agregar a pantalla de inicio
4. ¡Úsala como una app nativa!

## 📊 **Funcionalidades de Generación**

### 🎫 **Carnés Profesionales**
- 📋 **Página de índice automática** con ubicación de rutas
- 🎫 **12 carnés por página** en formato optimizado para corte
- 🖼️ **Frente:** Logo + datos del estudiante + imagen de bus
- 🏛️ **Reverso:** Sello institucional para validación oficial
- 📑 **Organización por rutas** - Agrupación automática
- 🖨️ **Listo para impresión dúplex** profesional

## � Cómo Usar el Sistema

### 1️⃣ **Preparar Datos de Estudiantes**

#### Opción A: Usar Plantilla (Recomendado) 🎯
```
1. Clic en "📥 Descargar Plantilla Excel"
2. Abrir archivo descargado
3. Reemplazar datos de ejemplo con estudiantes reales
4. Guardar y usar en la aplicación
```

#### Opción B: Crear Archivo Manual 📝
```excel
Hoja: "Base de datos"
Columnas requeridas:
┌─────────────────┬─────────────┬──────────┐
│ A: Nombre       │ B: Cedula   │ C: Ruta  │
├─────────────────┼─────────────┼──────────┤
│ Juan Pérez Gómez│ 1-2345-6789 │ Ruta 1   │
│ María López R.  │ 9-8765-4321 │ Ruta 2   │
│ Ana González H. │ 4-5678-9123 │ Ruta 1   │
└─────────────────┴─────────────┴──────────┘
```

### 2️⃣ **En la Aplicación Web**
```
1. 🌐 Abrir el enlace de GitHub Pages
2. 🌙 Opcional: Activar modo oscuro
3. 📖 Revisar instrucciones de formato
4. 📁 Arrastrar archivo Excel o hacer clic para seleccionar
5. 👀 Revisar vista previa de datos (con scroll si hay muchos)
6. 🎯 Clic en "Generar PDF de Carnés"
7. 💾 Descargar PDF generado automáticamente
```

### 3️⃣ **Resultado Final**
- 📋 **Página de índice** con tabla de rutas y páginas
- 🎫 **Carnés organizados** por ruta para fácil distribución
- 🖨️ **Listo para imprimir** en impresora dúplex
- 📐 **Formato estándar** de 12 carnés por página

## 🛠️ Tecnologías Utilizadas

<div align="center">

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | HTML5 | Estructura semántica |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | CSS3 | Diseño responsive + animaciones |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | ES6+ | Lógica de aplicación |
| ![SheetJS](https://img.shields.io/badge/SheetJS-26A69A?style=flat&logo=javascript&logoColor=white) | v0.18.5 | Procesamiento Excel |
| ![jsPDF](https://img.shields.io/badge/jsPDF-red?style=flat&logo=adobe&logoColor=white) | v2.5.1 | Generación PDF |

</div>

## 📁 Estructura del Proyecto

```
CTPGeneradorCarnets.githut.io/
├── 📄 index.html              # Aplicación principal
├── 🎨 styles.css              # Estilos modernos + responsive
├── ⚡ script.js               # Lógica JavaScript
├── 🗂️ assets/                # Recursos del proyecto
│   ├── 🏫 logo.png           # Logo institucional
│   ├── 🚌 bus.png            # Imagen para carnés
│   └── 🏛️ sello.jpg          # Sello institucional
└── 📋 README.md               # Documentación completa
```

### ✨ **Estructura Optimizada**
- **Solo 7 archivos esenciales** para máximo rendimiento
- **Sin archivos temporales** o innecesarios
- **Organización clara** y fácil mantenimiento
- **Listo para producción** en GitHub Pages

## ⚡ Optimización y Rendimiento

### 🎯 **Repositorio Limpio**
- ✅ **7 archivos únicamente** - Sin bloat ni archivos temporales
- ✅ **Tamaño mínimo** - Descarga y clonado rápidos
- ✅ **Estructura clara** - Fácil navegación y mantenimiento
- ✅ **GitHub Pages optimizado** - Despliegue instantáneo

### 🚀 **Beneficios de la Optimización**
- 📦 **Repositorio ligero** - Clonado en segundos
- ⚡ **Carga rápida** - Menos transferencia de datos
- 🔧 **Mantenimiento simple** - Solo archivos necesarios
- 🎯 **Foco en funcionalidad** - Sin distracciones

## 🎨 Capturas de Pantalla

### 💻 **Desktop (Modo Claro)**
- 🏠 Interfaz principal con instrucciones
- 📊 Vista previa de datos con scroll
- 🎯 Sección de generación con opciones

### 📱 **Mobile (Modo Oscuro)**
- 📱 Interfaz adaptativa automática
- 👆 Touch-friendly para dispositivos móviles
- 🌙 Modo oscuro para reducir fatiga visual

### 📄 **PDF Generado**
- 📋 Página de índice con organización
- 🎫 Carnés con diseño profesional
- 🖨️ Formato optimizado para impresión

## 🌍 Despliegue y Configuración

### GitHub Pages (Automático) 🚀
```bash
1. Fork del repositorio
2. Settings > Pages
3. Source: Deploy from branch
4. Branch: main
5. Guardar
6. ✅ Disponible en: https://[usuario].github.io/CTPGeneradorCarnets.githut.io/
```

### Instalación Local 💻
```bash
# Clonar repositorio
git clone https://github.com/Francisco-Campos-S/CTPGeneradorCarnets.githut.io.git

# Navegar al directorio
cd CTPGeneradorCarnets.githut.io

# Abrir en navegador (elegir según tu sistema)
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

### 📦 **Archivos Incluidos**
- ✅ **index.html** - Aplicación web completa
- ✅ **styles.css** - Todos los estilos modernos
- ✅ **script.js** - Lógica completa de generación
- ✅ **assets/** - Imágenes institucionales (logo, bus, sello)
- ✅ **README.md** - Esta documentación

## 🎯 Casos de Uso

### 🏫 **Para Administradores del Colegio**
- ✅ Generación masiva de carnés al inicio del año escolar
- ✅ Actualización de carnés para estudiantes nuevos
- ✅ Reimpresión por pérdida o daño de carnés
- ✅ Organización automática por rutas de transporte

### 👨‍💼 **Para Personal Administrativo**
- ✅ Interfaz intuitiva sin necesidad de capacitación
- ✅ Validación automática de datos
- ✅ Vista previa antes de generar
- ✅ Descarga inmediata de archivos PDF

### 🚌 **Para Coordinadores de Transporte**
- ✅ Carnés organizados por ruta
- ✅ Índice para ubicación rápida
- ✅ Formato estándar para todos los carnés
- ✅ Fácil distribución a conductores

## � Configuración Avanzada

### Personalización de Assets 🎨
```javascript
// Cambiar logos en script.js
const logoPath = 'assets/logo.png';      // Logo principal
const busPath = 'assets/bus.png';        // Imagen del bus
const selloPath = 'assets/sello.jpg';    // Sello institucional
```

### Modificar Dimensiones de Carnés 📐
```javascript
// En script.js - función drawCardFrontExact()
const cardWidth = 92.5;   // mm
const cardHeight = 41.17; // mm
const cardsPerPage = 12;  // 3x4 grid
```

## 🆘 Solución de Problemas

### ❌ **Error: "No se encontró la hoja Base de datos"**
```
Solución:
✅ Verificar nombre exacto: "Base de datos"
✅ O usar plantilla descargable
✅ Verificar que no hay espacios extra
```

### ❌ **Error: "No se encontraron estudiantes válidos"**
```
Solución:
✅ Verificar columnas: Nombre, Cedula, Ruta
✅ No dejar filas completamente vacías
✅ Verificar que hay datos en las 3 columnas
```

### ❌ **PDF no se descarga**
```
Solución:
✅ Permitir descargas en el navegador
✅ Probar en modo incógnito
✅ Usar Chrome/Firefox actualizado
✅ Verificar espacio en disco
```

### 📱 **Problemas en móviles**
```
Solución:
✅ Usar navegador actualizado
✅ Verificar conexión a internet
✅ Probar en orientación vertical
✅ Cerrar otras apps para liberar memoria
```

## 🔒 Privacidad y Seguridad

- 🛡️ **Procesamiento local**: Todos los datos se procesan en el navegador
- 🚫 **Sin servidor**: No se envían datos a ningún servidor
- � **Sin almacenamiento**: Los archivos no se guardan permanentemente
- 🔐 **HTTPS**: Conexión segura vía GitHub Pages
- 👁️ **Sin tracking**: No se recopilan datos de usuarios

## 📈 Historial de Versiones

### v2.1.0 (2025) - Optimización Completa 🚀
- 🗂️ **Repositorio optimizado** - Solo archivos esenciales
- ⚡ **Rendimiento mejorado** - Carga más rápida
- 🔧 **Estructura simplificada** - 7 archivos únicamente
- 📦 **Tamaño reducido** - Sin archivos temporales
- 🎯 **Enfoque en funcionalidad** - Sin distracciones

### v2.0.0 (2025) - Renovación Completa 🆕
- ✨ Interfaz completamente rediseñada
- 🎨 Nuevo esquema de colores verde institucional
- 📱 100% responsive design
- 🌙 Modo oscuro integrado
- 📊 Vista previa con scroll para listas largas
- ⚡ Animaciones y efectos modernos
- 🔧 Optimización de rendimiento

## 📁 Estructura del Proyecto

```
CTPGeneradorCarnets.githut.io/
├── 📄 index.html          # Interfaz principal de la aplicación
├── 🎨 styles.css          # Estilos completos con modo oscuro
├── ⚡ script.js           # Lógica JavaScript con funcionalidades avanzadas
├── 📱 manifest.json       # Configuración PWA para instalación
├── 🔄 sw.js              # Service Worker para funcionalidad offline
├── 📚 README.md           # Documentación del proyecto
└── 📂 assets/
    ├── 🏫 logo.png        # Logo institucional CTP Sabalito
    ├── 🚌 bus.png         # Imagen de bus para carnés
    └── 🏛️ sello.jpg      # Sello institucional oficial
```

### 📊 **Archivos Principales:**
- **8 archivos esenciales** para funcionalidad completa
- **100% autocontenido** - No dependencias externas excepto CDN
- **Optimizado** para GitHub Pages deployment
- **PWA Ready** - Instalable y offline

### v1.0.0 (2024) - Versión Original
- 📄 Generación básica de PDF
- 📊 Procesamiento de Excel
- 🖨️ Formato de carnés estándar

## 📞 Soporte y Contacto

### 🏫 **Colegio Técnico Profesional Agropecuario de Sabalito**
- 📧 **Email:** administracion@ctpsabalito.edu.cr
- 📱 **Teléfono:** [Número institucional]
- 🌐 **Web:** [Sitio web del colegio]

### 💻 **Soporte Técnico**
- 🐛 **Issues:** [GitHub Issues](https://github.com/Francisco-Campos-S/CTPGeneradorCarnets.githut.io/issues)
- 📚 **Wiki:** [Documentación extendida](https://github.com/Francisco-Campos-S/CTPGeneradorCarnets.githut.io/wiki)
- 💡 **Sugerencias:** Crear issue con etiqueta "enhancement"

---

<div align="center">
  
  **© 2025 Colegio Técnico Profesional Agropecuario de Sabalito**
  
  *Generador de Carnés de Transporte v2.1 - Optimizado*
  
  [![Hecho con ❤️](https://img.shields.io/badge/Hecho%20con-❤️-red?style=for-the-badge)](https://github.com/Francisco-Campos-S)
  [![GitHub](https://img.shields.io/badge/GitHub-Francisco--Campos--S-blue?style=for-the-badge&logo=github)](https://github.com/Francisco-Campos-S)
  [![Optimizado](https://img.shields.io/badge/Optimizado-7%20archivos-green?style=for-the-badge)](https://github.com/Francisco-Campos-S/CTPGeneradorCarnets.githut.io)
  
</div>
