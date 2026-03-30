// Carousel Data with your images
const portfolioData = [
    {
        id: 1,
        title: 'Visual Journey',
        description: 'Catching vibes through the lens and finding magic in the mundane.',
        image: 'huong-camera.jpg',
        tech: ['Photography', 'Lightroom']
    },
    {
        id: 2,
        title: 'Design Philosophy',
        description: 'Sketching out new designs and visual identities for FTU events.',
        image: 'thiet-ke-poster.jpg',
        tech: ['Illustrator', 'Photoshop']
    },
    {
        id: 3,
        title: 'FTU Youth Union',
        description: 'Dedicated to continuous growth and contributing to the student community.',
        image: 'ftu-logo-ao.jpg',
        tech: ['K63', 'Economics']
    }
];

// Skills Data - Updated with your specific list
const skillsData = [
    { name: 'Microsoft Excel', icon: '📊', level: 95 },
    { name: 'Microsoft Word', icon: '📝', level: 98 },
    { name: 'Microsoft PowerPoint', icon: '📽️', level: 95 },
    { name: 'Microsoft Access', icon: '🗄️', level: 75 },
    { name: 'Adobe Illustrator', icon: '🎨', level: 85 },
    { name: 'Adobe Photoshop', icon: '🖼️', level: 88 },
    { name: 'Adobe Lightroom', icon: '📸', level: 92 },
    { name: 'Canva', icon: '✨', level: 98 },
    { name: 'CapCut', icon: '🎬', level: 90 },
    { name: 'Stata', icon: '📈', level: 82 }
];

function initCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('indicators');
    
    portfolioData.forEach((data, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <div class="card">
                <div class="card-number">0${index + 1}</div>
                <div class="card-image"><img src="${data.image}" alt="${data.title}"></div>
                <h3 class="card-title">${data.title}</h3>
                <p class="card-description">${data.description}</p>
                <div class="card-tech">${data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
                <button class="card-cta" onclick="window.location.href='#about'">Explore</button>
            </div>`;
        carousel.appendChild(item);
        
        const ind = document.createElement('div');
        ind.className = 'indicator' + (index === 0 ? ' active' : '');
        ind.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(ind);
    });
    updateCarousel();
}

function initSkillsGrid() {
    const grid = document.getElementById('skillsGrid');
    skillsData.forEach(skill => {
        const hex = document.createElement('div');
        hex.className = 'skill-hexagon';
        hex.innerHTML = `
            <div class="hexagon-inner">
                <div class="hexagon-content">
                    <div class="skill-icon-hex">${skill.icon}</div>
                    <div class="skill-name-hex" style="font-size: 11px;">${skill.name}</div>
                    <div class="skill-level"><div class="skill-level-fill" style="width: ${skill.level}%"></div></div>
                </div>
            </div>`;
        grid.appendChild(hex);
    });
}

// Keep your existing carousel logic here (updateCarousel, nextSlide, etc.)
let currentIndex = 0;
function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset === 0) {
            item.style.transform = 'translate(-50%, -50%) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else {
            item.style.transform = `translate(${offset > 0 ? '20%' : '-120%'}, -50%) scale(0.8)`;
            item.style.opacity = '0.4';
            item.style.zIndex = '5';
        }
    });
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function goToSlide(i) {
    currentIndex = i;
    updateCarousel();
}

// Auto rotate
setInterval(nextSlide, 5000);

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSkillsGrid();
    
    // Loading screen
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// Mobile menu
document.getElementById('menuToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('navMenu').classList.toggle('active');
});