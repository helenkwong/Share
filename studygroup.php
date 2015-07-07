<?php
	$_pageName = "studyGroup";
	$_jpFileName = "studyGroup";
	include_once '_subPHP/headerPHP.php';
	include_once '_subPHP/headerHTML.php';
	
?>
<table class="W1024H700" >
	<tr>
		<td class="W3"></td>
		<td id="sideContent">
			<table>
				<tr><td height="126px"></td></tr>
				<tr class="H160"><td id="img_side_gpIcon"><div id="div_gpIcon"><img id="img_gpIcon" src="_images/studyGroup/btn_notready.png" width="142px" height="100px" alt="group icon" /></div></td></tr>
				<tr><td><label id="text_sideGpName" class="roundEdge" >ID:<span id="span_gp_id"><?php if(isset($_GET['id'])){echo($_GET['id']);}?></span></label></td></tr>
				<tr><td><?php include_once('_subPHP/userGpListHTML.php') ?></td></tr>
			</table>
		</td>
		<td>
			<table id="mainContent">
  				<tr>
					<td height="112px"><div class="floatRight"><a id="btn_logout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home &amp; Logout &nbsp;&nbsp;</a></div>
					</td>
				</tr>
  				<tr>
					<td>
						<table id="mainContentTop">
			  				<tr>
								<td class="bg_TopWhite765"><div class="floatLeft"><a class="btn_back" href="study.php">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back &nbsp;&nbsp;</a></div><img alt="group box" src="_images/studyGroup/title_TopStudyGroupBox2.png" width="820" />
								</td>
							</tr>
			  				<tr>
			  					<td class="bg_middleWhite765">
			  						<table id="tr_messageBox_Page1">
			  							<tr>
			  								<td class="W90"></td>
			  								<td class="H90 W600" id="td_groupInfoTop" >
			  									<table class="font15 W600" id="table_groupInfoTop" >
			  										<tr>
			  											<td class="W100 textAlignRight">Theme：</td><td id="td_gp_topic" class="W300"><label class="label_loading"><img alt="loading" src="_images/bg/100loading.gif" /></label></td>
			  										</tr>
			  										<tr>
			  											<td class="W100 textAlignRight">Introduction：</td><td id="td_gp_intro"></td>
			  										</tr>	
			  										<tr>
			  											<td class="W100 textAlignRight">Co-Schools：</td><td id="td_gp_member"></td>
			  										</tr>					
			  									</table>			  								
			  								</td>
			  								<td >
			  									<div id="div_gp_subject" class="gp_subject font25" >Chinese</div><br/>&nbsp;&nbsp;<a id="btn_showInfoUpdate" ></a>
			  								</td>
			  							</tr>
			  							<tr>
			  								<td>
			  					
			  								</td>
			  							</tr>
			  						</table>
			  					</td>
			  				</tr>
			  				<tr><td class="bg_BottomWhite765"></td></tr>
			  			</table>
						<div id="div_control">
							<table>
								<tr>
									<td><a id="a_control_top"></a>
									</td>
								</tr>
								<tr>
									<td><a id="a_control_up"></a>
									</td>
								</tr>
								<tr>
									<td><a id="a_control_down"></a>
									</td>
								</tr>
							</table>
						</div>
						<table id="mainContentMiddle">
			  				<tr>
			  					<td>
									<table id="table_stage">
			  							<tr>
											<td><a id="btn_fullscreen"></a><a id="btn_like"></a><span id="span_likeNum"></span>
											</td>
										</tr>
			  							<tr>
											<td class="bg_stage" id="bg_stage"><div id="div_stage"><label class="Scratch_loading display_none"><img alt="loading" src="_images/bg/bigloading.gif" /></label><iframe id="iframe_Scratch" allowtransparency ="true" class="normal roundEdge6 needBack" src="" frameborder="0" allowfullscreen></iframe><a class="btn_quitFullScreen display_none" id="btn_quitFullScreen"></a></div>
											</td>
										</tr>
			  						</table>
									<table id="table_change_gpInfo" class="text_justify font15 vertAlign_top padTop5 display_none">
										<tr>
											<td width="130px">
											</td>
											<td>
											</td>
										</tr>
										<tr>
											<td colspan="2" height="46px"><img alt="title of updating group" src="_images/studyGroup/title_gpUpdate.png" />
											</td>
										</tr>
			  							<tr>
											<td class="text_justify font15 vertAlign_top padTop5 floatRight">Theme：
											</td>
											<td><input type="text" size="30" class="font15" id="editGp_topic" />
											</td>
										</tr>
			  							<tr>
											<td class="text_justify font15 vertAlign_top padTop5 floatRight"><label class="font15 vertAlign_top padTop5" >Subject：</label></td><td><select id="editGp_subject"><option id="editGp_001">Chinese</option><option id="editGp_002">English</option><option id="editGp_003" >Maths</option><option id="editGp_004">General Studies</option><option id="editGp_005">Science</option><option id="editGp_100">Others</option></select>
											</td>
										</tr>
			  							<tr>
											<td class="text_justify font15 vertAlign_top padTop5 floatRight">Introduction:
											</td>
											<td><textarea  class="font15" id="editGp_intro" rows="" cols="" ></textarea>
											</td>
										</tr>
										<tr>
											<td class="text_justify font15 vertAlign_top padTop5 floatRight">Control:
											</td>
											<td><textarea class="font15" id="editGp_control" rows="" cols="" ></textarea>
											</td>
										</tr>
			  							<!--<tr><td class="text_justify font15 vertAlign_top padTop5 floatRight">關鍵字：</td><td><input type="text" size="40" class="font15" id="editGp_intro"/></td></tr>-->
										<?php if($_ulevel>15){ ?>
										<tr>
											<td class="text_justify font15 vertAlign_top padTop5 floatRight">Co-Schools:
											</td>
											<td id="td_editGp_org">
												<label><input type="checkbox" name="editGp_org" value="0001">School A</label>
												<label><input type="checkbox" name="editGp_org" value="0002">School B</label>
												<label><input type="checkbox" name="editGp_org" value="0003">School C</label>
												<label><input type="checkbox" name="editGp_org" value="0004">School D</label>
												<label><input type="checkbox" name="editGp_org" value="0005">School E</label>	
												<label><input type="checkbox" name="editGp_org" value="0006">School F</label>
												<label><input type="checkbox" name="editGp_org" value="0007">School G</label>
												<label><input type="checkbox" name="editGp_org" value="0000">School H</label>
											</td>
										</tr>
			  							<tr >
											<td class=" text_justify font15 vertAlign_top padTop5 floatRight">Group：
											</td>
											<td><textarea class="font15" id="editGp_member" rows="" cols="" ></textarea>
											</td>
										</tr>
			  							<?php }?>
			  							<tr><td></td><td><a id="btn_submitEditGp" class="submit_button"></a></td></tr>
			  							<tr><td></td><td height="100%">&nbsp;&nbsp;</td></tr>
									</table>
								</td>
			  					<td>
									<div class="bg_whitew426">
				  						<table id="table_gp_detail" class="pos_relative">
											<tr ><td class="H5"></td></tr>
											<tr ><td class="H15"><img alt="title of group information" src="_images/studyGroup/title_gpinfo.png" />
											<?php if($_ulevel>5){ ?>
											<a id="btn_joinGp"></a><a class="display_none" id="btn_unjoinGp"></a>
											<?php } ?>
											</td></tr>
											<tr><td  class="font15">Control：</td></tr>
											<tr><td  class="font15" id="td_gp_control"></td></tr>
											<tr><td  class="font15 H30">Project link： &nbsp;<br /><a id="btn_setScratch" class="display_none"></a>&nbsp;<a id="btnhints_scratch" class="hint_button display_none"></a></td></tr>
											<tr><td  class="font15" id="td_gp_scratch" ><label id="label_gp_scratch"></label><a id="btn_goscratchsite" target="_blank" class="display_none"></a></td></tr>
											<?php if($_ulevel>5){ ?>
											<tr class="display_none" id="tr_hints_scratch" ><td><img alt="hints of adding Scratch" id="imghints_scratch" src="_images/studyGroup/hints_scratch.jpg"/><a class="btn_close_30" id="btn_close_scratchHint"></a></td></tr>
											<tr><td><textarea class="font16 display_none" id="textarea_gp_scratch" rows="" cols="" ></textarea><span id="errorspan_scratch" class="display_none error_msg font16"><br />Invalid Scratch project link<br /></span><a id="btn_submit_editScratch" class="submit_btn25 display_none"></a>
											<div id="div_udpatedScatch" class="display_none">Update notice：<br /><a id="btn_udpatedScatch"></a></div></td></tr>	
											<?php } ?>
											<tr><td  class="font15">Members：</td></tr>
											<tr><td  class="font16" id="td_gp_members"></td></tr>
											<!-- <tr><td  class="font15">關鍵字：(請用逗號分隔)</td></tr>
											<tr><td  class="font15">數字 中國數目字 阿拉伯數目</td></tr> -->
											<tr><td  class="font15">&nbsp;</td></tr>
											<tr><td  class="font15">Comment：<span class="font15 font_lightBlue">(Go to"<a href="#a">Group discussion</a>" for more comments)</span><br /><!--<textarea cols="30" class="font15" id="textarea_quickCommment" placeholder="I want to comment about..." ></textarea><br /><a id="btn_submit_comment"></a><span id="span_quickComment" class="error_msg font_grey display_none">Thank you!</span>--></td></tr>
											<tr><td height="100%">&nbsp;&nbsp;</td></tr>
				  						</table>
									</div>
								</td>
							</tr>
							<tr >
			  					<td colspan="2" class="bg_TopWhite765" ><img alt="title of group discussion" src="_images/studyGroup/title_gpdiscuss.png" name="a" id="a" />
								</td>
			  				</tr>
							<tr>
			  					<td colspan="2" class="bg_middleWhite765">
									<table id="table_newpost">
										<tr>
											<td><img alt="user icon" id="img_side_ownerIcon" width="60px" height="56px" class="roundEdge6" src="<?php if(isset($_SESSION['userpic'])){echo($_SESSION['userpic']);}else {echo('_images/studyGroup/register_img260.png');}?>" /><br /><label id="text_sideOwnerName" class="text_ownerName roundEdge font14"><?php if(isset($_SESSION['realname'])){echo($_SESSION['realname']);} else{echo('Student');}?></label>
											</td>
											<td><img alt="post image" src="_images/studyGroup/img_postTrangle.png" />
											</td>
											<td>
												<div id="div_post_topic"><input id="input_post_topic" type="text" class="font18"  placeholder="The theme is:"  /><br /><a class="font13 a_postTopicHint roundEdge6">Information sharing</a><a class="font13 a_postTopicHint roundEdge6">Idea sharing</a><a class="font13 a_postTopicHint roundEdge6">Technical Support</a><a class="font13 a_postTopicHint roundEdge6">Comment</a></div><textarea id="textarea_post_content" class="font16" placeholder="I want to comment about..." rows="" cols="" ></textarea>
												<table>
													<tr>
														<td><div class="div_comment_hints font13"><a>Good!</a><a>Interesting!</a><a>Too easy!</a><a>I dont understand.</a><a>Beautiful!</a><a>Enjoy!</a><a>How do we play the game?</a><a>Problem..</a><a>Add more sound effects</a><a>Cheer up！</a><a>Looking forward to the project!</a></div></td>
														<td><img alt="image bubble" src="_images/bg/thinkR.png" />
														</td>
													</tr>
												</table>
												<?php if($_ulevel>5){ ?>
												<a id="btn_addAttach"></a>
												<?php } ?>
											</td>
										</tr>
										<?php if($_ulevel>5){ ?>
										<tr class="font15 addedAttach display_none" >
											<td colspan="1"><td>
											<td >Added Attachment：</td>
										</tr>
										<tr class="addedAttach display_none">
											<td colspan="2"></td>
											<td class="roundEdge6" id="td_addedAttach"></td>
										</tr>
										<tr class="font15">
											<td colspan="2"></td>
											<td><span id="span_attachMenu" class="display_none"><a id="btn_addImage"></a><a id="btn_addScratch"></a><a id="btn_addLink"></a><a id="btn_addVideo"></a></span>
											</td>
										</tr>
										<tr class="font15">
											<td colspan="2">
											</td>
											<td>
												<table>
													<tr id="tr_addImage" class="tr_subAttachMenu font15 display_none">
														<td>Upload Image(s)：</td>
														<td><form id="newpost_upload_image_form" method="POST" enctype="multipart/form-data" action="_upload/zp_ajaximage_newpost.php" class="font16 inlineBlock">	
														<input type="file" name="upload_post_img" id="newpost_uploadImg" size="20" class="font16 inlineBlock" /></form>
														<!-- <input name="btn_triggerNewpostUpload" id="btn_triggerNewpostUpload" type="submit" value="Upload" /> -->
														<div id='preview_newpost_image' >
														</div>
														</td>
													</tr>
													<tr id="tr_addScratch" class="tr_subAttachMenu font15 display_none">
														<td class="text_justify">Add Scratch project link(s)：</td>
														<td><input type="text" id="input_newpost_scratch" /><a class="btn_add roundEdge6">Add</a>&nbsp;<a class="hint_button">&nbsp;&nbsp;&nbsp;</a><div class="divhints_newpost pos_relative display_none"><img alt="hint-Scratch" src="_images/studyGroup/hints_scratch.jpg" /><a class="btn_close_30 newpost_hint_close"></a></div>
														</td>
													</tr>
													<tr id="tr_addLink" class="tr_subAttachMenu font15 display_none">
														<td>Add link(s)：</td>
														<td><input type="text" id="input_newpost_link" /><a id="submit_newpost_addlink" class="btn_add roundEdge6">Add</a>&nbsp;<a id="btnhints_newpost_link" class="hint_button">&nbsp;&nbsp;&nbsp;</a><div class="divhints_newpost pos_relative display_none"><img alt="hint of adding link" src="_images/studyGroup/hint_link.jpg" /><a class="btn_close_30 newpost_hint_close"></a></div>
														</td>
													</tr>
													<tr id="tr_addVideo" class="tr_subAttachMenu font15 display_none">
														<td>Add Youtube Link(s)：</td>
														<td><input type="text" id="input_newpost_video" /><a class="btn_add roundEdge6">Add</a>&nbsp;<a id="btnhints_newpost_video" class="hint_button">&nbsp;&nbsp;&nbsp;</a><div class="divhints_newpost pos_relative display_none"><img alt="hint of adding video" src="_images/studyGroup/hint_video.png" /><a class="btn_close_30 newpost_hint_close"></a></div>
														</td>
													</tr>
													<tr>
														<td></td>
														<td><img alt="loading" class="display_none" src="_images/bg/100loading.gif" id="newpost_loading" />
														</td>
													</tr>
												</table>
											</td>
										</tr>
										<tr>
											<td colspan="2"></td>
											<td><a id="newpost_submit_btn" class="btn_submit font15"></a></td>
										</tr>
										<tr>
											<td colspan="2"></td>
											<td class="error_msg display_none">Please enter content.</td>
										</tr>
										<?php } else {?>
										<tr>
											<td></td>
											<td></td>
											<td><p class="font_grey font15">*Please comment after login*</p></td>
										</tr>
										<?php } ?>
									</table>
									<table id="post_table">
										<tr>
											<td><img alt="loading" src="_images/bg/100loading.gif" /></td>
										</tr>
									</table>
									<a class="display_none" id="btn_morepost">More sharing>>></a>
								</td>
			  				</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
		<td height="200px"></td>
	</tr>	
</table>
<?php include_once '_subPHP/feedbackTableHTML.php'; ?>

<?php
	include_once '_subPHP/footerHTML.php';
?>