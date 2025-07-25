# 🚀 Instrucciones para Subir a GitHub Pages

## Pasos para Subir la Aplicación Web a GitHub Pages

### 1️⃣ Crear Repositorio en GitHub

1. Ir a [GitHub.com](https://github.com)
2. Hacer clic en el botón verde "New" o "Nuevo repositorio"
3. Nombrar el repositorio: `generador-carnes-ctp-sabalito`
4. Marcar como **Público** (Public)
5. ✅ Marcar "Add a README file"
6. Hacer clic en "Create repository"

### 2️⃣ Subir los Archivos

**Opción A: Drag & Drop (Fácil)**
1. En el repositorio recién creado, hacer clic en "uploading an existing file"
2. Arrastrar TODOS los archivos de la carpeta `generador-de-carnet-web`
3. En el cuadro de mensaje escribir: "Subir aplicación web generador de carnés"
4. Hacer clic en "Commit changes"

**Opción B: GitHub Desktop**
1. Descargar [GitHub Desktop](https://desktop.github.com/)
2. Clonar el repositorio creado
3. Copiar todos los archivos a la carpeta local
4. Commit y Push desde GitHub Desktop

### 3️⃣ Activar GitHub Pages

1. En el repositorio, ir a **Settings** (Configuración)
2. Scroll down hasta encontrar **Pages** en el menú lateral
3. En "Source" seleccionar: **Deploy from a branch**
4. En "Branch" seleccionar: **main**
5. Dejar "Folder" como **/ (root)**
6. Hacer clic en **Save**

### 4️⃣ Acceder a la Aplicación

**La aplicación estará disponible en:**
```
https://[TU-USUARIO].github.io/generador-carnes-ctp-sabalito
```

⏰ **Nota**: Puede tomar 5-10 minutos en estar disponible la primera vez.

## 📁 Archivos que se Deben Subir

✅ **Archivos Principales:**
- `index.html` - Página principal
- `styles.css` - Estilos
- `script.js` - Funcionalidad JavaScript
- `README.md` - Documentación
- `_config.yml` - Configuración GitHub Pages

✅ **Carpeta Assets:**
- `assets/logo.png` - Logo del colegio
- `assets/bus.png` - Imagen del autobús  
- `assets/sello.jpg` - Sello institucional

✅ **Archivos de Ejemplo:**
- `ejemplo_estudiantes.xlsx` - Archivo Excel de prueba
- `crear_ejemplo.py` - Script para crear ejemplos (opcional)

## 🔧 Verificar que Funciona

1. Abrir la URL de GitHub Pages
2. Probar cargar el archivo `ejemplo_estudiantes.xlsx`
3. Verificar que muestra los 10 estudiantes de ejemplo
4. Generar un PDF de prueba
5. ✅ Si todo funciona, la aplicación está lista

## 🌍 Compartir la Aplicación

Una vez funcionando, puedes compartir la URL con:
- ✅ Personal administrativo del colegio
- ✅ Encargados de transporte
- ✅ Cualquier persona que necesite generar carnés

## 🆘 Solución de Problemas

### Error 404 - Página no encontrada
- Verificar que `index.html` está en la raíz del repositorio
- Esperar 10 minutos después de activar Pages
- Verificar que el repositorio es público

### Archivos de imágenes no cargan
- Verificar que las imágenes están en `assets/`
- Revisar que los nombres coinciden exactamente
- Verificar rutas en `index.html`

### JavaScript no funciona
- Abrir DevTools (F12) y revisar errores en Console
- Verificar que las librerías CDN están cargando
- Probar en modo incógnito

## 📞 URLs Importantes

- **Repositorio**: `https://github.com/[TU-USUARIO]/generador-carnes-ctp-sabalito`
- **Aplicación Web**: `https://[TU-USUARIO].github.io/generador-carnes-ctp-sabalito`
- **Configuración Pages**: `https://github.com/[TU-USUARIO]/generador-carnes-ctp-sabalito/settings/pages`

---

**¡La aplicación web está lista para usar en GitHub Pages! 🎉**
