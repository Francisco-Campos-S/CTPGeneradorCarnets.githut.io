// Variables globales
let studentsData = [];
let routesData = {};
let logoData = null;
let busData = null;
let selloData = null;
let filteredData = [];
let deferredPrompt = null;

// Sistema de notificaciones Toast
class ToastManager {
    constructor() {
        this.container = document.getElementById('toastContainer');
    }

    show(message, type = 'info', title = '', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">×</button>
        `;

        this.container.appendChild(toast);

        // Mostrar toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto-remover
        setTimeout(() => this.remove(toast), duration);

        // Botón cerrar
        toast.querySelector('.toast-close').onclick = () => this.remove(toast);
    }

    remove(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// Instancia global del Toast Manager
const toast = new ToastManager();

// Progress Manager para indicador de pasos
class ProgressManager {
    constructor() {
        this.currentStep = 1;
        this.steps = document.querySelectorAll('.step');
    }

    setStep(stepNumber) {
        this.currentStep = stepNumber;
        this.updateUI();
    }

    completeStep(stepNumber) {
        this.steps.forEach((step, index) => {
            const num = index + 1;
            step.classList.remove('active', 'completed');
            
            if (num < stepNumber) {
                step.classList.add('completed');
            } else if (num === stepNumber) {
                step.classList.add('active');
            }
        });
    }

    updateUI() {
        this.completeStep(this.currentStep);
    }
}

const progressManager = new ProgressManager();

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
    initializePWA();
    initializeSearch();
    
    // Mostrar toast de bienvenida
    setTimeout(() => {
        toast.show('¡Bienvenido al generador de carnés!', 'success', 'Sistema listo');
    }, 1000);
});

// Inicializar PWA
function initializePWA() {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(error => {
                console.log('SW error:', error);
            });
    }

    // Detectar prompt de instalación
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallBanner();
    });

    // Botones de instalación
    document.getElementById('installBtn')?.addEventListener('click', installPWA);
    document.getElementById('dismissBtn')?.addEventListener('click', dismissInstallBanner);
}

function showInstallBanner() {
    const banner = document.getElementById('pwaInstallBanner');
    if (banner && !localStorage.getItem('pwa-dismissed')) {
        banner.style.display = 'block';
        setTimeout(() => banner.classList.add('show'), 100);
    }
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((result) => {
            if (result.outcome === 'accepted') {
                toast.show('¡Aplicación instalada correctamente!', 'success');
            }
            deferredPrompt = null;
            dismissInstallBanner();
        });
    }
}

function dismissInstallBanner() {
    const banner = document.getElementById('pwaInstallBanner');
    banner.classList.remove('show');
    setTimeout(() => banner.style.display = 'none', 300);
    localStorage.setItem('pwa-dismissed', 'true');
}

// Inicializar búsqueda y filtros
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const routeFilter = document.getElementById('routeFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterData, 300));
    }
    
    if (routeFilter) {
        routeFilter.addEventListener('change', filterData);
    }
}

// Debounce function para optimizar búsqueda
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Mostrar vista previa mejorada
function showPreview() {
    const previewSection = document.getElementById('previewSection');
    const dataSummary = document.getElementById('dataSummary');
    const previewTableBody = document.getElementById('previewTableBody');
    const routeFilter = document.getElementById('routeFilter');

    // Actualizar progreso
    progressManager.setStep(2);

    // Crear dashboard de estadísticas mejorado
    let totalPages = 1; // Página de índice
    const routeStats = {};
    
    Object.keys(routesData).forEach(route => {
        const studentsInRoute = routesData[route].length;
        const batchesInRoute = Math.ceil(studentsInRoute / 12);
        const pagesInRoute = batchesInRoute * 2;
        totalPages += pagesInRoute;
        
        routeStats[route] = {
            students: studentsInRoute,
            pages: pagesInRoute
        };
    });
    
    dataSummary.innerHTML = `
        <div class="stat-card">
            <span class="stat-icon">👥</span>
            <span class="stat-number">${studentsData.length}</span>
            <span class="stat-label">Total Estudiantes</span>
        </div>
        <div class="stat-card">
            <span class="stat-icon">🚌</span>
            <span class="stat-number">${Object.keys(routesData).length}</span>
            <span class="stat-label">Rutas Diferentes</span>
        </div>
        <div class="stat-card">
            <span class="stat-icon">📄</span>
            <span class="stat-number">${totalPages}</span>
            <span class="stat-label">Páginas Totales</span>
        </div>
        <div class="stat-card">
            <span class="stat-icon">🎫</span>
            <span class="stat-number">${studentsData.length}</span>
            <span class="stat-label">Carnés Totales</span>
        </div>
    `;

    // Llenar filtro de rutas
    routeFilter.innerHTML = '<option value="">📍 Todas las rutas</option>';
    Object.keys(routesData).sort().forEach(route => {
        const option = document.createElement('option');
        option.value = route;
        option.textContent = `${route} (${routesData[route].length} estudiantes)`;
        routeFilter.appendChild(option);
    });

    // Inicializar datos filtrados
    filteredData = [...studentsData];
    updateTable();

    previewSection.style.display = 'block';
    previewSection.classList.add('fade-in');
    
    toast.show(`${studentsData.length} estudiantes cargados correctamente`, 'success', 'Vista previa lista');
}

// Función para filtrar datos
function filterData() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const selectedRoute = document.getElementById('routeFilter')?.value || '';
    
    filteredData = studentsData.filter(student => {
        const matchesSearch = !searchTerm || 
            student.nombre.toLowerCase().includes(searchTerm) ||
            student.cedula.toLowerCase().includes(searchTerm);
            
        const matchesRoute = !selectedRoute || student.ruta === selectedRoute;
        
        return matchesSearch && matchesRoute;
    });
    
    updateTable();
}

// Actualizar tabla con datos filtrados
function updateTable() {
    const previewTableBody = document.getElementById('previewTableBody');
    previewTableBody.innerHTML = '';
    
    if (filteredData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 40px; color: #6b7280;">
                <div>🔍</div>
                <div style="margin-top: 10px;">No se encontraron estudiantes con esos criterios</div>
            </td>
        `;
        previewTableBody.appendChild(row);
        return;
    }
    
    filteredData.forEach((student, index) => {
        const globalIndex = studentsData.indexOf(student) + 1;
        const row = document.createElement('tr');
        
        // Determinar estado del estudiante
        const status = getStudentStatus(student);
        
        row.innerHTML = `
            <td>${globalIndex}</td>
            <td>
                <div class="student-name">${student.nombre}</div>
            </td>
            <td>
                <code class="cedula-code">${student.cedula}</code>
            </td>
            <td>
                <span class="route-badge">${student.ruta}</span>
            </td>
            <td>
                <span class="status-badge ${status.class}">${status.text}</span>
            </td>
        `;
        previewTableBody.appendChild(row);
    });

    // Agregar información de resumen
    const infoRow = document.createElement('tr');
    infoRow.innerHTML = `
        <td colspan="5" style="text-align: center; font-style: italic; color: #666; background-color: #f8f9fa; padding: 15px;">
            <strong>Mostrando ${filteredData.length} de ${studentsData.length} estudiantes</strong>
            ${filteredData.length !== studentsData.length ? ' • Use los filtros para refinar la búsqueda' : ''}
        </td>
    `;
    previewTableBody.appendChild(infoRow);
}

// Obtener estado del estudiante
function getStudentStatus(student) {
    if (!student.nombre || !student.cedula || !student.ruta) {
        return { class: 'status-error', text: '❌ Incompleto' };
    }
    
    if (student.nombre.length < 3) {
        return { class: 'status-warning', text: '⚠️ Nombre corto' };
    }
    
    return { class: 'status-ok', text: '✓ Válido' };
}

// Exportar datos filtrados
function exportData() {
    if (filteredData.length === 0) {
        toast.show('No hay datos para exportar', 'warning');
        return;
    }
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData.map((student, index) => ({
        '#': index + 1,
        'Nombre': student.nombre,
        'Cédula': student.cedula,
        'Ruta': student.ruta,
        'Estado': getStudentStatus(student).text
    })));
    
    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes');
    XLSX.writeFile(wb, `Estudiantes_Filtrados_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast.show(`${filteredData.length} registros exportados`, 'success', 'Exportación completada');
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
            
            // Generar carnés separados por ruta (sin mezclar rutas)
            generateCardsExactAsPython(pdf, [], cardWidth, cardHeight, marginX, marginY, spaceBetween, pageWidth, pageHeight, includeSeal);

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
    pdf.setFontSize(18);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('ÍNDICE DE CARNÉS POR RUTA', pageWidth / 2, 40, { align: 'center' });
    
    // Línea decorativa bajo el título
    pdf.setLineWidth(0.5);
    pdf.line(50, 50, pageWidth - 50, 50);
    
    // Subtítulo
    pdf.setFontSize(12);
    pdf.setFont('Helvetica', 'normal');
    pdf.text('Distribución de carnés por ruta de transporte estudiantil', pageWidth / 2, 65, { align: 'center' });
    
    // Lista de rutas con formato de índice
    let yPos = 90;
    let currentPage = 2; // Empezamos en página 2 (después del índice)
    
    pdf.setFontSize(11);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('RUTA', 60, yPos);
    pdf.text('ESTUDIANTES', 140, yPos);
    pdf.text('PÁGINA', 180, yPos);
    
    // Línea bajo encabezados
    yPos += 5;
    pdf.setLineWidth(0.3);
    pdf.line(55, yPos, 200, yPos);
    yPos += 15;
    
    pdf.setFont('Helvetica', 'normal');
    const sortedRoutes = Object.keys(routesData).sort((a, b) => {
        // Extraer números de las rutas para ordenamiento numérico
        const numA = parseInt(a.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.replace(/\D/g, '')) || 0;
        return numA - numB;
    });
    
    sortedRoutes.forEach((route, index) => {
        const count = routesData[route].length;
        const pagesForRoute = Math.ceil(count / 12) * 2; // Cada lote de 12 estudiantes = 2 páginas (frente y reverso)
        
        // Fondo alternado para mejor legibilidad
        if (index % 2 === 0) {
            pdf.setFillColor(245, 245, 245); // Gris muy claro
            pdf.rect(55, yPos - 3, 145, 10, 'F');
        }
        
        // Nombre de la ruta
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${route}`, 60, yPos);
        
        // Número de estudiantes (centrado en su columna)
        pdf.text(`${count}`, 145, yPos);
        
        // Número de página (centrado en su columna)
        pdf.text(`${currentPage}`, 185, yPos);
        
        currentPage += pagesForRoute;
        yPos += 12;
        
        // Si llegamos al final de la página, continuar en nueva columna o página
        if (yPos > 240) {
            yPos = 90;
            // Aquí podrías agregar lógica para nueva página si hay muchas rutas
        }
    });
    
    // Línea de total
    yPos += 10;
    pdf.setLineWidth(0.5);
    pdf.line(55, yPos, 200, yPos);
    yPos += 15;
    
    pdf.setFont('Helvetica', 'bold');
    pdf.text('TOTAL GENERAL', 60, yPos);
    
    // Número total de estudiantes (centrado en su columna)
    pdf.text(`${studentsData.length}`, 145, yPos);
    
    // Información del colegio al final
    yPos += 40;
    pdf.setFontSize(10);
    pdf.setFont('Helvetica', 'normal');
    pdf.text('Colegio Técnico Profesional Agropecuario de Sabalito', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;
    pdf.text(`Generado el: ${new Date().toLocaleDateString('es-CR')}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;
    pdf.text(`Año lectivo: ${new Date().getFullYear()}`, pageWidth / 2, yPos, { align: 'center' });
}

// Función para generar carnés con lógica EXACTA de Python
function generateCardsExactAsPython(pdf, students, cardWidth, cardHeight, marginX, marginY, spaceBetween, pageWidth, pageHeight, includeSeal) {
    const cardsPerPage = 12; // 2x6 grid (más anchos, menos altos)
    const cardsPerRow = 2;
    const cardsPerCol = 6;
    
    // Generar carnés por ruta para evitar mezclas
    const sortedRoutes = Object.keys(routesData).sort((a, b) => {
        // Extraer números de las rutas para ordenamiento numérico
        const numA = parseInt(a.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.replace(/\D/g, '')) || 0;
        return numA - numB;
    });
    
    sortedRoutes.forEach(route => {
        const routeStudents = routesData[route];
        
        // Procesar estudiantes de esta ruta en lotes
        for (let startIndex = 0; startIndex < routeStudents.length; startIndex += cardsPerPage) {
            const batch = routeStudents.slice(startIndex, startIndex + cardsPerPage);
            
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
                const originalCol = i % cardsPerRow;
                const row = Math.floor(i / cardsPerRow);
                
                // Si solo hay 1 carné en el lote, mantener la misma posición
                // Si hay 2 o más carnés, invertir posición horizontal para impresión duplex
                let col;
                if (batch.length === 1) {
                    col = originalCol; // Mantener la misma posición
                } else {
                    col = (cardsPerRow - 1) - originalCol; // Invertir solo si hay más de 1
                }
                
                // Posición con espaciado correcto
                const x = marginX + col * (cardWidth + spaceBetween);
                const y = marginY + row * (cardHeight + spaceBetween);
                
                drawCardBackExact(pdf, student, x, y, cardWidth, cardHeight, includeSeal);
            }
        }
    });
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
    pdf.setFontSize(9.5); // Un poco más grande que antes (era 9)
    pdf.setTextColor(0, 0, 0);
    const titleText1 = 'Colegio Técnico Profesional';
    const titleText2 = 'Agropecuario de Sabalito';
    
    // Centrar el texto del colegio
    const titleText1Width = pdf.getTextWidth(titleText1);
    const titleText2Width = pdf.getTextWidth(titleText2);
    const centerX = x + cardWidth / 2;
    
    pdf.text(titleText1, centerX - titleText1Width / 2, y + 6);
    pdf.text(titleText2, centerX - titleText2Width / 2, y + 13);
    
    // Datos del estudiante (ligeramente más grandes y bien espaciados)
    const dataX = x + 3;
    
    // Nombre del estudiante
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(9.5); // Aumentado de 8.5 a 9.5 para etiquetas más grandes
    pdf.text('Nombre del Estudiante:', dataX, y + 22); // Posición original optimizada
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(9.5); // Aumentado de 8.5 a 9.5 para datos más grandes
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
    pdf.setFontSize(9.5); // Aumentado de 8.5 a 9.5 para etiquetas más grandes
    pdf.text('Cédula: ', dataX, cedulaY);
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(9.5); // Aumentado de 8.5 a 9.5 para datos más grandes
    // Limpiar cédula de cualquier texto extra
    let cedula = (student.cedula || '').toString().trim();
    cedula = cedula.replace(/[^\d\-]/g, ''); // Solo números y guiones
    pdf.text(cedula, dataX + pdf.getTextWidth('Cédula: '), cedulaY); // Justo después de la etiqueta
    
    // Ruta en línea compacta
    const rutaY = cedulaY + 5; // Espaciado original
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(9.5); // Aumentado de 8.5 a 9.5 para etiquetas más grandes
    pdf.text('Ruta: ', dataX, rutaY);
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(9.5); // Aumentado de 8.5 a 9.5 para datos más grandes
    // Limpiar ruta de cualquier texto extra
    let route = (student.ruta || '').toString().trim();
    route = route.replace(/[^\w\sÁÉÍÓÚáéíóúÑñ\d]/g, ' ').trim();
    route = route.replace(/\s+/g, ' ');
    pdf.text(route, dataX + pdf.getTextWidth('Ruta: '), rutaY); // Justo después de la etiqueta
    
    // Imagen del bus (posición original)
    if (busData) {
        const busWidth = 18;
        const busHeight = 12;
        pdf.addImage(busData, 'PNG', x + cardWidth - busWidth - 2, y + cardHeight - busHeight - 3, busWidth, busHeight);
    }
    
    // Texto inferior centrado y un poco más grande
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(9.5); // Aumentado de 8.5 a 9.5 para mayor visibilidad
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
