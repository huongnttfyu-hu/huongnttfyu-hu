/**
 * THU HUONG PORTFOLIO - Custom JS
 * Optimized for: Global Economics & Visual Arts (FTU Style)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DỮ LIỆU PORTFOLIO (Carousel items) ---
    const portfolioData = [
        {
            id: 1,
            title: 'Economic Research',
            description: 'Analyzing global trade patterns and their impact on emerging markets.',
            image: 'images/economics.jpg', // Thay link ảnh của bạn
            tech: ['Global Trade', 'Analysis']
        },
        {
            id: 2,
            title: 'Visual Design Portfolio',
            description: 'Creating minimalist and futuristic visual identities for digital brands.',
            image: 'images/design.jpg',
            tech: ['Illustrator', 'Branding']
        },
        {
            id: 3,
            title: 'FTU Internship Hub',
            description: 'Co-produced a specialized platform connecting FTU students with top recruiters.',
            image: 'images/hub.jpg',
            tech: ['Web Dev', 'Management']
        },
        {
            id: 4,
            title: 'Photography Series',
            description: 'Capturing the "magic in the mundane" through street and architectural photography.',
            image: 'images/photo.jpg',
            tech: ['Lightroom', 'Framing']
        }
    ];

    // --- 2. DỮ LIỆU KỸ NĂNG (Skills Grid) ---
    const skillsData = [
        { name: 'Data Analysis', icon: '📊', level: 90, category: 'frontend' }, // category khớp với data-category trong HTML
        { name: 'Python/SQL', icon: '🐍', level: 75, category: 'frontend' },
        { name: 'MS Office', icon: '📁', level: 95, category: 'backend' },
        { name: 'Stata/SPSS', icon: '📈', level: 80, category: 'backend' },
        { name: 'Illustrator', icon: '🎨', level: 85, category: 'cloud' },
        { name: 'Photoshop', icon: '🖌️', level: 80, category: 'cloud' },
        { name: 'Street Photo', icon: '📷', level: 88, category: 'emerging' },
        { name: 'Visual Story', icon: '🎞️', level: 82, category: 'emerging' }
    ];

    // --- 3. KHỞI TẠO CAROUSEL ---
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('indicators');
    let currentIndex = 0;

    function initCarousel() {
        if (!carousel) return;
        
        carousel.innerHTML = portfolioData.map((item, index) => `
            <div class="carousel-item" data-index="${index}">
                <div class="card">
                    <div class="card-number">0${item.id}</div>
                    <div class="card-image"><img src="${item.image}" alt="${item.title}"></div>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-description">${item.description}</p>
                    <div class="card-tech">
                        ${item.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    <button class="card-cta" onclick="location.href='#contact'">Connect</button>
                </div>
            </div>
        `).join('');

        indicators.innerHTML = portfolioData.map((_, index) => `
            <div class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('');

        updateCarousel();
    }

    function updateCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        const dots = document.querySelectorAll('.indicator');
        const total = items.length;

        items.forEach((item, index) => {
            let offset = index - currentIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const absOffset = Math.abs(offset);
            const sign = offset < 0 ? -1 : 1;

            if (offset === 0) {
                item.style.transform = `translate(-50%, -50%) translateZ(200px)`;
                item.style.opacity = "1";
                item.style.zIndex = "10";
            } else {
                item.style.transform = `translate(-50%, -50%) translateX(${sign * 350}px) translateZ(-200px) rotateY(${-sign * 40}deg) scale(0.8)`;
                item.style.opacity = absOffset > 1 ? "0" : "0.5";
                item.style.zIndex = "5";
            }
        });

        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // Nút điều khiển
    document.getElementById('nextBtn')?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % portfolioData.length;
        updateCarousel();
    });

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
        updateCarousel();
    });

    // --- 4. KHỞI TẠO SKILLS GRID & FILTER ---
    const skillsGrid = document.getElementById('skillsGrid');
    const tabs = document.querySelectorAll('.category-tab');

    function displaySkills(filter = 'all') {
        if (!skillsGrid) return;
        const filtered = filter === 'all' ? skillsData : skillsData.filter(s => s.category === filter);
        
        skillsGrid.innerHTML = filtered.map((skill, i) => `
            <div class="skill-hexagon" style="animation-delay: ${i * 0.1}s">
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level">
                            <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                        </div>
                        <div class="skill-percentage-hex">${skill.level}%</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });

    // --- 5. HIỆU ỨNG HẠT (PARTICLES) ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 10 + 's';
            p.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(p);
        }
    }

    // --- 6. BỘ ĐẾM SỐ (STAT COUNTER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const target = +num.getAttribute('data-target');
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            num.innerText = target;
                            clearInterval(timer);
                        } else {
                            num.innerText = Math.ceil(current);
                        }
                    }, 30);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);

    // --- 7. MENU MOBILE & HEADER ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header?.classList.toggle('scrolled', window.scrollY > 100);
    });

    // --- 8. LOADER ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader')?.classList.add('hidden');
        }, 1200);
    });

    // Khởi chạy ban đầu
    initCarousel();
    displaySkills();
});