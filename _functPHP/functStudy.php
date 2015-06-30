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
			case('inertNewGp'):{DB_inert_newgroup($dataArray);break;}
			case('getGp'):{DB_select_gp($dataArray);break;}
			case('updateGpView'):{DB_update_gp_view($dataArray['groupkey']);break;}
			case('getHotGpList'):{DB_get_hot_gp_list();break;}
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
function DB_inert_newgroup($dataArray){
	$sql= "INSERT INTO p_group(subjectkey,gp_topic,gp_intro,gp_member,gp_orgkey) VALUES ('".$dataArray['subjectkey']."','".$dataArray['topic']."','".$dataArray['intro']."','".$dataArray['member']."','".$dataArray['orgkey']."')";
	$sql_result =mysql_query($sql) or die('MySQL query error');
	
	if($sql_result>0){
		$gp_id = mysql_insert_id();
		$_gpKey = "G2014".$gp_id;
		$sql2 = "UPDATE p_group SET groupkey='".$_gpKey."',edit_date=NOW() WHERE group_id='".$gp_id."'";
		$sql_result =mysql_query($sql2);
		toPrint_oneMsg('action','success');
		$recordStr = 'Result:'.$sql_result.'|Userkey:'.$_SESSION['userkey'];
	}else{
		toPrint_oneMsg('action','fail');
		$recordStr = 'Result:'.$sql_result.'|SQL:'.$sql.'|Userkey:'.$_SESSION['userkey'];
	}
	recordlog('InsertGp','NA',$recordStr);
}

function DB_select_gp($dataArray){
	$_sch_id = $_SESSION['org_id'];
	$_userkey = $_SESSION['userkey'];
	$requreStr ='';
	if(isset($dataArray) && isset($dataArray['subject']) && $dataArray['subject']!= '' && $dataArray['subject'] !='000'){
		$requreStr = " WHERE subjectkey='".$dataArray['subject']."' ";
	}
	$sql_userjoin = " (SELECT userkey as _userkey ,groupkey as _groupkey,1 as countA FROM p_group_list WHERE BINARY userkey='".$_userkey."' AND enable ='1') AS pgl";
	$sql_schjoin = " (SELECT groupkey as __groupkey,1 as countB FROM p_group WHERE BINARY gp_orgkey Like '%".$_sch_id."%' AND enable ='1') AS pgs";
	$sql_postjoin = " (SELECT COUNT(postkey) as postNum,to_key FROM p_post WHERE create_date >= DATE_SUB(NOW(),INTERVAL 7 DAY) AND enable ='1' GROUP BY to_key ) AS pp ";
	
	$sql= "SELECT pg.groupkey,pg.subjectkey,pg.gp_topic,pg.gp_scratch,pg.gp_pic,pg.gp_edition,pg.gp_intro,pg.gp_member,pg.gp_orgkey,pg.edit_date,pp.postNum FROM p_group AS pg LEFT JOIN ".$sql_userjoin." ON pg.groupkey = pgl._groupkey LEFT JOIN ".$sql_schjoin." ON pgs.__groupkey = pg.groupkey LEFT JOIN ".$sql_postjoin." ON pp.to_key = pg.groupkey ".$requreStr." and pg.enable = '1' ORDER BY pg.gp_edition DESC,countA DESC,countB DESC limit 21";
	echo($sql);
	$sql_result = mysql_query($sql);
	while($row_data = mysql_fetch_assoc($sql_result)){
		toPrint_multiTagWithoutAttr_special('group',$row_data,'');
	}
}
	echo "</data>";
?>