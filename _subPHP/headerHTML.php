<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="refresh" content="50000" />
	<title>Scratch - Collaborative Learning and Sharing Online Platform</title>
	
	<link href="_css/external_popup.css" rel="stylesheet" type="text/css" />
	<link href="_css/main.css" rel="stylesheet" type="text/css" />
	<link href="_css/<?php echo($_pageName);?>.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="_js/lib/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="_js/lib/jquery-migrate-1.2.1.js"></script>
	<script type="text/javascript" src="_js/upload/jquery.form.js"></script>
	<script type="text/javascript" src="_js/tooltips/jquery.qtip-1.0.0-rc3.min.js"></script>
	<script type="text/javascript" src="_js/validate/jquery.metadata.js" ></script>
	<script type="text/javascript" src="_js/validate/jquery.validate.js" ></script>
	<script type="text/javascript" src="_js/tooltips.js"></script>
	<script type="text/javascript" src="_js/popup.js"></script>
	<script type="text/javascript" src="_js/master.js"></script>
	<script type="text/javascript" src="_js/user.js"></script>
	<script type="text/javascript" src="_js/<?php echo($_jpFileName);?>.js"></script>
	<script type="text/javascript" src="_js/post.js"></script>
</head>
<body>

<div id='body_div'>
<table align="center" id='body_table'>
	<tbody id="tbody_rainbow">
		<tr>
			<td>
				<div class="display_none"><span id="loginUserId"><?php if(isset($_SESSION['userkey'])){echo($_SESSION['userkey']);}else {echo('user');}?></span><span id="isIE"><?php if(detectIE() == true){echo('1');}else{echo('0');}?></span><span id="isIE_JS"><?php if(detectIE_JS() == true){echo('1');}else{echo('0');}?></span><span id="isChrome_JS"><?php if(detectChrome_JS() == true){echo('1');}else{echo('0');}?></span><span id="ulevel"><?php echo($_ulevel); ?></span></div>
