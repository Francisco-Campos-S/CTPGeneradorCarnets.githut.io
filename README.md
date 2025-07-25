# 🎫 Generador de Carnés de Transporte Web

Aplicación web para generar carnés de transporte del Colegio Técnico Profesional Agropecuario de Sabalito.

## 🌐 Versión Web - GitHub Pages

Esta aplicación web permite:
- **📁 Cargar archivos Excel** con la base de datos de estudiantes
- **👁️ Vista previa** de los datos antes de generar
- **🎯 Generar PDF** con carnés organizados por ruta
- **📱 Interfaz responsive** que funciona en móviles y desktop
- **☁️ Funciona completamente en el navegador** (sin servidor)

## 📋 Características

### ✅ Funcionalidades Principales
- Carga de archivos Excel (.xlsx/.xls)
- Detección automática de la hoja "Base de datos"
- Validación de columnas requeridas (Nombre, Cédula, Ruta)
- Organización automática por rutas
- Generación de PDF con frente y reverso
- Descarga directa del PDF generado

### 🎨 Interfaz de Usuario
- Diseño moderno y profesional
- Drag & Drop para cargar archivos
- Barra de progreso durante la generación
- Vista previa de datos
- Responsive design
- Animaciones suaves

### 📊 Funciones del PDF
- **Página de índice** con distribución por rutas
- **Frente del carnét**: Logo, datos del estudiante, imagen del bus
- **Reverso del carnét**: Sello institucional
- **Organización por rutas**: No se mezclan estudiantes
- **12 carnés por página** (3x4 grid)
- **Listo para imprimir** en modo dúplex

## 🚀 Cómo Usar

### 1. Preparar el Archivo Excel
- Crear archivo Excel con hoja llamada "Base de datos"
- Incluir columnas: **Nombre**, **Cédula**, **Ruta**
- Asegurarse que no hay filas vacías

### 2. En la Aplicación Web
1. Abrir `index.html` en el navegador
2. Arrastrar el archivo Excel o hacer clic para seleccionar
3. Revisar la vista previa de datos
4. Configurar opciones de generación
5. Hacer clic en "Generar PDF de Carnés"
6. Descargar el archivo PDF generado

## 📁 Estructura del Proyecto

```
generador-de-carnet-web/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── assets/            # Recursos
│   ├── logo.png       # Logo del colegio
│   ├── bus.png        # Imagen del autobús
│   └── sello.jpg      # Sello institucional
└── README.md          # Documentación
```

## 🌍 Despliegue en GitHub Pages

### Opción 1: Subir Manualmente
1. Crear repositorio en GitHub
2. Subir todos los archivos de la carpeta `generador-de-carnet-web`
3. Ir a Settings > Pages
4. Seleccionar fuente: Deploy from a branch
5. Seleccionar branch: main
6. La aplicación estará disponible en: `https://[usuario].github.io/[repositorio]`

### Opción 2: GitHub Desktop
1. Abrir GitHub Desktop
2. File > New Repository
3. Arrastrar la carpeta del proyecto
4. Commit y Push
5. Activar GitHub Pages en el repositorio

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Diseño responsivo con gradientes y animaciones
- **JavaScript ES6**: Lógica de la aplicación
- **SheetJS (xlsx)**: Procesamiento de archivos Excel
- **jsPDF**: Generación de archivos PDF
- **Font Awesome**: Iconos (CDN)

## 📱 Compatibilidad

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móviles (iOS/Android)

## 📝 Requisitos del Archivo Excel

### Estructura Requerida:
- **Hoja**: Debe llamarse "Base de datos" o contener "base" y "datos"
- **Columnas obligatorias**:
  - `Nombre` o similar (nombre del estudiante)
  - `Cedula` o similar (número de identificación)
  - `Ruta` o similar (código de ruta de transporte)

### Ejemplo de Datos:
| Nombre | Cedula | Ruta |
|--------|--------|------|
| Juan Pérez | 123456789 | 6512 |
| María González | 987654321 | 6513 |

## 🆘 Solución de Problemas

### Error: "No se encontró la hoja Base de datos"
- Verificar que la hoja se llame exactamente "Base de datos"
- O que contenga las palabras "base" y "datos"

### Error: "No se encontraron estudiantes válidos"
- Verificar que las columnas tengan los nombres correctos
- Asegurarse que no hay filas completamente vacías
- Verificar que hay datos en las tres columnas requeridas

### PDF no se descarga
- Verificar que el navegador permite descargas
- Intentar en modo incógnito
- Probar con otro navegador

## 📞 Soporte

Para soporte técnico o preguntas sobre el uso de la aplicación, contactar al administrador del sistema del Colegio Técnico Profesional Agropecuario de Sabalito.

---

**© 2025 Colegio Técnico Profesional Agropecuario de Sabalito**  
*Generador de Carnés de Transporte v1.0*
