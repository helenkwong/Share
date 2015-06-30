<?php
	include "config.php";
	session_start();
	
	
	require_once('lib/class.phpmailer.php');
	header('Content-Type: application/xml; charset=utf-8'); 
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"; 
	echo "<data>";
	
//check login information ----------------------------------------------------------------
	/*$xmlstr = $_POST['checkLoginUser'];
		$xml =  simplexml_load_string($xmlstr);
		$dataArray = convertToArr_withoutAttrData($xml);
		DB_check_login($dataArray);(*/
	
if(isset($_POST["data"]) && $_POST['data'] != null){
	$xmlstr = $_POST["data"];
	$xml = simplexml_load_string($xmlstr);
	$dataArray = convertToArr_withoutAttrData($xml);
	
	switch ($dataArray['action']){
		case('getGpInfo'):{DB_select_getGpInfo($dataArray);DB_update_gp_view($dataArray['groupkey']);break;}	
		case('editGpInfo'):{DB_update_editGpInfo($dataArray);break;}
		case('editGpScratch'):{DB_update_editGpScratch($dataArray);break;}
		
		case('joinGp'):{DB_insert_joinGp($dataArray);break;}
		case('unJoinGp'):{DB_update_unJoinGp($dataArray);break;}
		case('getGpList'):{DB_select_gpList($dataArray);break;}
		
		case('getLikeGp'):{DB_select_getLikeGp($dataArray);DB_update_gp_view($dataArray['groupkey']);break;}
		case('likeGp'):{DB_insert_likeGp($dataArray);break;}
		case('unLikeGp'):{DB_update_unLikeGp($dataArray);break;}
		case('updateGpView'):{DB_update_gp_view($dataArray['groupkey']);break;}
		case('getHotGpList'):{DB_get_hot_gp_list();break;}
		case('getRelatedGpList'):{DB_get_related_gp_list($dataArray['groupkey']);break;}
		case('getUserSchoolList'):{DB_get_userSchoolList();break;}
	}
}

function DB_get_userSchoolList(){
		$sql ="Select scode,sname FROM user_school WHERE group_enable='1' ORDER BY scode ASC";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		while($row = mysql_fetch_assoc($sql_result)){
			toPrint_multiTagWithoutAttr('schoolList',$row);
		}
	}
function DB_select_getLikeGp($dataArray){
	$_userKey = $_SESSION['userkey'];
	$tableName = 'p_group_like';
	$sql = "SELECT COUNT(userkey) FROM ".$tableName." WHERE groupkey= '".$dataArray['groupkey']."' AND enable = '1'";
	$likeResult = mysql_fetch_array( mysql_query($sql));
	toPrint_oneMsg('groupLikeNum',$likeResult[0]);
	
	$sql2 = "SELECT userkey FROM ".$tableName." WHERE groupkey= '".$dataArray['groupkey']."' AND enable = '1' AND userkey = '".$_userKey."'";
	$sql_result = mysql_query($sql2) or die('MySQL query error');
	$isExist = mysql_num_rows($sql_result);
	if($isExist <1){
		toPrint_oneMsg('likedGp','0');
	}else{
		toPrint_oneMsg('likedGp','1');
	}
		
	$recordStr = 'Group:'.$dataArray['groupkey'].':'.$isExist.'|Userkey:'.$_SESSION['userkey'];
	recordlog('GetLikeGp',$dataArray['groupkey'],$recordStr);
}

function DB_insert_likeGp($dataArray){
	$tableName = 'p_group_like';
	
	if(isset($_SESSION['userkey'])){
		$_userKey = $_SESSION['userkey'];
		$sql= "Select userkey FROM ".$tableName." WHERE BINARY userkey='".$_userKey."' AND groupkey='".$dataArray['groupkey']."'";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		$isExist = mysql_num_rows($sql_result);
		
		if($isExist <1){
			$sql2= "INSERT INTO ".$tableName." (groupkey,userkey) VALUES ('".$dataArray['groupkey']."','".$_userKey."')";
			$sql2_result =mysql_query($sql2) or die('MySQL query error');
			
			if($sql2_result >0 ){
				toPrint_oneMsg('action','success');
				$recordStr ='Result:'.$sql2_result.'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}else{
				toPrint_oneMsg('action','fail');
				$recordStr ='Result:'.$sql2_result.'|SQL:'.$sql2.'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}
		}else{
			$sql3= $sql = "UPDATE ".$tableName." SET enable='1',edit_date=NOW() WHERE BINARY userkey='".$_userKey."' AND groupkey='".$dataArray['groupkey']."'";
			$sql3_result =mysql_query($sql3) or die('MySQL query error');
			if($sql3_result >0 ){
				toPrint_oneMsg('action','success');
				$recordStr ='Result:'.$sql3_result.'|ReLikeGroup:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}else{
				toPrint_oneMsg('action','fail');
				$recordStr ='Result:'.$sql3_result.'|SQL:'.$sql3.'|ReLikeGroup:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}
		}
			
			
	}else{
		toPrint_oneMsg('action','refeseh');
		$recordStr ='Result:refreseh'.'|Group:'.$dataArray['groupkey'];
	}
	recordlog('LikeGp',$dataArray['groupkey'],$recordStr);
}


function DB_update_unLikeGp($dataArray){
	$tableName = 'p_group_like';
	
	if(isset($_SESSION['userkey'])){
		$_userKey = $_SESSION['userkey'];
		$sql= $sql = "UPDATE ".$tableName." SET enable='0',edit_date=NOW() WHERE BINARY userkey='".$_userKey."' AND groupkey='".$dataArray['groupkey']."'";
		$sql_result =mysql_query($sql) or die('MySQL query error');
			if($sql_result >0 ){
				toPrint_oneMsg('action','success');
				$recordStr ='Result:'.$sql_result.'|unLikeGroup:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}else{
				toPrint_oneMsg('action','fail');
				$recordStr ='Result:'.$sql_result.'|SQL:'.$sql.'|unLikeGroup:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}
	}else{
		toPrint_oneMsg('action','refeseh');
		$recordStr ='Result:refreseh'.'|unLikeGroup:'.$dataArray['groupkey'];
		
	}
	recordlog('unLikeGp',$dataArray['groupkey'],$recordStr);
}

//Gp List------------------------------------------

function DB_select_gpList($dataArray){
	$_userKey = $_SESSION['userkey'];
	
	$tableName = 'p_group_list';
	$sql = "Select pgl.userkey,pgl.status,up.realname,up.userpic,up.org_id from p_group_list as pgl LEFT JOIN user_profile as up ON pgl.userkey = up.userkey WHERE pgl.groupkey = '".$dataArray['groupkey']."' AND pgl.enable='1'";
	$sql_result = mysql_query($sql) or die('MySQL query error');
	$joinedGp = '0';
	while($row = mysql_fetch_assoc($sql_result)){
		if($row['userkey'] == $_userKey){
			$joinedGp = '1';
		}
		toPrint_multiTagWithoutAttr('grouplist',$row);
	}
	toPrint_oneMsg('joinedGp',$joinedGp);
}

function DB_insert_joinGp($dataArray){
	
	$tableName = 'p_group_list';
	
	if(isset($_SESSION['userkey'])){
		$_userKey = $_SESSION['userkey'];
		$sql= "Select userkey FROM ".$tableName." WHERE BINARY userkey='".$_userKey."' AND groupkey='".$dataArray['groupkey']."'";
		$sql_result = mysql_query($sql) or die('MySQL query error');
		$isExist = mysql_num_rows($sql_result);
		
		if($isExist <1){
			$sql2= "INSERT INTO ".$tableName." (groupkey,userkey,status) VALUES ('".$dataArray['groupkey']."','".$_userKey."','member')";
			$sql2_result =mysql_query($sql2) or die('MySQL query error');
			
			if($sql2_result >0 ){
				toPrint_oneMsg('action','success');
				$recordStr ='Result:'.$sql2_result.'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}else{
				toPrint_oneMsg('action','fail');
				$recordStr ='Result:'.$sql2_result.'|SQL:'.$sql2.'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}
		}else{
			$sql3= $sql = "UPDATE p_group_list SET enable='1',edit_date=NOW() WHERE BINARY userkey='".$_userKey."' AND groupkey='".$dataArray['groupkey']."'";
			$sql3_result =mysql_query($sql3) or die('MySQL query error');
			if($sql3_result >0 ){
				toPrint_oneMsg('action','success');
				$recordStr ='Result:'.$sql3_result.'|reJoinGroup:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}else{
				toPrint_oneMsg('action','fail');
				$recordStr ='Result:'.$sql3_result.'|SQL:'.$sql3.'|reJoinGroup:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}
		}
	}else{
		toPrint_oneMsg('action','refeseh');
		$recordStr ='Result:refreseh'.'|Group:'.$dataArray['groupkey'];
	}
	recordlog('JoinGp',$dataArray['groupkey'],$recordStr);
	
}

function DB_update_unJoinGp($dataArray){
	
	$tableName = 'p_group_list';
	
	if(isset($_SESSION['userkey'])){
		$_userKey = $_SESSION['userkey'];
		$sql= $sql = "UPDATE p_group_list SET enable='0',edit_date=NOW() WHERE BINARY userkey='".$_userKey."' AND groupkey='".$dataArray['groupkey']."'";
		$sql_result =mysql_query($sql) or die('MySQL query error');
			if($sql_result >0 ){
				toPrint_oneMsg('action','success');
				$recordStr ='Result:'.$sql_result.'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}else{
				toPrint_oneMsg('action','fail');
				$recordStr ='Result:'.$sql_result.'|SQL:'.$sql.'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
			}
	}else{
		toPrint_oneMsg('action','refeseh');
		$recordStr ='Result:refreseh'.'|Group:'.$dataArray['groupkey'];
	}
	recordlog('unJoinGp',$dataArray['groupkey'],$recordStr);
}
//Edit Info------------------------------------------
function DB_update_editGpScratch($dataArray){
	if(isset($_SESSION['userkey'])){
		$_userkey = $_SESSION['userkey'];
		$sql = "UPDATE p_group SET gp_scratch='".$dataArray['scratch']."',edit_userkey='".$_userkey."',edit_date=NOW() WHERE groupkey='".$dataArray['groupkey']."'";
		$result = mysql_query($sql);
		if($result>0){
			toPrint_oneMsg('action','success');
			$recordStr ='Result:'.$result.'|Scratch:'.$dataArray['scratch'].'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
		}else{
			toPrint_oneMsg('action','fail');
			$recordStr ='Result:'.$result.'|SQL:'.$sql.'|Scratch:'.$dataArray['scratch'].'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
		}
	}else{
		toPrint_oneMsg('action','refeseh');
		$recordStr ='Result:refreseh'.'|Group:'.$dataArray['groupkey'];
	}
	recordlog('setScratch',$dataArray['groupkey'],$recordStr);
}

function DB_select_getGpInfo($dataArray){
	$_userKey ='';
	if(isset($_SESSION['userkey'])){
		$_userKey = $_SESSION['userkey'];
	}
	$sql= "SELECT groupkey,subjectkey,gp_topic,gp_intro,gp_pic,gp_scratch,gp_control,gp_join,gp_member,gp_orgkey FROM p_group WHERE BINARY groupkey='".$dataArray['groupkey']."' AND enable='1'";
	$result = mysql_query($sql);
	while($row_data = mysql_fetch_assoc($result)){
		toPrint_multiTagWithoutAttr_special('groupinfo',$row_data,'');
	}
	$recordStr ='Result:'.$result.'|Group:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
	recordlog('getGpInfo',$dataArray['groupkey'],$recordStr);
}
	
function DB_update_editGpInfo($dataArray){
	$_userkey = $_SESSION['userkey'];
	if($dataArray['editRight'] == 'student'){
		$sql = "UPDATE p_group SET gp_topic='".$dataArray['topic']."',gp_intro='".$dataArray['intro']."',gp_control='".$dataArray['control']."',subjectkey='".$dataArray['subjectkey']."',edit_userkey='".$_userkey."',edit_date=NOW() WHERE groupkey='".$dataArray['groupkey']."'";
	}else{
		$sql = "UPDATE p_group SET gp_topic='".$dataArray['topic']."',gp_intro='".$dataArray['intro']."',gp_control='".$dataArray['control']."',gp_member='".$dataArray['member']."',gp_orgkey='".$dataArray['orgkey']."',subjectkey='".$dataArray['subjectkey']."',edit_userkey='".$_userkey."',edit_date=NOW() WHERE groupkey='".$dataArray['groupkey']."'";
	}
	$result = mysql_query($sql);
	if($result>0){
		toPrint_oneMsg('action','success');
	}else{
		toPrint_oneMsg('action','fail');
	}
	$recordStr ='Result:'.$sql_result.'SQL:'.$sql.'|:'.$dataArray['groupkey'].'|Userkey:'.$_userKey;
	recordlog('editgetGpInfo',$dataArray['groupkey'],$recordStr);
}
	echo "</data>";
?>