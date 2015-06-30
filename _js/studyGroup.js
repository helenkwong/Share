var xmlTagAr = Array();
var dataXML;
var fullscreenMode = false;
var getGpKey;
var getGpValue;
var subjectkey;
var groupkey;
var joinedGp = 0;
var _current_newpost_attachType;
var gp_orgkeyStr='';

/* ## Init and Buttons click and interface action---------------------------------------------------------- ## */
$(document).ready(function(){
	initStudyGroup();
	groupkey = $('#span_gp_id').html();
	if(groupkey.indexOf('#')>=0){
		groupkey = groupkey.substring(0,groupkey.indexOf('#')+1);
	}
	
	
	$('#td_editGp_org').click(function(){
		var num = 0;
		var orgStr = '';
		$('#td_editGp_org input[type=checkbox]:checked').each(function(){
			if (num > 0) {
				orgStr = orgStr + ' and ';
			}
			orgStr = orgStr + $(this).parent().text();
			num++;
		});
		$('#editGp_member').val(orgStr);
	});
	
	
	$(document).on('scroll',function(e) {
		
		var scrollTopNum = $(document).scrollTop();
		var bodyHeight = $(document).height();
		
		var diff = bodyHeight - scrollTopNum;
		var windowHeight = document.documentElement.clientHeight+document.documentElement.clientHeight/3;
		if(diff-windowHeight<400 && !$('#btn_morepost').hasClass('display_none')){
			$('#btn_morepost').trigger('click');
		}
	});
	
	getGpInfo();
	getGpList();
	getGpLike();
	
	
	if($('#relatedGpList').length>0){
		passDataToPHP_studyGp('<data><action>getRelatedGpList</action><groupkey>'+groupkey+'</groupkey></data>','getRelatedGpList','0');
	}
	/*
	if($('#hotGpList').length>0){
		passDataToPHP_studyGp('<data><action>getHotGpList</action></data>','getHotGpList','0');
	}*/
});

/* ## Function for interface and send to database---------------------------------------------------------- ## */
function getGpInfo(){
	passDataToPHP_studyGp('<data><action>getGpInfo</action><groupkey>'+groupkey+'</groupkey></data>','getGpInfo','0');
}

function getGpList(){
	
	passDataToPHP_studyGp('<data><action>getGpList</action><groupkey>'+groupkey+'</groupkey></data>','getGpList','0');
}

function getGpLike(){
	passDataToPHP_studyGp('<data><action>getLikeGp</action><groupkey>'+groupkey+'</groupkey></data>','getLikeGp','0');
}

function initStudyGroup(){
	
	groupkey = $('#span_gp_id').html();
	
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
	
	$('#btn_submitEditGp').click(function(){
		
		if($('#editGp_topic').val()!=''){
			$('#btn_submitEditGp').attr('disabled','disabled');
			formDataToXML_studyGp('#table_change_gpInfo input[type=text],#table_change_gpInfo textarea', 'editGpInfo');
			passDataToPHP_studyGp(dataXML, 'editGpInfo','#btn_submitEditGp');
		}else{
			$('#editGp_topic').addClass('error');
		}
		
	});
	
	$('input,textarea').focus(function(){
		$(this).removeClass('error');
		$('.error_msg').addClass('display_none');
		if($(this).attr('id') == 'textarea_gp_scratch'){
			//$('#imghints_scratch').css('display','none');
			if($('#errorspan_scratch').css('display')!='none'){
				//$('#errorspan_scratch').toggle('slow');	
				displayInOut('#errorspan_scratch');
			}
		}
	});
	$('#btn_setScratch').click(function(){
		
		displayInOut('#label_gp_scratch');
		displayInOut('#textarea_gp_scratch');
		displayInOut('#btn_submit_editScratch');
		displayInOut('#btn_goscratchsite');
		
		/*if(!$('#btn_goscratchsite').hasClass('display_none')){
			
			//$('#btn_goscratchsite').toggle('slow');	
		}*/
	});
	
	$('#btn_submit_editScratch').click(function(){
		checkScratchSubmit();
	});
	$('#btnhints_scratch').click(function(){
		//$('#tr_hints_scratch').toggle('slow');	
		displayInOut('#tr_hints_scratch');
	});
	
	$('#btn_close_scratchHint').click(function(){
		$('#btnhints_scratch').trigger('click');
	});
	
	
	//joinGp btn -------------------------------------
	if($('#btn_joinGp').length>0){
		$('#btn_joinGp').click(function(){
			$('#btn_joinGp').attr("disabled",true);	
			var tagNameAr = Array('groupkey','action');
			var tagValueAr = Array(groupkey,'joinGp');
			dataXML= data_form_to_xml(tagNameAr, tagValueAr);
			passDataToPHP_studyGp(dataXML, 'joinGp','#btn_joinGp');
		});
	}
	
	if($('#btn_unjoinGp').length>0){
		$('#btn_unjoinGp').click(function(){
			$('#btn_unjoinGp').attr("disabled",true);	
			var tagNameAr = Array('groupkey','action');
			var tagValueAr = Array(groupkey,'unJoinGp');
			dataXML= data_form_to_xml(tagNameAr, tagValueAr);
			passDataToPHP_studyGp(dataXML, 'unJoinGp','#btn_unjoinGp');
		});
	}
	
	
	$('#btn_like').click(function(){
		$('#btn_like').attr("disabled",true);	
		var action = '';
		if($(this).hasClass('likeBtn')){
				action = 'likeGp';
		}else{
			action = 'unLikeGp';
		}
		var tagNameAr = Array('groupkey','action');
		var tagValueAr = Array(groupkey,action);
		dataXML= data_form_to_xml(tagNameAr, tagValueAr);
		passDataToPHP_studyGp(dataXML, action,'#btn_like');
	});
	
	$('#btn_showInfoUpdate').click(function(){
		
		displayInOut('#table_change_gpInfo');
		displayInOut('#table_stage');
	});
	
}

function checkScratchSubmit(){
	var scratchStr = $('#textarea_gp_scratch').val();
	var scratchid = validate_scratchLink(scratchStr);
	if(scratchStr !='' && scratchid == false){
		$('#textarea_gp_scratch').addClass('error');
		//if($('#imghints_scratch').css('display')=='none'){
			//$('#imghints_scratch').toggle('slow');	
		//}	
		//$('#errorspan_scratch').toggle();
		displayInOut('#errorspan_scratch');
	}else{
		if(scratchStr ==''){
			scratchid = '';
		}
		$('#btn_submit_editScratch').attr('disabled','disabled');
		passDataToPHP_studyGp('<data><action>editGpScratch</action><scratch>'+scratchid+'</scratch><groupkey>'+groupkey+'</groupkey></data>','editGpScratch','#btn_submit_editScratch');
	}
}

function goToFullScreenMode(){
	fullscreenMode = !fullscreenMode;
	
	$('#popdiv').append($('div_stage'));
	
	var windowWidth = document.documentElement.clientWidth-90;
	var windowHeight = document.documentElement.clientHeight-10;
	var iFrameWidth = windowWidth;
	var  iFrameHeight =  windowHeight;
		
		if( windowWidth<700 || windowHeight<500){
			iFrameWidth = 700;
			iFrameWidth = 500;
		}else if( windowHeight<(windowWidth)){
			iFrameWidth = windowHeight*1.2;
		}else{
			iFrameHeight = windowWidth/1.2;
		}

		$('#iframe_Scratch').width(iFrameWidth);
		$('#iframe_Scratch').height(iFrameHeight);
		$('#iframe_Scratch').removeClass('normal');
		$('#btn_quitFullScreen').removeClass('display_none');
	 	
		initPopup('div_stage', iFrameHeight+90);
		$('#btn_fullscreen').removeAttr('disabled');		
}

function quitFullScreenMode(){

	$('#btn_quitFullScreen').removeAttr('disabled');
	$('#btn_quitFullScreen').addClass('display_none');
	$('#iframe_Scratch').width('479px').height('396px').addClass('normal');	
	$('#div_stage').css('left','').css('top','').css('position','');
	$('#bg_stage').append($('#div_stage'));
	disablePopup();

}

function formDataToXML_studyGp(target,action){
	dataXML = '';
	xmlTagAr = [];
	xmlTagAr['action'] = action;
	
	if (target != '') {
		$(target).each(function(){
			var tagname = $(this).attr('id');
			var subPos = tagname.indexOf('_') + 1;
			tagname = tagname.substring(subPos);
			xmlTagAr[tagname] = $(this).val();
		});
	}
	
		if (action == 'editGpInfo'){
			var orgStr = '';
			var num = 0;
			if ($('#editGp_member').length > 0) {
				$('#table_change_gpInfo input[type=checkbox]:checked').each(function(){
					if (num > 0) {
						orgStr = orgStr + '_';
					}
					orgStr = orgStr + $(this).attr('value');
					num++;
				});
				xmlTagAr['orgkey'] = orgStr;
				xmlTagAr['editRight'] = 'noStudent';
			}else{
				xmlTagAr['editRight'] = 'student';
			}
			xmlTagAr['subjectkey'] = $('#editGp_subject').children('option:selected').attr('id').substring(7);
			xmlTagAr['groupkey'] = groupkey;
		}
	
	dataXML = _data_to_xml(xmlTagAr);
}
//database----------------------------------------------------------------------------------------------
function passDataToPHP_studyGp(dataXML,source,targetBtn){
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
					case 'getGpInfo':
						databack_getGpInfo(xml);
						break;
					case 'editGpInfo':{
						$('#btn_submitEditGp').removeAttr('disabled');
						databack_editGpInfo(xml);
						$('#btn_showInfoUpdate').trigger('click');
						break;
					}
					case 'editGpScratch':{
						$('#btn_submit_editScratch').removeAttr('disabled');
						databack_editGpInfo(xml);
						$('#btn_setScratch').trigger('click');
						break;
					}
					case 'joinGp':{
					}
					case 'unJoinGp':{
						getGpList();
						refresehUserGpList();
						break;
					}
					case 'getGpList':{
						databack_getGpList(xml);
						break;
					}
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
					case 'getHotGpList':{
						databack_getHotGpList(xml);
						break;
					}
					case 'getRelatedGpList':{
						databack_getRelatedGpList(xml);
						break;
					}
					case 'getUserSchoolList':{
					databack_getUserSchoolList(xml);
					break;
					}
				}
				$(targetBtn).removeClass('disabled');
				$(targetBtn).parent().find('.tempUpload').remove();
			}
		});
	}
}

/* ## Function for returning data from database---------------------------------------------------------- ## */

function databack_getUserSchoolList(xml){
var orgAr = gp_orgkeyStr.split("_");
		/**$.each(orgAr, function( key, value ) {
			$('#table_change_gpInfo input[type=checkbox][name=editGp_org][value='+value+']').prop('checked','checked');
		});**/
$('#td_editGp_org').children('label').remove();
$(xml).find('schoolList').each(function(i){
var addstr= '<label><input type="checkbox" name="editGp_org" value="'+$(this).find('scode').text()+'"';

if(jQuery.inArray($(this).find('scode').text(),orgAr)>-1){
addstr= addstr+' checked="checked" ';
}

addstr=addstr+'>'+$(this).find('sname').text()+'</label>';
$('#td_editGp_org').append(addstr);

});

}

function databack_getGpLike(xml){
	
	var num = $(xml).find('groupLikeNum').text();

	if(num !='0'){
		$('#span_likeNum').html('(' +num +')');
	}else{
		$('#span_likeNum').html('');
	}
	
	if($(xml).find('likedGp').text() =='0'){
		$('#btn_like').addClass('likeBtn');
		$('#btn_like').removeClass('unlikeBtn');
	}else{
		$('#btn_like').addClass('unlikeBtn');
		$('#btn_like').removeClass('likeBtn');
	}
	$('#btn_like').attr("disabled",false);	
}

function databack_getGpList(xml){
	joinedGp = $(xml).find('joinedGp').text();
	if($('#btn_joinGp').length>0){
		$('#btn_joinGp').attr("disabled",true);	
		$('#btn_unjoinGp').attr("disabled",true);	
	}
		$('#td_gp_members').html('');
	
	$(xml).find('grouplist').each(function(e){
		if(e>0){
			$('#td_gp_members').append(',');
		}
		$('#td_gp_members').append('<img width="30px" height="30px" src="'+$(this).find('userpic').text()+'" />');
		$('#td_gp_members').append($(this).find('realname').text());
		$('#td_gp_members').removeClass('font_lightBlue');
	});
	
	if($('#td_gp_members').html() == ''){
		$('#td_gp_members').append('Thank you for joining!').addClass('font_lightBlue');
	}
	
	joinedGp = parseInt(joinedGp);
	
	if($('#btn_joinGp').length>0){
		if(joinedGp == 1){
			$('#btn_showInfoUpdate').removeClass('display_none');
			$('#btn_setScratch').removeClass('display_none');
			$('#btnhints_scratch').removeClass('display_none');
			$('#btn_joinGp').addClass('display_none');
			$('#btn_unjoinGp').removeClass('display_none');
			$('#btn_unjoinGp').attr("disabled",false);	
		}else{
			$('#btn_showInfoUpdate').addClass('display_none');
			$('#btn_setScratch').addClass('display_none');
			$('#btnhints_scratch').addClass('display_none');
			$('#btn_unjoinGp').addClass('display_none');
			$('#btn_joinGp').removeClass('display_none');
			$('#btn_joinGp').attr("disabled",false);	
		}
	}
}
function databack_editGpInfo(xml){
	if ($(xml).find('action').text() == 'success') {
		passDataToPHP_studyGp('<data><action>getGpInfo</action><groupkey>'+groupkey+'</groupkey></data>','getGpInfo','0');
	}else{
	}
}
function databack_getGpInfo(xml){
		
	if ($(xml).find('groupkey').text() == '') {
		$('#span_gp_id').html('G20141');
		groupkey = 'G20141';
		getGpInfo();
		
	}else{
		$('#td_gp_topic').html($(xml).find('gp_topic').text());
		$('#td_gp_intro').html($(xml).find('gp_intro').text());
		subjectkey = $(xml).find('subjectkey').text();
		var subjectName;
		switch(subjectkey){
			case '001': subjectName='Chinese';break;
			case '002': subjectName='English';break;
			case '003': subjectName='Maths';break;
			case '004': subjectName='General studies';break;
			case '005': subjectName='Science';break;
			case '100': subjectName='Others';break;
		}
		//for the display table
		$('#div_gp_subject').addClass('s'+subjectkey);
		$('#div_gp_subject').html(subjectName);
		$('#td_groupInfoTop').addClass('s'+subjectkey);
		$('#td_gp_control').html($(xml).find('gp_control').text());
		var scratchStr = $(xml).find('gp_scratch').text();
		$('#btn_goscratchsite').css('display','');
		
		if(scratchStr != '' && scratchStr != 'NULL'&& scratchStr != 'null' ){
			$('#label_gp_scratch').html('http://scratch.mit.edu/projects/'+ scratchStr);
			$('#img_gpIcon').attr('src','http://cdn2.scratch.mit.edu/get_image/project/'+scratchStr+'_144x108.png');
			$('#btn_goscratchsite').attr('href','http://scratch.mit.edu/projects/'+ scratchStr);
			$('#btn_goscratchsite').removeClass('display_none');
			$('#iframe_Scratch').attr('src','http://scratch.mit.edu/projects/embed/'+scratchStr+'/?autostart=false');  //**11.7.2014 delete embed
			$('#iframe_Scratch').css('display','');
			$('#div_stage .Scratch_loading').removeClass('display_none');
			$('#iframe_Scratch').load(function() {
			$('#div_stage .Scratch_loading').addClass('display_none');
				});
			$('#btn_fullscreen').removeClass('display_none');
			$('#div_udpatedScatch').removeClass('display_none');
		}else{
			$('#label_gp_scratch').html('');
			$('#img_gpIcon').attr('src','_images/studyGroup/btn_notready.png');
			$('#div_udpatedScatch').addClass('display_none');
			$('#btn_goscratchsite').addClass('display_none');
			$('#iframe_Scratch').attr('src','');
			$('#iframe_Scratch').css('display','none');
			$('#btn_fullscreen').addClass('display_none');
		}
		$('#textarea_gp_scratch').val($('#label_gp_scratch').html());
		$('#td_gp_member').html($(xml).find('gp_member').text());
		
		//for the edit table
		$('#editGp_topic').val($(xml).find('gp_topic').text());
		$('#editGp_subject option[id=editGp_'+subjectkey+']').attr('selected','selected'); //prop('selected','selected'); 31.5.2014
		$('#editGp_intro').val($(xml).find('gp_intro').text());
		$('#editGp_control').val($(xml).find('gp_control').text());
		gp_orgkeyStr =$(xml).find('gp_orgkey').text();
		/* after  called the schoollist */
		/**var orgAr = gp_orgkeyStr.split("_");
		$.each(orgAr, function( key, value ) {
			$('#table_change_gpInfo input[type=checkbox][name=editGp_org][value='+value+']').prop('checked','checked');
		});**/
		
		$('#editGp_member').val($(xml).find('gp_member').text());
		
		if($('#td_editGp_org').length>0){
		passDataToPHP_studyGp("<data><action>getUserSchoolList</action></data>",'getUserSchoolList','0');
		}
		
	}	
}