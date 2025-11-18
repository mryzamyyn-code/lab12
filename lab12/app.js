const app = document.getElementById("app");

// Проверяем токен при загрузке
const savedToken = localStorage.getItem("jwt_token");

// Если токен есть → показываем экран входа
if (savedToken) {
    showLoggedIn(savedToken);
} else {
    showLoginForm();
}

// ====== ФОРМА ЛОГИНА ======
function showLoginForm() {
    app.innerHTML = `
        <div class="container">
            <h2>Вход</h2>
            <input id="email" type="email" placeholder="E-mail" required />
            <input id="password" type="password" placeholder="Пароль" required />
            <button id="loginBtn">Войти</button>
        </div>
    `;

    document.getElementById("loginBtn").onclick = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Введите e-mail и пароль");
            return;
        }

        // Создаём фейковый токен
        const fakeToken = "fake-jwt-" + btoa(email + "-" + Date.now());

        // Сохраняем в хранилище
        localStorage.setItem("jwt_token", fakeToken);

        // Показываем экран входа
        showLoggedIn(fakeToken);
    };
}

// ====== ЭКРАН ПОСЛЕ ВХОДА ======
function showLoggedIn(token) {
    app.innerHTML = `
        <div class="container">
            <h2>Вы вошли!</h2>
            <p style="word-break: break-all; font-size: 12px;">Токен:</p>
            <p style="word-break: break-all; font-size: 12px; background: #eee; padding: 6px; border-radius: 8px;">${token}</p>
            <button class="logout-btn" id="logoutBtn">Выход</button>
        </div>
    `;

    document.getElementById("logoutBtn").onclick = () => {
        localStorage.removeItem("jwt_token");
        showLoginForm();
    };
}
