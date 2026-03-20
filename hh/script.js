// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

['.usp-card', '.tour-card', '.price-card', '.gallery-item',
 '.faq-item', '.contact-card', '.extra-card'].forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });
});

// ===== NAV ACTIVE STATE =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    sections.forEach(s => {
        const id = s.getAttribute('id');
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
            document.querySelectorAll('.nav-link').forEach(l => {
                l.style.color = l.getAttribute('href') === `#${id}` ? '#e91e8c' : '';
            });
        }
    });
});

// ===== GALLERY LIGHTBOX =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        const lb = document.createElement('div');
        lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:10000;cursor:pointer;padding:24px;';
        const lbImg = document.createElement('img');
        lbImg.src = img.src;
        lbImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:12px;';
        lb.appendChild(lbImg);
        document.body.appendChild(lb);
        document.body.style.overflow = 'hidden';
        lb.addEventListener('click', () => { lb.remove(); document.body.style.overflow = ''; });
    });
});

// ===== PARALLAX HERO =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < 600) {
        hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
        hero.style.opacity = 1 - (window.scrollY * 0.0015);
    }
});

// ===== THEME SWITCHER (BOY/GIRL) =====
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('hh-theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

const splash = document.getElementById('splashOverlay');
const savedTheme = localStorage.getItem('hh-theme');

if (savedTheme) {
    splash.classList.add('hidden');
    setTheme(savedTheme);
} else {
    document.body.style.overflow = 'hidden';
}

document.getElementById('chooseGirl').addEventListener('click', () => {
    setTheme('girl'); splash.classList.add('hidden'); document.body.style.overflow = '';
});
document.getElementById('chooseBoy').addEventListener('click', () => {
    setTheme('boy'); splash.classList.add('hidden'); document.body.style.overflow = '';
});
document.getElementById('splashSkip').addEventListener('click', () => {
    setTheme('girl'); splash.classList.add('hidden'); document.body.style.overflow = '';
});

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// ===== LANGUAGE SWITCHER =====
const translations = {
    ru: {
        'Avaleht': 'Главная', 'Mängutuba': 'Игровая', 'Hinnakiri': 'Цены',
        'Galerii': 'Галерея', 'KKK': 'FAQ', 'Broneeri': 'Бронируй',
        'Privaatne mängutuba Jüris': 'Приватная игровая в Юри',
        'Broneeri pidu': 'Забронировать', 'Vaata tuuri': 'Смотреть тур',
        '14/14 soovitavad': '14/14 рекомендуют', '2 korrust': '2 этажа',
        '100% privaatne': '100% приватно',
        '100% Privaatne': '100% Приватно', 'Kõik kaasa arvatud': 'Всё включено',
        'Päikeseloojanguvaade': 'Вид на закат', 'Beebisõbralik': 'Для малышей',
        'Avasta meie mängutuba': 'Откройте нашу игровую',
        'Hinnakiri': 'Цены', 'Galerii': 'Галерея',
        'Mida pered arvavad?': 'Что думают семьи?',
        'Korduma kippuvad küsimused': 'Часто задаваемые вопросы',
        'Broneeri oma pidu': 'Забронируйте праздник',
        'Saada päring': 'Отправить запрос',
        'Valmis korraldama unistuste pidu?': 'Готовы устроить праздник мечты?',
        'Helista 507 0336': 'Звоните 507 0336',
        'Kirjuta Facebookis': 'Пишите в Facebook',
    }
};
const origTexts = new Map();

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (lang === 'ru') {
            document.querySelectorAll('[data-ru]').forEach(el => {
                if (!origTexts.has(el)) origTexts.set(el, el.textContent);
                el.textContent = el.dataset.ru;
            });
            document.querySelectorAll('.nav-link, .btn, h1, h2, h3').forEach(el => {
                const t = el.textContent.trim();
                if (translations.ru[t] && !el.dataset.ru) {
                    if (!origTexts.has(el)) origTexts.set(el, el.textContent);
                    el.textContent = translations.ru[t];
                }
            });
        } else {
            origTexts.forEach((orig, el) => { el.textContent = orig; });
        }
    });
});

// ===== BOOKING FORM =====
const dateInput = document.getElementById('date');
if (dateInput) dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
