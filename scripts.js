/* === СКРИПТИ ДЛЯ ОНЛАЙН МАГАЗИНУ === */

// Глобальні змінні
let currentSection = 'menu';
let cartItems = [];
let userProfile = {
    name: '',
    email: '',
    phone: '',
    isLoggedIn: false
};

// Зберігаємо користувачів (в реальному проекті це буде база даних)
let registeredUsers = [];

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
        showCartModal();
        updateStatus(`Кошик відкрито`, 'cart');
    }, 500);
}

// Функція для відкриття профілю
function openProfile() {
    updateStatus('Відкриваємо профіль користувача...', 'profile');
    animateButton(event.target);
    
    setTimeout(() => {
        if (userProfile.isLoggedIn) {
            showUserProfile();
        } else {
            showModal();
        }
        updateStatus('Профіль відкрито', 'profile');
    }, 500);
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
function loginUser(name, email, phone) {
    userProfile.name = name;
    userProfile.email = email;
    userProfile.phone = phone;
    userProfile.isLoggedIn = true;
    console.log('Користувач увійшов:', name);
}

// Функція для виходу користувача
function logoutUser() {
    userProfile = {
        name: '',
        email: '',
        phone: '',
        isLoggedIn: false
    };
    console.log('Користувач вийшов');
}

// === ФУНКЦІЇ ДЛЯ РОБОТИ З МОДАЛЬНИМИ ВІКНАМИ ===

// Показати модальне вікно
function showModal() {
    document.getElementById('profileModal').style.display = 'block';
    showProfileMenu();
}

// Закрити модальне вікно
function closeModal() {
    document.getElementById('profileModal').style.display = 'none';
    hideAllForms();
}

// Сховати всі форми
function hideAllForms() {
    document.getElementById('profileMenu').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('userProfile').style.display = 'none';
}

// Показати головне меню профілю
function showProfileMenu() {
    hideAllForms();
    document.getElementById('profileMenu').style.display = 'block';
}

// Показати форму входу
function showLoginForm() {
    hideAllForms();
    document.getElementById('loginForm').style.display = 'block';
}

// Показати форму реєстрації
function showRegisterForm() {
    hideAllForms();
    document.getElementById('registerForm').style.display = 'block';
}

// Показати профіль користувача
function showUserProfile() {
    hideAllForms();
    document.getElementById('userProfile').style.display = 'block';
    
    // Заповнюємо дані користувача
    document.getElementById('userName').textContent = userProfile.name;
    document.getElementById('userEmail').textContent = userProfile.email;
    document.getElementById('userPhone').textContent = userProfile.phone;
    
    showModal();
}

// === ОБРОБКА ФОРМ ===

// Обробка форми входу
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Перевіряємо чи існує користувач
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        loginUser(user.name, user.email, user.phone);
        showUserProfile();
        updateStatus(`Вітаємо, ${user.name}!`, 'profile');
    } else {
        alert('Неправильний email або пароль!');
    }
    
    // Очищаємо форму
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

// Обробка форми реєстрації
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerPhone').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Перевіряємо чи користувач вже існує
    const existingUser = registeredUsers.find(u => u.email === email);
    
    if (existingUser) {
        alert('Користувач з таким email вже існує!');
        return;
    }
    
    // Перевіряємо валідність email
    if (!email.includes('@gmail.com')) {
        alert('Будь ласка, використовуйте Gmail адресу!');
        return;
    }
    
    // Створюємо нового користувача
    const newUser = { name, phone, email, password };
    registeredUsers.push(newUser);
    
    // Автоматично входимо в систему
    loginUser(name, email, phone);
    showUserProfile();
    updateStatus(`Реєстрація успішна! Вітаємо, ${name}!`, 'profile');
    
    // Очищаємо форму
    document.getElementById('registerName').value = '';
    document.getElementById('registerPhone').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
}

// Обробка виходу
function handleLogout() {
    logoutUser();
    closeModal();
    updateStatus('Ви вийшли з системи', 'menu');
}

// Закриття модального вікна при кліку поза ним
window.onclick = function(event) {
    const modal = document.getElementById('profileModal');
    if (event.target === modal) {
        closeModal();
    }
}
