/* === СКРИПТИ ДЛЯ ОНЛАЙН МАГАЗИНУ === */

// Глобальні змінні
let currentSection = 'menu';
let cartItems = [];
let userProfile = {
    name: '',
    email: '',
    isLoggedIn: false
};

// Функція для відкриття каталогу
function openCatalog() {
    updateStatus('Відкриваємо каталог товарів...', 'catalog');
    animateButton(event.target);
    
    setTimeout(() => {
        updateStatus('Каталог товарів (поки в розробці)', 'catalog');
    }, 1000);
}

// Функція для відкриття кошика
function openCart() {
    updateStatus('Відкриваємо кошик покупок...', 'cart');
    animateButton(event.target);
    
    setTimeout(() => {
        const itemCount = cartItems.length;
        updateStatus(`Кошик: ${itemCount} товарів (поки в розробці)`, 'cart');
    }, 1000);
}

// Функція для відкриття профілю
function openProfile() {
    updateStatus('Відкриваємо профіль користувача...', 'profile');
    animateButton(event.target);
    
    setTimeout(() => {
        const status = userProfile.isLoggedIn ? 
            `Привіт, ${userProfile.name}! (поки в розробці)` : 
            'Увійдіть в свій профіль (поки в розробці)';
        updateStatus(status, 'profile');
    }, 1000);
}

// Функція для оновлення статусу
function updateStatus(message, section = 'menu') {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    
    // Змінюємо колір фону залежно від розділу
    statusElement.style.background = getSectionColor(section);
    
    currentSection = section;
}

// Функція для отримання кольору розділу
function getSectionColor(section) {
    const colors = {
        'menu': 'rgba(102, 126, 234, 0.1)',
        'catalog': 'rgba(255, 107, 107, 0.1)',
        'cart': 'rgba(81, 207, 102, 0.1)',
        'profile': 'rgba(255, 212, 59, 0.1)'
    };
    return colors[section] || colors['menu'];
}

// Анімація кнопки при натисканні
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Ініціалізація при завантаженні сторінки
window.addEventListener('load', function() {
    console.log('Онлайн магазин завантажено успішно!');
    
    // Симуляція завантаження даних
    setTimeout(() => {
        updateStatus('Готово до роботи! Оберіть розділ.');
    }, 500);
});

// Обробка помилок
window.addEventListener('error', function(e) {
    console.error('Помилка:', e.error);
    updateStatus('Виникла помилка. Спробуйте оновити сторінку.');
});

// Додаткові функції для майбутнього розвитку

// Функція для додавання товару в кошик
function addToCart(item) {
    cartItems.push(item);
    console.log('Товар додано в кошик:', item);
}

// Функція для видалення товару з кошика
function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    console.log('Товар видалено з кошика');
}

// Функція для входу користувача
function loginUser(name, email) {
    userProfile.name = name;
    userProfile.email = email;
    userProfile.isLoggedIn = true;
    console.log('Користувач увійшов:', name);
}

// Функція для виходу користувача
function logoutUser() {
    userProfile = {
        name: '',
        email: '',
        isLoggedIn: false
    };
    console.log('Користувач вийшов');
}
