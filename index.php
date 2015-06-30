<?php
	$_pageName = "index";
	$_jpFileName = "login_register";
	include_once '_subPHP/headerPHP.php';
	include_once '_subPHP/headerHTML.php';
?>
<table class="W1024H700" class="vertAlign_top" >
	<tr>
		<td class="W3" rowspan="2"></td>
		<td class="W231H126" ></td>
		<td class="W760" ></td>
	</tr>
	<tr>
		<td id="td_loginbox" rowspan="2" class="vertAlign_top" >
			<form id="loginForm">
				<table id="table_loginbox">
					<tr>
						<td class="H90" colspan="3"></td>
					</tr>
					<tr >
						<td id="td_loginname" colspan="3"><input id="input_loginname" type="text" placeholder="Login name" value="" ></td>
					</tr>
					<tr>
						<td class="H10" colspan="3"></td>
					</tr>
					<tr>
						<td id="td_loginpw" colspan="3">
						<?php if (detectIE()) { ?>
						<input id="input_loginTextPw" type="text" placeholder="Login password">
						<input id="input_loginpw" type="password" class="display_none" >
						<?php }else{ ?>
							<input id="input_loginpw" type="text" placeholder="Login password" value="">
						<?php } ?>
						</td>
					</tr>
					<tr>
						<td><label id="login_message" class="font14 error_msg"><?php 
							if(isset($_GET['act']) && $_GET['act']=='refreseh'){
								echo('Please login again');
							} ?>
						</label></td>
					</tr>
					
					<tr >
						<td><a id="btn_forgetpw"></a></td>
						<td width="10px"></td>
						<td ><a id="btn_login"></a></td>
					</tr>
					<tr >
						<td id="td_goRegister" colspan="3"><a id="btn_goRegister"></a></td>
					</tr>
					<tr>
					<td colspan="3"><p><br /><b><a id="guest_login"></a></b></p></td>
					</tr>
				</table>
			</form>
		</td>
		<td id="td_indexbox">
			<table width="100%" height="100%">
				<tr><td class="td_whiteTopW688"></td></tr>
				<tr>
					<td class="td_whiteMiddleW688">
						<table class="vertAlign_top">
							<tr>
								<td class="W650">
									<table id="table_register" class="contentTable">
										<tr>
											<td id="title_regIcon" colspan="2"></td>
										</tr>
										<tr>
											<td class="H10" colspan="2">												
											</td>
										</tr>
										<tr>
											
											<td id="td_uploadImg">
											<div id="div_leftBtn"><a id="a_leftBtn"></a></div>
												<div id="div_uploadUserImg"></div><div id="div_rightBtn"><a id="a_rightBtn"></a></div><br /><br /><br /><br /><br /><br />
												<a id="btn_uploadUserImg"></a>
												<form id="uploadImgForm" method="POST" enctype="multipart/form-data" action="_upload/zp_ajaximage.php">
													<input type="file" name="uploadImg" id="uploadImg" size="8" />	
													<input name="btn_triggerUpload" id="btn_triggerUpload" type="submit" value="Upload" />
												</form>
												 
											</td>
											<td>
												<form id="signupForm">
													<table id="table_signup_form" class="font16">
														<tr><td class="basicFontSyle"><input type="radio" name="reg_identity" value="student" checked="checked" />Student <input type="radio"  name="reg_identity" value="pre_teacher"/>Teacher &nbsp; School:<select class="basicFontSyle" id="reg_organisation" name="reg_organisation" >
														<option id="opt_sch0001" selected="selected">School A</option><option id="opt_sch0002">School B</option><option id="opt_sch0003">School C</option><option id="opt_sch0004">School D</option><option id="opt_sch0005">School E</option><option id="opt_sch0006">School F</option><option id="opt_sch0007">School G</option><option id="opt_sch0000">School H</option></select></td></tr>
														<?php if (detectIE()) { ?>
														<tr><td class="font_lightBlue" >Login Name： <input type="text" class="inputData inWidth150" id="reg_login_name" name="reg_login_name" value="" placeholder="4-15 digits, letters and underscore" maxlength="15" /><tr><td>
														<tr><td class="font_lightBlue" >Login Password：<input class="inWidth150" id="reg_login_textpw" name="reg_login_textpw" type="text" value="" placeholder="4-15 digits or letters" maxlength="15" />
														<input class="inputData inWidth150 display_none font16" id="reg_login_pw" name="reg_login_pw" type="password" value=""  maxlength="15" /></td></tr><tr><td>Name: <input type="text" class="inputData inWidth150" id="reg_realname" name="reg_realname" placeholder="2-15位非符號的有效名字" /></td></tr>
														<?php } else{ ?>
														<tr><td class="font_lightBlue td_vBottom" >Login name:<input type="text" class="inputData inWidth150" id="reg_login_name" name="reg_login_name" value="" placeholder="4-15 digits, letters and underscore"/></td></tr>
														<tr><td class="font_lightBlue" >Login Password：<input class="inputData inWidth150" id="reg_login_pw" name="reg_login_pw" type="text" value="" placeholder="4-15 digits or letters" /></td></tr>
														<tr><td class="td_vBottom">Name: <input type="text" value="" class="inputData inWidth150" id="reg_realname" name="reg_realname" placeholder="2-15 digits or letters" /></td></tr>
													<?php }?>	
														<tr><td>Gender:<input type="radio"  name="reg_gender" value="m" checked="checked"/>M <input name="reg_gender" value="f" type="radio" />F</td></tr>
														<tr><td class="td_vBottom">
														Forget Password Setting<br />
														<input type="checkbox" id="setEmail" />Email：<input type="text" size="27" class="inputData emailInput" id="reg_email" name="reg_email" value="" /><span class="font15 font_grey"></span>
														<br /><input type="checkbox" id="setQuesHint" />Forget password setting：<select name="reg_pwHint" id="reg_pwHint"  class="basicFontSyle"><option id="opt_pwQues01" selected="selected" >Question A?</option><option id="opt_pwQues02">Question B?</option><option id="opt_pwQues03">Question C?</option><option id="opt_pwQues04">Question D?</option></select><br />&nbsp;&nbsp;&nbsp;&nbsp;Your Answer:<input id="reg_pwHintAns" id="reg_pwHintAns" type="text" /></td></tr>
														
														<tr id="tr_teacherConfirm" class="display_none"><td>Teacher Confirmation<br />
														<span class="font15">Confirmation password： <input type="text" size="7" id="reg_teacherComfirmCode" name="reg_teacherComfirmCode"/>School email:<input type="text" class="emailInput" size="24" id="reg_teacherComfirmEmail" name="reg_teacherComfirmCodeEmail" value="" /></span><br />
														<span class="font13 font_grey">（Administrator will reply you within 24 hours.)</span></td></tr>
														<tr><td class="td_vBottom">Remark:<input type="text" size="40" class="inputData" id="reg_message" name="reg_message"/></td></tr>
														<tr><td><label id="reg_error"></label></td></tr>
														<tr><td><a id="btn_submitRegister"></a><br /><span class="font15 font_grey">*By clicking Sign Up, you agree to our <a id="btn_platformRule"><u>Terms</u></a></span></td></tr>
														<tr id="tr_platformRule" class="display_none"><td class="font14 font_lightBlue">
																<span><a class="btn_close_30 floatRight" ></a></span><br />
																<p><u>Statement of Rights and Responsibilities</u></p>
																<p>Rules：</p>
																<p>1.XXXXXXXXXXXXXXXXXXXXXXXX</p>
																<p>2.XXXXXXXXXXXXXXXXXXXXXXXX</p>
																<p>3.XXXXXXXXXXXXXXXXXXXXXXXX</p>
																<p>4.XXXXXXXXXXXXXXXXXXXXXXXX</p>
																<p>5.XXXXXXXXXXXXXXXXXXXXXXXX</p>
																<p>6.XXXXXXXXXXXXXXXXXXXXXXXX</p>
																<p>7.XXXXXXXXXXXXXXXXXXXXXXXX</p>
												
														</td></tr>
													</table>
												</form>
											</td>
										</tr>
									</table>
									<table id="table_aboutUs" class="display_none contentTable">
										<tr>
											<td></td>
										</tr>
										<tr>
											<td id="title_aboutUsIcon" colspan="2"></td>
										</tr>
										<tr>
											<td id="td_aboutUsImg">
												<br />
												<a class="img_leadImg"></a>
											</td>
											<td class="W440">
												<br />
												<img src="_images/register/img_aboutUs.png" width="498px" height="279px" />
											</td>
										</tr>
									</table>
									<table id="table_indexNews" class="display_none contentTable">
										<tr>
											<td></td>
										</tr>
										<tr>
											<td id="title_indexNewsIcon" colspan="2"></td>
										</tr>
										<tr>
											<td id="td_indexNewsImg">
											<br />
												<a class="img_leadImg"></a>
											</td>
											<td >
												<p>Coming Soon!</p>
											</td>
										</tr>
									</table>
									<table id="table_help" class="display_none contentTable">
										<tr>
											<td>
												<?php include_once '_subPHP/feedbackTableHTML.php'; ?>
											</td>
										</tr>
										
									</table>
									<table id="table_forgetPw" class="display_none contentTable">
										<tr>
											<td id="title_forgetPw">												
											</td>
										</tr>
										<tr>
											<td class="H10">												
											</td>
										</tr>
										<tr>
											<td>
												<table id="table_sub_forgetPw">
													<tr>
														<td class="bg_white pad5">		 
														<label>Please provide</label><input type="radio" name="getPw_info_radio" value="email" checked /><label>Registered email</label> &nbsp; <input type="radio" name="getPw_info_radio" value="loginname" /><label>Login name</label>
														</td>
													</tr>
													<tr class="bg_white pad5">
														<td>&nbsp;<input id="getPw_input" name="getPw_input" size="30" type="text" class="formdata" /><a id="checkInfo_a">Submit</a><span id="forgetPw_message" class="error_msg"></span>
														</td>
													</tr>
													<tr class="bg_white pad5">
														<td class="H10">												
														</td>
													</tr>
													<tr class="bg_white pad5">
														<td>&nbsp;<label>Select</label><br />
														</td>
													</tr>
													<tr class="bg_white pad5">
														<td>&nbsp;<input type="radio" name="getPwWay" id="chooseEmail" disabled="disabled" />Getting password by email<span id="userBeforeSetEmail"></span><br />
														&nbsp;<input type="radio"  name="getPwWay" id="chooseHints" disabled="disabled" />Getting password by answering question<br />
														</td>
													</tr>
													<tr class="bg_white pad5">
														<td>	
														&nbsp;&nbsp;&nbsp;&nbsp;Question：<select name="get_pwHint" id="get_pwHint"  class="basicFontSyle">
															<option id="opt_getPwQues01" selected="selected" >Question A？</option>
															<option id="opt_getPwQues02">Question B？</option>
															<option id="opt_getPwQues03">Question C？</option>
															<option id="opt_getPwQues04">Question D？</option></select><br />&nbsp;&nbsp;&nbsp;
															Your answer：<input id="getPwHintAns" id="getPwHintAns" type="text" disabled="disabled" />
														</td>
													</tr>	
													<tr class="bg_white pad5">
														<td>
															<span id="forgetPw_messageb" class="error_msg"></span>
														</td>
													</tr>									
													<tr class="bg_white pad5">
														<td><img id="forgetpw_loading" class="display_none" src="_images/bg/smallloading.gif" /><br />
														&nbsp;<a id="forgetpw_submit" class="submit_btn" name="forgetpw_submit"></a>
														</td>
													</tr>
													<tr class="bg_white pad5">
														<td class="H10">												
														</td>
													</tr>
												</table>
											</td>
										</tr>
										
										
									</table>
								</td>	
								<td>
									<table class="vertAlign_top" id="sideMenuTable">
										<tr><td><!--<a id="btn_newsTable" ></a>--> &nbsp;</td></tr>
										<tr><td class="H10"></td></tr>
										<tr><td><a id="btn_aboutusTable"></a></td></tr>
										<tr><td class="H10"></td></tr>
										<tr><td><a id="btn_registerTable" class="selected"></a></td></tr>
										<tr><td class="H10"></td></tr>
										<tr><td><a id="btn_forgetPwTable"></a></td></tr>
										<tr><td class="H10"></td></tr>
										<tr><td><a id="btn_helpTable"></a></td></tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr><td class="td_whiteBottomW688"></td></tr>
			</table>
		</td>
	</tr>
	<tr height="100%">
		<td ></td>
		<td></td>
	</tr>
</table>

<?php
	include_once '_subPHP/footerHTML.php';
?>