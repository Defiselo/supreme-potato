# crm-react

# supreme-potato
WA Tymova prace 2026 Cabicar + KKK

GIT Master - Cabicar
Vývojáři - Kučera, Kutil, Klein


1. IMPORT DAT SQL OD MASOPUSTA DO MYSQL
2. POKUD STARSI VERZE NUTNO PREPSAT KOD V conn.php nasledovne:
**************************************************************
$servername = "localhost";
  $usernameDb = "root";
  $password = "student";
  $dbname = "crmskchccz";
  $conn = new mysqli($servername, $usernameDb, $password, $dbname);
  $conn->query("SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));");
  $conn->query("set names utf8");
  $conn->set_charset("utf8");
  //mysqli_set_charset($conn, 'utf8mb4');
************************************************************
