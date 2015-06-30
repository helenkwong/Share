<div id="div_userEditInfo" class="display_none">
	<table>
		<tr>
			<td>
				<table class="basicFontSyle" id="table_userEditInfo" >
					<tr><td width="190px"><img src="_images/bg/title_editInfo.png" /><span id="span_edit_userkey" class="display_none"></span></td><td width="100px"></td ><td><?php if($_ulevel>29){ ?><a id="a_showEditStudList"><u>Edit student info</u></a><?php }?><a class="popupClose btn_close"></a></td></tr>
					<tr>
						<td rowspan="10"><div id="div_leftBtn"><a id="a_leftBtn"></a></div><div id="div_rightBtn"><a id="a_rightBtn"></a></div><div id="div_uploadUserImg"><img id="userUploadImg" src="<?php echo($_SESSION['userpic']); ?>" width="170" alt="<?php echo($_SESSION['userpic']); ?>" /></div>
						<a id="btn_uploadUserImg"></a>
						<form id="uploadImgForm" method="POST" enctype="multipart/form-data" action="_upload/zp_ajaximage.php">
							<input type="file" name="uploadImg" id="uploadImg" size="8" />	
							<input name="btn_triggerUpload" id="btn_triggerUpload" type="submit" value="Upload" />
						</form>
						</td>
						<td class="floatRight">Name：</td>
						<td ><input type="text" value="" class="inputData inWidth150" id="edit_realname" name="edit_realname" placeholder="2-15 digits, letters or underscore"  value="<?php echo($_SESSION['username']); ?>" /></td>
					</tr>
					<tr><td class="font_lightBlue floatRight" >Login name：</td><td><label class="inWidth150" id="edit_login_name" name="edit_login_name"></label></td></tr>
					<?php if($_ulevel>5){ ?>
					<tr><td class="font_lightBlue floatRight" >Login password：</td><td><?php if (detectIE()) { ?>		
					<input class="inWidth150" id="edit_login_textpw" name="edit_login_textpw" type="text" value="" placeholder="4-15 digits or letters" maxlength="15" />
					<input class="inputData inWidth150 display_none" id="edit_login_pw" name="edit_login_pw" type="password" value=""  maxlength="15" />
					<?php }else{ ?>
					<input class="inputData inWidth150" id="edit_login_pw" name="edit_login_pw" type="password" value="" placeholder="4-15 digits or letters" />
					<?php }?>
					</td></tr>
					<tr><td class="floatRight">School：</td><td>
					<select id="edit_organisation" name="edit_organisation" >
						<option id="opt_sch0001">School A</option>
						<option id="opt_sch0002">School B</option>
						<option id="opt_sch0003">School C</option>
						<option id="opt_sch0004">School D</option>
						<option id="opt_sch0005">School E</option>
						<option id="opt_sch0006">School F</option>
						<option id="opt_sch0007">School G</option>
						<option id="opt_sch0000">School H</option>
					</select>
					</td></tr>
					
					<tr><td class="floatRight">Gender：</td><td><input type="radio"  name="edit_gender" value="m" />M <input name="edit_gender" value="f" type="radio" />F</td></tr>
					<tr><td class="td_vBottom" colspan="2">Forget password setting：</td></tr>
					<tr><td colspan="2"><input type="checkbox" id="setEmail" />Email：<input type="text" size="33" class="inputData emailInput" id="edit_email" name="edit_email" value="" /><span class="font15 font_grey"></span></td></tr>
					<tr><td colspan="2"><input type="checkbox" id="setQuesHint" />Password - Question：<select name="edit_pwHint" id="edit_pwHint"  class="basicFontSyle"><option id="opt_pwQues01">Question A？</option><option id="opt_pwQues02">Question B？</option><option id="opt_pwQues03">Question C？</option><option id="opt_pwQues04">Question D？</option></select><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Answer:<input id="edit_pwHintAns" id="edit_pwHintAns" type="text" size="22" /></td></tr>
					<tr><td colspan="2"><a class="submit_btn floatRight" id="btn_submitEditInfo"></a><span class="error_msg"></span>
					</tr>
				</table>
				<?php }?>
				
			</td>
			<td>
				<?php if(isset($_SESSION['identity']) && $_SESSION['identity'] !='student'){?>
				<div id="div_editInfoStudentList" class="display_none">
					Student list：
					<table id="table_editStudList">
					</table>
				</div>
				<?php }?>
			</td>
		</tr>
	</table>
</div>