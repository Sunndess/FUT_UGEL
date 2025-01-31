document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentSection = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.remove('active');
            if (i === index) {
                section.classList.add('active');
            }
        });

        // Update progress steps
        progressSteps.forEach((step, i) => {
            step.classList.remove('active', 'completed');
            if (i === index) {
                step.classList.add('active');
            } else if (i < index) {
                step.classList.add('completed');
            }
        });

        // Update preview
        updatePreview();
    }

    function validateSection(index) {
        const currentSectionElement = sections[index];
        const requiredFields = currentSectionElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '';
            }
        });

        return isValid;
    }

    // Navigation buttons
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', () => {
            if (validateSection(currentSection)) {
                currentSection++;
                showSection(currentSection);
                window.scrollTo(0, 0);
            } else {
                alert('Por favor, complete todos los campos requeridos.');
            }
        });
    });

    document.querySelectorAll('.btn-prev').forEach(button => {
        button.addEventListener('click', () => {
            currentSection--;
            showSection(currentSection);
            window.scrollTo(0, 0);
        });
    });

    // Preview update function
    function updatePreview() {
        // Personal Data
        const previewPersonalData = document.getElementById('previewPersonalData');
        if (previewPersonalData) {
            const personType = document.querySelector('input[name="personType"]:checked')?.value;
            let personalInfo = '';
            
            if (personType === 'natural') {
                personalInfo = `
                    <div class="preview-field">
                        <span class="preview-label">Apellido Paterno:</span> ${document.getElementById('apellidoPaterno')?.value || '(Por completar)'}
                    </div>
                    <div class="preview-field">
                        <span class="preview-label">Apellido Materno:</span> ${document.getElementById('apellidoMaterno')?.value || '(Por completar)'}
                    </div>
                    <div class="preview-field">
                        <span class="preview-label">Nombres:</span> ${document.getElementById('nombres')?.value || '(Por completar)'}
                    </div>
                `;
            } else if (personType === 'juridica') {
                personalInfo = `
                    <div class="preview-field">
                        <span class="preview-label">Razón Social:</span> ${document.getElementById('razonSocial')?.value || '(Por completar)'}
                    </div>
                `;
            }

            const documentType = document.querySelector('input[name="documentType"]:checked')?.value;
            const documentNumber = document.getElementById(documentType)?.value;

            previewPersonalData.innerHTML = `
                ${personalInfo}
                <div class="preview-field">
                    <span class="preview-label">Tipo de Documento:</span> ${documentType?.toUpperCase() || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Número:</span> ${documentNumber || '(Por completar)'}
                </div>
            `;
        }

        // Address
        const previewAddress = document.getElementById('previewAddress');
        if (previewAddress) {
            const viaType = document.querySelector('input[name="viaType"]:checked')?.value;
            const zoneType = document.querySelector('input[name="zoneType"]:checked')?.value;

            previewAddress.innerHTML = `
                <div class="preview-field">
                    <span class="preview-label">Tipo de Vía:</span> ${viaType || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Nombre de la vía:</span> ${document.getElementById('nombreVia')?.value || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Tipo de Zona:</span> ${zoneType || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Nombre de zona:</span> ${document.getElementById('nombreZona')?.value || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Referencia:</span> ${document.getElementById('referencia')?.value || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Departamento:</span> ${document.getElementById('departamento')?.value || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Provincia:</span> ${document.getElementById('provincia')?.value || '(Por completar)'}
                </div>
                <div class="preview-field">
                    <span class="preview-label">Distrito:</span> ${document.getElementById('distrito')?.value || '(Por completar)'}
                </div>
            `;
        }

        // Rest of the preview updates...
        const previewResumen = document.getElementById('previewResumen');
        if (previewResumen) {
            previewResumen.innerHTML = `
                <div class="preview-field">
                    ${document.getElementById('resumen')?.value || '(Por completar)'}
                </div>
            `;
        }

        const previewDependencia = document.getElementById('previewDependencia');
        if (previewDependencia) {
            previewDependencia.innerHTML = `
                <div class="preview-field">
                    ${document.getElementById('dependencia')?.value || '(Por completar)'}
                </div>
            `;
        }

        const previewFundamentacion = document.getElementById('previewFundamentacion');
        if (previewFundamentacion) {
            previewFundamentacion.innerHTML = `
                <div class="preview-field">
                    ${document.getElementById('fundamentacion')?.value || '(Por completar)'}
                </div>
            `;
        }

        // Documents
        const previewDocuments = document.getElementById('previewDocuments');
        if (previewDocuments) {
            const documents = [];
            document.querySelectorAll('.doc-name').forEach(doc => {
                if (doc.value.trim()) {
                    documents.push(doc.value.trim());
                }
            });
            previewDocuments.innerHTML = documents.length ? 
                documents.map(doc => `
                    <div class="preview-field">
                        • ${doc}
                    </div>
                `).join('') :
                '<div class="preview-field">(Sin documentos adjuntos)</div>';
        }
    }

    // Add document button functionality
    const documentsList = document.getElementById('documentsList');
    if (documentsList) {
        documentsList.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-doc')) {
                const newDoc = document.createElement('div');
                newDoc.className = 'document-item';
                newDoc.innerHTML = `
                    <input type="text" placeholder="Nombre del documento" class="doc-name">
                    <button type="button" class="add-doc">+</button>
                `;
                documentsList.appendChild(newDoc);
                
                const newInput = newDoc.querySelector('.doc-name');
                newInput.addEventListener('input', updatePreview);
            }
        });
    }

    // Form submission
    const form = document.getElementById('futForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all sections
            let isValid = true;
            for (let i = 0; i < sections.length; i++) {
                if (!validateSection(i)) {
                    isValid = false;
                    currentSection = i;
                    showSection(i);
                    break;
                }
            }

            if (!isValid) {
                alert('Por favor, complete todos los campos requeridos en todas las secciones.');
                return;
            }

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Add documents list
            const documents = [];
            documentsList.querySelectorAll('.doc-name').forEach(doc => {
                if (doc.value.trim()) {
                    documents.push(doc.value.trim());
                }
            });
            data.documents = documents;

            console.log('Datos del formulario:', data);
            alert('Formulario enviado con éxito!');
        });
    }

    // Print functionality
    const btnImprimir = document.getElementById('btnImprimir');
    if (btnImprimir) {
        btnImprimir.addEventListener('click', function() {
            window.print();
        });
    }

    // Add input event listeners for live preview
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Initialize first section
    showSection(0);
    updatePreview();
});