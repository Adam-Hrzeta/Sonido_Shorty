document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Efecto de navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Configuración del carrusel de videos
    const carousel = document.querySelector('#eventCarousel');
    const videos = document.querySelectorAll('#eventCarousel video');
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: false
    });
    
    carousel.addEventListener('slide.bs.carousel', function() {
        videos.forEach(video => video.pause());
    });
    
    carousel.addEventListener('slid.bs.carousel', function() {
        const activeVideo = carousel.querySelector('.carousel-item.active video');
        if (activeVideo) activeVideo.play().catch(e => console.log("Auto-play bloqueado:", e));
    });
    
    // Reproducir primer video al cargar
    const firstVideo = carousel.querySelector('.carousel-item.active video');
    if (firstVideo) firstVideo.play().catch(e => console.log("Auto-play bloqueado:", e));
    
    // Configuración del modal de contrato
    const contratoModal = document.getElementById('contratoModal');
    if (contratoModal) {
        contratoModal.addEventListener('show.bs.modal', function() {
            const pdfViewer = document.getElementById('pdfViewer');
            pdfViewer.src = "/static/pdf/contrato.pdf#toolbar=0&navpanes=0&statusbar=0&view=FitH"; 
        });
        
        contratoModal.addEventListener('hidden.bs.modal', function() {
            const pdfViewer = document.getElementById('pdfViewer');
            pdfViewer.src = "";
        });
    }
   
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});