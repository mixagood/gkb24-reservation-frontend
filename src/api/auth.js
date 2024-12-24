const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_STORAGE_KEY = 'access_token';

async function registerUser(userId) {
    // Регистрация
    const reqBody = {
        email: `${userId}@bot.tg`,
        password: "password",
        is_active: true,
        is_superuser: false,
        is_verified: true,
        first_name: "string",
        birthdate: "2000-01-01"
    }

    const url = 'http://127.0.0.1:8000/auth/register/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody)
        });

        if (!response.ok) {
            const errorData = await response.json(); // Чтение данных об ошибке
            throw new Error(`Ошибка ${response.status}: ${errorData.message || response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Ошибка при регистрации:", error.message);
        throw error; // Пробрасываем ошибку дальше для обработки
    }
}

export async function getAuthToken(userId) {

    userId = '519242067';

    try {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', `${userId}@bot.tg`);
        formData.append('password', 'password');

        const response = await fetch(`${BASE_URL}/auth/jwt/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            console.error('Ошибка аутентификации:', response.statusText);
            return null;
        }

        const data = await response.json();
        const accessToken = data.access_token;

        // Сохраняем токен в localStorage
        localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);

        return accessToken;
    } catch (error) {
        console.error('Ошибка при получении токена аутентификации:', error.message);
        return null;
    }
}

// Получение токена из хранилища
export function getStoredToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
}

// Удаление токена из хранилища (выход пользователя)
export function removeToken() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// Обновление токена (если поддерживается сервером)
export async function refreshToken(userId) {

    userId = '519242067';

    try {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', `${userId}@bot.tg`);
        formData.append('password', 'password');

        const response = await fetch(`${BASE_URL}/auth/jwt/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            console.error('Ошибка аутентификации:', response.statusText);
            return null;
        }

        const data = await response.json();
        const accessToken = data.access_token;

        // Сохраняем токен в localStorage
        localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);

        return accessToken;
    } catch (error) {
        console.error('Ошибка при получении токена аутентификации:', error.message);
        return null;
    }
}