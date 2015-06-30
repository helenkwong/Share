/* ## Admin page for changing the setting of the platform including groups or users--------------------------------- ## */
var ieProcess = 0;


/* ## Init and Buttons click and interface action---------------------------------------------------------- ## */
$(document).ready(function(){

	if($('#table_all_user_setting').length>0){
		$('#a_t1show').click(function(){
			if($(this).attr('value') == 'show'){
				$(this).attr('value','hide');
			}else{
				$(this).attr('value','show');
			}
			$('#table_all_user_setting').toggle();
		});
		
		$('#table_all_user_setting').on('click','input[type="button"]',function(q) { 
		
			if($(this).hasClass('show_loginname')){
				if($(this).attr('value') == 'show' || $(this).attr('value') == 'Show'){
					$(this).attr('value','hide');
				}else{
					$(this).attr('value','show');
				}
				$(this).parent().find('.uloginname').toggle();
			
			}else if($(this).hasClass('show_loginpw')){
				if($(this).attr('value') == 'show' || $(this).attr('value') == 'Show'){
					$(this).attr('value','hide');
				}else{
					$(this).attr('value','show');
				}
				$(this).parent().find('.uloginpw').toggle();
			
			}else if($(this).hasClass('show_email')){
				if($(this).attr('value') == 'show' || $(this).attr('value') == 'Show'){
					$(this).attr('value','hide');
				}else{
					$(this).attr('value','show');
				}
				$(this).parent().find('.text_email').toggle();
			
			}else if($(this).hasClass('btn_update_user')){
				var uid=$(this).attr('id').substring(2);
				var identity = $(this).parent().parent().find('.select_userlist').find('option[selected=selected]').attr('value');
				var password = $(this).parent().parent().find('.uloginpw').val();
				dataXML = '<data><uid>'+uid+'</uid><identity>'+identity+'</identity><password>'+password+'</password><action>update_userList</action></data>';
				
				if(password.length <4 || password.length>16 || !/[^a-zA-Z0-9_]/.test(password)!= true){
					$(this).parents('tr').find('.uloginpw').addClass('error');
				}else{
					passDataToPHP_user(dataXML,'update_userList','.btn_update_user');
				}
			}
		});
		
		$('#table_group_list,#table_addschool_list,#table_school_list,#table_all_user_setting').on('click','input[type="text"]',function(q) { 
			$(this).removeClass('error');
		});
		
		$('#table_all_user_setting').on('click','option',function(q) { 
			$(this).parent().find('option').removeAttr('selected');
			$(this).attr('selected','selected');
		});
		
		getAllUserList();
	}
	
	if ($('#table_school_list').length > 0) {
		$('#table_school_list').on('click','option',function(q) { 
			$(this).parent().find('option').removeAttr('selected');
			$(this).attr('selected','selected');
		});
		$('#a_t2show').click(function(){
			if($(this).attr('value') == 'show'){
				$(this).attr('value','hide');
			}else{
				$(this).attr('value','show');
			}
			$('#table_addschool_list').toggle();
			$('#table_school_list').toggle();
		});
		
		$('#add_newSchList').click(function(){
			var code = $('#input_newSchCode').val();
			var name = $('#input_newSchName').val();
			dataXML = '<data><code>'+code+'</code><name>'+name+'</name><action>add_newSchList</action></data>';
			
			if(code.length != 4){
				$('#input_newSchCode').addClass('error');
			}else if(name==""){
				$('#input_newSchName').addClass('error');
			}else{
				passDataToPHP_user(dataXML,'add_newSchList','#add_newSchList');
			}
		});
		
		$('#table_school_list').on('click','input[type="button"]',function(q) { 
			if($(this).hasClass('btn_update_schlist')){
				var schid=$(this).attr('id').substring(4);
				var sch_enable = $(this).parent().parent().find('.select_schlist').find('option[selected=selected]').attr('value');
				dataXML = '<data><sid>'+schid+'</sid><enable>'+sch_enable+'</enable><action>update_schList</action></data>';
				passDataToPHP_user(dataXML,'update_schList','.btn_update_user');
			}
		});
		
		getSchoolList();
	}
	
	if ($('#table_group_list').length > 0) {
		$('#a_t3show').click(function(){
			if($(this).attr('value') == 'show'){
				$(this).attr('value','hide');
			}else{
				$(this).attr('value','show');
			}
			$('#table_group_list').toggle();
		});
		$('#table_group_list').on('click','option',function(q) { 
			$(this).parent().find('option').removeAttr('selected');
			$(this).attr('selected','selected');
		});
		
		$('#table_group_list').on('click','input[type="button"]',function(q) { 
			if($(this).hasClass('btn_update_grlist')){
				var gpid=$(this).attr('id').substring(5);
				var enabled = $(this).parent().parent().find('.select_gplist').find('option[selected=selected]').attr('value');
				var editon = $(this).parent().parent().find('.text_gpEditon').val();
				console.log(editon);
				if($.isNumeric(editon)){
				}else{
				}
				dataXML = '<data><gpid>'+gpid+'</gpid><enable>'+enabled+'</enable><editon>'+editon+'</editon><action>update_gpList</action></data>';
				passDataToPHP_user(dataXML,'update_gpList','.btn_update_user');
			}
		});
		getStudyGroupList();
	}
});

/* ## Function for interface and send to database---------------------------------------------------------- ## */

function getStudyGroupList(){
	dataXML = '<data><action>get_studyGroupList</action></data>';
	passDataToPHP_user(dataXML,'get_studyGroupList','0');
}

function getSchoolList(){
	dataXML = '<data><action>get_schoolList</action></data>';
	passDataToPHP_user(dataXML,'get_schoolList','0');
}


function getAllUserList(){
	dataXML = '<data><action>get_allUserrList</action></data>';
	passDataToPHP_user(dataXML,'get_allUserrList','0');
}


function passDataToPHP_user(dataXML,source,targetBtn){
	console.log(dataXML);
	if(targetBtn != "0"){
		$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	}
	if (!$(targetBtn).hasClass('disabled') || targetBtn == "0") {
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
			$(targetBtn).attr('disabled', 'disabled');
		}
		$.ajax({
			type: "POST",
			url: "_functPHP/functAdmin.php",
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
					case 'get_allUserrList':{
						databack_getAllUserList(xml);
						break;
					}
					case 'get_schoolList':{
						databack_getSchoolList(xml);
						break;
					}
					case 'get_studyGroupList':{
						databack_getStudyGroupList(xml);
						break;
					}
					case 'update_userList':{
						getAllUserList();
						break;
					}
					case 'add_newSchList':{
						getSchoolList();
						break;
					}
					case 'update_gpList':{
						getStudyGroupList();
						break;
					}
					case 'update_schList':{
						getSchoolList();
						break;
					}
				}
				$(targetBtn).removeClass('disabled');
				$(targetBtn).removeAttr('disabled');
				if($(targetBtn).parent().find('.tempUpload').length>0){
					$(targetBtn).parent().find('.tempUpload').remove();
				}
				if(targetBtn == "0"){
					$('.label_loading').css('display','none');
				}
			}
		});
	}
}

function databack_getStudyGroupList(xml){

	$('#table_group_list tr').not('.undelete').remove();
	if ($(xml).find('groupList').size() > 0) {
		$(xml).find('groupList').each(function(){
			var coenable = $(this).find('enable').text();
			var enable = '';
			var disable = '';
			if(coenable == '1'){
				enable = 'selected = selected';
			}else{
				disable = 'selected = selected';
			}	
			
			$('#table_group_list').append('<tr><td>'+$(this).find('groupkey').text()+'</td><td>'+$(this).find('subjectkey').text()+'</td><td>'+$(this).find('gp_topic').text()+'</td><td>'+$(this).find('gp_member').text()+'</td><td>'+$(this).find('gp_orgkey').text()+'</td><td><input type="text" class="text_gpEditon" value="'+$(this).find('gp_edition').text()+'" size="2" /></td><td>'+$(this).find('create_date').text()+'</td><td><select class="select_gplist"><option value="1" '+enable+'>Show</option><option value="0" '+disable+'>Hide</option></td><td><input type="button" value="Update" class="btn_update_grlist" id="s_up_'+$(this).find('groupkey').text()+'" /></td></tr>');
			
			//<td><input type="button" value="Delete" class="btn_delete_grlist" id="s_del_'+$(this).find('groupkey').text()+'" /></td>
		});
	}
}

function databack_getSchoolList(xml){
	$('#table_school_list tr').not('.undelete').remove();
	if ($(xml).find('schoolList').size() > 0) {
		$(xml).find('schoolList').each(function(){
			var gp_enable = $(this).find('group_enable').text();
			var enable = '';
			var disable = '';
			if(gp_enable == '1'){
				enable = 'selected = selected';
			}else{
				disable = 'selected = selected';
			}	
			
			$('#table_school_list').append('<tr><td>'+$(this).find('create_date').text()+'</td><td>'+$(this).find('scode').text()+'</td><td>'+$(this).find('sname').text()+'</td><td><select class="select_schlist"><option value="1" '+enable+'>Show</option><option value="0" '+disable+'>Hide</option></td><td><input type="button" value="Update" class="btn_update_schlist" id="sch_'+$(this).find('sid').text()+'" /></td></tr>');
		});
	}
}


function databack_getAllUserList(xml){
	$('#table_all_user_setting tr').not('.undelete').remove();
	if ($(xml).find('allUser').size() > 0) {
		$(xml).find('allUser').each(function(){
			var iden = $(this).find('identity').text();
			var iden_stud = '';	var iden_teach = '';var iden_preteach = '';var iden_admin = '';var iden_guest = '';
			if(iden == 'student'){
				iden_stud = ' selected="selected" ';
			}else if(iden == 'teacher'){
				iden_teach= ' selected="selected" ';
			}else if(iden == 'pre_teacher'){
				iden_preteach = ' selected="selected" ';
			}else if(iden == 'admin'){
				iden_admin = ' selected="selected" ';
			}else if(iden == 'guest'){
				iden_guest = ' selected="selected" ';
			}
		
			var ident_select = '<select class="select_userlist"><option value="student" '+iden_stud+'>student</option><option value="pre_teacher" '+iden_preteach+'>pre_teacher</option><option value="teacher" '+iden_teach+'>teacher</option><option value="admin" '+iden_admin+'>admin</option><option value="guest" '+iden_guest+'>guest</option></select>';
			
			$('#table_all_user_setting').append('<tr class="'+$(this).find('gender').text()+'"><td>'+$(this).find('create_date').text()+'</td><td>'+ident_select+'</td><td>'+$(this).find('realname').text()+'</td><td><span class="uloginname display_none">'+$(this).find('login_name').text()+'</span><input type="button" value="Show" class="show_loginname" /></td><td><input type="text" class="uloginpw display_none" value="'+$(this).find('login_pw').text()+'" size="14" /><input type="button" value="Show" class="show_loginpw" /></td><td><span class="text_email display_none" >'+$(this).find('email').text()+'</span><input type="button" value="Show" class="show_email" /></td><td><input type="button" value="Update" class="btn_update_user" id="u_'+$(this).find('user_id').text()+'" /></td><td>'+$(this).find('remark').text()+'</td></tr>');
		});
	}
}

/*

function checkForgetPwSetting_edit(){
	
	var useremail = $('#edit_email').val();
	var userQuesHint = $('#edit_pwHintAns').val(); 
	if($('#setEmail').prop('checked') == false && $('#setQuesHint').prop('checked') == false){
		$('#edit_email').removeClass('valid').addClass('error');
		return false;
	}
	if($('#setQuesHint').prop('checked') == true){
		if(userQuesHint.length ==0){
			$('#edit_pwHintAns').removeClass('valid').addClass('error');
			return false;
		}
	}
	if($('#setEmail').prop('checked') == true){
		if(emailCheck(useremail) == false){
			$('#edit_email').removeClass('valid').addClass('error');
			return false;
		}
	}
	return true;
}

function formDataToXML_user(target,action){
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
	if(action == 'editUserInfo'){
		xmlTagAr['username'] = $('#edit_realname').val();
		xmlTagAr['userkey'] = $('#span_edit_userkey').html();
		xmlTagAr['login_pw'] = $('#edit_login_pw').val();
		
		xmlTagAr['gender'] = $('#table_userEditInfo input[name="edit_gender"]:checked').val();
		
		xmlTagAr['org_id'] = $('#edit_oganisation').children('option:selected').attr('id').substring(7);
		if($('#userUploadImg').length>0){
			xmlTagAr['userImg'] = $('#userUploadImg').attr('alt');
		}else{
			xmlTagAr['userImg'] ="_images/icon/icon_user.png";
		}
		var forgetPwEmail = $('#edit_email').val();
		var forgetPwHints =$('#edit_pwHintAns').val();
		
		xmlTagAr['forgetPwEmail']=forgetPwEmail;
		
		if($('#setQuesHint').prop('checked') == true || forgetPwHints.length>0){
			xmlTagAr['forgetPwEmailQues']= $('#edit_pwHint option:selected').attr('id');
			xmlTagAr['forgetPwEmailAns']=forgetPwHints;
		}else{
			xmlTagAr['forgetPwEmailQues']= '';
			xmlTagAr['forgetPwEmailAns']= '';
		}
	}
	dataXML = _data_to_xml(xmlTagAr);
	return dataXML;
}

function refresehUserGpList(){
	dataXML = '<data><action>get_userGpList</action></data>';
	passDataToPHP_user(dataXML,'get_userGpList','0');
}

function getUserDetailInfo(userkey){
	dataXML = '<data><action>getUserDetailInfo</action><userkey>'+userkey+'</userkey></data>';
	passDataToPHP_user(dataXML,'getUserDetailInfo','0');
}



function databack_getSchStudentList(xml){
	$('#table_editStudList tr').remove();
	
	if ($(xml).find('schStudentList').size() > 0) {
		$(xml).find('schStudentList').each(function(){
			$('#table_editStudList').append('<a class="a_editStudList list_'+$(this).find('gender').text()+'" href="#'+$(this).find('userkey').text()+'">●'+$(this).find('username').text()+'</a>');
		});
	}
}




function databack_getUserDetailInfo(xml){
	
	if ($(xml).find('userDetailInfo').size() > 0) {
		var username = $(xml).find('username').text();
		var userPic = $(xml).find('userpic').text();
		
		if($(xml).find('userkey').text() == _loginUserkey){
			if($('.text_ownerName').length>0){
			$('.text_ownerName').text(username);
			}
			if($('.img_ownerPic').length>0){
				$('.img_ownerPic').attr('src',userPic);
			}
		}
		
		$('#edit_oganisation option').removeAttr('selected'); //.removeProp('selected');  31.5.2014
		$('#setEmail').removeProp('checked');
		$('#edit_pwHint option').removeAttr('selected');
		
		
		$('#userUploadImg').attr('src',userPic);
		$('#userUploadImg').attr('alt',userPic);
		$('#edit_realname').trigger('click').val(username);	
		$('#edit_login_name').text($(xml).find('login_name').text());	
		$('#edit_login_pw').trigger('click').val($(xml).find('login_pw').text());		
		$('#span_edit_userkey').text($(xml).find('userkey').text());
		
		if(isIE==true && $('#edit_login_textpw').length>0){
			$('#edit_login_textpw').trigger('click').val($(xml).find('login_pw').text());
		}
		
		$('#table_userEditInfo input[name=edit_gender][value='+$(xml).find('gender').text()+']').prop('checked','checked');
		var orgText = $(xml).find('org_id').text();
		var orgOption = '#opt_sch'+orgText;
		$(orgOption).attr('selected','selected');
		var email = $(xml).find('pw_email').text();
		if(email!= ''){
			$('#setEmail').prop('checked','checked');
			$('#edit_email').val($(xml).find('pw_email').text());
			
		}else{
			$('#setEmail').removeProp('checked');
			$('#edit_email').val('');
			
		}
		var ques = $(xml).find('pw_ques').text();
		if(ques!= ''){
			$('#setQuesHint').prop('checked','checked');
			$('#edit_pwHint option[id='+ques+']').attr('selected','selected');//.prop('selected','selected'); 31.5.2014
			$('#edit_pwHintAns').val($(xml).find('pw_ans').text());
				
		}else{
			$('#setQuesHint').removeProp('checked');
			$('#edit_pwHint option[id='+ques+']').removeAttr('selected'); //.removeProp('selected');
			$('#edit_pwHintAns').val('');
		}
	}
	if(ieProcess ==0){
		ieSetting_user();
		ieProcess++;
	}
}

function databack_getUserGpList(xml){
	
	$('#table_userGpList tr').remove();

	if ($(xml).find('joinedGp').size() > 0) {
		$(xml).find('joinedGp').each(function(){
			var groupkey = $(this).children('groupkey').text();
			var i = 0;
			var textToInsert = [];
			textToInsert[i++] = '<tr><td>-</td><td><a ';
			textToInsert[i++] = 'href="' + domain + 'studyGroup.php?id=';
			textToInsert[i++] = groupkey;
			textToInsert[i++] = '"><p class="side_p">';
			textToInsert[i++] = $(this).children('gp_topic').text();
			textToInsert[i++] = '</p></a></td></tr>';
			$('#table_userGpList').append(textToInsert.join(''));
		});
	}else{
		$('#table_userGpList').html('<tr><td class="font_lightBlue">Join group please!</td></tr>');
	}

}


//case 'insertFeedback':{
if ($(xml).find('action').text() == 'success') {
	$('#div_helpTable .error_msg').removeClass('display_none');
	$('#textarea_feedback').val('');
	
	break;
}
}
case 'getUserDetailInfo':{
databack_getUserDetailInfo(xml);
break;
}
case 'editUserInfo':{
if ($(xml).find('action').text() == 'success' && $(xml).find('userkey').text() == _loginUserkey) {
	getUserDetailInfo(_loginUserkey);
}
if ($(xml).find('action').text() == 'success'){
	$('#table_userEditInfo .error_msg').text('Update Successfully.');
}
if ($(xml).find('action').text() == 'failure') {
	$('#table_userEditInfo .error_msg').text('Update failure, please contact us.');
}
if ($(xml).find('action').text() == 'refreseh') {
	$('#table_userEditInfo .error_msg').text('Please login again');
}
break;
}
case 'get_SchStudentList':{
databack_getSchStudentList(xml);
break;
}





*/