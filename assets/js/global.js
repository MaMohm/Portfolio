// ===== Portfolio Statique - JavaScript Global =====
// Version optimisée pour GitHub Pages
// Auteur: Marwan Mohammad
// Description: Script principal pour portfolio statique sans backend

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Statique - Initialisation...');
    
    // Initialisation des composants
    initBurgerMenu();
    initSmoothScrolling();
    initPortfolioFilters();
    initProtection();
    initAnimations();
    
    console.log('✅ Portfolio statique initialisé avec succès');
});

// ===== MENU BURGER =====
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav_list a');
    
    if (!burger || !nav) return;
    
    // Toggle menu burger
    burger.addEventListener('click', function() {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animation des barres du burger
        const bars = burger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transition = 'all 0.3s ease';
        });
    });
    
    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Fermer le menu lors du redimensionnement
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 750) {
            nav.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    console.log('📱 Menu burger initialisé');
}

// ===== DÉFILEMENT FLUIDE =====
function initSmoothScrolling() {
    // Défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(lien => {
        lien.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides ou avec seulement #
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const cible = document.querySelector(href);
            if (cible) {
                e.preventDefault();
                
                // Calculer la position avec offset pour le header fixe
                const offsetTop = cible.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Effet de défilement sur le header
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    console.log('📜 Défilement fluide activé');
}

// ===== SYSTÈME DE FILTRES PORTFOLIO =====
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) {
        console.log('ℹ️ Aucun filtre portfolio détecté');
        return;
    }
    
    // Ajouter les événements aux boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            console.log(`🎯 Filtre appliqué: "${filterValue}"`);
            
            // Appliquer le filtrage
            applyFilter(filterValue, portfolioItems);
        });
    });
    
    console.log(`🎨 Système de filtres initialisé (${filterButtons.length} filtres)`);
}

// ===== APPLICATION DES FILTRES =====
function applyFilter(filterValue, items) {
    let visibleCount = 0;
    
    items.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || itemCategory === filterValue;
        
        if (shouldShow) {
            visibleCount++;
            showItem(item, index * 100); // Délai échelonné pour l'animation
        } else {
            hideItem(item);
        }
    });
    
    console.log(`📊 ${visibleCount} éléments visibles après filtrage`);
    
    // Afficher un message si aucun élément n'est trouvé
    if (visibleCount === 0) {
        showNoResultsMessage(filterValue);
    } else {
        hideNoResultsMessage();
    }
}

// ===== ANIMATIONS D'ÉLÉMENTS =====
function showItem(item, delay = 0) {
    setTimeout(() => {
        item.style.display = 'block';
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Force reflow
        item.offsetHeight;
        
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
    }, delay);
}

function hideItem(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(-20px) scale(0.8)';
    item.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        item.style.display = 'none';
    }, 300);
}

// ===== MESSAGE AUCUN RÉSULTAT =====
function showNoResultsMessage(filter) {
    let messageDiv = document.getElementById('no-results-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'no-results-message';
        messageDiv.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem 2rem;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 15px;
            border: 2px dashed #667eea;
            margin: 2rem 0;
            font-family: 'Inter', sans-serif;
        `;
        
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.appendChild(messageDiv);
        }
    }
    
    const categoryIcons = {
        'Développement Web': '💻',
        'Design': '🎨',
        'Clouding et Gestion': '☁️',
        'Maintenance': '🔧'
    };
    
    const icon = categoryIcons[filter] || '🔍';
    
    messageDiv.innerHTML = `
        <div style="color: #667eea; font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
        <h3 style="color: #2c3e50; margin-bottom: 0.5rem;">Aucun élément trouvé</h3>
        <p style="color: #666; margin-bottom: 1.5rem;">
            Aucun élément ne correspond au filtre "<strong>${filter}</strong>"
        </p>
        <button onclick="document.querySelector('[data-filter=all]').click()" 
                style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
            📋 Voir tous les éléments
        </button>
    `;
    
    // Animation d'apparition
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    messageDiv.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

function hideNoResultsMessage() {
    const messageDiv = document.getElementById('no-results-message');
    if (messageDiv) {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }
}

// ===== PROTECTION DU CONTENU =====
function initProtection() {
    // Protection contre le clic droit
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.certificate-card') || 
            e.target.closest('.card_image') ||
            e.target.classList.contains('certificate-image')) {
            e.preventDefault();
            showProtectionMessage('Clic droit désactivé sur le contenu protégé');
            return false;
        }
    });
    
    // Protection contre le glisser-déposer
    document.addEventListener('dragstart', function(e) {
        if (e.target.closest('.certificate-card') ||
            e.target.classList.contains('certificate-image') ||
            e.target.tagName === 'IMG') {
            e.preventDefault();
            showProtectionMessage('Glisser-déposer bloqué');
            return false;
        }
    });
    
    // Protection contre la sélection
    document.addEventListener('selectstart', function(e) {
        if (e.target.closest('.certificate-card')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Protection contre les raccourcis clavier
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
            (e.ctrlKey && ['U', 'S'].includes(e.key))) {
            e.preventDefault();
            showProtectionMessage('Raccourci bloqué pour protéger le contenu');
            return false;
        }
        
        // Ctrl+A pour tout sélectionner
        if (e.ctrlKey && e.key === 'a') {
            const selection = window.getSelection();
            if (selection.toString().length === 0) {
                e.preventDefault();
                showProtectionMessage('Sélection globale limitée');
                return false;
            }
        }
    });
    
    console.log('🛡️ Protection du contenu activée');
}

// ===== MESSAGE DE PROTECTION =====
function showProtectionMessage(message) {
    let popup = document.getElementById('protection-popup');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'protection-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #dc3545, #c82333);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: bold;
            font-size: 1.4rem;
            z-index: 10000;
            display: none;
            box-shadow: 0 10px 30px rgba(220, 53, 69, 0.4);
            font-family: 'Inter', sans-serif;
            text-align: center;
            min-width: 320px;
            max-width: 480px;
        `;
        document.body.appendChild(popup);
    }
    
    popup.innerHTML = `⚠️ ${message}`;
    popup.style.display = 'block';
    
    // Animation d'entrée
    popup.style.opacity = '0';
    popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
    
    setTimeout(() => {
        popup.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Masquer automatiquement après 3 secondes
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 400);
    }, 3000);
}

// ===== ANIMATIONS D'APPARITION =====
function initAnimations() {
    // Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Une fois animé, ne plus observer cet élément
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments qui doivent être animés
    const elementsToAnimate = document.querySelectorAll('.card, .service, .progressbar');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Animation spéciale pour les barres de progression
    const progressBars = document.querySelectorAll('.progressbar .bar');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease-in-out';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500 + (index * 200));
    });
    
    console.log('✨ Animations initialisées');
}

// ===== UTILITAIRES =====
// Fonction pour déboguer le portfolio (mode développement)
window.portfolioDebug = {
    showAllItems: () => {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => showItem(item));
        console.log('👁️ Tous les éléments affichés');
    },
    
    hideAllItems: () => {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => hideItem(item));
        console.log('🙈 Tous les éléments cachés');
    },
    
    filterByCategory: (category) => {
        const items = document.querySelectorAll('.portfolio-item');
        applyFilter(category, items);
        console.log(`🎯 Filtrage par catégorie: ${category}`);
    },
    
    getStats: () => {
        const items = document.querySelectorAll('.portfolio-item');
        const categories = {};
        
        items.forEach(item => {
            const cat = item.getAttribute('data-category');
            categories[cat] = (categories[cat] || 0) + 1;
        });
        
        console.log('📊 Statistiques du portfolio:', categories);
        return categories;
    }
};

// ===== STYLES CSS INTÉGRÉS =====
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Animations d'apparition */
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Protection du contenu */
    .certificate-card,
    .certificate-image {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
    }

    /* Amélioration du watermark */
    .watermark {
        font-family: 'Inter', Arial, sans-serif !important;
        letter-spacing: 1px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    /* Responsive pour les animations */
    @media (prefers-reduced-motion: reduce) {
        .animate-in,
        .progressbar .bar {
            animation: none !important;
            transition: none !important;
        }
    }

    /* Header scrolled effect */
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    /* Menu ouvert - bloquer le défilement */
    body.menu-open {
        overflow: hidden;
    }

    /* Amélioration des transitions */
    .card:hover .card_image {
        transform: scale(1.05);
    }

    .certificate-card:hover .watermark {
        opacity: 0.9;
        background: rgba(102, 126, 234, 0.2);
    }
`;
document.head.appendChild(additionalStyles);

console.log('🎨 Styles CSS additionnels chargés');

// ===== GESTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesse rejetée:', e.reason);
});

// Message de bienvenue dans la console
console.log(`
🚀 Portfolio Statique - Marwan Mohammad
📅 Version: 2025.1
🎯 Mode: Production (GitHub Pages)
🛡️ Protection: Activée
✅ Prêt pour utilisation
`);

// Export pour modules (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBurgerMenu,
        initPortfolioFilters,
        showProtectionMessage
    };
}