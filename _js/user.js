var ieProcess = 0; /* ##check if using IE */

/* ## Init and Buttons click and textarea focus action---------------------------------------------------------- ## */
$(document).ready(function(){

	if ($('#table_userGpList').length > 0) {
		refresehUserGpList();
	}
	if($('#table_editStudList').length>0){
		getSchStudentList();
	}
	
	if ($('#textarea_feedback').length > 0) {
		$('#submit_feedback').click(function(){
			
			if($('#textarea_feedback').val() !=''){
					
				var tagNameAr = new Array('action','feedbackText','location');
				var tagValueAr = new Array('insertFeedback',$('#textarea_feedback').val(),document.URL);
	
				dataXML = data_form_to_xml(tagNameAr,tagValueAr);
				passDataToPHP_user(dataXML,'insertFeedback','#submit_feedback');
			
			}else{
				$('#textarea_feedback').addClass('error');
			}
		});
		
		$('#textarea_feedback').focus(function(){
			$('#textarea_feedback').removeClass('error');
			$('#div_helpTable .error_msg').addClass('display_none');
		});
	}
	
	if($('#btn_callSupport').length>0){
		$('#btn_callSupport').click(function(){
			$('iframe').css('display','none');
			initPopup('div_helpTable','500');
		});
	}
	
	if ($('#table_userEditInfo').length > 0) {
		$('#table_userEditInfo').on("click", "input[type='radio']", function(event){
			$('#table_userEditInfo input[name="' + $(this).attr('name') + '"]').removeAttr('checked').prop('checked', false);
			$(this).prop('checked', true);
		});
		
		$('#table_userEditInfo select').on("click", "option", function(event){
			$(this).parent('select').children().removeAttr('selected');//removeProp('selected'); 31.5.2014
			$(this).prop('selected', true);
		});
		
		$('#edit_email,#edit_pwHintAns').on('focusout', function(){
			var inputText = $(this).val();
			var targetCheckBox = $(this).prev('input[type=checkbox]');
			if (inputText.length > 0) {
				$(targetCheckBox).prop('checked', true);
			}
			else {
				$(targetCheckBox).prop('checked', false);
			}
		});
		
		$('#edit_email,#edit_pwHintAns,#edit_pwHint').on('focus', function(){
			$(this).prev('input[type=checkbox]').prop('checked', true);
			if ($(this).attr('id') == 'edit_pwHintAns') {
				$('#setQuesHint').prop('checked', true);
			}
		});
		
		$('#setQuesHint,#setEmail').on('click', function(){
			if ($(this).prop('checked') == false) {
				if ($(this).attr('id') == 'setQuesHint') {
					$('#edit_pwHintAns').val('').removeClass('error').removeClass('valid');
				}
				else {
					$(this).next('input[type=text]').val('').removeClass('error').removeClass('valid');
				}
			}
		});
		
		$('#btn_submitEditInfo').click(function(){
			if(reCheckNameAndPw()== true && checkForgetPwSetting_edit() == true){
				dataXML = formDataToXML_user('','editUserInfo');
				passDataToPHP_user(dataXML,'editUserInfo','#btn_submitEditInfo');
			}
		});
		
		$('#table_userEditInfo input').focus(function(){
			$(this).removeClass('error');
			$('#table_userEditInfo .error_msg').text('');
		});
	}
	
	if($('#table_editStudList').length>0){
		$('#table_editStudList').on('click','a', function(e){
			$('#table_userEditInfo .error_msg').text('');
			if($(this).hasClass('a_editStudList')){
				getUserDetailInfo($(this).attr('href').substring(1));
			}
			return false;
		});
		
		if(!isIE && typeof window['XMLHttpRequest'] !== "object"){
			$('#edit_login_pw').focus(function(){  //**For chinese verison platform only
				$('#edit_login_pw').attr('type','password'); //.addClass('font11');
			});
			$('#edit_login_pw').focusout(function(){
				if($('#edit_login_pw').val().length==0)
				$('#edit_login_pw').attr('type','text'); //.removeClass('font11');
			});
		}else{
			//$("#edit_login_pw").addClass('font11');   **For chinese verison platform only
			 $('#table_userEditInfo input[type="text"]').css('padding-top','6px').css('padding-bottom','0px');
			 $('#table_userEditInfo input[type="password"]').css('padding-top','6px').css('padding-bottom','0px');
			 
			 $("#edit_login_pw").focusout(function(){
				if(this.value.length ==0){
					$("#edit_login_textpw").css("display","inline");
					$("#edit_login_pw").css("display","none");
					$("#edit_login_textpw").trigger('foucs');
					$("#edit_login_textpw").addClass('error');
				}
			});
		}
	}
});

/* ## Function for interface, checking data and send to database---------------------------------------------------------- ## */

function ieSetting_user(){
	if(!isIE && typeof window['XMLHttpRequest'] !== "object"){
	}else{
		 add_placeholder('edit_login_textpw', 'length:4-15, digits or letters, case sensitive'); 
		 add_placeholder('edit_realname', 'length:2-15, digits or letters, case sensitive'); 
	}
}

function getSchStudentList(){
	dataXML = '<data><action>getSchStudentList</action></data>';
	passDataToPHP_user(dataXML,'get_SchStudentList','0');
}

function reCheckNameAndPw(){
		
		var specialReg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi; /*^[A-Z0-9 _]*$(/*/;
		var pwReg =  /[^a-zA-Z0-9_]/;
		
	 	var username =$('#edit_realname').val();
		var password = $('#edit_login_pw').val();
		if(!specialReg.test(username) && username.length>2 && username.length<15) {
			if(!pwReg.test(password)){
				return true;
			}else{
				$('#edit_login_pw').addClass('error');
				return false;
			}
		}else{
			$('#edit_realname').addClass('error');
			return false;
		}
}


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
		
		xmlTagAr['org_id'] = $('#edit_organisation').children('option:selected').attr('id').substring(7);
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


function passDataToPHP_user(dataXML,source,targetBtn){
	$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	if (!$(targetBtn).hasClass('disabled')) {
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
		}
		$.ajax({
			type: "POST",
			url: "_functPHP/functUser.php",
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
					case 'get_userGpList':{
						databack_getUserGpList(xml);
						break;
					}
					case 'insertFeedback':{
						if ($(xml).find('action').text() == 'success') {
							$('#div_helpTable .error_msg').removeClass('display_none');
							$('#textarea_feedback').val('');
							$('#submit_feedback').attr('disabled', '');
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
							$('#table_userEditInfo .error_msg').text('Update failure,please contact us.');
						}
						if ($(xml).find('action').text() == 'refreseh') {
							$('#table_userEditInfo .error_msg').text('Please login again.');
						}
						break;
					}
					case 'get_SchStudentList':{
						databack_getSchStudentList(xml);
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
		
		$('#edit_organisation option').removeAttr('selected'); //.removeProp('selected');  31.5.2014
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
		//var orgOption = '#opt_sch'+orgText;
		//$(orgOption).attr('selected','selected');
		
		$('#edit_organisation').children('option').remove();
		$(xml).find('schoolList').each(function(i){
		var addstr= '<option id="opt_sch'+$(this).find('scode').text()+'"';
		
		if($(this).find('scode').text() == orgText){
		addstr= addstr+' selected="selected" ';
		}
		
		addstr=addstr+'>'+$(this).find('sname').text()+'</option>';
		$('#edit_organisation').append(addstr);
		
		});

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
		$('#table_userGpList').html('<tr><td class="font_lightBlue">Join the group you are interested in！</td></tr>');
	}
}