<?php
session_start();
$_userKey = '';
$_ulevel = '';
//$_identity = 'guest';
//$_identity_level = 1;


if(isset($_SESSION['userkey']) && $_SESSION['userkey'] != ''){
	$_logined = true;
	$_userKey = $_SESSION['userkey'];
	if($_pageName == 'index'){
		header("Location:".'study.php');
	}
}else if($_pageName != 'index'){
	header ("Location:".'index.php?act=refreseh');
}

if(isset($_SESSION['ulevel']) && $_SESSION['ulevel'] != ''){
	$_ulevel = (int)$_SESSION['ulevel'];
}

if($_pageName == "admin" && $_ulevel < 50){
	header("Location:".'index.php?act=refreseh');
}

?>

<?php
function detectIE() {
    if(preg_match('/(?i)msie [1-8]/',$_SERVER['HTTP_USER_AGENT'])) {
        return true;
    } else {
        return false;
    }
}

function detectChrome_JS(){
	return strpos($_SERVER["HTTP_USER_AGENT"], 'Chrome')? true : false;
}


function detectIE_JS()
{
    if (isset($_SERVER['HTTP_USER_AGENT']) && 
    (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false))
        return true;
    else
        return false;
}
?>