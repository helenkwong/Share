var _organisationXml;
var _repeatUser = true;
var isTeacher = false;
var loginname_focus = false;
var currentTable = "#table_register";

/* ## Init and Buttons click and interface action---------------------------------------------------------- ## */
$(document).ready(function(){

	init_validator();
	
	if($('#table_loginbox').length>0){
		init_login();
	}
	if($('#table_signup_form').length>0){		
		init_signup();
	}
	
	$('#div_helpTable').removeClass('display_none');
	$('#div_helpTable .popupClose').remove();
	
	$('#guest_login').click(function(){
	$('#input_loginname').val("guest");
	$('#input_loginpw').val("guest");
	$('#btn_login').trigger('click');
	
	});
	
	$('#sideMenuTable a').click(function(){
		$('#sideMenuTable a').removeClass('selected');
		$(this).addClass('selected');
		
		
		var targetTable = '';
		
		switch ($(this).attr('id')) {
			case ('btn_forgetPwTable'):
				targetTable = '#table_forgetPw';
				break;
			case ('btn_aboutusTable'):
				targetTable = '#table_aboutUs';
				break;
			case ('btn_registerTable'):
				targetTable = '#table_register';
				break;
			case ('btn_helpTable'):
				targetTable = '#table_help';
				break;
			case ('btn_newsTable'):
				targetTable = '#table_indexNews';
				break;
		}
		
		$(currentTable).fadeOut( "fast", function() {
			$(currentTable).addClass('display_none');
			$( targetTable).fadeIn( "fast", function() {
				$(targetTable).removeClass('display_none');
			 });
		 });
		currentTable = targetTable;
		//$(targetTable).removeClass('display_none');
	});
	
	$('#btn_platformRule').click(function(){
		//$('#tr_platformRule').toggle('slow');
		displayInOut('#tr_platformRule');
	});
	
	$('#tr_platformRule .btn_close').click(function(){
		//$('#tr_platformRule').toggle('slow');
		displayInOut('#tr_platformRule');
	});
	
	$('#btn_goRegister').click(function(){
		$('#btn_registerTable').trigger('click');
	});

	$('#btn_forgetpw').click(function(){
		$('#btn_forgetPwTable').trigger('click');
	});
	
	
	init_forgetPw();
});

/* ## Function for interface and send to database---------------------------------------------------------- ## */


function init_signup(){
	
	if($('#reg_organisation').length>0){
	dataXML="<data><action>getUserSchoolList</action></data>";
	passDataToPHP_loginRegister(dataXML,'getUserSchoolList','0');
	}
	
	$('#table_signup_form').on("click", "input[type='radio']", function(event){
		if($(this).prop('value')== "pre_teacher"){
			isTeacher = true;
			$('#tr_teacherConfirm').removeClass('display_none');
		}
		else if($(this).prop('value')== "student"){
			isTeacher = false;
			$('#tr_teacherConfirm').addClass('display_none');
		}
		$('#table_signup_form input[name="'+$(this).attr('name')+'"]').removeAttr('checked').prop('checked',false);
		$(this).prop('checked',true);
	});
	
	$('#table_signup_form select').on("click", "option", function(event){
		$(this).parent('select').children().removeAttr('selected'); //31.5.2014
		$(this).attr('selected','selected');
	});
	
	if(! isIE && typeof window['XMLHttpRequest'] !== "object"){
		$('#reg_login_pw').focus(function(){ //** for chinese vversion only
			$('#reg_login_pw').attr('type','password'); //.addClass('font11');
		});
		$('#reg_login_pw').focusout(function(){
			if($('#reg_login_pw').val().length==0)
			$('#reg_login_pw').attr('type','text'); //.removeClass('font11');
		});
		$('#input_loginpw').focus(function(){
			$('#input_loginpw').attr('type', 'password'); //.addClass('font11');
		});
		$('#input_loginpw').focusout(function(){
			if($('#input_loginpw').val().length==0)
			$('#input_loginpw').attr('type','text'); //.removeClass('font11');
		});
	}else{
		/*$("#reg_login_pw").addClass('font11');  ** for chinese vversion only
		$("#input_loginpw").addClass('font11');*/
		
		 $('input[type="text"]').css('padding-top','6px').css('padding-bottom','0px');
		 $('input[type="password"]').css('padding-top','6px').css('padding-bottom','0px');
		 
		 add_placeholder('input_loginname', 'Login name');   
		 add_placeholder('input_loginTextPw', 'Login Password'); 
		 add_placeholder('reg_login_name', '4-15 digits, letters or underscore, case sensitive'); 
		 add_placeholder('reg_login_textpw', '4-15 digits or letters, case sensitive'); 
		 add_placeholder('reg_realname', '2-15 digits, letters or underscore, case sensitive'); 
		 
		 $("#reg_login_pw").focusout(function(){
			if(this.value.length ==0){
				$("#reg_login_textpw").css("display","inline");
				$("#reg_login_pw").css("display","none");
				$("#reg_login_textpw").trigger('foucs');
				$("#reg_login_textpw").addClass('error');
			}
		});
		
		$("#input_loginpw").focusout(function(){
			if(this.value.length ==0){
				$("#input_loginTextPw").css("display","inline");
				$("#input_loginpw").css("display","none");
				$("#input_loginTextPw").trigger('foucs');
				$("#input_loginTextPw").addClass('error');
			}
		});
	}
	
	$('#reg_login_name').focusout(function() {
		checkRepeat_loginName();	
	});

	$('#table_signup_form .emailInput').change(function(){
		$(this).removeClass('valid');
		if($(this).val() =='' || emailCheck($(this).val()) == false){
			$(this).addClass('error');
		}else{
			$(this).addClass('valid');
		}
	});

	$('#signupForm').validate({
		errorLabelContainer: $("#reg_error"),
		rules: {
			reg_login_name:{
				required:true,
				regname:true,
				repeatuser:true,
				rangelength:[4,15]
			},
			reg_login_pw: {
				required: true,
				regname:true,
				rangelength: [4,15]
			},
			reg_realname:{
				required: true,
				regspecial:true,
				rangelength: [1,20]
			},
			reg_email:{
				required: false,
				email:true
			},
			reg_teacherComfirmEmail:{
				required: false,
				email:true
			}
		},messages:{
			reg_login_name:{
				required: "",
				regname:"",
				repeatuser:"Please use another name",
				rangelength: ""
			},
			reg_login_pw: {
				required: "",
				regname: "",
				rangelength: ""
			},
			reg_realname: {
				required: "",
				regspecial:"",
				rangelength: ""
			}
			,reg_email:{
				required:"",
				email:""
			},
			reg_teacherComfirmEmail:{
				required:"",
				email:""
			}
		}
	});
	
	$('#btn_submitRegister').click(function(){
		submit_insertNewUser();
		return false;
	});

	$('#reg_email,#reg_pwHintAns').on('focusout', function(){
		var inputText =  $(this).val();
		var targetCheckBox = $(this).prev('input[type=checkbox]');
		if(inputText.length>0){
			$(targetCheckBox).prop('checked',true);
		}else{
			$(targetCheckBox).prop('checked',false);
		}
	});
	
	$('#reg_email,#reg_pwHintAns,#reg_pwHint').on('focus', function(){
		 $(this).prev('input[type=checkbox]').prop('checked',true);
		if($(this).attr('id') == 'reg_pwHintAns'){
			$('#setQuesHint').prop('checked',true);
		}
	});
	
	$('#setQuesHint,#setEmail').on('click', function(){
		 if($(this).prop('checked') == false){
		 	if($(this).attr('id') == 'setQuesHint'){
				$('#reg_pwHintAns').val('').removeClass('error').removeClass('valid');;
			}else{
				$(this).next('input[type=text]').val('').removeClass('error').removeClass('valid');;
			}		
		 }
	});
	
	
}

function teacherIdenitityChecking(){
	
	var ecode =$('#reg_teacherComfirmCode').val();
	var temail = $('#reg_teacherComfirmEmail').val();
	
	if(temail == '' && ecode == ''){
		$('#reg_teacherComfirmCode').addClass('error');
		$('#reg_teacherComfirmEmail').addClass('error');
		$('#tr_teacherConfirm input').bind('keydown',function(){
			$('#tr_teacherConfirm input').removeClass('error');
		});
		return false;
	}
	else if (ecode != '') {
		if(ecode != 'lead@teachers'){
			$('#reg_teacherComfirmCode').removeClass('valid').addClass('error');
			$('#tr_teacherConfirm input').bind('focus',function(){
				$('#tr_teacherConfirm input').removeClass('error');
			});
			return false;
			
		}else{
			$('#reg_teacherComfirmCode').addClass('valid');
			return true;
		}
	}
	
	if (temail.length>0) {
		if(emailCheck(temail) == false){
			$('#reg_teacherComfirmEmail').removeClass('valid').addClass('error');
			$('#tr_teacherConfirm input').bind('focus',function(){
				$('#tr_teacherConfirm input').removeClass('valid').removeClass('error');
			});
			return false;
		}else{
			$('#reg_teacherComfirmEmail').addClass('valid');
			return true;
		}
	}
}

function forgetPw_basicCheck(){	
	$('#forgetPw_message').html('');
	$('#forgetPw_messageb').html('');
	
	
	var getPwInfo = $('#getPw_input').val();
	var userChoice = $('#table_forgetPw input[name=getPw_info_radio]:checked').attr('value');
	if(getPwInfo.length<1){
		$('#getPw_input').addClass('error');	
			return false;
	}else if(userChoice == 'email' && emailCheck(getPwInfo) == false){
			$('#getPw_input').addClass('error');
			return false;
	}else if(userChoice == 'loginname' && (getPwInfo.length <4 || getPwInfo.length>16 || !/[^a-zA-Z0-9_]/.test(getPwInfo)!= true)){
			$('#getPw_input').addClass('error');
			return false;
	}else{
		$('#getPw_input').removeClass('error');
		return true;
	}
}

function init_validator(){
	
	/*about validation*/
	$.validator.methods.repeatuser= function(value, element, param){
	 	return _repeatUser;  	
	};
	
	$.validator.methods.regspecial = function(value, element, param){
		var specialReg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi; /*^[A-Z0-9 _]*$(/*/
	 	return !specialReg.test(value);  	
	};
	$.validator.methods.regname = function(value, element, param){
		return !/[^a-zA-Z0-9_]/.test(value);
	};

}

function checkForgetPwSetting(){
	
	var useremail = $('#reg_email').val();
	var userQuesHint = $('#reg_pwHintAns').val(); 
	if($('#setEmail').prop('checked') == false && $('#setQuesHint').prop('checked') == false){
		$('#reg_email').removeClass('valid').addClass('error');
		return false;
	}
	if($('#setQuesHint').prop('checked') == true){
		if(userQuesHint.length ==0){
			$('#reg_pwHintAns').removeClass('valid').addClass('error');
			return false;
		}
	}
	if($('#setEmail').prop('checked') == true){
		if(emailCheck(useremail) == false){
			$('#reg_email').removeClass('valid').addClass('error');
			return false;
		}
	}
	return true;
}

function init_login(){
	
	$('#btn_login').click(function(){
		submit_checklogin();
		return false;
	});
	
	$('#input_loginname').focusout(function(){
		if(loginname_focus == true){
			textName = $('#input_loginname').val();
			mentalCheckLoginInfo(textName,'#input_loginname');
		}
	});
	$('#input_loginname').focus(function(){
		$('#login_message').text('');
		$(this).removeClass('error');
		$(this).removeClass('valid');
		loginname_focus = true;
	});
	
	$('#input_loginpw').focusout(function(){
		textName = $('#input_loginpw').val();
		mentalCheckLoginInfo(textName,'#input_loginpw');
	});
	$('#input_loginpw').focus(function(){
		$('#login_message').text('');
		$(this).removeClass('error');
		$(this).removeClass('valid');
	});
	
}
function mentalCheckLoginInfo(textName,targetObject){
		$(targetObject).removeClass('error');
		$(targetObject).removeClass('valid');
	
	if(textName.length<4 || textName.length>15 ||  !/[^a-zA-Z0-9_]/.test(textName) == false){
		$(targetObject).addClass('error');
		return false;
	}else{
		$(targetObject).addClass('valid');
		return true;
	}
}

function submit_checklogin(){
	
	$('#login_message').text('');
	var textName = $('#input_loginname').val();
	var textPw = $('#input_loginpw').val();
	var results = $("#loginForm").valid();
	
	var checkpw = mentalCheckLoginInfo(textPw,'#input_loginpw');
	var checkname = mentalCheckLoginInfo(textName,'#input_loginname');

	if (checkname == true && checkpw == true) {
		dataXML = formDataToXML_login('#loginForm input','checkLoginUser');
		passDataToPHP_loginRegister(dataXML,'checkLoginUser','#btn_login');
	}
	else {
		$('#login_message').text('Incorrect login name or password ');
	}
}

function submit_insertNewUser(){

	var result_identity = true;
	var result_login = $("#signupForm").valid();
	var result_password = checkForgetPwSetting();
	var xmlTagAr = Array();
	checkRepeat_loginName();
	$('#reg_error').text('');
	
	if(isTeacher == true){
		result_identity =  teacherIdenitityChecking();
	}

	if(result_login == true && result_password == true && result_identity == true ){ //&& result_personal == true
		dataXML = formDataToXML_login('#table_signup_form .inputData','insertNewUser');
		passDataToPHP_loginRegister(dataXML,'insertNewUser','#btn_submitRegister');
	}
}

function init_forgetPw(){
	
	$('#table_forgetPw input[type=text]').focus(function(){
		$(this).removeClass('error');
	});
	
	$('#checkInfo_a').click(function(){
		$('#getPw_input').trigger('focusout');
	});
	
	$('#getPw_input').focusout(function(){
		$('#userBeforeSetEmail').val('');
		$('#forgetPw_message').html('');
	
		if(forgetPw_basicCheck() == true){
			var getPwInfo = $('#getPw_input').val();
			var userChoice = $('#table_forgetPw input[name=getPw_info_radio]:checked').attr('value');
	
			var xmlTagAr = Array();
			xmlTagAr['userInfoType'] = userChoice;
			xmlTagAr['userInfo'] = getPwInfo;
			xmlTagAr['action'] = 'checkForgetPw';
			dataXML = _data_to_xml(xmlTagAr);
			passDataToPHP_loginRegister(dataXML,'checkForgetPw','#getPw_input');
			
		}else{
			
		}
	});
	
	$('#forgetpw_submit').click(function(){
		
		var getPwInfo = $('#getPw_input').val();
		var userChoice = $('#table_forgetPw input[name=getPw_info_radio]:checked').attr('value');
		var userMethod = $('#table_forgetPw input[name=getPwWay]:checked').attr('id');
		var userHintsAns = $('#getPwHintAns').val();
		if(forgetPw_basicCheck() == false){
			
		}else if(userMethod =="chooseHints" && userHintsAns.length<1){
			$('#getPwHintAns').addClass('error');
				return false;
		}else{
			$('#forgetPw_loading').removeClass('display_none');	
			var xmlTagAr = Array();
			xmlTagAr['userInfoType'] = userChoice;
			xmlTagAr['userInfo'] = getPwInfo;
			xmlTagAr['userMethod'] = userMethod;
			xmlTagAr['userHintsAns'] = userHintsAns;
			xmlTagAr['action'] = 'submitForgetPw';
			dataXML = _data_to_xml(xmlTagAr);
			passDataToPHP_loginRegister(dataXML,'submitForgetPw','#forgetpw_submit');
		}
	});
	
	$('#table_forgetPw').on("click", "input[type='radio']", function(event){
		$('#table_forgetPw input[name="'+$(this).attr('name')+'"]').removeAttr('checked').prop('checked',false);
		$(this).prop('checked',true);
		if($(this).attr('name') == 'getPw_info_radio'){
			forgetPw_basicCheck();
		}
		$('#forgetPw_messageb').html('');
		
	});
}

function checkRepeat_loginName(){
	dataXML = formDataToXML_login('#reg_login_name','checkLoginName');
	passDataToPHP_loginRegister(dataXML,'checkLoginName','0');
}


//common use function
function formDataToXML_login(target,action){
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
	if(action == 'insertNewUser'){
		xmlTagAr['gender'] = $('#table_signup_form input[name="reg_gender"]:checked').val();
		xmlTagAr['org_id'] = $('#reg_organisation').children('option:selected').attr('id').substring(7);
		xmlTagAr['org_name'] = $('#reg_organisation').children('option:selected').val();
		xmlTagAr['identity'] = $('#table_signup_form input[name="reg_identity"]:checked').val();
		
		if($('#reg_teacherComfirmCode').val() == 'lead@teachers'){
			xmlTagAr['identity'] = 'teacher';
		}
		if($('#userUploadImg').length>0){
			xmlTagAr['userImg'] = $('#userUploadImg').attr('alt');
		}else{
			xmlTagAr['userImg'] ="_images/icon/icon_user.png";
		}
		
		if(xmlTagAr['identity'] == 'pre_teacher'){
			var teacherEmail = $('#reg_teacherComfirmEmail').val();
			if (teacherEmail.length > 0){
				xmlTagAr['teacherEmail'] = teacherEmail;
			}else{
				xmlTagAr['teacherEmail'] = 'No';
			}
		}
		var forgetPwEmail = $('#reg_email').val();
		var forgetPwHints =$('#reg_pwHintAns').val();
		
		if($('#setQuesHint').prop('checked') == true || forgetPwHints.length>0){
			xmlTagAr['forgetPwEmailQues']= $('#reg_pwHint option:selected').attr('id');
			xmlTagAr['forgetPwEmailAns']=forgetPwHints;
		}else{
			xmlTagAr['forgetPwEmailQues']= '';
			xmlTagAr['forgetPwEmailAns']= '';
		}
	}
	
	dataXML = _data_to_xml(xmlTagAr);
	return dataXML;
}


//php function --------------------------------------------------------------------------
function passDataToPHP_loginRegister(dataXML,source,targetBtn){
	$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	if (!$(targetBtn).hasClass('disabled')) {
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
			$(targetBtn).attr('disabled','disabled');
		}
		$.ajax({
			type: "POST",
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
					case 'checkLoginUser':{
						databack_checkLoginUser(xml);
						break;
					}
					case 'insertNewUser':{
						databack_insertNewUser(xml);
						break;
					}
					case 'checkLoginName':{
						databack_checkLoginName(xml);
						break;
					}
					case 'submitForgetPw':{
						databack_submitForgetPw(xml);
						break;
					}
					case 'checkForgetPw':{
						databack_checkForgetPw(xml);
						break;
					}
					case 'getUserSchoolList':{
					databack_getUserSchoolList(xml);break;}
				}
				$(targetBtn).removeClass('disabled');
				$(targetBtn).removeAttr('disabled','disabled');
				$(targetBtn).parent().find('.tempUpload').remove();
			}
		});
		
	}
}

/* ## Function for returning data from database---------------------------------------------------------- ## */

function databack_getUserSchoolList(xml){
$('#reg_organisation').children('option').remove();
$(xml).find('schoolList').each(function(i){
var addstr= '<option id="opt_sch'+$(this).find('scode').text()+'"';

if(i=0){
addstr= addstr+' selected="selected" ';
}

addstr=addstr+'>'+$(this).find('sname').text()+'</option>';
$('#reg_organisation').append(addstr);

});

}
function databack_checkForgetPw(xml){
	$('#chooseHints').attr('disabled','disabled').removeAttr('checked').prop('checked',false);
	$('#chooseEmail').attr('disabled','disabled').removeAttr('checked').prop('checked',false);
	$('#get_pwHint option').removeAttr('selected').attr('disabled','disabled'); //31.5.2014
	$('#getPwHintAns').attr('disabled','disabled');
	$('#forgetPw_message').html('');
	
	if ($(xml).find('result').text() != 'true') {
		$('#forgetPw_message').html('(Incorrect Information)');
	}else{
		var userEmail = $(xml).find('pw_email').text();
		var userQues = $(xml).find('pw_ques').text();
	
		if (userQues != '') {
			$('#chooseHints').prop('checked', true);
			var targetQues = '#opt_getPw' + userQues.substring(6)
			$(targetQues).prop('selected',true).removeAttr('disabled','disabled');
			$('#chooseHints').removeAttr('disabled');
			$('#getPwHintAns').removeAttr('disabled');
		}
		
		if(userEmail!=''){
			$('#userBeforeSetEmail').html('('+userEmail+')');
			$('#chooseEmail').prop('checked',true);
			$('#chooseEmail').removeAttr('disabled');
		}
	}
	$('#forgetPw_loading').addClass('display_none');	
}

function databack_submitForgetPw(xml){
	if ($(xml).find('result').text() != 'true') {
		$('#forgetPw_message').html('(Incorrect Information)');
	}else{
		if ($(xml).find('sendemail').text() == 'true') {
			$('#forgetPw_messageb').html('The email is sent');
		}else if($(xml).find('hints').text() == 'false'){
			$('#forgetPw_messageb').html('Incorrect answer');
		}else {
			$('#forgetPw_messageb').html('**'+$(xml).find('realname').text()+':<br />Login name:'+$(xml).find('login_name').text()+'<br />Login password:'+$(xml).find('login_pw').text());
		}
	}	
}

function databack_checkLoginName(xml){
	if($(xml).find('repeatuser').text()=='0'){
		_repeatUser = true;
	}else{
		_repeatUser = false;
	}
	$("#signupForm").validate().element( "#reg_login_name" );
	$("#reg_error").val('Please use another login name');
}


function databack_insertNewUser(xml){
		var isRepeatUser = $(xml).find('repeatuser').text();
		var insertSuccess = $(xml).find('user_id').text();

		if(isRepeatUser == '0' && insertSuccess == '1'){	

			//$('#signupForm .error').removeClass();
			_repeatUser = true;
			var username = $('#reg_login_name').val();
			var password = $('#reg_login_pw').val();	
			
			$('#input_loginname').val(username);
			$('#input_loginpw').val(password);
			
			$('#signupForm input[type="text"]').val('');
			$('#signupForm input[type="password"]').val('');
			$('#signupForm input[type="radio"]').removeProp('checked');
			$('#signupForm input[type="option"]').removeAttr('selected'); //.removeProp('checked'); 31.5.2014
			$('#signupForm input[name="reg_gender"][value="m"]').prop('checked',true);
			$('#signupForm input[name="reg_identity"][value="student"]').prop('checked',true);
			$('#opt_sch0001').prop('selected',true);
			$('#opt_pwQues01').prop('selected',true);
			$('#uploadImgForm').resetForm();		
			$('#reg_error').text("Thank you! Sign up-Success");	
			$('#reg_error').css('display','block');		
			$('#btn_login').trigger('click');
		}
		else if (isRepeatUser != '0') {
			_repeatUser = false;
			$("#signupForm").validate().element("#reg_login_name");
		}
		else {
			$('#reg_error').text("Sign up-Failure, please contact us.");
			$('#reg_error').css('display','block');		
		}
}

function databack_checkLoginUser(xml){
	var loginUser = $(xml).find('login_user').text();
	if (loginUser != '1') {
		$("#login_message").css('display', 'block');
		$("#login_message").html('Incorrect Login name or password');
		$("#login_message").addClass('error');
	}
	else {
		var userkey = $(xml).find('userkey').text();
		$("#login_message").html('Login-Success');
		window.location.href = domain + "study.php?id=" + userkey;
	}
	//$('#login_submit').attr("disabled", false);
}

