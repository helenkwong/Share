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
		case 'insertNewPost':{DB_insert_new_post_info($dataArray);break;}
		case 'getGroupPost':{DB_get_post_info($dataArray);break;}
		case 'deletePost':{DB_delete_post($dataArray);break;}
		case 'insertNewCommentPost':{DB_insert_new_post_info($dataArray);break;}
		case 'sumbitPostComment':{DB_sumbitPostComment($dataArray);break;}
		case 'deletePostComment':{DB_deletePostComment($dataArray);break;}
	}
}

function DB_deletePostComment($dataArray){
	$area = 'p_';
	$tableName = $area.'post_comment';
	
	$sql = "SELECT postkey FROM ".$tableName." WHERE from_userkey='".$dataArray['from_userkey']."' AND postkey='".$dataArray['postkey']."'";
	$sql_result = mysql_query($sql);
	if($_SESSION['identity'] != 'student' || $sql_result>0 ){
		$sql2 = "UPDATE ".$tableName." SET enable='0',post_edit_date=NOW(),post_edit_userkey='".$dataArray['from_userkey']."' WHERE postkey='".$dataArray['postkey']."'";
		$sql_result2 = mysql_query($sql2);
		if($sql_result2 >0){
				$sql = "Select from_postkey from ".$tableName." WHERE postkey = '".$dataArray['postkey']."'";
				$sql_result = mysql_query($sql);
				$row_data = mysql_fetch_assoc($sql_result);
				
				$sql2 = "UPDATE p_post SET num_comment=num_comment-1 WHERE postkey='".$row_data['from_postkey']."' AND num_comment>0"; 
				mysql_query($sql2);
			
				toPrint_oneMsg('action','success');
				toPrint_oneMsg('postkey',$dataArray['postkey']);
		}else{
			toPrint_oneMsg('action','fail');
		}
	}else{
		toPrint_oneMsg('action','fail');
	}
	$recordStr = 'DeletePostCommentResult:'.$sql_result2.'|PostKey:'.$dataArray['postkey'].'|Userkey:'.$_SESSION['userkey'];
	recordlog('DeltePostCommentResult','NA',$recordStr);
}

function DB_sumbitPostComment($dataArray){
	$area = 'p_';
	$tableName = $area.'post_comment';
	$sql= "INSERT INTO p_post_comment (from_userkey,to_key,post_text,from_postkey) VALUES ('".$dataArray['from_userkey']."','".$dataArray['to_key']."','".$dataArray['commentText']."','".$dataArray['postkey']."')";
	$insert_result =mysql_query($sql) or die('MySQL query error_sql');
	$post_id = mysql_insert_id();
	$postkey = $dataArray['postkey'].'_c'.$post_id;
	
	$sql3 = "UPDATE p_post SET update_date=NOW(), num_comment=num_comment+1 WHERE postkey='".$dataArray['postkey']."'";
	mysql_query($sql3);
	
	$sql4 = "UPDATE p_post_comment SET postkey='".$postkey."' WHERE post_comment_id='".$post_id."'";
	mysql_query($sql4);
	
	$recordStr = 'SubmitPostCommentResult:'.$insert_result.'|PostKey:'.$postkey.'|commentText:'.$dataArray['commentText'].'|Userkey:'.$_SESSION['userkey'];
	recordlog('SubmitPostCommentResult','NA',$recordStr);
}

function DB_delete_post($dataArray){
	$area = 'p_';
	$tableName = $area.'post';
	
	$sql = "SELECT postkey FROM ".$tableName." WHERE from_userkey='".$dataArray['from_userkey']."' AND postkey='".$dataArray['postkey']."'";
	$sql_result = mysql_query($sql);
	if($_SESSION['identity'] != 'student' || $sql_result>0 ){
		$sql2 = "UPDATE ".$tableName." SET enable='0',post_edit_date=NOW(),post_edit_userkey='".$dataArray['from_userkey']."' WHERE postkey='".$dataArray['postkey']."'";
		$sql_result2 = mysql_query($sql2);
		if($sql_result2 >0){
			$sql3 = "UPDATE ".$tableName."_attach SET enable='0',attach_edit_date=NOW(),attach_edit_userkey='".$dataArray['from_userkey']."' WHERE from_postkey='".$dataArray['postkey']."'";
			$sql_result3 = mysql_query($sql3);
			toPrint_oneMsg('action','success');
			toPrint_oneMsg('postkey',$dataArray['postkey']);
		}else{
			toPrint_oneMsg('action','fail');
		}
	}else{
		toPrint_oneMsg('action','fail');
	}
	$recordStr = 'DeletePostResult:'.$sql_result.'|PostKey:'.$dataArray['postkey'].'|Userkey:'.$_SESSION['userkey'];
	recordlog('DeltePostResult','NA',$recordStr);
}

function DB_insert_new_post_info($dataArray){
	$area = 'p_';
	$tableName = $area.'post';
	
	$sql= "INSERT INTO ".$tableName." (from_userkey,to_key,post_topic,post_text,post_attach,remark) VALUES ('".$dataArray['from_userkey']."','".$dataArray['to_key']."','".$dataArray['post_topic']."','".$dataArray['post_text']."','".$dataArray['post_attach_num']."','".$dataArray['remark']."')";
	$insert_result =mysql_query($sql) or die('MySQL query error_sql');
	
	$post_id = mysql_insert_id();
	
	$sql2 = "Select create_date FROM ".$tableName." WHERE post_id='".$post_id."'";
	$sql2_result = mysql_query($sql2);
	$row_data2 = mysql_fetch_assoc($sql2_result);
	
	$postkey = substr($area,0,1).'1314'.$post_id;
	
	$sql3 = "UPDATE ".$tableName." SET postkey='".$postkey."',update_date='".$row_data2['create_date']."' WHERE post_id='".$post_id."'";
	$insert_result3 = mysql_query($sql3);
	
	if($insert_result3>0){
		toPrint_oneMsg('action','success');
		$recordStr = 'NewPostResult:'.$insert_result3.'|PostKey:'.$postkey.'|Userkey:'.$_SESSION['userkey'];	
	}else{
		toPrint_oneMsg('action','fail');
		$recordStr = 'NewPostResult:'.$insert_result3.'|SQL:'.$sql.'|SQL2:'.$sql3.'|Userkey:'.$_SESSION['userkey'];
	}
	
	if($dataArray['post_attach'] != ""){
		$tableName_attach = $area.'post_attach';
		$attachString = $dataArray['post_attach'];
		$attachString = str_replace("&lt;", "<", $attachString);
		$attachString = str_replace("&gt;", ">", $attachString);
		$attachXml = new SimpleXMLElement($attachString);
		foreach ($attachXml->children()as $child){
			$sql5= "INSERT INTO ".$tableName_attach." (from_postkey,attach_type,attach_link) VALUES ('".$postkey."','".$child->getName()."','".$child."')";
			$sql5_result =mysql_query($sql5) or die('MySQL query error123');
		 }
	}
	recordlog('NewPostResult',$dataArray['to_key'],$recordStr);
	
}

function DB_get_post_info($dataArray){
		$area = 'p_';
		$tableName = $area.'post';
		$tableName_comment = $area.'post_comment';
		$tableName_attach = $area.'post_attach';
		$comment_str = '';
		$attach_str = '';
		$action = $dataArray['subAction'];
		toPrint_oneMsg('subAction',$dataArray['subAction']);

		switch ($action){
			case "init":{$sql = "Select cp.post_id,cp.postkey,cp.from_userkey,cp.to_key,cp.update_date,cp.create_date,cp.remark,cp.post_topic,cp.post_text,cp.post_attach,cp.num_comment,cp.create_date,up.username,up.userpic FROM ".$tableName." as cp LEFT JOIN user_profile as up ON cp.from_userkey = up.userkey WHERE cp.enable = '1' AND cp.to_key ='".$dataArray['to_key']."' ORDER BY cp.update_date DESC limit 21";break;}
			case "more":{$sql = "Select cp.post_id,cp.postkey,cp.from_userkey,cp.to_key,cp.update_date,cp.create_date,cp.post_topic,cp.post_text,cp.post_attach,cp.num_comment,cp.create_date,up.username,up.userpic FROM ".$tableName." as cp LEFT JOIN user_profile as up ON cp.from_userkey = up.userkey WHERE cp.enable = '1' AND cp.to_key ='".$dataArray['to_key']."'  AND cp.update_date < '".$dataArray['getPost_min_editdate']."' ORDER BY cp.update_date DESC limit 21";break;}
			case "update":{$sql = "Select cp.post_id,cp.postkey,cp.from_userkey,cp.to_key,cp.update_date,cp.create_date,cp.remark,cp.post_topic,cp.post_text,cp.post_attach,cp.num_comment,cp.create_date,up.username,up.userpic FROM ".$tableName." as cp LEFT JOIN user_profile as up ON cp.from_userkey = up.userkey WHERE cp.enable = '1' AND cp.to_key ='".$dataArray['to_key']."' AND cp.update_date >= '".$dataArray['getPost_max_editdate']."' ORDER BY cp.update_date DESC limit 21";break;}
		}
		//echo($sql);
		$sql_result = mysql_query($sql);
		while($row_data = mysql_fetch_assoc($sql_result)){
			
			$postkey = $row_data['postkey'];
					
			if($row_data['num_comment']!= '0'){
				$comment_str ='';
				$sql2 = "Select cp.postkey,cp.from_userkey,cp.create_date,cp.post_text,up.username,up.userpic FROM ".$tableName_comment." as cp LEFT JOIN user_profile as up ON cp.from_userkey = up.userkey WHERE cp.from_postkey= '".$postkey."' AND cp.enable = '1' ORDER BY cp.create_date ASC";
				$sql2_result = mysql_query($sql2);
				while($row_data2 = mysql_fetch_assoc($sql2_result)){
					$comment_str = $comment_str.toString_multiTagWithoutAttr('comment',$row_data2);
				}
			}

			if($row_data['post_attach']!= '0'){
				$attach_str ='';
				$sql3 = "Select attach_type,attach_link FROM ".$tableName_attach." WHERE from_postkey='".$postkey."' AND enable = '1' ORDER BY  post_attach_id ASC";
				$sql3_result = mysql_query($sql3);
				while($row_data3 = mysql_fetch_assoc($sql3_result)){
					$attach_str = $attach_str.toString_multiTagWithoutAttr('attach',$row_data3);
				}
			}
			
			toPrint_multiTagWithoutAttr_special('post',$row_data,$comment_str.$attach_str);
	}
	$recordStr = 'Result:'.$sql_result.'|Userkey:'.$_SESSION['userkey'];
	recordlog('GetPost',$dataArray['to_key'],$recordStr);
	
		
}
echo "</data>";
?>