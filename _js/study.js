var xmlTagAr = Array();
var fullscreenMode = false;
var getGpKey;
var getGpValue;
var groupkey ='';

/* ## Init and Buttons click and interface action---------------------------------------------------------- ## */
$(document).ready(function(){

	passDataToPHP('<data><action>getGp</action></data>','getGp','0');
	init_study();
});

function init_study(){

	$('#btn_submitNewGp').click(function(){
		if ($('#newGp_topic').val().length > 0) {
			$('#btn_submitNewGp').attr('disabled', true);
			formDataToXML('#table_newGp input[type=text]', 'inertNewGp');
			passDataToPHP(dataXML, 'inertNewGp', '#btn_submitNewGp');
		}
		else {
			$('#newGp_topic').addClass('error');
		}
	});
	
	if($('#td_newGp_org').length>0){
	passDataToPHP("<data><action>getUserSchoolList</action></data>",'getUserSchoolList','0');
	}
	
	$('#table_newGp input').focus(function(){
		$('#table_newGp input').removeClass('error');
	});
	
	$('#td_newGp_org').click(function(){
		var num = 0;
		var orgStr = '';
		$('#td_newGp_org input[type=checkbox]:checked').each(function(){
			if (num > 0) {
				orgStr = orgStr + '及';
			}
			orgStr = orgStr + $(this).parent().text();
			num++;
		});
		$('#newGp_member').val(orgStr);
	});
	
	$('#btn_newgroup').click(function(){
		//$('#form_newGp').toggle('slow');
		displayInOut('#form_newGp');
	});
	
	$('#table_gpMenu').on('click', 'a', function(e){ // for clicking selected type
		if ($(this).hasClass('btn_goScratch')) {
			popUpScratchDiv($(this).attr('data'), $(this).attr('href').substring(1));
			return false;
		}
	});
	
	$('#btn_fullscreen').click(function(){
		$('#btn_fullscreen').attr('disabled', 'disabled');
		goToFullScreenMode();
		return false;
	});
	
	$('#btn_quitFullScreen').click(function(){
		$('#btn_quitFullScreen').attr('disabled', 'disabled');
		quitFullScreenMode();
		return false;
	});
	
	if ($('#img_userIcon').attr('src') == '') {
		$('#div_ownerIcon').addClass('display_none');
	}
	
	$('#select_showTarget').change(function(){
		var targetClass = $('#select_showTarget option:selected').attr('id').substring(14);
		passDataToPHP('<data><action>getGp</action><subject>' + targetClass + '</subject></data>', 'getGp', '#select_showTarget');
		
	});
	
	$('#btn_like').click(function(){
		$('#btn_like').attr("disabled", true);
		var action = '';
		if ($(this).hasClass('likeBtn')) {
			action = 'likeGp';
		}
		else {
			action = 'unLikeGp';
		}
		groupkey = $(this).attr('href').substring(1);
		var tagNameAr = Array('groupkey', 'action');
		var tagValueAr = Array(groupkey, action);
		dataXML = data_form_to_xml(tagNameAr, tagValueAr);
		passDataToPHP_Gp(dataXML, action, '#btn_like');
		return false;
	});
	
	$('#textarea_comment').focus(function(){
		$('#textarea_comment').removeClass('error');
	});
	
	/*$('#div_comment .btn_comment').click(function(){
		if ($('#textarea_comment').val() == '') {
			$('#textarea_comment').addClass('error');
		}
		else {
		
		}
		return false;
	});*/
	
	$('.div_comment_hints a').click(function(){
		var tempText = $('#textarea_quickCommment').val();
		tempText = tempText + $(this).text() + ' ';
		$('#textarea_quickCommment').trigger('focus');
		$('#textarea_quickCommment').val(tempText);
		return false;
	});
	
	if ($('#a_showEditInfo').length > 0) {
		$('#a_showEditInfo').click(function(){
			getUserDetailInfo(_loginUserkey);
			initPopup('div_userEditInfo', 960);
		});
	}
	if ($('#a_showEditStudList').length > 0) {	
		$('#a_showEditStudList').click(function(){
			displayInOut('#div_editInfoStudentList');
		});
	}
	
	if($('#hotGpList').length>0){
		passDataToPHP('<data><action>getHotGpList</action></data>','getHotGpList','0');
	}
}
	
/* ## Function for interface and send to database---------------------------------------------------------- ## */

function quitFullScreenMode(){
	$('#btn_quitFullScreen').removeAttr('disabled');
	$('#iframe_Scratch').width(700).height(500);	
	$('#div_try_Scratch').width(960).height(600);
	$('#table_try_Scratch .fullscreen').addClass('display_none');
	$('#table_try_Scratch .non_fullscreen').removeClass('display_none');
	initPopup('div_try_Scratch',960);	
}


function goToFullScreenMode(){
	fullscreenMode = !fullscreenMode;
	var windowWidth = document.documentElement.clientWidth-90;
	var windowHeight = document.documentElement.clientHeight-10;
	var iFrameWidth = windowWidth;
	var iFrameHeight = windowHeight;
	
	if(windowWidth<700 || windowHeight<500){
		iFrameWidth = 700;
		iFrameWidth = 500;
	}else if(windowHeight<(windowWidth)){
		iFrameWidth = windowHeight*1.2;
	}else{
		iFrameHeight = windowWidth/1.2;
	}
	$('#iframe_Scratch').width(iFrameWidth);
	$('#iframe_Scratch').height(iFrameHeight);
	$('#div_try_Scratch').width(iFrameWidth+90);
	$('#div_try_Scratch').height(iFrameHeight);
	
	$('#table_try_Scratch .non_fullscreen').addClass('display_none');
	$('#table_try_Scratch .fullscreen').removeClass('display_none');
	initPopup('div_try_Scratch',$('#div_try_Scratch').width());

	$('#btn_fullscreen').removeAttr('disabled');		
}

function getGpLike(){
	passDataToPHP_Gp('<data><action>getLikeGp</action><groupkey>'+groupkey+'</groupkey></data>','getLikeGp','0');
}


function popUpScratchDiv(gpkey,scratchlink){
	groupkey = gpkey;
	$('#btn_like').attr('href','#'+groupkey);
	$('#div_comment .btn_comment').attr('href','#'+groupkey);
	
	getGpLike();
	$('#div_try_Scratch').css('display','');
	scratchlink = scratchlink.replace(' ','');
	$('#div_try_Scratch .Scratch_loading').removeClass('display_none');
	$('#iframe_Scratch').attr('src','http://scratch.mit.edu/projects/embed/'+scratchlink+'/?autostart=false'); //**14.7.2014 "embed/"
	$('#iframe_Scratch').load(function() {
		$('#div_try_Scratch .Scratch_loading').addClass('display_none');
	});
	$('#iframe_Scratch').width(700).height(500);
	$('#div_try_Scratch').width(960).height(600);
	initPopup('div_try_Scratch',960);
	
	return false;
}

//Common function================================================================================================================
function passDataToPHP_Gp(dataXML,source,targetBtn){
	$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	if (!$(targetBtn).hasClass('disabled')) {
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
		}
		$.ajax({
			type: "POST",
			url: "_functPHP/functStudyGroup.php",
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
					case 'getLikeGp':{
						databack_getGpLike(xml);
						break;
					}
					case 'likeGp':{
						getGpLike();
						break;
					}
					case 'unLikeGp':{
						getGpLike();
						break;
					}
				}
				$(targetBtn).removeClass('disabled');
				$(targetBtn).parent().find('.tempUpload').remove();
			}
		});
	}
}

function databack_getGpLike(xml){
	
	var num = $(xml).find('groupLikeNum').text();

	/*if(num !='0'){
		$('#span_likeNum').html('(' +num +')');
	}else{
		$('#span_likeNum').html('');
	}*/
	
	if($(xml).find('likedGp').text() =='0'){
		$('#btn_like').addClass('likeBtn');
		$('#btn_like').removeClass('unlikeBtn');
	}else{
		$('#btn_like').addClass('unlikeBtn');
		$('#btn_like').removeClass('likeBtn');
	}
	$('#btn_like').attr("disabled",false);	
}

function formDataToXML(target,action){
	dataXML = '';
	xmlTagAr = [];
	xmlTagAr['action'] = action;
	
	if(target !=''){
		$(target).each(function(){
			var tagname = $(this).attr('id');
			var subPos = tagname.indexOf('_')+1;
			tagname = tagname.substring(subPos);
			xmlTagAr[tagname] = $(this).val();
		});
	}
	//other non-input element
	if(action == 'inertNewGp'){
		var orgStr = '';
		var num=0;
		$('#table_newGp input[type=checkbox]:checked').each(function(){
			if(num>0){
				orgStr = orgStr+'_';
			}
			orgStr = orgStr + $(this).attr('value');
			num ++;
		});
		xmlTagAr['orgkey'] = orgStr;
		xmlTagAr['subjectkey'] = $('#newGp_subject').children('option:selected').attr('id').substring(6);
	}
	
	dataXML = _data_to_xml(xmlTagAr);
	return dataXML;
}


/* ## Function for returning data from database---------------------------------------------------------- ## */


function passDataToPHP(dataXML,source,targetBtn){
	$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	if(source == 'getGp'){
		$('#tr_messageBox_Page1 .label_loading').removeClass('display_none');
	}
	
	if (!$(targetBtn).hasClass('disabled')) {
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
		}
		$.ajax({
			type: "POST",
			url: "_functPHP/functStudy.php",
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
					case 'inertNewGp':{
						databack_inertNewGp(xml);
						$('#btn_submitNewGp').attr('disabled', false);
						break;
					}
					case 'getGp':{
						databack_getGp(xml);
						$('#tr_messageBox_Page1 .label_loading').addClass('display_none');
						break;
					}
					case 'getHotGpList':{
						databack_getHotGpList(xml);break;
					}
					case 'getUserSchoolList':{
					databack_getUserSchoolList(xml);break;
					}
				}
				$(targetBtn).removeClass('disabled');
				$(targetBtn).parent().find('.tempUpload').remove();
			}	
		});
	}
}

function databack_getUserSchoolList(xml){
	$('#td_newGp_org').children('label').remove();
	$(xml).find('schoolList').each(function(i){
	var addstr= '<label><input type="checkbox" name="newGp_org" value="'+$(this).find('scode').text()+'"';
	addstr=addstr+'>'+$(this).find('sname').text()+'</label>';
	$('#td_newGp_org').append(addstr);
	});
}

function databack_inertNewGp(xml){
	if ($(xml).find('action').text() == 'success'){
		//$('#form_newGp').toggle('slow');
		displayInOut('#form_newGp');
		$('#form_newGp input[type=text]').val('');
		$('#form_newGp input[type=checkbox]:checked').removeAttr('checked');
		
		passDataToPHP('<data><action>getGp</action></data>','getGp','0');
	}
	
}

function databack_getGp(xml){
	allGroupXML = xml;
	var i=0;
	var return_gp_num = $(xml).find('data').find('group').size();	//if(action == 'init'){}
	
	$('#table_gpMenu .group_tr').remove();
	
	/*if(return_post_num >20){
		$('#more_btn').css('display','block');
	}else{
		$('#more_btn').css('display','none');
	}*/
	
	var j=0;
	var textToInsert= [];
	var times = Math.ceil(return_gp_num/4);
	
	for(i=0;i<times;i++){
		$('#demo_group_tr').clone().removeAttr('id').removeClass('display_none').addClass('group_tr').appendTo($('#table_gpMenu'));
	}
	
	$(xml).find('data').find('group').slice(0,20).each(function(e){
		var subjectkey = $(this).children('subjectkey').text();
		var groupkey = $(this).children('groupkey').text();
		var gp_topic = $(this).children('gp_topic').text();
		var gp_pic = $(this).children('gp_pic').text();
		var gp_intro = $(this).children('gp_intro').text();
		var gp_member = $(this).children('gp_member').text();
		var gp_scratch = $(this).children('gp_scratch').text();
		var gp_orgkey = $(this).children('gp_orgkey').text();
		var edit_date = $(this).children('edit_date').text();
		var postnum = $(this).children('postNum').text();

		var target = $('#table_gpMenu .group_tr .gp_item').eq(e);
		$(target).css('display','none');
		$(target).attr('id',groupkey);
		$(target).addClass('s'+subjectkey).find('td').addClass('s'+subjectkey);
		var subjectName='';
		switch(subjectkey){
			case '001': subjectName='Chinese';break;
			case '002': subjectName='English';break;
			case '003': subjectName='Maths';break;
			case '004': subjectName='General Studies';break;
			case '005': subjectName='Science';break;
			case '100': subjectName='Other';break;
			
		}
		
		$(target).find('.gp_pic').addClass('bg_white');
		$(target).find('.gp_member').addClass('bg_white');
		$(target).find('.gp_key').addClass('bg_white');
		$(target).find('.gp_subject_all').html(subjectName);
		$(target).find('.gp_topic').html(gp_topic);
		
		if(postnum != ''){
			$(target).find('.update_num').html(postnum);
			$(target).find('.update_num').css('display','');;
		}else{
			$(target).find('.update_num').css('display','none');
		}
		
		if(gp_scratch !=''){
			$(target).find('.gp_pic').append('<a data="'+groupkey+'" class="btn_goScratch" href="#'+gp_scratch+' "></a>');
			$(target).find('.gp_pic').css('background-image','url(http://cdn2.scratch.mit.edu/get_image/project/'+gp_scratch+'_144x108.png)');
		}else{
			$(target).find('.gp_pic').css('background-image','url(_images/study/btn_notready.png)');
		}
		
		$(target).find('.gp_member').html(gp_member);
		$(target).find('.update_num').removeClass('display_none');
		$(target).find('.gp_key').find('div').removeClass('display_none'); 
		$(target).find('.gp_key').find('label').html('ID:'+groupkey);
		$(target).find('.btn_gpPage').attr('href',domain+'studygroup.php?id='+groupkey);
		$(target).fadeIn('slow');
	});
	$('#tr_messageBox_Page1 .label_loading').addClass('display_none');
}
