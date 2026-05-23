// --- SECTIONS SCROLL TRACKER (SCROLL SPY) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Offset by header height (approx 80px) for accuracy
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
// --- THEME PICKER & DARK MODE ---
const body = document.body;
const themeDots = document.querySelectorAll('.theme-dot');
const darkToggle = document.getElementById('dark-toggle');
// Initialize saved theme or default
let currentTheme = localStorage.getItem('portfolio-theme') || 'lime';
let isDarkMode = localStorage.getItem('portfolio-dark-mode') === 'true';
// Apply saved theme state on load
applyTheme(currentTheme);
applyDarkMode(isDarkMode);
// Theme selection dot click handler
themeDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const themeName = e.target.getAttribute('data-select-theme');
    applyTheme(themeName);
  });
});
// Dark mode toggle click handler
darkToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  applyDarkMode(isDarkMode);
});
function applyTheme(themeName) {
  // Reset theme dataset
  body.removeAttribute('data-theme');
  if (themeName !== 'lime') {
    body.setAttribute('data-theme', themeName);
  }
  
  // Highlight active dot
  themeDots.forEach(dot => {
    if (dot.getAttribute('data-select-theme') === themeName) {
      dot.style.transform = 'scale(1.3) rotate(15deg)';
      dot.style.borderWidth = '3px';
    } else {
      dot.style.transform = 'none';
      dot.style.borderWidth = '2px';
    }
  });
  
  currentTheme = themeName;
  localStorage.setItem('portfolio-theme', themeName);
}
function applyDarkMode(enableDark) {
  if (enableDark) {
    body.setAttribute('data-theme', body.getAttribute('data-theme') || '');
    // Ensure "dark" is appended or prefixed properly
    body.classList.add('dark-theme');
    // Let's use data-theme hierarchy helper
    const currentThemeAttr = body.getAttribute('data-theme') || '';
    body.setAttribute('data-theme', 'dark');
    if (currentTheme !== 'lime') {
      // Re-apply specific theme color on top of dark mode
      body.setAttribute('data-theme', `dark`);
      // Standard css variables switch automatically via media or custom selector
    }
    // Set class instead for cleaner multi-theme dark combination
    document.documentElement.setAttribute('data-theme', 'dark');
    if (currentTheme !== 'lime') {
      body.setAttribute('data-theme', currentTheme);
    }
    darkToggle.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (currentTheme !== 'lime') {
      body.setAttribute('data-theme', currentTheme);
    } else {
      body.removeAttribute('data-theme');
    }
    darkToggle.textContent = '🌓';
  }
  isDarkMode = enableDark;
  localStorage.setItem('portfolio-dark-mode', enableDark);
}
// --- SKILL DETAILS MODAL DIALOG ---
const skillModal = document.getElementById('skill-modal');
const modalTitle = document.getElementById('modal-skill-title');
const modalBody = document.getElementById('modal-skill-body');
const modalCloseBtn = document.getElementById('modal-close-btn');
const skillTriggers = document.querySelectorAll('[data-skill-trigger]');
const skillDetails = {
  html: {
    title: 'HTML5 & Доступность (A11y)',
    content: `
      <p>Создание чистой, семантической разметки является основой быстродействия и доступности веб-сайтов. Мой стек навыков включает:</p>
      <ul>
        <li><strong>Семантические теги HTML5:</strong> Грамотное использование элементов <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code> и т.д., что ускоряет загрузку и улучшает чтение страницы экранными дикторами.</li>
        <li><strong>Стандарты доступности (WAI-ARIA):</strong> Интеграция необходимых ролей и атрибутов для людей с ограниченными возможностями, обеспечение полной поддержки навигации с клавиатуры.</li>
        <li><strong>SEO-оптимизация:</strong> Корректное структурирование заголовков H1-H6, настройка мета-тегов Open Graph для красивого шеринга в соцсетях и микроразметки Schema.org для поисковых роботов.</li>
      </ul>
      <p style="margin-top: 15px; font-weight: bold; border-left: 4px solid var(--primary-color); padding-left: 10px;">Результат: Сайты отлично индексируются поисковиками и удобны для всех пользователей без исключения!</p>
    `
  },
  css: {
    title: 'Современный CSS3 & Анимации',
    content: `
      <p>Стилизация — это душа интерфейса. Я создаю визуально богатые и гибкие адаптивные макеты, используя передовые CSS-технологии:</p>
      <ul>
        <li><strong>Сетки и раскладки:</strong> Экспертное владение CSS Grid Layout (динамические сетки, области grid-areas, автозаполнение auto-fit) и Flexbox для идеального резинового интерфейса.</li>
        <li><strong>CSS переменные (Custom Properties):</strong> Создание гибких дизайн-систем, переключение цветовых палитр и тем оформления в реальном времени в одну строчку кода.</li>
        <li><strong>Анимации и переходы:</strong> Создание микро-взаимодействий на чистом CSS с использованием ключевых кадров <code>@keyframes</code> и 3D-трансформаций, которые оживляют интерфейс и заставляют его реагировать на действия пользователя.</li>
      </ul>
      <p style="margin-top: 15px; font-weight: bold; border-left: 4px solid var(--primary-color); padding-left: 10px;">Результат: Адаптивный, потрясающий дизайн, который идеально выглядит как на 4K-мониторах, так и на экранах старых смартфонов!</p>
    `
  },
  python: {
    title: 'Python для Веба и Парсинга',
    content: `
      <p>Помимо фронтенда, я использую мощный серверный бэкенд на Python для автоматизации рутины и работы со сложными данными:</p>
      <ul>
        <li><strong>Создание быстрых API:</strong> Разработка легковесных серверных приложений на FastAPI и Django REST Framework для обмена данными между клиентом и сервером.</li>
        <li><strong>Сбор и парсинг данных:</strong> Создание высокоскоростных асинхронных скраперов на BeautifulSoup4, Scrapy и Playwright для парсинга веб-страниц и агрегации контента.</li>
        <li><strong>Автоматизация задач:</strong> Написание консольных скриптов для обработки объемных файлов, автоматической загрузки ассетов и отправки Telegram-уведомлений.</li>
      </ul>
      <p style="margin-top: 15px; font-weight: bold; border-left: 4px solid var(--primary-color); padding-left: 10px;">Результат: Полноценные фуллстек-решения, способные собирать, обрабатывать данные и выводить их в красивый интерфейс!</p>
    `
  }
};
// Open Modal
skillTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const skillKey = trigger.getAttribute('data-skill-trigger');
    const data = skillDetails[skillKey];
    
    if (data) {
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.content;
      skillModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
  });
});
// Close Modal
modalCloseBtn.addEventListener('click', closeModal);
skillModal.addEventListener('click', (e) => {
  if (e.target === skillModal) {
    closeModal();
  }
});
// Handle Esc Key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && skillModal.classList.contains('active')) {
    closeModal();
  }
});
function closeModal() {
  skillModal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}
// --- CONTACT FORM HANDLER (REAL EMAIL INBOX DELIVERIES VIA FORMSUBMIT.CO) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop standard page reload
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка... ⏳';
    submitBtn.disabled = true;
    
    const nameVal = document.getElementById('user-name').value;
    const emailVal = document.getElementById('user-email').value;
    const messageVal = document.getElementById('user-message').value;
    
    const formData = {
      name: nameVal,
      email: emailVal,
      message: messageVal,
      _subject: 'Новое сообщение с бруталистского портфолио ЖАМП!'
    };
    
    fetch('https://formsubmit.co/ajax/matvejnik444@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Create and show premium neo-brutalist success modal pop-up
      const alertOverlay = document.createElement('div');
      alertOverlay.className = 'modal-overlay active';
      alertOverlay.style.zIndex = '2000';
      
      alertOverlay.innerHTML = `
        <div class="neo-box modal-content" style="background-color: var(--primary-color); color: #000; padding: 32px; text-align: center; border-width: 4px;">
          <h2 style="font-family: var(--font-display); font-size: 24px; font-weight: 900; margin-bottom: 16px; text-transform: uppercase;">Сообщение отправлено! ⚡</h2>
          <p style="font-family: var(--font-serif); font-size: 15px; margin-bottom: 24px; font-weight: 500;">
            Спасибо, <strong>${nameVal}</strong>! Ваше сообщение успешно отправлено. Письмо уже летит на почту ЖАМПа. Мы ответим вам на <strong>${emailVal}</strong> в самое ближайшее время.
          </p>
          <button class="neo-btn" id="success-close-btn" style="background-color: #000; color: #fff; box-shadow: 4px 4px 0px #fff; width: 150px;">ОТЛИЧНО!</button>
        </div>
      `;
      
      document.body.appendChild(alertOverlay);
      document.body.style.overflow = 'hidden';
      
      document.getElementById('success-close-btn').addEventListener('click', () => {
        alertOverlay.classList.remove('active');
        setTimeout(() => alertOverlay.remove(), 300);
        document.body.style.overflow = '';
        contactForm.reset(); // Reset form
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Произошла ошибка при отправке сообщения через сеть. Попробуйте еще раз или напишите напрямую на matvejnik444@gmail.com');
    })
    .finally(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
  });
}
