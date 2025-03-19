-- Инициализация базы данных
-- Создание базы данных выполняем отдельно, так как уже в ней нельзя выполнять запросы
-- create database balance_db;

-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (balance >= 0)
);

-- Создание таблицы продуктов
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    cost DECIMAL(15, 2) NOT NULL DEFAULT 0 
);

-- Создание таблицы покупок
CREATE TABLE IF NOT EXISTS purchases (
    purchases_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Индекс для быстрого поиска пользователей
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);
-- Индекс для поиска покупок по пользователю
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- Создание триггерной функции для проверки отрицательного баланса
CREATE OR REPLACE FUNCTION check_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.balance < 0 THEN
        RAISE EXCEPTION 'Balance cannot be negative';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создание триггера для проверки баланса при обновлении
DROP TRIGGER IF EXISTS trigger_check_balance ON users;
CREATE TRIGGER trigger_check_balance
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION check_balance();

-- Вставка тестовых данных (только если таблицы пустые)
INSERT INTO users (balance)
SELECT * FROM (
    VALUES (1000), (2000), (3000)
) AS data
WHERE NOT EXISTS (SELECT 1 FROM users);

INSERT INTO products (cost)
SELECT * FROM (
    VALUES (100), (200), (300)
) AS data
WHERE NOT EXISTS (SELECT 1 FROM products);

