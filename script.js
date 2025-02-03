// Маппинг технологий на иконки Font Awesome
const techIcons = {
    'HTML5': 'fab fa-html5',
    'CSS3': 'fab fa-css3-alt',
    'JavaScript': 'fab fa-js-square',
    'React': 'fab fa-react',
    'Node.js': 'fab fa-node'
};

// Данные проектов
const projects = [
    {
        title: 'Блог "Мир Вдохновления"',
        description: 'Рассказывается о разных городах мира',
        tech: ['HTML5', 'CSS3', 'JavaScript']
    },
    {
        title: 'Магазин бытовой продукции',
        description: 'Лендинг для магазина',
        tech: ['HTML5', 'CSS3', 'JavaScript']
    },
    {
        title: 'Личный почтовый ящик',
        description: 'Отправка писем через Gmail',
        tech: ['HTML5', 'CSS3', 'JavaScript']
    }
];

// Функция для генерации баджей технологий
function createTechBadges(techArray) {
    return techArray.map(tech => {
        const iconClass = techIcons[tech] || 'fas fa-code'; // Иконка по умолчанию
        return `
      <div class="tech-badge">
        <i class="${iconClass}"></i>
        ${tech}
      </div>
    `;
    }).join('');
}

// Генерация проектов
const projectsContainer = document.querySelector('.projects');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';

    projectCard.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="tech-stack">
      ${createTechBadges(project.tech)}
    </div>
  `;

    projectsContainer.appendChild(projectCard);
});

// Обработка формы
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('alert');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.querySelector('.btn-text').style.opacity = '0';
    btn.querySelector('.loader').style.display = 'block';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset();
            showAlert('Сообщение успешно отправлено!', 'success');
        } else {
            throw new Error('Ошибка отправки');
        }
    } catch (error) {
        showAlert('Ошибка отправки. Попробуйте снова.', 'error');
    } finally {
        btn.disabled = false;
        btn.querySelector('.btn-text').style.opacity = '1';
        btn.querySelector('.loader').style.display = 'none';
    }
});

function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Переключатель темы
const themeSwitcher = document.querySelector('.theme-switcher');
themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeSwitcher.querySelector('i').classList.toggle('fa-sun');
    themeSwitcher.querySelector('i').classList.toggle('fa-moon');
});