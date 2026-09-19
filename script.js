// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const lightModeLogo = document.getElementById('lightModeLogo');
    const darkModeLogo = document.getElementById('darkModeLogo');

    // Función para alternar visibilidad de logos
    function toggleLogos(isDarkMode) {
        if (isDarkMode) {
            lightModeLogo.style.display = 'none';
            darkModeLogo.style.display = 'block';
        } else {
            lightModeLogo.style.display = 'block';
            darkModeLogo.style.display = 'none';
        }
    }

    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
        toggleLogos(true);
    } else {
        toggleLogos(false);
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let isCurrentlyDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isCurrentlyDarkMode);
        
        toggleLogos(isCurrentlyDarkMode);

        if (isCurrentlyDarkMode) {
            darkModeToggle.querySelector('i').classList.remove('fa-moon');
            darkModeToggle.querySelector('i').classList.add('fa-sun');
        } else {
            darkModeToggle.querySelector('i').classList.remove('fa-sun');
            darkModeToggle.querySelector('i').classList.add('fa-moon');
        }
    });
    
    // Configurar imagen de perfil placeholder
    const profileImage = document.getElementById('profileImage');

    

    
    // Efecto de partículas sutiles en el fondo
    createParticles();
    
    // Agregar efectos de sonido visual (vibración sutil) al hacer clic
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Efecto de hover mejorado
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    

});

// Función para crear partículas de fondo
function createParticles() {
    const particleCount = 20;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${5 + Math.random() * 10}s infinite linear;
        `;
        container.appendChild(particle);
    }
}

// CSS para el efecto ripple y partículas
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle {
        animation-delay: ${Math.random() * 5}s;
    }
`;
document.head.appendChild(style);

// Función para cambiar la imagen de perfil (para uso futuro)
function updateProfileImage(imageSrc) {
    const profileImage = document.getElementById('profileImage');
    profileImage.src = imageSrc;
    profileImage.innerHTML = '';
    profileImage.style.background = 'none';
    profileImage.style.fontSize = 'inherit';
    profileImage.style.color = 'inherit';
}



// Función para actualizar enlaces de redes sociales
function updateSocialLinks(links) {
    const socialLinks = {
        whatsapp: links.whatsapp || 'https://wa.me/+573001234567',
        facebook: links.facebook || 'https://facebook.com/vladimir.varon',
        instagram: links.instagram || 'https://instagram.com/vladimir.varon',
        youtube: links.youtube || 'https://youtube.com/@vladimirvaronremax',
        tiktok: links.tiktok || 'https://tiktok.com/@vladimir.varon',
        email: links.email || 'mailto:vladimir.varon@remax.com',
        phone: links.phone || 'tel:+573001234567'
    };
    
    Object.keys(socialLinks).forEach(platform => {
        const link = document.querySelector(`.${platform}`);
        if (link) {
            link.href = socialLinks[platform];
        }
    });
}

// Exportar funciones para uso externo
window.ProfileUtils = {
    updateProfileImage,
    updateCompanyLogo,
    updateSocialLinks
};


