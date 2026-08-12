<?php
declare(strict_types=1);

$to = 'anuj21srivastava21@gmail.com';

function redirect_to(string $url): void
{
    header('Location: ' . $url, true, 303);
    exit;
}

function build_redirect(string $status): string
{
    return '/contact/?intake=' . rawurlencode($status) . '#submit-infringement';
}

function missing_response(): void
{
    redirect_to(build_redirect('missing'));
}

function request_value(string $key, bool $preserveNewlines = false): string
{
    $value = $_POST[$key] ?? '';

    if (is_array($value)) {
        $value = implode(', ', $value);
    }

    $value = (string) $value;

    if ($preserveNewlines) {
        return trim(str_replace("\0", '', $value));
    }

    return trim(str_replace(["\r", "\n", "\0"], ' ', $value));
}

function truncate_value(?string $value, int $length): ?string
{
    if ($value === null) {
        return null;
    }

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $length);
    }

    return substr($value, 0, $length);
}

function client_ip(): string
{
    $candidates = [
        $_SERVER['HTTP_CF_CONNECTING_IP'] ?? '',
        $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '',
        $_SERVER['REMOTE_ADDR'] ?? ''
    ];

    foreach ($candidates as $candidate) {
        $candidate = trim((string) $candidate);
        if ($candidate === '') {
            continue;
        }

        $parts = explode(',', $candidate);
        $ip = trim($parts[0]);

        if ($ip !== '') {
            return $ip;
        }
    }

    return '';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo 'Method Not Allowed';
    exit;
}

$name = request_value('name');
$email = request_value('email');
$company = request_value('company');
$originalContentUrl = request_value('original-content-url');
$infringingUrl = request_value('infringing-url');
$typeOfInfringement = request_value('type-of-infringement');
$ownership = request_value('ownership');
$additionalNotes = request_value('additional-notes', true);
$userAgent = truncate_value($_SERVER['HTTP_USER_AGENT'] ?? '', 255) ?? '';
$ipAddress = truncate_value(client_ip(), 45) ?? '';

$allowedTypes = [
    'Copied image',
    'Copied website content',
    'Fake profile',
    'Counterfeit listing',
    'Clone website',
    'Fake ad',
    'Rogue domain',
    'Other'
];

$allowedOwnership = ['Yes', 'Authorized agent', 'Not sure', 'No'];

$missing = [];

foreach ([
    'name' => $name,
    'email' => $email,
    'original-content-url' => $originalContentUrl,
    'infringing-url' => $infringingUrl,
    'type-of-infringement' => $typeOfInfringement,
    'ownership' => $ownership
] as $field => $value) {
    if ($value === '') {
        $missing[] = $field;
    }
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $missing[] = 'email';
}

if ($originalContentUrl !== '' && !filter_var($originalContentUrl, FILTER_VALIDATE_URL)) {
    $missing[] = 'original-content-url';
}

if ($infringingUrl !== '' && !filter_var($infringingUrl, FILTER_VALIDATE_URL)) {
    $missing[] = 'infringing-url';
}

if ($typeOfInfringement !== '' && !in_array($typeOfInfringement, $allowedTypes, true)) {
    $missing[] = 'type-of-infringement';
}

if ($ownership !== '' && !in_array($ownership, $allowedOwnership, true)) {
    $missing[] = 'ownership';
}

if ($missing !== []) {
    missing_response();
}

// ── Evidence upload handling ────────────────────────────────────────────
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'];
$allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
$maxFileBytes = 10 * 1024 * 1024; // 10MB per file
$maxFiles = 5;

$uploadDir = __DIR__ . '/../uploads/evidence';
$storedFiles = [];

if (isset($_FILES['evidence']) && is_array($_FILES['evidence']['name'] ?? null)) {
    $fileCount = count($_FILES['evidence']['name']);
    for ($i = 0; $i < $fileCount && count($storedFiles) < $maxFiles; $i++) {
        if (($_FILES['evidence']['error'][$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if (($_FILES['evidence']['error'][$i] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
            continue;
        }

        $tmpPath = $_FILES['evidence']['tmp_name'][$i];
        $size = (int) ($_FILES['evidence']['size'][$i] ?? 0);
        if ($size <= 0 || $size > $maxFileBytes) {
            continue;
        }

        $originalName = (string) ($_FILES['evidence']['name'][$i] ?? '');
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        if (!in_array($extension, $allowedExtensions, true)) {
            continue;
        }

        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $tmpPath);
            finfo_close($finfo);
            if (!in_array($mime, $allowedMimes, true)) {
                continue;
            }
        }

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
            file_put_contents($uploadDir . '/.htaccess', "php_flag engine off\nAddHandler default-handler .php\n");
        }

        $safeName = bin2hex(random_bytes(16)) . '.' . $extension;
        $destination = $uploadDir . '/' . $safeName;

        if (move_uploaded_file($tmpPath, $destination)) {
            $storedFiles[] = 'uploads/evidence/' . $safeName;
        }
    }
}

require_once __DIR__ . '/db.php';

try {
    $pdo = db();

    $statement = $pdo->prepare(
        'INSERT INTO infringement_submissions
            (`name`, `email`, `company`, `original_content_url`, `infringing_url`, `type_of_infringement`, `ownership`, `evidence_files`, `additional_notes`, `status`, `ip_address`, `user_agent`)
         VALUES
            (:name, :email, :company, :original_content_url, :infringing_url, :type_of_infringement, :ownership, :evidence_files, :additional_notes, :status, :ip_address, :user_agent)'
    );

    $statement->execute([
        ':name' => truncate_value($name, 120),
        ':email' => truncate_value($email, 190),
        ':company' => $company !== '' ? truncate_value($company, 150) : null,
        ':original_content_url' => truncate_value($originalContentUrl, 2048),
        ':infringing_url' => truncate_value($infringingUrl, 2048),
        ':type_of_infringement' => truncate_value($typeOfInfringement, 80),
        ':ownership' => truncate_value($ownership, 40),
        ':evidence_files' => $storedFiles !== [] ? implode(',', $storedFiles) : null,
        ':additional_notes' => $additionalNotes !== '' ? $additionalNotes : null,
        ':status' => 'new',
        ':ip_address' => $ipAddress,
        ':user_agent' => $userAgent,
    ]);
} catch (Throwable $exception) {
    error_log('ProtectOurBrand infringement submission insert failed: ' . $exception->getMessage());
    redirect_to(build_redirect('error'));
}

// ── PHPMailer ─────────────────────────────────────────────────────────────
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as MailerException;

require_once __DIR__ . '/vendor/phpmailer/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/SMTP.php';

function mailer_config(): array
{
    return [
        'host'      => getenv('SMTP_HOST')      ?: '',
        'port'      => (int) (getenv('SMTP_PORT') ?: 587),
        'username'  => getenv('SMTP_USER')      ?: '',
        'password'  => getenv('SMTP_PASS')      ?: '',
        'from'      => getenv('SMTP_FROM')      ?: 'support@protectourbrand.com',
        'from_name' => getenv('SMTP_FROM_NAME') ?: 'ProtectOurBrand Intake',
    ];
}

$subject = 'ProtectOurBrand Infringement Report - ' . truncate_value($company !== '' ? $company : $name, 80);

$evidenceLinks = array_map(
    static fn(string $path): string => 'https://protectourbrand.com/' . $path,
    $storedFiles
);

$fields = [
    'Name'                    => $name,
    'Email'                   => $email,
    'Company'                 => $company,
    'Original content URL'    => $originalContentUrl,
    'Infringing URL'          => $infringingUrl,
    'Type of infringement'    => $typeOfInfringement,
    'Ownership'                => $ownership,
    'Evidence files'          => implode("\n", $evidenceLinks),
    'Additional notes'        => $additionalNotes,
    'Submitted at'            => gmdate('Y-m-d H:i:s') . ' UTC',
    'IP address'              => $ipAddress,
    'User agent'              => $userAgent,
];

$textLines = [
    'New ProtectOurBrand infringement report',
    str_repeat('=', 48),
    '',
];

$htmlRows = '';
foreach ($fields as $label => $value) {
    $display = $value !== '' ? nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8')) : '<em style="color:#999">(not provided)</em>';
    $textLines[] = $label . ': ' . ($value !== '' ? $value : '(not provided)');
    $htmlRows .= '<tr><td style="padding:6px 12px;font-weight:600;white-space:nowrap;color:#374151;background:#f9fafb;border-bottom:1px solid #e5e7eb">'
               . htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
               . '</td><td style="padding:6px 12px;color:#111827;border-bottom:1px solid #e5e7eb">'
               . $display
               . '</td></tr>';
}

$textBody = implode("\n", $textLines);

$htmlBody = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:system-ui,sans-serif;background:#f3f4f6;margin:0;padding:24px">'
    . '<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb">'
    . '<div style="background:#0f172a;padding:20px 24px">'
    . '<h1 style="margin:0;font-size:18px;color:#fff">ProtectOurBrand — New Infringement Report</h1>'
    . '</div>'
    . '<div style="padding:20px 24px">'
    . '<table style="width:100%;border-collapse:collapse;font-size:14px">'
    . $htmlRows
    . '</table>'
    . '</div>'
    . '<div style="padding:12px 24px;background:#f9fafb;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb">'
    . 'Submitted via ProtectOurBrand.com &nbsp;·&nbsp; Do not reply to this automated message.'
    . '</div>'
    . '</div></body></html>';

$cfg = mailer_config();

$mail = new PHPMailer(true);
try {
    if ($cfg['host'] !== '') {
        $mail->isSMTP();
        $mail->Host       = $cfg['host'];
        $mail->Port       = $cfg['port'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $cfg['username'];
        $mail->Password   = $cfg['password'];
        $mail->SMTPSecure = $cfg['port'] === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        $mail->isSendmail();
    }

    $mail->CharSet  = 'UTF-8';
    $mail->setFrom($cfg['from'], $cfg['from_name']);
    $mail->addAddress($to);
    $mail->addReplyTo(
        truncate_value($email, 190) ?? $cfg['from'],
        truncate_value($name, 120) ?? ''
    );
    $mail->Subject   = $subject;
    $mail->isHTML(true);
    $mail->Body      = $htmlBody;
    $mail->AltBody   = $textBody;

    $mail->send();
} catch (MailerException $e) {
    error_log('ProtectOurBrand infringement report email failed: ' . $mail->ErrorInfo);
}

redirect_to(build_redirect('submitted'));
