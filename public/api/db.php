<?php
declare(strict_types=1);

require_once __DIR__ . '/env.php';

function db_config(): array
{
    return [
        'host' => getenv('DB_HOST') ?: '208.122.192.70',
        'dbname' => getenv('DB_NAME') ?: 'dmcaf',
        'username' => getenv('DB_USER') ?: 'dmca_admin',
        'password' => getenv('DB_PASS') ?: 'DogfFQoSi8EVjIN',
    ];
}

function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = db_config();
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        $config['host'],
        $config['dbname']
    );

    try {
        $pdo = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        error_log('Database connection failed: ' . $e->getMessage());
        http_response_code(500);
        exit('Database Connection Failed');
    }

    return $pdo;
}

// Keep a legacy $pdo variable available for older scripts.
$pdo = db();
