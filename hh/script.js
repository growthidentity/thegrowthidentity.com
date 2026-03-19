// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
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
            const offset = 80;
            const position = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
        if (!isActive) item.classList.add('active');
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

['.usp-card', '.about-feature', '.tour-card', '.included-item',
 '.price-card', '.gallery-item', '.testimonial-card', '.faq-item',
 '.event-card', '.contact-card', '.extra-card', '.addon-card',
 '.blog-card', '.ig-item'].forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = link.getAttribute('href') === `#${id}` ? '#e91e8c' : '';
            });
        }
    });
});

// ===== GALLERY LIGHTBOX =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        const lightbox = document.createElement('div');
        lightbox.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:10000;cursor:pointer;padding:24px;';
        const lbImg = document.createElement('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,0.3);';
        lightbox.appendChild(lbImg);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        lightbox.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
    });
});

// ===== PARALLAX on Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < 800) {
        hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        hero.style.opacity = 1 - (window.scrollY * 0.001);
    }
});

// ===== LANGUAGE SWITCHER (ET/RU) =====
const translations = {
    ru: {
        // Nav
        'Avaleht': 'Главная', 'Meist': 'О нас', 'Mängutuba': 'Игровая',
        'Hinnakiri': 'Цены', 'Galerii': 'Галерея', 'KKK': 'FAQ', 'Broneeri': 'Бронируй',
        // Hero
        'Jüri suurim ja ägedaim mängutuba!': 'Самая большая и крутая игровая в Юри!',
        'Broneeri pidu': 'Забронировать праздник',
        'Avasta mängutuba': 'Открой игровую',
        '100% soovitavad': '100% рекомендуют',
        '500+ õnnelikku peret': '500+ счастливых семей',
        '2 korrust mänguala': '2 этажа игровой зоны',
        // Social proof
        'õnnelikku peret': 'счастливых семей',
        'soovitavad Facebookis': 'рекомендуют в Facebook',
        'korrust mänguala': 'этажа игровой зоны',
        'suurim mängutuba': 'самая большая игровая',
        // USP
        '100% Privaatne': '100% Приватно',
        'Jüri suurim': 'Самая большая в Юри',
        'Päikeseloojanguvaade': 'Вид на закат',
        'Beebisõbralik': 'Для малышей',
        // Pricing
        'Vali sobiv aeg': 'Выберите удобное время',
        'Soodsaim': 'Выгоднее',
        'Populaarne': 'Популярно',
        'Tööpäev hommik': 'Будни утро',
        'Tööpäev pärastlõuna / õhtu': 'Будни день / вечер',
        'Nädalavahetus': 'Выходные',
        'Reede': 'Пятница',
        '3 tundi privaatset kasutust': '3 часа приватного использования',
        'Kogu mängutuba teie päralt': 'Вся игровая только для вас',
        'Kohv, tee ja köök kaasas': 'Кофе, чай и кухня включены',
        'Tasuta parkimine': 'Бесплатная парковка',
        'Ideaalne sünnipäevaks!': 'Идеально для дня рождения!',
        // FAQ
        'Korduma kippuvad küsimused': 'Часто задаваемые вопросы',
        'Mis vanuses lastele mängutuba sobib?': 'Для какого возраста подходит игровая?',
        'Mitu last mahub korraga?': 'Сколько детей вмещается?',
        'Kas toitu võib ise kaasa tuua?': 'Можно ли приносить свою еду?',
        'Kuidas broneerimine käib?': 'Как забронировать?',
        'Kas parkimine on tasuta?': 'Парковка бесплатная?',
        'Kas kaunistused on kaasa arvatud?': 'Украшения включены?',
        'Miks peavad kõik sokke kandma?': 'Почему все должны быть в носках?',
        // Events
        'Sobib igaks puhuks!': 'Подходит для любого случая!',
        'Sünnipäevapeod': 'Дни рождения',
        'Pereüritused': 'Семейные события',
        'Firmaüritused': 'Корпоративы',
        'Laste disko': 'Детская дискотека',
        // Testimonials
        'Mida pered arvavad?': 'Что думают семьи?',
        // Footer
        'Lingid': 'Ссылки', 'Kontakt': 'Контакт',
        // Comparison
        'Hüppa&Hulla eelis': 'Преимущество Hüppa&Hulla',
        // CTA
        'Valmis korraldama unistuste pidu?': 'Готовы устроить праздник мечты?',
        'Helista 507 0336': 'Звоните 507 0336',
        'Kirjuta Facebookis': 'Пишите в Facebook',
    }
};

const originalTexts = new Map();

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (lang === 'ru') {
            // Switch to Russian using data-ru attributes first, then translations map
            document.querySelectorAll('[data-ru]').forEach(el => {
                if (!originalTexts.has(el)) originalTexts.set(el, el.textContent);
                el.textContent = el.dataset.ru;
            });
            // Also translate nav links and other text nodes
            document.querySelectorAll('.nav-link, .proof-label, .price-features li, .btn, h1, h2, h3, p, span, button, label, option').forEach(el => {
                const text = el.textContent.trim();
                if (translations.ru[text] && !el.dataset.ru) {
                    if (!originalTexts.has(el)) originalTexts.set(el, el.textContent);
                    el.textContent = translations.ru[text];
                }
            });
            document.documentElement.lang = 'ru';
        } else {
            // Switch back to Estonian
            originalTexts.forEach((original, el) => {
                el.textContent = original;
            });
            document.documentElement.lang = 'et';
        }
    });
});

// ===== THEME SWITCHER (BOY/GIRL) =====
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('hh-theme', theme);

    // Update toggle buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

// Splash screen
const splash = document.getElementById('splashOverlay');
const savedTheme = localStorage.getItem('hh-theme');

if (savedTheme) {
    // Already chose before — skip splash
    splash.classList.add('hidden');
    setTheme(savedTheme);
} else {
    document.body.style.overflow = 'hidden';
}

document.getElementById('chooseGirl').addEventListener('click', () => {
    setTheme('girl');
    splash.classList.add('hidden');
    document.body.style.overflow = '';
});

document.getElementById('chooseBoy').addEventListener('click', () => {
    setTheme('boy');
    splash.classList.add('hidden');
    document.body.style.overflow = '';
});

document.getElementById('splashSkip').addEventListener('click', () => {
    setTheme('girl');
    splash.classList.add('hidden');
    document.body.style.overflow = '';
});

// Theme toggle buttons (always visible)
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// ===== AI INVITATION GENERATOR =====
const genBtn = document.getElementById('generateInvitation');
if (genBtn) {
    // Set min date to today
    const invDateEl = document.getElementById('invDate');
    if (invDateEl) invDateEl.setAttribute('min', new Date().toISOString().split('T')[0]);

    genBtn.addEventListener('click', async () => {
        const email = document.getElementById('invEmail').value.trim();
        const name = document.getElementById('invName').value.trim();
        const age = document.getElementById('invAge').value.trim();
        const date = document.getElementById('invDate').value;
        const time = document.getElementById('invTime').value.trim();
        const theme = document.getElementById('invTheme').value.trim();

        // Validate
        if (!email || !name || !age || !date || !time) {
            alert('Palun täida kõik kohustuslikud väljad!');
            return;
        }

        // Show loading
        document.getElementById('invForm').style.display = 'none';
        document.getElementById('invPreview').style.display = 'none';
        document.getElementById('invResults').style.display = 'none';
        const loading = document.getElementById('invLoading');
        loading.style.display = 'block';

        try {
            const res = await fetch('/api/generate-invitation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, age, date, time, theme, email })
            });

            const data = await res.json();

            if (data.success && data.images) {
                // Show results
                loading.style.display = 'none';
                const results = document.getElementById('invResults');
                results.style.display = 'block';

                document.getElementById('invResult1').src = data.images[0];
                document.getElementById('invResult2').src = data.images[1];
                document.getElementById('invDl1').href = data.images[0];
                document.getElementById('invDl1').download = `kutse_${name.toLowerCase().replace(/\s/g, '_')}_1.png`;
                document.getElementById('invDl2').href = data.images[1];
                document.getElementById('invDl2').download = `kutse_${name.toLowerCase().replace(/\s/g, '_')}_2.png`;
            } else {
                throw new Error(data.error || 'Genereerimine ebaõnnestus');
            }
        } catch (err) {
            loading.style.display = 'none';
            document.getElementById('invForm').style.display = 'block';
            document.getElementById('invPreview').style.display = 'flex';
            alert('Viga: ' + err.message + '\n\nPalun proovi uuesti.');
        }
    });
}

// ===== BOOKING FORM HANDLING =====
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // Set min date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Saadan...';
        submitBtn.disabled = true;

        // FormSubmit.co handles the actual submission
        // Show success after redirect
        setTimeout(() => {
            submitBtn.textContent = 'Saadetud!';
            submitBtn.style.background = '#a8f0d4';
        }, 2000);
    });
}
