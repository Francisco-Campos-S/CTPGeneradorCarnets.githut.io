@echo off
echo ==========================================
echo   LIMPIEZA FINAL - SOLO ARCHIVOS ESENCIALES
echo ==========================================
echo.

cd /d "c:\Users\Personal\Desktop\UNED_GITHUB\CTPGeneradorCarnets.githut.io"

echo Eliminando archivos temporales y scripts...

if exist "complete_merge.bat" (
    del "complete_merge.bat"
    echo ✓ complete_merge.bat eliminado
)

if exist "cleanup.bat" (
    del "cleanup.bat"
    echo ✓ cleanup.bat eliminado
)

if exist "update_pages.bat" (
    del "update_pages.bat"
    echo ✓ update_pages.bat eliminado
)
  
echo.
echo ==========================================
echo   📁 ESTRUCTURA FINAL DEL PROYECTO
echo ==========================================
echo.
echo 🌐 APLICACIÓN WEB ESENCIAL:
echo   ├── index.html         # Página principal
echo   ├── script.js          # Lógica JavaScript
echo   └── styles.css         # Estilos CSS
echo.
echo 🖼️ ASSETS NECESARIOS:
echo   └── assets/
echo       ├── logo.png       # Logo del colegio
echo       ├── bus.png        # Imagen del bus
echo       └── sello.jpg      # Sello institucional
echo.
echo 📖 DOCUMENTACIÓN:
echo   └── README.md          # Guía del proyecto
echo.
echo ==========================================
echo   ✅ PROYECTO OPTIMIZADO
echo ==========================================
echo.
echo ✓ Solo 7 archivos esenciales
echo ✓ Sin archivos temporales
echo ✓ Estructura limpia y profesional
echo ✓ Listo para GitHub Pages
echo.

:: Auto-eliminar este script también
echo Eliminando este script de limpieza...
(goto) 2>nul & del "%~f0"
