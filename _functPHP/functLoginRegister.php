<?php
	include "config.php";
	session_start();
	require_once('lib/class.phpmailer.php');
	header('Content-Type: application/xml; charset=utf-8'); 
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"; 
	echo "<data>";
	
//check login information ----------------------------------------------------------------
	if(isset($_POST["data"]) && $_POST['data'] != null){
		$xmlstr = $_POST["data"];
		$xml = simplexml_load_string($xmlstr);
		$dataArray = convertToArr_withoutAttrData($xml);
		
		switch ($dataArray['action']){
			case('logoutUser'):{removeSession();break;}
			case('checkLoginUser'):{DB_check_login($dataArray);break;}
			case('checkLoginName'):{DB_select_login_name($dataArray['login_name']);break;}
			case('insertNewUser'):{DB_insert_new_user($dataArray);break;}
			case('checkForgetPw'):{DB_select_checkForgetPw($dataArray['userInfoType'],$dataArray['userInfo']);break;}
			case('submitForgetPw'):{DB_select_submitForgetPw($dataArray['userInfoType'],$dataArray['userInfo'],$dataArray['userMethod'],$dataArray['userHintsAns']);break;}
			case('getUserSchoolList'):{DB_get_userSchoolList();break;}
		}
	}

	//OK--------------------------------------------------------------------------------
	
	function DB_get_userSchoolList(){
		$sql ="Select scode,sname FROM user_school WHERE group_enable='1' ORDER BY scode ASC";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		while($row = mysql_fetch_assoc($sql_result)){
			toPrint_multiTagWithoutAttr('schoolList',$row);
		}
	}
	
	function DB_check_login($dataArray){
		removeSession();
		session_start();
		$sql= "SELECT * FROM user WHERE BINARY login_name='".$dataArray['loginname']."' AND login_pw='".$dataArray['loginpw']."'";
		$result = mysql_query($sql);
		$loginResult = mysql_num_rows($result);
		
		if($loginResult>0){ //login success
			$loginUser = mysql_fetch_assoc($result);
			session_regenerate_id(true);
			$loginUserId = $loginUser['user_id'];
			//$_SESSION['user_id'] = $loginUserId;
			$_SESSION['identity'] = $loginUser['identity'];
			if($loginUser['identity'] =='guest'){
				$_SESSION['ulevel'] = 1;
			}else if($loginUser['identity'] =='student' || $loginUser['identity'] =='pre_teacher'){
				$_SESSION['ulevel'] = 11;
			}else if($loginUser['identity'] =='teacher'){
				$_SESSION['ulevel'] = 31;
			}else if($loginUser['identity'] =='admin'){
				$_SESSION['ulevel'] = 101;
			}
			//$_SESSION['lang'] = $loginUser['lang'];
			
			$sql2= "SELECT user_id,userkey,username,org_id,userpic,homepage FROM user_profile WHERE user_id='".$loginUserId."'";
			$result2 = mysql_query($sql2);
			$loginUserInfo = mysql_fetch_assoc($result2);	
			$_SESSION['user_id'] = $loginUserInfo['user_id'];
			$_SESSION['userkey'] = $loginUserInfo['userkey'];
			$_SESSION['userpic'] = $loginUserInfo['userpic'];
			$_SESSION['realname'] = $loginUserInfo['username'] ;
			$_SESSION['org_id'] = $loginUserInfo['org_id'];
			//$_SESSION['wall'] = $loginUserInfo['userkey'];
			toPrint_oneMsg('userkey',$loginUserInfo['userkey']);
			//toPrint_oneMsg('wall',$_SESSION['wall']);
		}
		toPrint_oneMsg('login_user',$loginResult);
		$recordStr = 'Result:'.$loginResult.'|Loginname:'.$dataArray['loginname'].'|Loginpw:'.$dataArray['loginpw'].'|Userkey:'.$_SESSION['userkey'];
		recordlog('login','index',$recordStr);
	}
	
	function removeSession(){
		$_SESSION['userkey']='';
		$recordStr = 'Userkey:'.$_SESSION['userkey'];
		recordlog('Logout','NA',$recordStr);
		//session_unset(); 
 		session_destroy(); 
	}
	
		function sendEmail($emailName,$username,$content,$subject,$emailaddress){ 
		$footer = '<br />Helen<br />Email:helenak456@gmail.com<br />';
		$mail             = new PHPMailer();
		$body             = '<p>'.$username.'</p><br /><p>'.$content.'</p>'.$footer;
		$mail->IsSMTP(); // telling the class to use SMTP
		$mail->Host       = "mail.gmail.com"; // SMTP server
		//$mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
												   // 1 = errors and messages
												   // 2 = messages only
		$mail->SMTPAuth   = true;                  // enable SMTP authentication
		$mail->SMTPSecure = "ssl";                 // sets the prefix to the servier
		$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
		$mail->Port       = 465;                   // set the SMTP port for the GMAIL server
		$mail->Username   = "hhello.world123@gmail.com";  // GMAIL username
		$mail->Password   = "dlrow123";            // GMAIL password
		
		$mail->SetFrom("hhello.world123@gmail.com","Helen");
		$mail->CharSet = "utf-8";
		$mail->Subject = $subject;
		$mail->MsgHTML($body);
		$mail->AddAddress($emailaddress,$emailName);
		$mail->Send();
	}
	
	//late use
	if(isset($_POST["getOrganisationName"]) && $_POST['getOrganisationName'] != null){
		DB_select_organisation_name();
	}
	
	
	function DB_select_organisation_name(){
		$sql = "Select org_id,org_chi_name,org_eng_name FROM organisation ORDER BY org_eng_name Asc"; 
		$sql_result = mysql_query($sql) or die('MySQL query error');
		while($row = mysql_fetch_assoc($sql_result)){
			toPrint_multiTagWithoutAttr('organisation',$row);
		}
	}

	function DB_select_login_name($loginName){
		$sql = "Select login_name FROM user WHERE BINARY login_name = '".$loginName."'"; 
		$sql_result = mysql_query($sql) or die('MySQL query error');
		$isExist = mysql_num_rows($sql_result);
		toPrint_oneMsg('repeatuser',$isExist);
		return 	$isExist;
	}

	function DB_insert_new_user($userArr){
		if(DB_select_login_name($userArr['login_name'])>0){
			toPrint_oneMsg('user_id','-1');
		}
		else{
			$sql= "INSERT INTO user(login_name,login_pw,identity) VALUES ('".$userArr['login_name']."','".$userArr['login_pw']."','".$userArr['identity']."')";
			$sql_result =mysql_query($sql) or die('MySQL query error');
			$user_id = mysql_insert_id();
			$_userKey = "u2014".$user_id;
			
			if($userArr['identity'] == 'pre_teacher' && $userArr['teacherEmail'] != 'No'){
				$userArr['email'] = $userArr['teacherEmail'];
			}
			
			$sql2= "INSERT INTO user_profile(user_id,userkey,realname,username,gender,email,org_id,userpic) VALUES ('".$user_id."','".$_userKey."','".$userArr['realname']."','".$userArr['realname']."','".$userArr['gender']."','".$userArr['email']."','".$userArr['org_id']."','".$userArr['userImg']."')";
			$sql_result = mysql_query($sql2) or die('MySQL query error_insertuser');
			if($sql_result == 1 || $sql_result == '1'){
				
				$sql3= "INSERT INTO user_forget_pw(user_id,userkey,pw_email,pw_ques,pw_ans) VALUES ('".$user_id."','".$_userKey."','".$userArr['email']."','".$userArr['forgetPwEmailQues']."','".$userArr['forgetPwEmailAns']."')";
				$sql_result3 = mysql_query($sql3) or die('MySQL query error_forgetPw');
				
				if($userArr['message'] != ''){
					$sql4= "INSERT INTO user_feedback(from_userkey,feedback_text,page) VALUES ('".$_userKey."','".$userArr['message']."','register')";
					$sql_result4 = mysql_query($sql4) or die('MySQL query error_feedback');
				}
				
				if($userArr['identity'] == 'pre_teacher'){
					$content = 'Hello! New teacher registered.Information：';
					$emailName = $userArr['realname'];
					$username = "Administrator：";
					$content = 	$content.'<p>Name：'.$userArr['realname'].'</p><p>Email：'.$userArr['email'].'</p><p>School：'.$userArr['org_name'].'</p>';
					$subject = 'New teacher registered(Waiting for confirmation)';
					$content = $content.'<p>Please login and enter administrator page</p>';	
					sendEmail($emailName,$username,$content,$subject,"lead@hkfyg.org.hk");
				}
				toPrint_oneMsg('user_id',$sql_result);
			}else{
				$recordStr = 'SQL:'.$sql.'|'.$sql2;
				recordlog('NewUserFail','NA',$recordStr);
				$sql5 = "DELETE from user WHERE user_id='".$user_id."'";
				mysql_query($sql5);
			}
		}
	}
	
	function DB_select_checkForgetPw($userInfoType,$userInfo){
		if($userInfoType =='email'){
			$sql =  "Select pw_email,pw_ques FROM user_forget_pw WHERE BINARY pw_email = '".$userInfo."'";
		}else{
			$sql = "Select u.login_name,ufp.pw_email,ufp.pw_ques FROM user AS u LEFT JOIN user_forget_pw AS ufp ON u.user_id = ufp.user_id WHERE BINARY login_name = '".$userInfo."'";
		}
		$sql_result = mysql_query($sql) or die('MySQL query error');
		$isExist = mysql_num_rows($sql_result);
		
		$recordStr = 'Result:'.$isExist.'|userInfoType:'.$userInfoType.'|userInfo:'.$userInfo;
		recordlog('checkForgetPw','index',$recordStr);
		
		if($isExist >0){
			$isExist = 'true';
			while($row = mysql_fetch_assoc($sql_result)){
				$row['result'] = 'true';
				toPrint_multiTagWithoutAttr('userGetPw',$row);
			}
			return true;
		}else{
			$isExist = 'false';
			toPrint_oneMsg('result',$isExist);
			return false;	
		}
	}
	
	
	function DB_select_submitForgetPw($userInfoType,$userInfo,$userMethod,$userHintsAns){
		
		if($userInfoType =='email'){
			$colName = 'ufp.pw_email';
		}else{
			$colName = 'u.login_name';
		}
		$sql = "Select u.login_name,u.login_pw,up.realname,ufp.pw_email,ufp.pw_ques,ufp.pw_ans FROM user_forget_pw AS ufp LEFT JOIN user AS u ON ufp.user_id = u.user_id LEFT JOIN user_profile AS up ON u.user_id = up.user_id WHERE BINARY ".$colName." = '".$userInfo."'";
		
		$sql_result = mysql_query($sql) or die('MySQL query error');
		$isExist = mysql_num_rows($sql_result);
		if($isExist >0){
			while($row = mysql_fetch_assoc($sql_result)){
				$row['result'] = 'true';
				if($userMethod == 'chooseEmail'){
					$content = 'Thank you for sign up! Your login informaton：';
					$emailName = $row['realname'];
					$username = $row['realname'];
					$content = 	$content.'<p>Login name:'. $row['login_name'].'</p><p>Login password'. $row['login_pw'].'</p>';
					$subject = 'Learning collaborative and sharing platform';
					$content = $content.'<p>Please login to the platform again</p>';	
					sendEmail($emailName,$username,$content,$subject,$row['pw_email']);
					toPrint_oneMsg('sendemail','true');
					toPrint_oneMsg('result','true');
				}else if($userMethod == 'chooseHints'){
					if($userHintsAns == $row['pw_ans']){
						toPrint_multiTagWithoutAttr('userGetPw',$row);
					}else{
						toPrint_oneMsg('hints','false');toPrint_oneMsg('result','true');
					}
				}	
			}
			$recordStr = 'GetPwSuccess:'.'|userInfoType:'.$userInfoType.'|userInfo:'.$userInfo.'|userMethod:'.$userMethod.'|$userHintsAns:'.$userHintsAns;
			recordlog('getForgetPw','index',$recordStr);
			return true;
		}else{
			$isExist = 'false';
			$recordStr = 'GetPwFail:'.'|userInfoType:'.$userInfoType.'|userInfo:'.$userInfo.'|userMethod:'.$userMethod.'|$userHintsAns:'.$userHintsAns;
			recordlog('getForgetPw','index',$recordStr);
			toPrint_oneMsg('result',$isExist);
			return false;	
		}

	}
	
	echo "</data>";
?>