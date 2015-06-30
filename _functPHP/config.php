<?php

	$host="localhost"; // Host name
	$db_user ="root"; // Mysql username
	$db_password=""; // Mysql password
	//$db_password="";
	$db_name= "scbl2014"; // Database name leung8080
		
	// Connect to server and select databse.
	mysql_pconnect("$host", "$db_user", "$db_password") or trigger_error(mysql_error(),E_USER_ERROR); //or die("cannot connect");
	mysql_select_db("$db_name")or die("Disconnect Database");
	mysql_query("SET NAMES 'utf8'");

	function clean($inputText){
		$inputText = str_replace('<![CDATA[','',$inputText);
		$inputText = str_replace(']]>','',$inputText);
		$inputText = @trim($inputText);
		//$inputText = htmlentities($inputText,ENT_QUOTES,"UTF-8");
		$inputText = htmlspecialchars($inputText,ENT_QUOTES,"UTF-8");
		$inputText = mysql_real_escape_string($inputText); 
		return $inputText;
	}
		
	function de_clean($inputText){
		$inputText = htmlspecialchars_decode($inputText);
		return $inputText;
	}
	/*to print message*/
	function toPrint_oneMsg($tagname,$tagmessage){
		if($tagmessage != '' && $tagmessage != '0' && $tagmessage != '1' && $tagmessage != 'null'){
			echo("<".$tagname."><![CDATA[".de_clean($tagmessage)."]]></".$tagname.">");
		}else{
			echo("<".$tagname.">".de_clean($tagmessage)."</".$tagname.">");
		}
		
	}
	
	function toPrint_multiTagWithoutAttr($mainTagname,$subTagArray){
		$tagString=" ";
		foreach($subTagArray as $name=>$value){
			if($value=='NULL'){
				$value ='';
			}
			if($value != '' && $value != '0' && $value != '1' && $value != 'null'){
				$tagString = $tagString."<".$name."><![CDATA[".de_clean($value)."]]></".$name.">";
			}else{
				$tagString = $tagString."<".$name.">".de_clean($value)."</".$name.">";
			}
		}
		echo("<".$mainTagname.">".$tagString."</".$mainTagname.">");
	}
	
	function toPrint_multiTagWithoutAttr_special($mainTagname,$subTagArray,$special){
		$tagString=" ";
		foreach($subTagArray as $name=>$value){
			if($value=='NULL'){
				$value ='';
			}
			if($value != '' && $value != '0' && $value != '1' && $value != 'null'){
				$tagString = $tagString."<".$name."><![CDATA[".de_clean($value)."]]></".$name.">";
			}else{
				$tagString = $tagString."<".$name.">".de_clean($value)."</".$name.">";
			}
		}
		echo("<".$mainTagname.">".$tagString.$special."</".$mainTagname.">");
	}
	

	/*to creative string*/
	
	function toString_multiTagWithoutAttr($mainTagname,$subTagArray){
		$tagString=" ";
		foreach($subTagArray as $name=>$value){
			if($value=='NULL'){
				$value ='';
			}
			if($value != '' && $value != '0' && $value != '1' && $value != 'null'){
				$tagString = $tagString."<".$name."><![CDATA[".de_clean($value)."]]></".$name.">";
			}else{
				$tagString = $tagString."<".$name.">".de_clean($value)."</".$name.">";
			}
		}
		$totalString = "<".$mainTagname.">".$tagString."</".$mainTagname.">";
		return $totalString;
	}
	
	function toString_multiTagWithAttr($mainTagname,$subTagArray,$attrArray){
		$tagString="";
		$attrString="";
		
		foreach($attrArray as $name=>$attr){
			if($attr=='NULL'){
				$attr ='';
			}
			$attrString = $attrString." ".$name."='".$attr."' ";
		}
		
		foreach($subTagArray as $name=>$value){
			if($value=='NULL'){
				$value ='';
			}
			
			if($value != '' && $value != '0' && $value != '1' && $value != 'null'){
				$tagString = $tagString."<".$name."><![CDATA[".de_clean($value)."]]></".$name.">";
			}else{
				$tagString = $tagString."<".$name.">".de_clean($value)."</".$name.">";
			}
		}
		
		$totalString ="<".$mainTagname." ".$attrString.">".$tagString."</".$mainTagname.">";
		return $totalString;
	}
	
	function convertToArr_withAttrData($xmlInput){
		
		
		$xmlArray;
		foreach($xmlInput->attributes() as $tagname => $tagvalue) {
			if($tagvalue==''){
				$tagvalue ='NULL';
			}
			
			$xmlArray[$tagname] = (string)clean(urldecode($tagvalue));
		}
		return ($xmlArray);
	}

	function convertToArr_withoutAttrData($xmlInput){
		$xmlArray;
		foreach($xmlInput->children() as $child){
			$xmlArray[$child->getName()] = (string)clean(urldecode($child));
		}
		return ($xmlArray);
	}
	
	/*---------------------------------------------------------*/
	function toPrint_arrayToXml($attrArray){
		
		
		foreach($attrArray as $name=>$value){
			if($value == ''){
				 $value = '';
			}
			if($value != '0' && $value != '1' && $value != 'null'){
				echo("<".$name."><![CDATA[".de_clean($value)."]]></".$name.">");
			}else{
				echo("<".$name.">".de_clean($value)."</".$name.">");
			}
		}
	}
	
	function toString_oneMsg($tagname,$tagmessage){
		if($tagmessage != '' && $tagmessage != '0' && $tagmessage != '1' && $tagmessage != 'null'){
			return("<".$tagname."><![CDATA[".de_clean($tagmessage)."]]></".$tagname.">");
		}else{
			return("<".$tagname.">".de_clean($tagmessage)."</".$tagname.">");
		}
		
	}
	
	function convertToArr_withoutTagName($xmlInput){
		$xmlArray;
		foreach($xmlInput->children() as $child){
 				$xmlArray[] = $child;
 		}
 		return $xmlArray;
	}
	
	function generateCode(){
	
		$characters = array(
		"a","b","c","d","e","f","g","h","j","k","l","m",
		"n","p","q","r","s","t","u","v","w","x","y","z",
		"1","2","3","4","5","6","7","8","9");
		
		$keys = array();
	
		while(count($keys) < 4) {
	    	$x = mt_rand(0, count($characters)-1);
	   		 if(!in_array($x, $keys)) {
	      	 	$keys[] = $x;
	    	}
		}
	
		foreach($keys as $key){
		   $random_chars .= $characters[$key];
		}
		
		return $random_chars;
	}
	
	function recordlog($action,$location,$content){
		$content = str_replace("'","",$content);
		if(isset($_SESSION['userkey']))
		{
			$userkey = $_SESSION['userkey'];
			$user_id = $_SESSION['user_id'];
		}else{
			$userkey = 'NA';
			$user_id = '0';
		}
		
	//	$uname = $_SESSION['userkey'].' '.$_SESSION['lastname'];
		$log_sql= "INSERT INTO user_log (userkey,action_type,action_location,action_content,log_userip,user_id) VALUES ('".$userkey."','".$action."','".$location."','".$content."','".$_SERVER['REMOTE_ADDR']."','".$user_id."')";
		$log_result = mysql_query($log_sql);
	}
	
	/*	function toPrint_multiTagWithAttr($mainTagname,$subTagArray,$attrArray){
		$tagString="";
		$attrString="";
		
		foreach($attrArray as $name=>$attr){
			if($attr=='NULL'){
				$attr ='';
			}
			$attrString = $attrString." ".$name."='".$attr."' ";
		}
		
		foreach($subTagArray as $name=>$value){
			if($attr=='NULL'){
				$value ='';
			}
			$tagString = $tagString."<".$name."><![CDATA[".de_clean($value)."]]></".$name.">";
		}
		echo("<".$mainTagname." ".$attrString.">".$tagString."</".$mainTagname.">");
	}*/
	
	function DB_update_gp_view($groupkey){
		$sql = "UPDATE p_group SET gp_view=gp_view+1 WHERE groupkey='".$groupkey."'";
		$result = mysql_query($sql);
		
		$recordStr = 'ViewResult:'.$result.'|GpKey:'.$groupkey.'|Userkey:'.$_SESSION['userkey'];
		recordlog('GpViewResult','NA',$recordStr);
	}
	
	function DB_get_hot_gp_list(){
		$sql = "SELECT groupkey,subjectkey,gp_topic,gp_scratch FROM p_group WHERE enable ='1' ORDER BY gp_view DESC limit 5";
		$sql_result =mysql_query($sql) or die('MySQL query error');
		while($row_data = mysql_fetch_assoc($sql_result)){
			toPrint_multiTagWithoutAttr('hotgrouplist',$row_data);
		}
	}
	
	function DB_get_related_gp_list($groupkey){
		if(isset($_SESSION['userkey'])){
			$sql = "SELECT org_id FROM user_profile WHERE BINARY userkey='".$_SESSION['userkey']."'";
			$sql_result = mysql_query($sql) or die('MySQL query error1');
			$row_data = mysql_fetch_assoc($sql_result);
			$org_id = $row_data['org_id'];
			
			$sql2 = "SELECT subjectkey FROM p_group WHERE BINARY groupkey='".$groupkey."'";
			$sql2_result = mysql_query($sql2) or die('MySQL query error2');
			$row_data2 = mysql_fetch_assoc($sql2_result);
			$subjectkey = $row_data2['subjectkey'];
			
			$sql3 = "SELECT groupkey,subjectkey,gp_topic,gp_scratch FROM p_group WHERE enable ='1' AND (gp_orgkey like '%".$org_id."%' OR subjectkey = '".$subjectkey."') ORDER BY subjectkey,gp_orgkey limit 5";
			echo($sql3);
			$sql3_result =mysql_query($sql3) or die('MySQL query error3');
			echo($sql3);
			while($row_data3 = mysql_fetch_assoc($sql3_result)){
				toPrint_multiTagWithoutAttr('relatedgrouplist',$row_data3);
			}
		}

	}

?>