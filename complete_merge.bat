@echo off
cd /d "c:\Users\Personal\Desktop\UNED_GITHUB\CTPGeneradorCarnets.githut.io"

echo Correccion de iconos duplicados en notificaciones toast > .git\MERGE_MSG

git add .
git commit -m "Corrección de iconos duplicados en notificaciones toast - Eliminado emoji ✅ para evitar duplicación visual"

echo Merge completado exitosamente
pause
