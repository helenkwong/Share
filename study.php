<?php
	$_pageName = "study";
	$_jpFileName = "study";
	include_once '_subPHP/headerPHP.php';
	include_once '_subPHP/headerHTML.php';
?>
<table class="W1024H700" >
	<tr>
		<td class="W3"></td>
		<td id="sideContent" width="168px">
  			<table>
  				<tr><td height="126px"></td></tr>
  				<tr height="160px"><td id="img_side_ownerIcon"><div id="div_ownerIcon"><img id="img_userIcon" src="<?php if(isset($_SESSION['userpic'])){echo($_SESSION['userpic']);}?>" width="110px" height=104px" class="img_ownerPic"/></div><div><a id="a_showEditInfo"></a></div></td></tr>
  				<tr><td><label id="text_sideOwnerName" class="text_ownerName roundEdge"><?php if(isset($_SESSION['realname'])){echo($_SESSION['realname']);} else{echo('Student');}?></label></td></tr>
				<tr><td><?php include_once('_subPHP/userGpListHTML.php') ?></td></tr>
			</table>
  		</td>
		<td>
			<table id="mainContent">
  				<tr><td height="112px"><div class="floatRight"><a id="btn_logout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home & Logout &nbsp;&nbsp;</a></div></td></tr>
  				<tr>
  					<td>
  						<table id="mainContentTop">
			  				<tr><td class="bg_TopWhite765"><img src="_images/study/title_TopStudyPageBox.png" width="820" /></td></tr>
			  				<tr>
			  					<td class="bg_middleWhite765">
			  						<table id="tr_messageBox_Page1">
			  							<tr>
			  								<td rowspan="2" class="W90"></td>
			  								<td class="H70 floatRight" ><?php if($_ulevel>29){ ?><a id="btn_newgroup"></a><?php } ?></td>
			  							</tr>
			  							<tr>
			  								<td>
			  								<label class="label_loading"><img src="_images/bg/bigloading.gif" /></label>
			  									<label class="font15 vertAlign_top padTop5" >
												<?php if($_ulevel >50){ ?>
													<a href="http://localhost/portfolio/share/admin.php?id=<?php echo($_userKey) ?>" >Go to Administrator Page</a>
												<?php } ?>
												</label>
												<span class="floatRight"><select id="select_showTarget"><option id="targetSubject_000">All Subjects</option><option id="targetSubject_001">Chinese</option><option id="targetSubject_002">English</option><option id="targetSubject_003">Maths</option><option id="targetSubject_004">General Studies</option><option id="targetSubject_005">Science</option><option id="targetSubject_100">Other</option></select><!--  <a id="btn_showChoice" class="td_vBottom"></a>--></span>
			  								</td>
			  							</tr>
			  							
			  						</table>
			  					</td>
			  				</tr>
			  				<tr><td class="bg_BottomWhite765"></td></tr>
			  				<tr><td>
			  					<form id="form_newGp" class="display_none">
				  					<table class="bg_white roundEdge6" id="table_newGp" class="text_justify font15 vertAlign_top padTop5">
				  						<tr><td width="130px"></td><td></td></tr>
				  						<tr><td colspan="2"><label id="title_newGp"></label></td></tr>
				  						<tr><td class="text_justify font15 vertAlign_top padTop5 floatRight">Theme:</td><td><input type="text" size="30" class="font15" id="newGp_topic" />&nbsp;&nbsp;<label class="font15 vertAlign_top padTop5" >Subject：</label><select id="newGp_subject"><option id="newGp_001">Chinese</option><option id="newGp_002">English</option><option id="newGp_003" >Maths</option><option id="newGp_004">General Studies</option><option id="newGp_005">Science</option><option id="newGp_100">Others</option></select></td></tr>
				  						<tr><td class="text_justify font15 vertAlign_top padTop5 floatRight">Control:</td><td><input type="text" size="50" class="font15" id="newGp_intro"/></td></tr>
				  						<tr><td class="text_justify font15 vertAlign_top padTop5 floatRight">Co-Schools：</td><td id="td_newGp_org">
											<label><input type="checkbox" name="newGp_org" value="0001">School A</label>
											<label><input type="checkbox" name="newGp_org" value="0002">School B</label>
											<label><input type="checkbox" name="newGp_org" value="0003">School C</label>
											<label><input type="checkbox" name="newGp_org" value="0004">School D</label>
											<label><input type="checkbox" name="newGp_org" value="0005">School E</label>	
											<label><input type="checkbox" name="newGp_org" value="0006">School F</label>
											<label><input type="checkbox" name="newGp_org" value="0007">School G</label>
											<label><input type="checkbox" name="newGp_org" value="0000">School H</label>
										</td></tr>
				  						<tr><td class="text_justify font15 vertAlign_top padTop5 floatRight">Group:</td><td><input type="text" size="50" class="font15" id="newGp_member"/></td></tr>
				  						<tr><td></td><td><a id="btn_submitNewGp" class="submit_button"></a></td></tr>
				  						<tr><td></td><td class="H15">&nbsp;&nbsp;</td></tr>
				  					</table>
			  					</form>
			  					</td>
			  				</tr>
			  			</table>
			  			<table id="mainContentMiddle">
			  				<tr><td class="H15"><div id="div_control"><table><tr><td><a id="a_control_top"></a></td></tr><tr><td><a id="a_control_up"></a></td></tr><tr><td><a id="a_control_down"></a></td></tr></table></div></td></tr>
			  				<tr>
			  					<td>
			  						<table id="table_gpMenu">
			  							<tr id="demo_group_tr" class="display_none">
			  								<td>
			  									<table class="gp_item">
			  										<tr><td class="gp_subject_all font15"></td><td class="floatRight p_relative"><div class="update_num display_none"></div></td></tr>
			  										<tr><td colspan="2" class="gp_topic"></td></tr>
			  										<tr><td colspan="2" class="gp_pic"><a class="goScratch"></a></td></tr>
			  										<tr><td colspan="2" class="gp_member"></td></tr>
			  										<tr><td colspan="2" class="gp_key"><label class="font_grey font14"></label><div class="display_none floatRight p_relative"><a class="btn_gpPage"></a></div></td></tr>
			  									</table>
			  								</td>
			  								<td>
			  									<table class="gp_item">
			  										<tr><td class="gp_subject_all font15"></td><td class="floatRight p_relative"><div class="update_num display_none"></div></td></tr>
			  										<tr><td colspan="2" class="gp_topic"></td></tr>
			  										<tr><td colspan="2" class="gp_pic"><a class="goScratch"></a></td></tr>
			  										<tr><td colspan="2" class="gp_member"></td></tr>
			  										<tr><td colspan="2" class="gp_key"><label class="font_grey font14"></label><div class="display_none floatRight p_relative"><a class="btn_gpPage"></a></div></td></tr>
			  									</table>
			  								</td>
			  								<td>
			  									<table class="gp_item">
			  										<tr><td class="gp_subject_all font15"></td><td class="floatRight p_relative"><div class="update_num display_none"></div></td></tr>
			  										<tr><td colspan="2" class="gp_topic"></td></tr>
			  										<tr><td colspan="2" class="gp_pic"><a class="goScratch"></a></td></tr>
			  										<tr><td colspan="2" class="gp_member"></td></tr>
			  										<tr><td colspan="2" class="gp_key"><label class="font_grey font14"></label><div class="display_none floatRight p_relative"><a class="btn_gpPage"></a></div></td></tr>
			  									</table>
			  								</td>
			  								<td>
			  									<table class="gp_item">
			  										<tr><td class="gp_subject_all font15"></td><td class="floatRight p_relative"><div class="update_num display_none"></div></td></tr>
			  										<tr><td colspan="2" class="gp_topic"></td></tr>
			  										<tr><td colspan="2" class="gp_pic"><a class="goScratch"></a></td></tr>
			  										<tr><td colspan="2" class="gp_member"></td></tr>
			  										<tr><td colspan="2" class="gp_key"><label class="font_grey font14"></label><div class="display_none floatRight p_relative"><a class="btn_gpPage"></a></div></td></tr>
			  									</table>
			  								</td>
			  							</tr>
			  						</table>
			  					</td>
			  				</tr>						
			  			</table>
			  			<?php include_once('_subPHP/userEditInfoHTML.php')?>
  					</td>
  				</tr>
			</table>
		</td>
	</tr>
	<!--<tr>
		<td>
	  		<table>
		  		<tr>
			  		<td >
						<div class="display_none"></div>
					</td>
				 </tr>
			</table>
		</td>
	</tr>-->
	 <tr >
	<td height="200px"></td>
</tr>	
</table>
<?php include_once '_subPHP/feedbackTableHTML.php'; ?>
<div id="div_try_Scratch" style="display:none">
	<table id="table_try_Scratch">
		<tr class="non_fullscreen"><td class="W100"><a id="btn_fullscreen"></a></td><td class="W100"><a id="btn_like"></a></td><td class="W300"><a id="btn_tocomment"></a></td><td ><a class="btn_close popupClose"></a></td></tr>
		<tr><td colspan="3" id="td_scratch" class="roundEdge6"><label class="Scratch_loading display_none"><img src="_images/bg/bigloading.gif" /></label><iframe id="iframe_Scratch" allowtransparency ="true" class="normal" src="" frameborder="0" allowfullscreen></iframe> </td><td><a class="btn_quitFullScreen fullscreen display_none" id="btn_quitFullScreen"></a><div id="div_comment" class="non_fullscreen"><div id="title_comment"></div><textarea class="font15" id="textarea_quickCommment"  placeholder="I want to comment about..."></textarea><br />
		<?php if($_ulevel>5){ ?>
		<a id="btn_submit_comment"></a><span id="span_quickComment" class="error_msg font_grey display_none">Thank you!</span></div><div class="div_comment_hints font15 non_fullscreen"><a>Good!</a><a>Interesting!</a><a>Too easy!</a><a>I dont understand.</a><a>Beautiful!</a><a>Enjoy!</a><a>How do we play the game?</a><a>Problem..</a><a>Add more sound effects</a><a>Cheer up！</a><a>Looking forward to the project!</a></div><div><img src="_images/bg/think.png" class="non_fullscreen"/></div><?php }else{ ?>
		<p class="font_white font15">*Please comment after login*</p>
		<?php } ?><td></tr>
	</table>
</div>
<?php
	include_once '_subPHP/footerHTML.php';
?>