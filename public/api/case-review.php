<?php
declare(strict_types=1);

$to = 'anuj21srivastava21@gmail.com';

$isAjax = false;

function redirect_to(string $url): void
{
    header('Location: ' . $url, true, 303);
    exit;
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload);
    exit;
}

function build_redirect(string $status): string
{
    return '/case-review/?intake=' . rawurlencode($status) . '#brand-threat-scan';
}

function respond_missing(): void
{
    global $isAjax;
    if ($isAjax) {
        json_response(['ok' => false, 'error' => 'missing'], 422);
    }
    redirect_to(build_redirect('missing'));
}

function respond_error(): void
{
    global $isAjax;
    if ($isAjax) {
        json_response(['ok' => false, 'error' => 'server_error'], 500);
    }
    redirect_to(build_redirect('error'));
}

function respond_submitted(): void
{
    global $isAjax;
    if ($isAjax) {
        json_response(['ok' => true, 'redirect' => build_redirect('submitted')]);
    }
    redirect_to(build_redirect('submitted'));
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

function nullable_request_value(string $key, bool $preserveNewlines = false): ?string
{
    $value = request_value($key, $preserveNewlines);

    return $value === '' ? null : $value;
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

$isAjax = request_value('_ajax') === '1';

$name = request_value('name');
$company = request_value('company');
$email = request_value('email');
$phone = request_value('phone');
$website = request_value('website');
$brandNames = request_value('brandNames');
$socialHandles = nullable_request_value('socialHandles');
$marketplaces = request_value('marketplaces');
$knownUrls = nullable_request_value('knownUrls', true);
$mainConcern = request_value('mainConcern');
$budget = request_value('budget');
$urgency = request_value('urgency');
$message = request_value('message', true);
$consent = request_value('consent');
$sourcePage = request_value('source_page');
$preferredReviewDate = nullable_request_value('preferredReviewDate');
$preferredReviewWindow = nullable_request_value('preferredReviewWindow');
$userAgent = truncate_value($_SERVER['HTTP_USER_AGENT'] ?? '', 255) ?? '';
$ipAddress = truncate_value(client_ip(), 45) ?? '';

$allowedConcerns = [
    'Stolen creative',
    'Fake profile',
    'Counterfeit listing',
    'Clone website',
    'Rogue domain',
    'Fake ads',
    'Marketplace abuse',
    'Not sure yet'
];

$allowedBudgets = [
    'Under $1,000',
    '$1,000 - $3,000',
    '$3,000 - $7,500',
    '$7,500+',
    'Not sure yet'
];

$allowedUrgencies = [
    'Active abuse now',
    'High priority',
    'Planning monitoring',
    'Exploratory'
];

$missing = [];

foreach ([
    'name' => $name,
    'company' => $company,
    'email' => $email,
    'website' => $website,
    'brandNames' => $brandNames,
    'mainConcern' => $mainConcern,
    'budget' => $budget,
    'urgency' => $urgency,
    'message' => $message
] as $field => $value) {
    if ($value === '') {
        $missing[] = $field;
    }
}

if ($consent !== 'Yes') {
    $missing[] = 'consent';
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $missing[] = 'email';
}

if ($website !== '' && !filter_var($website, FILTER_VALIDATE_URL)) {
    $missing[] = 'website';
}

if ($mainConcern !== '' && !in_array($mainConcern, $allowedConcerns, true)) {
    $missing[] = 'mainConcern';
}

if ($budget !== '' && !in_array($budget, $allowedBudgets, true)) {
    $missing[] = 'budget';
}

if ($urgency !== '' && !in_array($urgency, $allowedUrgencies, true)) {
    $missing[] = 'urgency';
}

if ($missing !== []) {
    respond_missing();
}

if (request_value('_test') === '1') {
    header('Content-Type: text/plain; charset=UTF-8');
    echo "OK\n";
    echo 'Validated case review intake for ' . $company . "\n";
    exit;
}

require_once __DIR__ . '/db.php';

try {
    $pdo = db();

    $statement = $pdo->prepare(
        'INSERT INTO case_reviews
            (`name`, `company`, `email`, `phone`, `website`, `brand_names`, `social_handles`, `marketplaces`, `known_urls`, `main_concern`, `budget`, `urgency`, `preferred_review_date`, `preferred_review_window`, `message`, `status`, `ip_address`, `user_agent`, `source_page`)
         VALUES
            (:name, :company, :email, :phone, :website, :brand_names, :social_handles, :marketplaces, :known_urls, :main_concern, :budget, :urgency, :preferred_review_date, :preferred_review_window, :message, :status, :ip_address, :user_agent, :source_page)'
    );

    $statement->execute([
        ':name' => truncate_value($name, 120),
        ':company' => truncate_value($company, 150),
        ':email' => truncate_value($email, 190),
        ':phone' => truncate_value($phone !== '' ? $phone : null, 40),
        ':website' => truncate_value($website, 2048),
        ':brand_names' => $brandNames,
        ':social_handles' => $socialHandles,
        ':marketplaces' => $marketplaces !== '' ? $marketplaces : null,
        ':known_urls' => $knownUrls,
        ':main_concern' => truncate_value($mainConcern, 80),
        ':budget' => truncate_value($budget, 40),
        ':urgency' => truncate_value($urgency, 40),
        ':preferred_review_date' => truncate_value($preferredReviewDate, 40),
        ':preferred_review_window' => truncate_value($preferredReviewWindow, 80),
        ':message' => $message,
        ':status' => 'new',
        ':ip_address' => $ipAddress,
        ':user_agent' => $userAgent,
        ':source_page' => truncate_value($sourcePage !== '' ? $sourcePage : null, 255),
    ]);
} catch (Throwable $exception) {
    error_log('ProtectOurBrand case review insert failed: ' . $exception->getMessage());
    respond_error();
}

// ── EngageBay sync ────────────────────────────────────────────────────────
require_once __DIR__ . '/../ajax/engagebay.php';

try {
    send_case_review_to_engagebay([
        'name' => $name,
        'company' => $company,
        'email' => $email,
        'phone' => $phone,
        'website' => $website,
        'brand_names' => $brandNames,
        'social_handles' => $socialHandles,
        'marketplaces' => $marketplaces,
        'known_urls' => $knownUrls,
        'main_concern' => $mainConcern,
        'budget' => $budget,
        'urgency' => $urgency,
        'preferred_review_date' => $preferredReviewDate,
        'preferred_review_window' => $preferredReviewWindow,
        'message' => $message,
        'consent' => $consent,
        'source_page' => $sourcePage,
    ]);
} catch (Throwable $exception) {
    error_log('ProtectOurBrand EngageBay sync failed: ' . $exception->getMessage());
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

$preferredReviewSummary = trim(($preferredReviewDate ?? '') . ($preferredReviewWindow ? ' · ' . $preferredReviewWindow : ''));

$subject = 'ProtectOurBrand Case Review - ' . truncate_value($company !== '' ? $company : $name, 80);

$fields = [
    'Name'                      => $name,
    'Company'                   => $company,
    'Email'                     => $email,
    'Phone'                     => $phone,
    'Website'                   => $website,
    'Brand names to monitor'    => $brandNames,
    'Social handles'            => $socialHandles ?? '',
    'Marketplaces or platforms' => $marketplaces,
    'Known infringing URLs'     => $knownUrls ?? '',
    'Main concern'              => $mainConcern,
    'Monthly budget range'      => $budget,
    'Urgency'                   => $urgency,
    'Preferred review date'     => $preferredReviewDate ?? '',
    'Preferred review window'   => $preferredReviewWindow ?? '',
    'Message'                   => $message,
    'Consent'                   => $consent,
    'Source page'               => $sourcePage,
    'Submitted at'              => gmdate('Y-m-d H:i:s') . ' UTC',
    'IP address'                => $ipAddress,
    'User agent'                => $userAgent,
];

$textLines = [
    'New ProtectOurBrand case review intake',
    str_repeat('=', 48),
    '',
];

$htmlRows = '';
foreach ($fields as $label => $value) {
    $display = $value !== '' ? htmlspecialchars($value, ENT_QUOTES, 'UTF-8') : '<em style="color:#999">(not provided)</em>';
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
    . '<h1 style="margin:0;font-size:18px;color:#fff">ProtectOurBrand — New Case Review Intake</h1>'
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
    $mail->addCC('alex@dmcaforce.com');
    $mail->addCC('Julija@dmcaforce.com');
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
    error_log('ProtectOurBrand case review email failed: ' . $mail->ErrorInfo);
}

// ── Customer confirmation email ───────────────────────────────────────────
$firstName    = explode(' ', trim($name))[0];
$safeFirst    = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');
$safeWhen     = htmlspecialchars($preferredReviewSummary !== '' ? $preferredReviewSummary : 'a time you selected', ENT_QUOTES, 'UTF-8');

$customerHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>'
    . '<body style="font-family:system-ui,sans-serif;background:#f3f4f6;margin:0;padding:24px">'
    . '<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb">'

    // Header
    . '<div style="background:#0f172a;padding:28px 32px">'
    . '<h1 style="margin:0;font-size:20px;color:#fff;letter-spacing:-0.3px">ProtectOurBrand</h1>'
    . '<p style="margin:4px 0 0;font-size:13px;color:#94a3b8">Brand Protection &amp; Enforcement</p>'
    . '</div>'

    // Body
    . '<div style="padding:32px">'
    . '<p style="margin:0 0 8px;font-size:16px;color:#111827">Hi ' . $safeFirst . ',</p>'
    . '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#374151">'
    . 'Thank you for submitting your Brand Threat Scan intake. We have received your details and our team will review the scope of your case.'
    . '</p>'

    . '<p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#111827">What happens next</p>'
    . '<ol style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.8;color:#374151">'
    . '<li>Our team reviews your intake and identifies active brand abuse signals.</li>'
    . '<li>We prepare a tailored threat summary and recommended enforcement path.</li>'
    . '<li>We meet with you for a <strong>free 15-minute 360° Brand Threat Scan</strong> — no obligation.</li>'
    . '</ol>'

    . '<div style="margin:0 0 20px;padding:16px 20px;background:#f0fdff;border:1px solid #99e6f2;border-radius:8px">'
    . '<p style="margin:0;font-size:13px;font-weight:600;color:#0e7490;text-transform:uppercase;letter-spacing:0.06em">Your preferred review time</p>'
    . '<p style="margin:6px 0 0;font-size:15px;font-weight:600;color:#111827">' . $safeWhen . '</p>'
    . '<p style="margin:6px 0 0;font-size:13px;line-height:1.5;color:#374151">This is a preferred window, not a confirmed booking. Our team will follow up to confirm the final time.</p>'
    . '</div>'

    . '<p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280">'
    . 'Questions in the meantime? Just reply to this email or reach us at support@protectourbrand.com.'
    . '</p>'
    . '</div>'

    // Footer
    . '<div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af">'
    . 'ProtectOurBrand &nbsp;·&nbsp; support@protectourbrand.com'
    . '<br>You are receiving this because you submitted a brand threat scan intake.'
    . '</div>'

    . '</div></body></html>';

$customerText = "Hi {$firstName},\n\n"
    . "Thank you for submitting your Brand Threat Scan intake. We have received your details and our team will review the scope of your case.\n\n"
    . "WHAT HAPPENS NEXT\n"
    . "1. Our team reviews your intake and identifies active brand abuse signals.\n"
    . "2. We prepare a tailored threat summary and recommended enforcement path.\n"
    . "3. We meet with you for a free 15-minute 360° Brand Threat Scan — no obligation.\n\n"
    . "Your preferred review time: {$preferredReviewSummary}\n"
    . "This is a preferred window, not a confirmed booking. Our team will follow up to confirm the final time.\n\n"
    . "Best regards,\nThe ProtectOurBrand Team\nsupport@protectourbrand.com";

if ($email !== '') {
    $customerMail = new PHPMailer(true);
    try {
        if ($cfg['host'] !== '') {
            $customerMail->isSMTP();
            $customerMail->Host       = $cfg['host'];
            $customerMail->Port       = $cfg['port'];
            $customerMail->SMTPAuth   = true;
            $customerMail->Username   = $cfg['username'];
            $customerMail->Password   = $cfg['password'];
            $customerMail->SMTPSecure = $cfg['port'] === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        } else {
            $customerMail->isSendmail();
        }

        $customerMail->CharSet = 'UTF-8';
        $customerMail->setFrom($cfg['from'], $cfg['from_name']);
        $customerMail->addAddress($email, $name);
        $customerMail->Subject  = 'Your ProtectOurBrand Threat Scan — We Received Your Request';
        $customerMail->isHTML(true);
        $customerMail->Body     = $customerHtml;
        $customerMail->AltBody  = $customerText;

        $customerMail->send();
    } catch (MailerException $e) {
        error_log('ProtectOurBrand customer confirmation email failed: ' . $customerMail->ErrorInfo);
    }
}

respond_submitted();
