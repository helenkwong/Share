<?php
include "config.php";
require_once('lib/simple_html_dom.php');
header('Content-Type: application/xml; charset=utf-8'); 
echo "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"; 
echo('<data>');

	if(isset($_POST["data"]) && $_POST['data'] != null){
		$xmlstr = $_POST["data"];
		$xml = simplexml_load_string($xmlstr);
		$dataArray = convertToArr_withoutAttrData($xml);
		if($dataArray['action'] == 'getLinkTitle'){
			 getLinkTitle($dataArray);
		}
		
	}

	function getLinkTitle($dataArray){
		$html = file_get_html($dataArray['link']);
		foreach($html->find('title') as $element){
			toPrint_oneMsg('linkTitle',$element->plaintext);
		}
	}
echo('</data>');
?>
