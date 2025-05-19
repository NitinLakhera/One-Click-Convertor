document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const dropZone = document.getElementById('dropZone');
    const fileInfo = document.getElementById('fileInfo');
    const convertBtn = document.getElementById('convertBtn');
    const outputFormat = document.getElementById('outputFormat');
    const fileSize = document.getElementById('fileSize');
    const sizeValue = document.getElementById('sizeValue');
    const quality = document.getElementById('quality');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const downloadArea = document.getElementById('downloadArea');
    const downloadBtn = document.getElementById('downloadBtn');

    // File object to store uploaded file
    let uploadedFile = null;
    let convertedFileUrl = null;

    // Event Listeners
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    convertBtn.addEventListener('click', convertFile);
    fileSize.addEventListener('input', updateSizeValue);
    downloadBtn.addEventListener('click', downloadFile);

    // Functions
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('highlight');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('highlight');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('highlight');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    }

    function processFile(file) {
        uploadedFile = file;
        
        // Display file info
        fileInfo.innerHTML = `
            <p><strong>Selected File:</strong> ${file.name}</p>
            <p><strong>Size:</strong> ${formatFileSize(file.size)}</p>
            <p><strong>Type:</strong> ${file.type || 'Unknown'}</p>
        `;
        fileInfo.classList.add('active');
        
        // Enable convert button
        convertBtn.disabled = false;
        
        // Suggest appropriate output format based on input
        suggestOutputFormat(file.name);
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
    }

    function suggestOutputFormat(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        const formatMap = {
            'jpg': 'png',
            'jpeg': 'png',
            'png': 'jpg',
            'doc': 'pdf',
            'docx': 'pdf',
            'txt': 'pdf',
            'xls': 'pdf',
            'xlsx': 'pdf',
            'ppt': 'pdf',
            'pptx': 'pdf'
        };
        
        if (formatMap[extension]) {
            outputFormat.value = formatMap[extension];
        }
    }

    function updateSizeValue() {
        sizeValue.textContent = fileSize.value;
    }

    function convertFile() {
        if (!uploadedFile) return;
        
        // Show progress
        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        progressText.textContent = 'Uploading file...';
        
        // Simulate upload and conversion process
        // In a real app, you would send the file to a server for processing
        simulateConversionProcess();
    }

    function simulateConversionProcess() {
        // Simulate upload progress
        let progress = 0;
        const uploadInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(uploadInterval);
                progressText.textContent = 'Converting file...';
                simulateConversion();
            }
            progressBar.style.width = `${progress}%`;
        }, 300);
    }

    function simulateConversion() {
        // Simulate conversion progress
        let progress = 0;
        const conversionInterval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(conversionInterval);
                conversionComplete();
            }
            progressBar.style.width = `${progress}%`;
        }, 500);
    }

    function conversionComplete() {
        progressText.textContent = 'Finalizing...';
        
        // Create a dummy download URL (in a real app, this would come from the server)
        setTimeout(() => {
            progressContainer.style.display = 'none';
            downloadArea.style.display = 'block';
            
            // Create a dummy blob for download
            const blob = new Blob([`This is a simulated ${outputFormat.value} file converted from ${uploadedFile.name}`], 
                                { type: `application/${outputFormat.value}` });
            convertedFileUrl = URL.createObjectURL(blob);
            
            // Set download attributes
            downloadBtn.href = convertedFileUrl;
            downloadBtn.download = `converted.${outputFormat.value}`;
        }, 1000);
    }

    function downloadFile(e) {
        if (!convertedFileUrl) {
            e.preventDefault();
            return;
        }
        
        // Clean up after download
        setTimeout(() => {
            URL.revokeObjectURL(convertedFileUrl);
            downloadArea.style.display = 'none';
            resetConverter();
        }, 100);
    }

    function resetConverter() {
        fileInput.value = '';
        fileInfo.classList.remove('active');
        convertBtn.disabled = true;
        uploadedFile = null;
        convertedFileUrl = null;
    }

    // Initialize size value display
    updateSizeValue();
});
