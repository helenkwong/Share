<?php
	$_pageName = "admin";
	$_jpFileName = "admin";
	include_once '_subPHP/headerPHP.php';
	include_once '_subPHP/headerHTML.php';
?>
<table class="W1024H700" >
	<tr>
		<td class="W3"></td>
		<td id="sideContent" width="168px">
  			<table>
  				<tr><td height="126px"></td></tr>
  				<tr height="160px"><td id="img_side_ownerIcon"><div id="div_ownerIcon"><img id="img_userIcon" src="<?php if(isset($_SESSION['userpic'])){echo($_SESSION['userpic']);}?>" width="110px" height=104px" class="img_ownerPic"/></div></td></tr>
  				<tr><td><label id="text_sideOwnerName" class="text_ownerName roundEdge"><?php if(isset($_SESSION['realname'])){echo($_SESSION['realname']);} else{echo('同學');}?></label></td></tr>
			</table>
  		</td>
		<td>
			<table id="mainContent">
  				<tr><td height="112px"><div class="floatRight"><a id="btn_logout">&nbsp;&nbsp;&nbsp;&nbsp;Home & Logout &nbsp;&nbsp;</a></div></td></tr>
  				<tr>
  					<td>
  						<table id="mainContentTop">
			  				<tr><td class="bg_TopWhite765"><img src="_images/study/title_TopStudyPageBox.png" width="820" /></td></tr>
			  				<tr>
			  					<td class="bg_middleWhite765">
			  						<table id="tr_messageBox_Page1">
			  							<tr>
			  								<td rowspan="2" class="W90"></td>
			  								<td class="H70 floatRight" ></td>
			  							</tr>
			  							<tr>
			  								<td>
			  								<label class="label_loading"><img src="_images/bg/bigloading.gif" /></label>
			  									<label class="font15 vertAlign_top padTop5" >Collaborative learning and sharing platform - Administrator setting</label>
			  								</td>
			  							</tr>
			  						</table>
			  					</td>
			  				</tr>
			  				<tr><td class="bg_BottomWhite765"></td></tr>
			  			</table>
			  			<table id="mainContentMiddle">
			  				<tr>
			  					<td>
									
			  					</td>
			  				</tr>						
			  			</table>
			  			<?php include_once('_subPHP/userEditInfoHTML.php')?>
  					</td>
  				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td></td>
		<td colspan="2">
			<p class="padLeft20"><b>Edit user information<!--<input class="a_t1hide" type="button" value="hide" />--></b>(Password setting：4-15 digits and letters)<input id="a_t1show" type="button" value="show" /></p>
			<table id="table_all_user_setting" class="display_none">
				<tr class="undelete">
					<td width="100px">Date</td><td width="100px">Identity</td><td width="120px">Name</td><td width="100px">LoginName</td><td width="120px">Password</td><td width="200px">Email</td><td width="70px">Update</td><td width="70px">Remark</td>
				</tr>
			</table>
			<p class="padLeft20"><b>Edit participating school information<input id="a_t2show" type="button" value="show" /></b></p>
			<table id="table_addschool_list" class="padLeft20 display_none">
				<tr><td colspan="5">Add school</tr>
				<tr><td>Code(4 digits):</td><td><input type="text" size="14" id="input_newSchCode"/></td><td>Name:</td><td><input type="text" size="28" id="input_newSchName"/></td><td><input type="button" value="Add" id="add_newSchList"/></td></tr>
			</table>
			<table id="table_school_list" class="display_none">
				<tr class="undelete">
					<td width="100px">Date</td><td width="100px">Code</td><td width="200px">Name</td><td width="100px">Show?</td><td width="100px">Update</td>
				</tr>
			</table>
			<p class="padLeft20"><b>Edit Group information<input id="a_t3show" type="button" value="show" /></b></p>
			<table id="table_group_list" class="display_none">
				<tr class="undelete">
					<td width="60px">GroupID</td><td width="50px">Subject</td><td width="150px">Group Name</td><td width="180px">Co-School Text</td><td width="100px">Co-School ID</td><td width="50px">Edition(digits)</td><td width="80px">CreateDate</td><td width="60px">Show?</td><td width="70px">Update</td><!--<td width="70px">Delete</td>-->
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
	 <tr>
		<td colspan="3" height="200px"></td>
	</tr>	
</table>
<?php
	include_once '_subPHP/footerHTML.php';
?>