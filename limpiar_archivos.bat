@echo off
echo Limpiando archivos innecesarios...

REM Eliminar archivos temporales
if exist "cleanup.bat" del "cleanup.bat"
if exist "complete_merge.bat" del "complete_merge.bat" 
if exist "final_cleanup.bat" del "final_cleanup.bat"
if exist "update_pages.bat" del "update_pages.bat"
if exist "script_complete.js" del "script_complete.js"

echo Limpieza completada.
echo.
echo Archivos restantes necesarios:
dir /b
pause
