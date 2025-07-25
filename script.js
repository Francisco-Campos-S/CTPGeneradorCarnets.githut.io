// Variables globales
let studentsData = [];
let routesData = {};
let logoData = null;
let busData = null;
let selloData = null;

// Cargar imágenes al inicializar
function loadImages() {
    // Cargar logo
    const logoImg = new Image();
    logoImg.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);
        logoData = canvas.toDataURL('image/png');
    };
    logoImg.src = 'assets/logo.png';
    
    // Cargar bus
    const busImg = new Image();
    busImg.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);
        busData = canvas.toDataURL('image/png');
    };
    busImg.src = 'assets/bus.png';
    
    // Cargar sello
    const selloImg = new Image();
    selloImg.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);
        selloData = canvas.toDataURL('image/jpeg');
    };
    selloImg.src = 'assets/sello.jpg';
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    loadSavedTheme();
    initializeApp();
});

function initializeApp() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');

    // Eventos de carga de archivo
    fileInput.addEventListener('change', handleFileSelect);
    
    // Eventos de drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
}

// Manejo de eventos de archivo
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processExcelFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    document.getElementById('uploadArea').classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    document.getElementById('uploadArea').classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    document.getElementById('uploadArea').classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processExcelFile(files[0]);
    }
}

// Procesamiento del archivo Excel
function processExcelFile(file) {
    if (!file.name.match(/\.(xlsx|xls)$/)) {
        showError('Por favor seleccione un archivo Excel válido (.xlsx o .xls)');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Buscar la hoja "Base de datos"
            let sheetName = null;
            for (let name of workbook.SheetNames) {
                if (name.toLowerCase().includes('base') && name.toLowerCase().includes('datos')) {
                    sheetName = name;
                    break;
                }
            }
            
            if (!sheetName) {
                showError('No se encontró la hoja "Base de datos" en el archivo Excel');
                return;
            }

            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            if (jsonData.length === 0) {
                showError('La hoja "Base de datos" está vacía');
                return;
            }

            // Validar columnas requeridas con mapeo flexible
            const requiredColumns = ['Nombre', 'Cedula', 'Ruta'];
            const firstRow = jsonData[0];
            const availableColumns = Object.keys(firstRow);
            
            // Función para normalizar texto (quitar acentos y convertir a minúsculas)
            function normalizeText(text) {
                return text.toLowerCase()
                    .replace(/á/g, 'a')
                    .replace(/é/g, 'e')
                    .replace(/í/g, 'i')
                    .replace(/ó/g, 'o')
                    .replace(/ú/g, 'u')
                    .replace(/ñ/g, 'n')
                    .replace(/[^a-z0-9]/g, '');
            }
            
            let mappedColumns = {};
            for (let required of requiredColumns) {
                let found = false;
                const normalizedRequired = normalizeText(required);
                
                for (let available of availableColumns) {
                    const normalizedAvailable = normalizeText(available);
                    if (normalizedAvailable.includes(normalizedRequired)) {
                        mappedColumns[required] = available;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    showError(`No se encontró la columna "${required}" en el archivo. Columnas disponibles: ${availableColumns.join(', ')}`);
                    return;
                }
            }

            // Procesar datos
            studentsData = jsonData.map(row => ({
                nombre: String(row[mappedColumns['Nombre']] || '').trim(),
                cedula: String(row[mappedColumns['Cedula']] || '').trim(),
                ruta: String(row[mappedColumns['Ruta']] || '').trim()
            })).filter(student => student.nombre && student.cedula && student.ruta);

            if (studentsData.length === 0) {
                showError('No se encontraron estudiantes válidos en el archivo');
                return;
            }

            // Agrupar por rutas
            routesData = {};
            studentsData.forEach(student => {
                if (!routesData[student.ruta]) {
                    routesData[student.ruta] = [];
                }
                routesData[student.ruta].push(student);
            });

            // Mostrar información del archivo
            showFileInfo(file.name, studentsData.length, Object.keys(routesData).length);
            showPreview();
            showGenerateSection();

        } catch (error) {
            console.error('Error procesando archivo:', error);
            showError('Error al procesar el archivo Excel. Verifique que sea un archivo válido.');
        }
    };

    reader.readAsArrayBuffer(file);
}

// Mostrar información del archivo
function showFileInfo(fileName, studentCount, routeCount) {
    document.getElementById('fileName').textContent = fileName;
    document.getElementById('studentCount').textContent = studentCount;
    document.getElementById('routeCount').textContent = routeCount;
    document.getElementById('fileInfo').style.display = 'block';
}

// Mostrar vista previa
function showPreview() {
    const previewSection = document.getElementById('previewSection');
    const dataSummary = document.getElementById('dataSummary');
    const previewTableBody = document.getElementById('previewTableBody');

    // Crear resumen
    dataSummary.innerHTML = `
        <div class="summary-item">
            <div class="number">${studentsData.length}</div>
            <div class="label">Total Estudiantes</div>
        </div>
        <div class="summary-item">
            <div class="number">${Object.keys(routesData).length}</div>
            <div class="label">Rutas Diferentes</div>
        </div>
        <div class="summary-item">
            <div class="number">${Math.ceil(studentsData.length / 12)}</div>
            <div class="label">Páginas Estimadas</div>
        </div>
    `;

    // Mostrar tabla de vista previa (primeros 10 registros)
    previewTableBody.innerHTML = '';
    const previewData = studentsData.slice(0, 10);
    
    previewData.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.nombre}</td>
            <td>${student.cedula}</td>
            <td>${student.ruta}</td>
        `;
        previewTableBody.appendChild(row);
    });

    if (studentsData.length > 10) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="3" style="text-align: center; font-style: italic; color: #666;">
                ... y ${studentsData.length - 10} estudiantes más
            </td>
        `;
        previewTableBody.appendChild(row);
    }

    previewSection.style.display = 'block';
    previewSection.classList.add('fade-in');
}

// Mostrar sección de generación
function showGenerateSection() {
    const generateSection = document.getElementById('generateSection');
    generateSection.style.display = 'block';
    generateSection.classList.add('fade-in');
}

// Generar PDF
function generatePDF() {
    const generateBtn = document.getElementById('generateBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // Deshabilitar botón y mostrar progreso
    generateBtn.disabled = true;
    progressBar.style.display = 'block';
    progressFill.style.width = '10%';
    progressText.textContent = 'Iniciando generación...';

    // Simular progreso mientras se genera
    setTimeout(() => {
        progressFill.style.width = '30%';
        progressText.textContent = 'Procesando datos...';
    }, 500);

    setTimeout(() => {
        progressFill.style.width = '60%';
        progressText.textContent = 'Creando carnés...';
    }, 1000);

    setTimeout(() => {
        progressFill.style.width = '90%';
        progressText.textContent = 'Finalizando PDF...';
    }, 1500);

    // Generar PDF real
    setTimeout(() => {
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Configuración para carnés más anchos y menos altos (12 por página)
            const pageWidth = 210;  // A4 width
            const pageHeight = 297; // A4 height
            const cardWidth = (pageWidth - 25) / 2;  // (210-25)/2 = 92.5mm - más ancho
            const cardHeight = (pageHeight - 50) / 6; // (297-50)/6 = 41.17mm - menos alto
            const marginX = 12.5;
            const marginY = 20; // Margen superior
            const spaceBetween = 3; // Espacio entre carnés
            
            // Página de índice PRIMERO
            createIndexPage(pdf, pageWidth, pageHeight);
            
            // Generar carnés (siempre organizados por ruta y con sello)
            const organizeByRoute = true;  // Siempre activado
            const includeSeal = true;      // Siempre activado
            
            let allStudents = [];
            if (organizeByRoute) {
                // Ordenar por rutas EXACTO como Python
                Object.keys(routesData).sort().forEach(route => {
                    allStudents = allStudents.concat(routesData[route]);
                });
            } else {
                allStudents = studentsData;
            }
            
            // Generar carnés con lógica EXACTA de Python
            generateCardsExactAsPython(pdf, allStudents, cardWidth, cardHeight, marginX, marginY, spaceBetween, pageWidth, pageHeight, includeSeal);

            // Finalizar y descargar
            const fileName = `Carnets_Transporte_${new Date().getFullYear()}.pdf`;
            pdf.save(fileName);

            // Mostrar resultado exitoso
            showResult(fileName, studentsData.length, Object.keys(routesData).length);
            
            progressFill.style.width = '100%';
            progressText.textContent = '¡Completado!';
            
            setTimeout(() => {
                progressBar.style.display = 'none';
                generateBtn.disabled = false;
            }, 1000);

        } catch (error) {
            console.error('Error generando PDF:', error);
            showError('Error al generar el PDF. Intente nuevamente.');
            generateBtn.disabled = false;
            progressBar.style.display = 'none';
        }
    }, 2000);
}

// Crear página de índice
function createIndexPage(pdf, pageWidth, pageHeight) {
    // Título principal
    pdf.setFontSize(16);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('ÍNDICE DE CARNÉS POR RUTA', pageWidth / 2, 50, { align: 'center' });
    
    // Subtítulo
    pdf.setFontSize(12);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('Distribución de carnés por ruta:', 50, 80);
    
    // Lista de rutas
    let yPos = 100;
    pdf.setFontSize(11);
    pdf.setFont('Helvetica', 'normal');
    
    const sortedRoutes = Object.keys(routesData).sort();
    sortedRoutes.forEach(route => {
        const count = routesData[route].length;
        pdf.text(`Ruta ${route}:`, 60, yPos);
        pdf.text(`${count} estudiantes`, 150, yPos);
        yPos += 15;
        
        // Si hay muchas rutas, usar dos columnas
        if (yPos > 250) {
            yPos = 100;
            // Segunda columna (si es necesario)
        }
    });
    
    // Total al final
    yPos += 20;
    pdf.setFont('Helvetica', 'bold');
    pdf.text(`TOTAL: ${studentsData.length} estudiantes`, 60, yPos);
    
    // Información adicional
    yPos += 30;
    pdf.setFontSize(10);
    pdf.setFont('Helvetica', 'normal');
    pdf.text('Instrucciones:', 50, yPos);
    yPos += 15;
    pdf.text('• Configure su impresora en modo "doble cara"', 60, yPos);
    yPos += 12;
    pdf.text('• Imprima todas las páginas en orden', 60, yPos);
    yPos += 12;
    pdf.text('• Corte por las líneas de los carnés', 60, yPos);
}

// Función para generar carnés con lógica EXACTA de Python
function generateCardsExactAsPython(pdf, students, cardWidth, cardHeight, marginX, marginY, spaceBetween, pageWidth, pageHeight, includeSeal) {
    const cardsPerPage = 12; // 2x6 grid (más anchos, menos altos)
    const cardsPerRow = 2;
    const cardsPerCol = 6;
    
    // Proceso en lotes EXACTO como Python
    for (let startIndex = 0; startIndex < students.length; startIndex += cardsPerPage) {
        const batch = students.slice(startIndex, startIndex + cardsPerPage);
        
        // PÁGINA FRONTAL (nueva página para cada lote)
        pdf.addPage();
        
        for (let i = 0; i < batch.length; i++) {
            const student = batch[i];
            const col = i % cardsPerRow;
            const row = Math.floor(i / cardsPerRow);
            
            // Posición con espaciado correcto
            const x = marginX + col * (cardWidth + spaceBetween);
            const y = marginY + row * (cardHeight + spaceBetween);
            
            drawCardFrontExact(pdf, student, x, y, cardWidth, cardHeight);
        }
        
        // PÁGINA TRASERA
        pdf.addPage();
        
        for (let i = 0; i < batch.length; i++) {
            const student = batch[i];
            // Para el reverso, invertir orden horizontal para impresión duplex
            const col = (cardsPerRow - 1) - (i % cardsPerRow);
            const row = Math.floor(i / cardsPerRow);
            
            // Posición con espaciado correcto
            const x = marginX + col * (cardWidth + spaceBetween);
            const y = marginY + row * (cardHeight + spaceBetween);
            
            drawCardBackExact(pdf, student, x, y, cardWidth, cardHeight, includeSeal);
        }
    }
}

// Función para dibujar frente del carné EXACTA como Python
function drawCardFrontExact(pdf, student, x, y, cardWidth, cardHeight) {
    // Marco del carné (línea más delgada)
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(x, y, cardWidth, cardHeight);
    
    // Logo del colegio (esquina superior izquierda, un poco más grande)
    if (logoData) {
        const logoSize = 13; // Ligeramente más grande que antes (era 12)
        pdf.addImage(logoData, 'PNG', x + 2, y + 2, logoSize, logoSize);
    }
    
    // Títulos del colegio centrados (solo el texto del colegio)
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(10.5); // Aumentado de 9.5 a 10.5 para hacer el nombre más grande
    pdf.setTextColor(0, 0, 0);
    const titleText1 = 'Colegio Técnico Profesional';
    const titleText2 = 'Agropecuario de Sabalito';
    
    // Centrar el texto del colegio
    const titleText1Width = pdf.getTextWidth(titleText1);
    const titleText2Width = pdf.getTextWidth(titleText2);
    const centerX = x + cardWidth / 2;
    
    pdf.text(titleText1, centerX - titleText1Width / 2, y + 6);
    pdf.text(titleText2, centerX - titleText2Width / 2, y + 13);
    
    // Datos del estudiante (un poco más grandes y bien espaciados)
    const dataX = x + 3;
    
    // Nombre del estudiante
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(9); // Aumentado de 8.5 a 9 para etiquetas más grandes
    pdf.text('Nombre:', dataX, y + 22); // Posición original optimizada
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(9); // Aumentado de 8.5 a 9 para datos más grandes
    // Limpiar nombre del estudiante de cualquier texto extra
    let studentName = (student.nombre || '').toString().trim();
    // Remover texto entre paréntesis y caracteres especiales
    studentName = studentName.replace(/\([^)]*\)/g, '').trim();
    studentName = studentName.replace(/[^\w\sÁÉÍÓÚáéíóúÑñ]/g, ' ').trim();
    // Limpiar espacios múltiples
    studentName = studentName.replace(/\s+/g, ' ');
    
    // Dividir nombre en líneas si es necesario
    const maxWidth = cardWidth - 6;
    const words = studentName.split(' ');
    let lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        if (pdf.getTextWidth(testLine) <= maxWidth) {
            currentLine = testLine;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    });
    if (currentLine) lines.push(currentLine);
    
    // Mostrar nombre (máximo 2 líneas) con espaciado original
    lines.slice(0, 2).forEach((line, index) => {
        pdf.text(line, dataX, y + 27 + (index * 4)); // Posición original
    });
    
    // Cédula en línea compacta
    const cedulaY = lines.length > 1 ? y + 36 : y + 32; // Posición original
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(9); // Aumentado de 8.5 a 9
    pdf.text('Cédula:', dataX, cedulaY);
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(9); // Aumentado de 8.5 a 9
    // Limpiar cédula de cualquier texto extra
    let cedula = (student.cedula || '').toString().trim();
    cedula = cedula.replace(/[^\d\-]/g, ''); // Solo números y guiones
    pdf.text(cedula, dataX + 16, cedulaY); // En la misma línea
    
    // Ruta en línea compacta
    const rutaY = cedulaY + 5; // Espaciado original
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(9); // Aumentado de 8.5 a 9
    pdf.text('Ruta:', dataX, rutaY);
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(9); // Aumentado de 8.5 a 9
    // Limpiar ruta de cualquier texto extra
    let route = (student.ruta || '').toString().trim();
    route = route.replace(/[^\w\sÁÉÍÓÚáéíóúÑñ\d]/g, ' ').trim();
    route = route.replace(/\s+/g, ' ');
    pdf.text(route, dataX + 12, rutaY); // En la misma línea
    
    // Imagen del bus (posición original)
    if (busData) {
        const busWidth = 18;
        const busHeight = 12;
        pdf.addImage(busData, 'PNG', x + cardWidth - busWidth - 2, y + cardHeight - busHeight - 3, busWidth, busHeight);
    }
    
    // Texto inferior centrado y un poco más grande
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(9); // Aumentado de 8.5 a 9 para mayor visibilidad
    const bottomText = 'Carné de Transporte 2025';
    const bottomWidth = pdf.getTextWidth(bottomText);
    pdf.text(bottomText, x + (cardWidth - bottomWidth) / 2, y + cardHeight - 1);
}

// Función para dibujar reverso del carné EXACTA como Python (solo sello)
function drawCardBackExact(pdf, student, x, y, cardWidth, cardHeight, includeSeal) {
    // Marco del carné (línea más delgada)
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(x, y, cardWidth, cardHeight);
    
    // Sello que cubra todo el carné (como en Python)
    if (includeSeal && selloData) {
        const selloMargin = 3; // Margen pequeño como en Python
        const selloWidth = cardWidth - 2 * selloMargin;
        const selloHeight = cardHeight - 2 * selloMargin;
        pdf.addImage(selloData, 'JPG', x + selloMargin, y + selloMargin, selloWidth, selloHeight);
    }
}

// Mostrar resultado
function showResult(fileName, studentCount, routeCount) {
    const resultSection = document.getElementById('resultSection');
    const resultInfo = document.getElementById('resultInfo');
    
    resultInfo.innerHTML = `
        <h4>📊 Resumen de Generación</h4>
        <ul>
            <li><strong>Archivo generado:</strong> ${fileName}</li>
            <li><strong>Total de estudiantes:</strong> ${studentCount}</li>
            <li><strong>Rutas procesadas:</strong> ${routeCount}</li>
            <li><strong>Carnés con frente y reverso</strong></li>
            <li><strong>Organizados por ruta</strong></li>
        </ul>
        <p><strong>💡 Tip:</strong> Configure su impresora en modo "doble cara" para imprimir correctamente.</p>
    `;
    
    resultSection.style.display = 'block';
    resultSection.classList.add('fade-in');
    
    // Scroll hacia el resultado
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Resetear aplicación
function resetApp() {
    // Limpiar datos
    studentsData = [];
    routesData = {};
    
    // Resetear formulario
    document.getElementById('fileInput').value = '';
    
    // Ocultar secciones
    document.getElementById('fileInfo').style.display = 'none';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('generateSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'none';
    
    // Scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar error
function showError(message) {
    // Remover errores previos
    const existingErrors = document.querySelectorAll('.error');
    existingErrors.forEach(error => error.remove());
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    // Insertar después del área de carga
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.parentNode.insertBefore(errorDiv, uploadArea.nextSibling);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Modo Oscuro
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Cargar tema guardado
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = document.querySelector('.theme-icon');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Descargar plantilla Excel
function downloadTemplate() {
    // Crear workbook
    const wb = XLSX.utils.book_new();
    
    // Datos de ejemplo para la plantilla
    const templateData = [
        ['Nombre', 'Cedula', 'Ruta'],
        ['Juan Pérez González', '1-2345-6789', 'Ruta 1'],
        ['María López Rodríguez', '2-3456-7890', 'Ruta 2'],
        ['Carlos Jiménez Mora', '1-4567-8901', 'Ruta 1'],
        ['Ana Morales Castro', '2-5678-9012', 'Ruta 3'],
        ['Luis Vargas Solano', '1-6789-0123', 'Ruta 2']
    ];
    
    // Crear hoja de trabajo
    const ws = XLSX.utils.aoa_to_sheet(templateData);
    
    // Configurar ancho de columnas
    ws['!cols'] = [
        { width: 25 }, // Nombre
        { width: 15 }, // Cedula
        { width: 12 }  // Ruta
    ];
    
    // Agregar hoja al workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Base de datos');
    
    // Descargar archivo
    XLSX.writeFile(wb, 'Plantilla_Estudiantes_CTP.xlsx');
    
    // Mostrar mensaje de éxito
    showSuccess('Plantilla descargada exitosamente. Use este formato para cargar sus estudiantes.');
}

function showSuccess(message) {
    // Remover errores existentes
    const existingErrors = document.querySelectorAll('.error, .success');
    existingErrors.forEach(error => error.remove());
    
    // Crear nuevo mensaje de éxito
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    
    // Insertar después del área de carga
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.parentNode.insertBefore(successDiv, uploadArea.nextSibling);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}
