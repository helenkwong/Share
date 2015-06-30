<?php
	include "config.php";
	session_start();
	require_once('lib/class.phpmailer.php');
	header('Content-Type: application/xml; charset=utf-8'); 
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"; 
	echo "<data>";
	
	if(isset($_POST["data"]) && $_POST['data'] != null){
		$xmlstr = $_POST["data"];
		$xml = simplexml_load_string($xmlstr);
		$dataArray = convertToArr_withoutAttrData($xml);
		
		switch ($dataArray['action']){
			case('get_allUserrList'):{DB_get_allUserList($dataArray);break;}
			case('get_schoolList'):{DB_get_schoolList($dataArray);break;}
			case('get_studyGroupList'):{DB_get_studyGroupList($dataArray);break;}
			case('update_userList'):{DB_update_userList($dataArray);break;}
			case('add_newSchList'):{DB_add_newSchList($dataArray);break;}
			case('update_schList'):{DB_update_schList($dataArray);break;}
			case('update_gpList'):{DB_update_gpList($dataArray);break;}
			
			
		}
	}
	
	function DB_update_userList($dataArray){
		$sql= "Update user Set identity ='".$dataArray['identity']."', login_pw='".$dataArray['password']."' WHERE user_id='".$dataArray['uid']."'";
		$result = mysql_query($sql);
		if($result>0){
			echo("<result>1</result>");
		}
	}
	
	function DB_add_newSchList($dataArray){
		$sql= "INSERT INTO user_school(scode,sname) VALUES ('".$dataArray['code']."','".$dataArray['name']."')";
		$sql_result =mysql_query($sql) or die('MySQL query error');
		if($result>0){
			echo("<result>1</result>");
		}
	
	}
	
	function DB_update_schList($dataArray){
		$sql= "Update user_school Set group_enable ='".$dataArray['enable']."' WHERE sid='".$dataArray['sid']."'";
		$result = mysql_query($sql);
		if($result>0){
			echo("<result>1</result>");
		}
	
	}
	
	function DB_update_gpList($dataArray){
		$sql= "Update p_group Set enable ='".$dataArray['enable']."', gp_edition='".$dataArray['editon']."' WHERE groupkey='".$dataArray['gpid']."'";
		$result = mysql_query($sql);
		if($result>0){
			echo("<result>1</result>");
		}
	
	}	
	
	function DB_get_studyGroupList($dataArray){
		$sql =  "Select groupkey,subjectkey,gp_topic,gp_member,gp_orgkey,create_date,enable,gp_edition FROM p_group ORDER BY groupkey DESC";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		while($row = mysql_fetch_assoc($sql_result)){
			toPrint_multiTagWithoutAttr('groupList',$row);
		}
	}
	
	function DB_get_schoolList($dataArray){
		$sql =  "Select * FROM user_school ORDER BY group_enable DESC,create_date DESC";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		while($row = mysql_fetch_assoc($sql_result)){
			toPrint_multiTagWithoutAttr('schoolList',$row);
		}
	}

	function DB_get_allUserList($dataArray){
		$sql =  "Select u.user_id,identity,remark,realname,username,login_name,login_pw,gender,email,create_date FROM user AS u LEFT JOIN user_profile AS up ON u.user_id = up.user_id WHERE BINARY up.enable = '1' ORDER BY identity ASC,create_date DESC";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		while($row = mysql_fetch_assoc($sql_result)){
			toPrint_multiTagWithoutAttr('allUser',$row);
		}
	}
	
	echo "</data>";
?>