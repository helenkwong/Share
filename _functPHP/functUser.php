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
		case 'get_userGpList':{DB_select_user_joined_gp($dataArray);break;}
		case 'insertFeedback':{DB_insert_user_feedback($dataArray);break;}
		case 'getUserDetailInfo':{DB_get_user_detailInfo($dataArray);break;}
		case 'editUserInfo':{DB_editUserInfo($dataArray);break;}
		case 'getSchStudentList':{DB_getSchStudentList();break;}
	}
}

function DB_getSchStudentList(){
	if(isset($_SESSION['userkey']) && isset($_SESSION['ulevel']) && $_SESSION['ulevel'] >30){
		$sql = "SELECT up.org_id,u.identity FROM user_profile as up LEFT JOIN user as u ON up.user_id = u.user_id  WHERE BINARY userkey='".$_SESSION['userkey']."'";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		if($sql_result>0){
		$row_data = mysql_fetch_assoc($sql_result);
			if($row_data['identity'] != 'student'){
				$sql2 = "SELECT up.username,up.userkey,u.identity,up.gender FROM user_profile as up LEFT JOIN user as u ON up.user_id = u.user_id WHERE BINARY up.org_id='".$row_data['org_id']."' AND u.identity ='student'";
				$sql2_result = mysql_query($sql2) or die('MySQL query error');
				if($sql2_result>0){
					while($row_data2 = mysql_fetch_assoc($sql2_result)){
				 		toPrint_multiTagWithoutAttr('schStudentList',$row_data2);
					}
				}
			}
		}else{
			toPrint_oneMsg('action','failure');
			$recordStr = 'Result:'.$sql_result.'|SQL:'.$sql.'|Userkey:'.$_SESSION['userkey'];
		}
	}else{
		toPrint_oneMsg('action','refeseh');
	}
}

function DB_editUserInfo($dataArray){

	if((isset($_SESSION['userkey']) && $_SESSION['userkey'] == $dataArray['userkey']) ||(isset($_SESSION['identity']) && $_SESSION['identity'] !='student')){
		$_userKey = $dataArray['userkey'];
		$sql = "UPDATE user_profile SET username='".$dataArray['username']."',gender='".$dataArray['gender']."',org_id='".$dataArray['org_id']."',userpic='".$dataArray['userImg']."' WHERE BINARY userkey='".$dataArray['userkey']."' AND enable = '1'";
		$sql_result =mysql_query($sql) or die('MySQL query error');
		$sql2 = "UPDATE user_forget_pw SET pw_email='".$dataArray['forgetPwEmail']."',pw_ques='".$dataArray['forgetPwEmailQues']."',pw_ans='".$dataArray['forgetPwEmailAns']."' WHERE BINARY userkey='".$dataArray['userkey']."'";
		$sql2_result =mysql_query($sql2) or die('MySQL query error');
		if($sql_result>0 && $sql2_result>0 ){
			$sql3 = "SELECT user_id FROM user_profile WHERE BINARY userkey='".$dataArray['userkey']."'";
			$sql3_result = mysql_query($sql3) or die('MySQL query error');
			if($sql3_result>0){
				$row_data = mysql_fetch_assoc($sql3_result);
				$sql4 = "UPDATE user SET login_pw='".$dataArray['login_pw']."' WHERE BINARY user_id='".$row_data['user_id']."'";
				$sql4_result =mysql_query($sql4) or die('MySQL query error');
				if($sql4_result>0){
					toPrint_oneMsg('action','success');
					toPrint_oneMsg('userkey',$dataArray['userkey']);
					if($_SESSION['userkey'] == $dataArray['userkey']){
						$_SESSION['realname'] = $dataArray['username'];
						$_SESSION['userpic'] = $dataArray['userImg'];
					}
					$recordStr = 'EditUser:'.$sql4_result.'username:'.$dataArray['username'].'gender:'.$dataArray['gender'].'|org_id:'.$dataArray['org_id'].'|userpic:'.$dataArray['userImg'].'|pw_email:'.$dataArray['forgetPwEmail'].'|pw_ans:'.$dataArray['forgetPwEmailAns'].'|pw_ques:'.$dataArray['forgetPwEmailQues'].'|login_pw:'.$dataArray['login_pw'].'|Userkey:'.$_userKey.'|Changer:'.$_SESSION['userkey'];
				}
				$recordStr = 'Result:'.$sql_result.'Result2:'.$sql2_result.'Result3:'.$sql3_result.'Result4:'.$sql4_result.'SQL:'.$sql.'|SQL2:'.$sql2.'|SQL3:'.$sql3.'|SQL4:'.$sql4.'|Userkey:'.$_userKey.'|Changer:'.$_SESSION['userkey'];
			}else{
				toPrint_oneMsg('action','failure');
				$recordStr = 'Result:'.$sql_result.'Result2:'.$sql2_result.'Result3:'.$sql3_result.'SQL:'.$sql.'|SQL2:'.$sql2.'|SQL3:'.$sql3.'|Userkey:'.$_userKey.'|Changer:'.$_SESSION['userkey'];
			}
		}else{
			Print_oneMsg('action','failure');
			$recordStr = 'Result:'.$sql_result.'Result2:'.$sql2_result.'SQL:'.$sql.'|SQL:'.$sql2.'|Userkey:'.$_userKey.'|Changer:'.$_SESSION['userkey'];
		}
	}else{
		toPrint_oneMsg('action','refeseh');
	}
}

function DB_get_user_detailInfo($dataArray){

$sql0 ="Select scode,sname FROM user_school WHERE group_enable='1' ORDER BY scode ASC";
		$sql0_result = mysql_query($sql0) or die('MySQL query error');
		while($row = mysql_fetch_assoc($sql0_result)){
			toPrint_multiTagWithoutAttr('schoolList',$row);
		}
	if((isset($_SESSION['userkey']) && $_SESSION['userkey'] == $dataArray['userkey']) ||(isset($_SESSION['ulevel']) && $_SESSION['ulevel']>30)){
		$_userKey = $dataArray['userkey'];
		$sql = "SELECT up.username,up.userpic,up.gender,up.org_id,up.userkey,ufp.pw_email,ufp.pw_ques,ufp.pw_ans,u.login_name,u.login_pw FROM user_profile as up LEFT JOIN user as u ON u.user_id = up.user_id LEFT JOIN user_forget_pw as ufp ON up.user_id = ufp.user_id WHERE up.userkey='".$_userKey."'";
		$sql_result =mysql_query($sql) or die('MySQL query error');
		if($sql_result>0){
			while($row_data = mysql_fetch_assoc($sql_result)){
				 toPrint_multiTagWithoutAttr('userDetailInfo',$row_data);
			}
		}
	}else{
		toPrint_oneMsg('action','refeseh');
	}
}

function DB_insert_user_feedback($dataArray){
	if(isset($_SESSION['userkey'])){
		$_userKey = $_SESSION['userkey'];
	}else{
		$_userKey = 'unknown';
	}
	$sql= "INSERT INTO user_feedback(from_userkey,feedback_text,page) VALUES ('".$_userKey."','".$dataArray['feedbackText']."','".$dataArray['location']."')";
	$sql_result =mysql_query($sql) or die('MySQL query error');
	if($sql_result>0){
		toPrint_oneMsg('action','success');
		$recordStr = 'Result:'.$sql_result.'|Userkey:'.$_userKey;
		sendEmail('Admin',$_userKey,$dataArray['feedbackText'].'<br/>'.$dataArray['location'],'Feedback From Platform','lead@hkfyg.org.hk');
	}else{
		$recordStr = 'Result:'.$sql_result.'|SQL:'.$sql.'|Userkey:'.$_userKey;
		toPrint_oneMsg('action','fail');
	}
		recordlog('InsertFeedback',$dataArray['location'],$recordStr);
		
}

function DB_select_user_joined_gp($dataArray){
	if(isset($_SESSION['userkey'])){
		$_userKey = $_SESSION['userkey'];

		$sql = "Select cg.groupkey,cg.gp_topic FROM p_group_list as cgl LEFT JOIN p_group as cg ON cgl.groupkey = cg.groupkey WHERE cgl.enable = '1' AND cg.enable = '1' AND cgl.userkey = '".$_userKey."'"; 
		$sql_result = mysql_query($sql) or die('MySQL query error_group');
		while($row_data = mysql_fetch_assoc($sql_result)){
			 toPrint_multiTagWithoutAttr('joinedGp',$row_data);
		}
	}
}

function sendEmail($emailName,$username,$content,$subject,$emailaddress){
		$footer = '<br /><br />LEAD<br />Helen<br />Email:helenak456@gmail.com<br />';
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


echo "</data>";
?>