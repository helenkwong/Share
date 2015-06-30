var domain = "http://localhost/portfolio/share/"; //"http://comecreatelead.hkfyg.org.hk/share/"
var _loginUserkey =''; /* ## login user id */
var isIE = false; /* ## check if using IE */
var dataXML; /* ## XML data for passing to database */
var userphotoAr; /* ## default user profile photos array */
var iconnum = -1; 
var isChrome; /* ## check if using Chrome */
var _ulevel = 0; /* ## the right of user */



/* ## Init and interface action (more than one page need) ---------------------------------------------------------- ## */
$(document).ready(function(){
	if($('#isIE_JS').html() == '1'){
		isIE = true;
	}
	
	if($('#isChrome_JS').html() == '1'){
		isChrome = true;
	}
	
	
	if($('#a_leftBtn').length>0){
			userphotoAr = new Array("_images/icon/icon_user1.png","_images/icon/icon_user2.png","_images/icon/icon_user3.png","_images/icon/icon_user4.png","_images/icon/icon_user5.png","_images/icon/icon_user6.png","_images/icon/icon_user7.png","_images/icon/icon_user8.png","_images/icon/icon_user.png" );
			var target = 'div_uploadUserImg';
			if($('#div_userEditInfo').length>0){
				target = 'div_uploadUserImg';
				$('.previewImg').css('width','170px').css('height','170px');
			}
			BtnleftRightPhotoChange(target);
	}
	
	 _loginUserkey = $('#loginUserId').text();
	 
	$('#btn_logout').click(function(){
		passDataToPHP_loginRegister('<data><action>logoutUser</action></data>','logoutUser','#btn_logout');
	});
	
	$(document).on('keyup','textarea',function(e) { 
		 var name = $(e.target)[0].tagName;
		textareaAutoSizes(e.target);
	 });
	 
	 if($('#uploadImg').length>0){
	 	
		if(isIE == false){
			$('#uploadImg').addClass('display_none');
			$('#btn_triggerUpload').addClass('display_none');
			$('#uploadImg').on('change', function(){    
			$("#div_uploadUserImg").html('');
     		$("#div_uploadUserImg").html('<img src="_images/bg/100loading.gif" alt="Uploading...."/ width="98px">');
    		$("#uploadImgForm").ajaxForm({target: '#div_uploadUserImg'}).submit(); 
     		
			});
		}else{
			$('#btn_uploadUserImg').css('display','none').addClass('display_none');
			$('#btn_triggerUpload').click(function(){  
	  			$("#div_uploadUserImg").html('');
     			$("#div_uploadUserImg").html('<img src="_images/bg/100loading.gif" alt="Uploading...."/ width="98px">');
    			$("#uploadImgForm").ajaxForm({target: '#div_uploadUserImg'}).submit();  
			});
		}
		
		$('#btn_uploadUserImg').click(function(){
		$('#uploadImg').trigger('click');
	});
	}
	
	if($('#div_control').length>0){
		var ratio = 0.75;
		
		if($('#post_table').length>0){
			ratio = 0.75;
		}
		$('#div_control').css('top',(document.documentElement.clientHeight/1.65)+'px');
		$('#a_control_top').click(function(){
			$(document).scrollTop(0);
		});
		$('#a_control_up').click(function(){
			var scrollTopNum = $(document).scrollTop() - document.documentElement.clientHeight*ratio;
			$(document).scrollTop(scrollTopNum);
		});
		$('#a_control_down').click(function(){
			var scrollTopNum = $(document).scrollTop() + document.documentElement.clientHeight*ratio;
			if(scrollTopNum>$(document).height()){
				scrollTopNum = $(document).height() - document.documentElement.clientHeight*ratio;
			}
			$(document).scrollTop(scrollTopNum);
		});
	}
	 
});

/* ## Function for interface, checking data and send to database---------------------------------------------------------- ## */
function BtnleftRightPhotoChange(target){
	
	$('#a_leftBtn').click(function(){
		iconnum = iconnum -1;
		if(iconnum<0){
			iconnum = 8;
		}
		var str = '<img src="'+userphotoAr[iconnum]+'"  alt="'+userphotoAr[iconnum]+'" id="userUploadImg" class="previewImg">';
		if($('#div_userEditInfo').length>0){
			str = '<img src="'+userphotoAr[iconnum]+'"  alt="'+userphotoAr[iconnum]+'" id="userUploadImg" class="previewImg" width="170px" height="170px">';
		}
		$('#'+target).html(str);
		
	});
	
	$('#a_rightBtn').click(function(){
		iconnum = iconnum+1;
		if(iconnum>8){
			iconnum = 0;
		}
		var str = '<img src="'+userphotoAr[iconnum]+'"  alt="'+userphotoAr[iconnum]+'" id="userUploadImg" class="previewImg">';
		if($('#div_userEditInfo').length>0){ 
			str = '<img src="'+userphotoAr[iconnum]+'"  alt="'+userphotoAr[iconnum]+'" id="userUploadImg" class="previewImg" width="170px" height="170px">';
		}
	
		$('#'+target).html(str);
	});
}


function emailCheck(emailText){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
	if (emailText == '' || !re.test(emailText)) {
		return false;
	}else{
		return true;
	}
}


function passDataToPHP_loginRegister(dataXML,source,targetBtn){
	$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	if(!$(targetBtn).hasClass('disabled')){
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
		}
		$.ajax({
			type: "POST",
			async:false,
			url: "_functPHP/functLoginRegister.php",
			dataType: (isIE) ? "text" : "xml",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data: {
				data: dataXML
			},
			success: function(data){
				var xml;
				if (typeof data == "string") {
					xml = StringToXML(data);
				}
				else {
					xml = data;
				}
				switch (source) {
					case 'logoutUser':{
						window.location=domain+"index.php";
						break;
					}
				}
				$(targetBtn).removeClass('disabled');
				$(targetBtn).parent().find('.tempUpload').remove();
			}
		});
	}
}

function add_placeholder(id, placeholder){

	$("#"+id ).placeholder = placeholder;
	$("#"+id ).value = this.placeholder; 
	
	$("#"+id ).bind( "focus", function() {
		var typeText = this.value;
		if(typeText == this.placeholder){
			this.value= '';
			this.style.cssText  = '';
			
			if(this.id == "reg_login_textpw"){
				$("#reg_login_textpw").trigger('focusout');
				$("#reg_login_textpw").css("display","none");
				$("#reg_login_pw").css("display","inline");
				$("#reg_login_pw").trigger('focus');
			}
			
			if(this.id == "input_loginTextPw"){
				$("#input_loginTextPw").trigger('focusout');
				$("#input_loginTextPw").css("display","none");
				$("#input_loginpw").css("display","inline");
				$("#input_loginpw").trigger('focus');
			}
			
			if (this.id == "reg_login_name") {
				$('#reg_error').text('');
			}
	 	}
		
	});
	$("#"+id ).bind("focusout",function (){         
		 if(this.value.length == 0){             
	 		this.value = this.placeholder;  
			this.style.cssText = 'color:#A9A9A9; font-family:Trebuchet MS';                  
		 }  
	 });
	$("#"+id ).trigger('focusout');
}

function displayInOut(target){
	
	if ($(target).hasClass('display_none') || $(target).css('display') == 'none') {
		$(target).fadeIn("slow", function(){
			$(target).removeClass('display_none').css('display', '');
		});
	}
	else {
		$(target).fadeOut("slow", function(){
			$(target).addClass('display_none').css('display', '');
		});
	}
}

/* ## Function for returning data from database---------------------------------------------------------- ## */
function database_to_datadisplay(data){
	data = data.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace('null', "");	
	data =decodeURIComponent(data);
	return data;
}

function sub_data_form_to_xml(tagNameAr,tagValueAr){
	var xmlStr =''; 
	for(var i=0; i<tagNameAr.length;i++){
		var tagName = encodeURIComponent(tagNameAr[i]);
		var tagValue = encodeURIComponent(tagValueAr[i]);
		
		xmlStr = xmlStr+"<"+tagName+">";
		if(tagValue != '' && tagValue != 'null'){
			xmlStr = xmlStr+"<![CDATA["+tagValue+"]]>";
		}
		xmlStr = xmlStr+"</"+tagName+">";
	}
	return xmlStr;
}

function data_form_to_xml(tagNameAr,tagValueAr){
	var xmlStr ="<xml_data>" ;
	for(var i=0; i<tagNameAr.length;i++){
		var tagName = encodeURIComponent(tagNameAr[i]);
		var tagValue = encodeURIComponent(tagValueAr[i]);
		
		xmlStr = xmlStr+"<"+tagName+">";
		if(tagValue != '' && tagValue != 'null'){
			xmlStr = xmlStr+"<![CDATA["+tagValue+"]]>";
		}
		xmlStr = xmlStr+"</"+tagName+">";
		
	}
	xmlStr = xmlStr +"</xml_data>";
	return xmlStr;
}

function data_form_to_xml_special(tagNameAr,tagValueAr,otherXmlStr){
	var xmlStr ="<xml_data>" ;
	for(var i=0; i<tagNameAr.length;i++){
		var tagName = encodeURIComponent(tagNameAr[i]);
		var tagValue = encodeURIComponent(tagValueAr[i]);
		
		xmlStr = xmlStr+"<"+tagName+">";
		if(tagValue != '' && tagValue != 'null'){
			xmlStr = xmlStr+"<![CDATA["+tagValue+"]]>";
		}
		xmlStr = xmlStr+"</"+tagName+">";
		
	}
	xmlStr = xmlStr+otherXmlStr+"</xml_data>";
	return xmlStr;
}

function databack_getHotGpList(xml){

	$('#td_hotGpList p').remove();
	
	$(xml).find('hotgrouplist').each(function(){
		var gp_scratch = $(this).find('gp_scratch').text();
		var str='<div class="hotgroup_item">';
		if(gp_scratch !=''){
			str = str+'<a href="studygroup.php?id='+$(this).find('groupkey').text()+'"><img src="http://cdn2.scratch.mit.edu/get_image/project/'+gp_scratch+'_144x108.png" width="150px" />';
			str = str+'<p class="side_p">'+$(this).find('gp_topic').text()+'</p></a></div>';
			
		}else{
			str =str+'<a href="studygroup.php?id='+$(this).find('groupkey').text()+'"><img src="_images/study/btn_notready.png" width="150px" /> ';
			str = str+'<p class="side_p">'+$(this).find('gp_topic').text()+'</p></a></div>';
			
		}
		$('#td_hotGpList').append(str);
	});
	
	$('#td_hotGpList img').addClass('roundEdge6').css('border','1px solid #D8D8D8').css('margin-top','15px');
	$('#td_hotGpList .side_p').addClass('roundEdge6').css('background-color','#D8D8D8').css('margin-top','3px');
}


function databack_getRelatedGpList(xml){

	$('#td_relatedGpList p').remove();
	
	$(xml).find('relatedgrouplist').each(function(){
		var gp_scratch = $(this).find('gp_scratch').text();
		var str='<div class="hotgroup_item">';
		if(gp_scratch !=''){
			str = str+'<a href="studygroup.php?id='+$(this).find('groupkey').text()+'"><img src="http://cdn2.scratch.mit.edu/get_image/project/'+gp_scratch+'_144x108.png" width="150px" />';
			str = str+'<p class="side_p">'+$(this).find('gp_topic').text()+'</p></a></div>';
			
		}else{
			str =str+'<a href="studygroup.php?id='+$(this).find('groupkey').text()+'"><img src="_images/study/btn_notready.png" width="150px" /> ';
			str = str+'<p class="side_p">'+$(this).find('gp_topic').text()+'</p></a></div>';
			
		}
		$('#td_relatedGpList').append(str);
	});
	
	$('#td_relatedGpList img').addClass('roundEdge6').css('border','1px solid #D8D8D8').css('margin-top','15px');
	$('#td_relatedGpList .side_p').addClass('roundEdge6').css('background-color','#D8D8D8').css('margin-top','3px');
}

/*
	else{
		alert('here');
		target.style.height="50px";
		//target.style.height=(target.scrollHeight+5)+"px";
		//target.style.height=(target.scrollHeight+5)+"px";
	}*/



/* ## Function for transfering data to xml format and common functions---------------------------------------------------------- ## */
function single_data_form_to_xml(tagName,tagValue){
	var xmlStr ="<xml_data><"+tagName+"><![CDATA["+tagValue+"]]></"+tagName+"></xml_data>";
	return xmlStr;
}

function _data_to_xml(tagArr){
	var xmlStr ="<data>" ;
	for (var index in tagArr){	
		var tagName = encodeURIComponent(index);
		var tagValue = encodeURIComponent(tagArr[index]);
		xmlStr = xmlStr+"<"+tagName+">";
		if(tagValue != '' && tagValue != 'null'){
			xmlStr = xmlStr+"<![CDATA["+tagValue+"]]>";
		}
		xmlStr = xmlStr+"</"+tagName+">";
	}
	xmlStr = xmlStr +"</data>";
	return xmlStr;
}

function StringToXML(strXML){
	
	if (window.ActiveXObject) { 
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM"); 
		xmlDoc.async="false"; 
		xmlDoc.loadXML(strXML); 
		return xmlDoc; 
	} else { 
		parser=new DOMParser(); 
		xmlDoc=parser.parseFromString(strXML,"text/xml"); 
		return xmlDoc; 
	} 
}

function textareaAutoSizes(target){
	var newheight ;
	if(isChrome || isIE){
		newheight = target.clientHeight-4;
	}else{
		newheight = target.clientHeight;
	}
	
	if (target.scrollHeight>target.clientHeight && target.scrollHeight!=target.clientHeight){
		newheight= target.scrollHeight+5;
	}
	if(newheight<50){
			newheight = 50;
	}
	if($(target).attr('id')== 'textarea_feedback' && target.clientHeight<159){
			if (newheight < 160) {
				newheight = 160;
			}
	}
	
	if(($(target).attr('id')== 'textarea_comment'|| $(target).attr('id')=='textarea_quickCommment') && target.clientHeight<149){
			if (newheight < 130) {
				newheight = 130;
			}
	}
	if($(target).parents('#table_gp_detail').length<=0){
		target.style.height=(newheight)+"px";
	}

}

function is_int(value){    /* check if it is number */
	 if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
	 return true;
	 } else { 
	 return false;
	 } 
}

