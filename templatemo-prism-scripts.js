// 1. Carousel Data - 6 Items with your images
const portfolioData = [
    { id: 1, title: 'FTU Youth Union', description: 'Communications Department Gen 20.', image: 'huong-doan.jpg', tech: ['FYU', 'Media'] },
    { id: 2, title: 'Visual Creator', description: 'Catching magic in every frame.', image: 'huong-camera.jpg', tech: ['Arts', 'Camera'] },
    { id: 3, title: 'Academic Honors', description: 'Merit awards & Essay writing contest winner.', image: 'huong-bang-khen.jpg', tech: ['Award', 'K63'] },
    { id: 4, title: 'Student Identity', description: 'Proud sophomore at Foreign Trade University.', image: 'ftu-logo-ao.jpg', tech: ['FTU', 'Economics'] },
    { id: 5, title: 'Graphic Design', description: 'Poster design for national anniversaries.', image: 'thiet-ke-poster.jpg', tech: ['Adobe', 'Design'] },
    { id: 6, title: 'Event Control', description: 'Running technical media for big events.', image: 'su-kien-fyu.jpg', tech: ['Tech', 'Live'] }
];

// 2. Skills Data - Categorized into 5 groups
const skillsData = [
    // Digital Photography
    { name: 'Photography', icon: '📷', level: 95, category: 'photography' },
    { name: 'Video Shooting', icon: '🎥', level: 90, category: 'photography' },
    { name: 'Adobe Lightroom', icon: '🕯️', level: 92, category: 'photography' },
    // Visual Arts & Design
    { name: 'Adobe Photoshop', icon: '🎨', level: 88, category: 'design' },
    { name: 'Adobe Illustrator', icon: '🖌️', level: 85, category: 'design' },
    { name: 'Canva', icon: '✨', level: 98, category: 'design' },
    { name: 'CapCut', icon: '🎬', level: 90, category: 'design' },
    // Office Tools
    { name: 'Microsoft Word', icon: '📝', level: 98, category: 'office' },
    { name: 'Microsoft PowerPoint', icon: '📽️', level: 95, category: 'office' },
    { name: 'Microsoft Access', icon: '🗄️', level: 75, category: 'office' },
    // Data Analysis
    { name: 'Microsoft Excel', icon: '📊', level: 92, category: 'analysis' },
    { name: 'Stata', icon: '📈', level: 80, category: 'analysis' },
    { name: 'Python', icon: '🐍', level: 75, category: 'analysis' }
];

// Functions for Skills Grid with Filtering
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';
        const filtered = category === 'all' ? skillsData : skillsData.filter(s => s.category === category);
        
        filtered.forEach(skill => {
            const hex = document.createElement('div');
            hex.className = 'skill-hexagon';
            hex.innerHTML = `
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level"><div class="skill-level-fill" style="width: ${skill.level}%"></div></div>
                    </div>
                </div>`;
            skillsGrid.appendChild(hex);
        });
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });
    displaySkills();
}

// Logic Carousel (Giao diện cũ Prism Flux)
let currentIndex = 0;
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('indicators');
    
    portfolioData.forEach((data, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <div class="card">
                <div class="card-number">0${data.id}</div>
                <div class="card-image"><img src="${data.image}" alt="${data.title}"></div>
                <h3 class="card-title">${data.title}</h3>
                <p class="card-description">${data.description}</p>
                <div class="card-tech">${data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
            </div>`;
        carousel.appendChild(item);
        
        const ind = document.createElement('div');
        ind.className = 'indicator' + (index === 0 ? ' active' : '');
        ind.addEventListener('click', () => { currentIndex = index; updateCarousel(); });
        indicators.appendChild(ind);
    });
    updateCarousel();
}

// Update Carousel (3D style)
function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const total = items.length;
    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        
        const absOffset = Math.abs(offset);
        item.style.opacity = absOffset > 2 ? '0' : '1';
        item.style.zIndex = 10 - absOffset;
        item.style.transform = `translate(-50%, -50%) translateX(${offset * 350}px) translateZ(${-absOffset * 200}px) rotateY(${-offset * 30}deg)`;
    });
    document.querySelectorAll('.indicator').forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));
}

// Stats counter animation
function initStats() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nums = entry.target.querySelectorAll('.stat-number');
                nums.forEach(num => {
                    const target = +num.dataset.target;
                    let curr = 0;
                    const speed = target / 50;
                    const update = () => {
                        curr += speed;
                        if (curr < target) { num.innerText = Math.ceil(curr); setTimeout(update, 20); }
                        else num.innerText = target;
                    };
                    update();
                });
            }
        });
    }, { threshold: 0.5 });
    observer.observe(document.querySelector('.stats-section'));
}

// Init everything
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSkillsGrid();
    initStats();
    document.getElementById('nextBtn').addEventListener('click', () => { currentIndex = (currentIndex + 1) % portfolioData.length; updateCarousel(); });
    document.getElementById('prevBtn').addEventListener('click', () => { currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length; updateCarousel(); });
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1500);
});