@echo off
echo Limpiando archivos innecesarios...

cd /d "c:\Users\Personal\Desktop\UNED_GITHUB\CTPGeneradorCarnets.githut.io"

if exist "complete_merge.bat" (
    del "complete_merge.bat"
    echo ✓ complete_merge.bat eliminado
)

echo.
echo ====================================
echo 📁 ARCHIVOS ESENCIALES RESTANTES:
echo ====================================
echo.
echo 🌐 Web Application:
echo   ├── index.html
echo   ├── script.js  
echo   └── styles.css
echo.
echo 📚 Documentación:
echo   └── README.md
echo.
echo 🖼️ Assets necesarios:
echo   ├── assets/logo.png
echo   ├── assets/bus.png
echo   └── assets/sello.jpg
echo.
echo ✅ Solo archivos esenciales mantenidos
echo ✅ Aplicación optimizada y lista para uso
echo.
pause
