<?php 

$mailNew = $_POST['email'];

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$typeProject = $_POST['typeProject'];
$message = $_POST['message'];


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';


$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

try {
	//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'vajravarahi@mail.ru';                 // Наш логин
	$mail->Password = 'x7jvcsUgxQFZYBduwpbX';                           // Наш пароль от ящика
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
	$mail->Port = 465;                                    // TCP port to connect to
	 
	$mail->setFrom('vajravarahi@mail.ru', 'Заявка на разработку сайта');   // От кого письмо 
	$mail->addAddress('vajravarahi@mail.ru');     // Add a recipient
	$mail->addAddress('ayakata@yandex.ru');               // Name is optional
	//$mail->addReplyTo('info@example.com', 'Information');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');
	//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML
	
	$mail->Subject = 'Данные';
	$mail->Body    = '
			Новая заявка на разработку сайта <br> 
		email: ' . $mailNew . '';
	 $mail->Body = '
        <h3>Новая заявка</h3>
        <p><strong>Имя:</strong> ' . $name . '</p>
        <p><strong>Телефон:</strong> ' . $phone . '</p>
        <p><strong>Email:</strong> ' . $email . '</p>
        <p><strong>Тип проекта:</strong> ' . $typeProject . '</p>
        <p><strong>Сообщение:</strong><br>' . $message . '</p>
        <p><em>Дата: ' . date('d.m.Y H:i') . '</em></p>
    ';

	$mail->send();

  echo json_encode([
      'status' => 'success',
      'message' => 'Заявка успешно отправлена'
    ]);

} catch (Exception $e) {
    // Ошибка
    echo json_encode([
        'status' => 'error',
        'message' => 'Ошибка отправки: ' . $e->getMessage()
    ]);
}

exit;
?>