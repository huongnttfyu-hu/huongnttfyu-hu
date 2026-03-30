const portfolioData = [
    { id: 1, title: 'FTU Youth Union', description: 'Communications Department Gen 20.', image: 'images/huong-doan.jpg', tech: ['FYU', 'MEDIA'] },
    { id: 2, title: 'Visual Creator', description: 'Catching magic in every frame.', image: 'images/huong-camera.jpg', tech: ['ARTS', 'CAMERA'] },
    { id: 3, title: 'Academic Honors', description: 'Merit awards & Essay winner.', image: 'images/huong-bang-khen.jpg', tech: ['AWARD', 'K63'] },
    { id: 4, title: 'Student Identity', description: 'Sophomore at Foreign Trade University.', image: 'images/ftu-logo-ao.jpg', tech: ['ECONOMICS', 'FTU'] },
    { id: 5, title: 'Graphic Design', description: 'Poster design for national events.', image: 'images/thiet-ke-poster.jpg', tech: ['ADOBE', 'DESIGN'] },
    { id: 6, title: 'Event Control', description: 'Running technical media for live events.', image: 'images/su-kien-fyu.jpg', tech: ['TECH', 'LIVE'] }
];

const skillsData = [
    { name: 'Photography', icon: '📷', level: 95, category: 'photography' },
    { name: 'Video Shooting', icon: '🎥', level: 90, category: 'photography' },
    { name: 'Adobe Lightroom', icon: '🕯️', level: 92, category: 'photography' },
    { name: 'Adobe Photoshop', icon: '🎨', level: 88, category: 'design' },
    { name: 'Adobe Illustrator', icon: '🖌️', level: 85, category: 'design' },
    { name: 'Canva', icon: '✨', level: 98, category: 'design' },
    { name: 'CapCut', icon: '🎬', level: 90, category: 'design' },
    { name: 'Microsoft Word', icon: '📝', level: 98, category: 'office' },
    { name: 'Microsoft PowerPoint', icon: '📽️', level: 95, category: 'office' },
    { name: 'Microsoft Access', icon: '🗄️', level: 75, category: 'office' },
    { name: 'Microsoft Excel', icon: '📊', level: 92, category: 'analysis' },
    { name: 'Stata', icon: '📈', level: 80, category: 'analysis' },
    { name: 'Python', icon: '🐍', level: 75, category: 'analysis' }
];

let currentIndex = 0;
let autoPlayInterval;

function initCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.getElementById('indicators');
    carousel.innerHTML = ''; indicators.innerHTML = '';
    
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
            </div>`;
        carousel.appendChild(item);
        
        const ind = document.createElement('div');
        ind.className = 'indicator' + (index === 0 ? ' active' : '');
        ind.addEventListener('click', () => { currentIndex = index; updateCarousel(); resetAutoPlay(); });
        indicators.appendChild(ind);
    });
    updateCarousel();
    startAutoPlay();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const total = items.length;
    
    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        
        const absOffset = Math.abs(offset);
        
        // KHOẢNG CÁCH: Sửa từ 450px xuống 390px để các card sát lại gần nhau hơn
        const translateX = offset * 390; 
        const translateZ = -absOffset * 250;
        const rotateY = -offset * 35;
        const opacity = absOffset > 2 ? 0 : 1 - (absOffset * 0.3);
        
        item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        item.style.opacity = opacity;
        item.style.zIndex = 10 - absOffset;
    });

    document.querySelectorAll('.indicator').forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));
}

// TỰ ĐỘNG CHUYỂN ẢNH (Auto-play)
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % portfolioData.length;
        updateCarousel();
    }, 4000); // 4 giây chuyển 1 lần
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

function initSkillsGrid() {
    const grid = document.getElementById('skillsGrid');
    const tabs = document.querySelectorAll('.category-tab');
    function display(cat = 'all') {
        grid.innerHTML = '';
        const filtered = cat === 'all' ? skillsData : skillsData.filter(s => s.category === cat);
        filtered.forEach(s => {
            const hex = document.createElement('div');
            hex.className = 'skill-hexagon';
            hex.innerHTML = `<div class="hexagon-inner"><div class="hexagon-content">
                <div class="skill-icon-hex">${s.icon}</div>
                <div class="skill-name-hex" style="font-size:11px">${s.name}</div>
                <div class="skill-level"><div class="skill-level-fill" style="width:${s.level}%"></div></div>
            </div></div>`;
            grid.appendChild(hex);
        });
    }
    tabs.forEach(t => t.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('active'));
        t.classList.add('active');
        display(t.dataset.category);
    }));
    display();
}

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSkillsGrid();
    document.getElementById('nextBtn').addEventListener('click', () => { currentIndex = (currentIndex + 1) % portfolioData.length; updateCarousel(); resetAutoPlay(); });
    document.getElementById('prevBtn').addEventListener('click', () => { currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length; updateCarousel(); resetAutoPlay(); });
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1000);
});