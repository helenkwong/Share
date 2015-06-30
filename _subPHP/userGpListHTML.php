<table class="font15" >
	<tr>
		<td class="H15">
		</td>
	</tr>
	<tr>
		<td>
			
		</td>
	</tr>
	<tr>
		<td id="td_userGpList" class="roundEdge6">
			<span class="text_ownerName"><?php if(isset($_SESSION['realname'])){echo($_SESSION['realname']);} ?></span><br /><br />Joined Group：
			<table id="table_userGpList"></table>
		</td>
	</tr>
	<tr>
		<td>
		
		</td>
	</tr>
</table>
<a id="btn_callSupport"></a>
<a id="btn_groupSupport" href="<?php echo('studygroup.php?id=G201410'); ?> "></a>
<?php if($_pageName =='studyGroup'){?>
<table id="relatedGpList" class="font15" >
	<tr>
		<td class="H15">
		</td>
	</tr>
	<tr>
		<td>
			<img src="_images/study/title_related_gp_list.png" />
		</td>
	</tr>
	<tr>
		<td id="td_relatedGpList">
		
		</td>
	</tr>
	<tr>
		<td>
		
		</td>
	</tr>
</table>
<?php }?>
<table id="hotGpList" class="font15 <?php if($_pageName =='studyGroup'){?>display_none<?php }?>" >
	<tr>
		<td class="H15">
		</td>
	</tr>
	<tr>
		<td>
		<img src="_images/study/title_hot_gp_list.png" />
		</td>
	</tr>
	<tr>
		<td id="td_hotGpList">
		
		</td>
	</tr>
	<tr>
		<td>
		
		</td>
	</tr>
</table>

