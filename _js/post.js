var _current_newpost_attachType;
var getPost_min_editdate = '0';
var getPost_max_editdate = '0';

/* ## Init and Buttons click and interface action---------------------------------------------------------- ## */

$(document).ready(function(){
	if($('#table_newpost').length>0){
		initPost();
		tophp_post_get('init');
	}
	
	if ($('#btn_submit_comment').length > 0) {
		$('#btn_submit_comment').click(function(){
			var quickCommentStr = $('#textarea_quickCommment').val();
			if (quickCommentStr != '' && quickCommentStr != 'I want to comment about...') {
				dataXML = newpostcontent_to_xml('quickComment');
				$('#btn_submit_comment').attr('disabled', true);
				passDataToPHP_post(dataXML, 'insertNewCommentPost', '#btn_submit_comment');
			}
			else {
				$('#textarea_quickCommment').addClass('error');
			}
		});
	}
	
	if($('#textarea_quickCommment').length>0){
		$('#textarea_quickCommment').focus(function(){
			$('#span_quickComment').addClass('display_none');
		});
	}
});

/* ## Function for interface, post data and send to database---------------------------------------------------------- ## */


function initPost(){
	
	_ulevel = parseInt($('#ulevel').html());
	groupkey = $('#span_gp_id').html();
	
	$('#div_post_topic .a_postTopicHint').click(function(){
		$('#input_post_topic').trigger('click').trigger('focus');
		$('#input_post_topic').val($('#input_post_topic').val() + $(this).text());
	});
	
	if($('#btn_addAttach').length>0){
		$('#btn_addAttach').click(function(){
			if($('#span_attachMenu').css('display')!='none'){
				$('#table_newpost .tr_subAttachMenu').css('display','none');
				$('#table_newpost .divhints_newpost').css('display','none');
			}
			//$('#span_attachMenu').toggle('slow');	
			displayInOut('#span_attachMenu');
		});
	}
		
	//post related  
	if(isIE){
		add_placeholder('textarea_quickCommment', 'I want to comment about...'); 
		add_placeholder('input_post_topic', 'The theme is:');   
		add_placeholder('textarea_post_content', 'I want to comment about...'); 
	}
	
	if($('#span_attachMenu').length>0){
		$('#span_attachMenu a').click(function(){
			_current_newpost_attachType = $(this).attr('id').substring(7);
			$('#table_newpost .tr_subAttachMenu').css('display','none');
			$('#tr_add'+_current_newpost_attachType).fadeIn();
		});
	}
	
	if ($('#newpost_uploadImg').length > 0){
		$('#newpost_uploadImg').live('change', function(e){
			e.preventDefault();
			if (_current_newpost_attachType == 'Image') {
				when_upload_image();
			}
		});
	}
	
	if($('#table_newpost .btn_add').length>0){
		$('#table_newpost .btn_add').click(function(){
			var target_input = $(this).parent().children('input').attr('id');
			var target_type = target_input.replace('input_newpost_','');
			var checkingText = $('#'+target_input).val();
			var checkingResult = false;
			var attachArr = [];
			switch(target_type){
				case 'scratch':{checkingResult = validate_scratchLink(checkingText);break;}
				case 'link':{checkingResult =validate_websiteLink(checkingText);break;}
				case 'video':{checkingResult = validate_videoLink(checkingText);break;}
			}
			if(checkingText=='' || checkingResult == false){
				$('#'+target_input).addClass('error');
			}else{
				$('#newpost_loading').removeClass('display_none');
				if($('#table_newpost .addedAttach').hasClass('display_none')){
						$('#table_newpost .addedAttach').removeClass('display_none');
				}
				switch(target_type){
					case 'scratch':{attachArr = update_post_attach_container('scratch',checkingResult,'newpost');break;}
					case 'link':{attachArr = update_post_attach_container('link',checkingResult,'newpost');break;}
					case 'video':{attachArr = update_post_attach_container('video',checkingResult,'newpost');break;}
				}
				if(attachArr.length>0){
					$('#td_addedAttach').append('<p class="new_post_attach_p"></p>');
					$('#td_addedAttach').find('.new_post_attach_p:last').append(attachArr.join('')).append('<div class="new_post_attach_delete_div"><a class="newpost_attach_delete btn_close_30"></a></div>');
				}
		
				$('#table_newpost .tr_subAttachMenu input').val('');
				$('#newpost_loading').addClass('display_none');
			}
			return false;
		});
	}
	
	if($('#table_newpost .hint_button').length>0){
		$('#table_newpost .hint_button').click(function(){
			//$(this).parent().children('.divhints_newpost').toggle();
			displayInOut($(this).parent().children('.divhints_newpost'));
		});
	}
	
	if($('#table_newpost .newpost_hint_close').length>0){
		$('#table_newpost .newpost_hint_close').click(function(){
			$(this).parents('td').children('.hint_button').trigger('click');
		});
	}
	
	if($('#td_addedAttach').length>0){
		$('#td_addedAttach').on('click','a',function(q) { 
		 if($(this).hasClass('newpost_attach_delete')){
		 	$(this).parents('.new_post_attach_p').remove();
		 }
		});
	}

	$('#post_table').on('click','a',function(q) { 
		if($(this).hasClass('post_edit')){
			if($(this).parent().find('.post_delete').hasClass('display_none')){
				$(this).parent().find('.post_delete').removeClass('display_none');
			}else{
				$(this).parent().find('.post_delete').addClass('display_none');
			}
		}else if($(this).hasClass('postcomment_edit')){
			if($(this).parent().find('.postcomment_delete').hasClass('display_none')){
				$(this).parent().find('.postcomment_delete').removeClass('display_none');
			}else{
				$(this).parent().find('.postcomment_delete').addClass('display_none');
			}
		}else if($(this).hasClass('post_delete')){
			var postkey = $(this).attr('href').substring(1);
			var tagNameAr = new Array('action','from_userkey','postkey');
			var tagValueAr = new Array('deletePost',_loginUserkey,postkey);
			dataXML = data_form_to_xml(tagNameAr,tagValueAr);
			passDataToPHP_post(dataXML,'deletePost','#'+$(this).attr('id'));
		}else if($(this).hasClass('btn_showComment')){
			$(this).parent().find('.p_new_comment').fadeIn( "slow", function() {    // Animation complete  
				$(this).children('textarea').trigger('focus');
			});
			$(this).remove();
		}else if($(this).hasClass('btn_submitComment')){
			var targetTextarea = $(this).parent().children('.post_comment_textarea');
			var text = $(targetTextarea).val();
			if($(targetTextarea).val() != ''){
			
			var postkey = $(this).attr('href').substring(1);
			var tagNameAr = new Array('action','from_userkey','to_key','postkey','commentText');
			var tagValueAr = new Array('sumbitPostComment',_loginUserkey,groupkey,postkey,text);
			dataXML = data_form_to_xml(tagNameAr,tagValueAr);
			passDataToPHP_post(dataXML,'sumbitPostComment','#'+$(this).attr('id'));
			}else{
				$(targetTextarea).addClass('error');
			}
		}else if($(this).hasClass('postcomment_delete')){
			var postkey = $(this).attr('href').substring(1);
			var tagNameAr = new Array('action','from_userkey','postkey');
			var tagValueAr = new Array('deletePostComment',_loginUserkey,postkey);
			dataXML = data_form_to_xml(tagNameAr,tagValueAr);
			passDataToPHP_post(dataXML,'deletePostComment','#'+$(this).attr('id'));
		}
		if(!$(this).hasClass('post_attach_link')){
			return false;
		}
	
	});
	
	if($('#newpost_submit_btn').length>0){
		$('#newpost_submit_btn').click(function(){
			if($('#textarea_post_content').val()!='' && $('#textarea_post_content').val()!='The theme is:'){
				dataXML = newpostcontent_to_xml('newpost');
				$('#newpost_submit_btn').attr('disabled', true);
				passDataToPHP_post(dataXML,'insertNewPost','#newpost_submit_btn');
			}else{
				$('#textarea_post_content').addClass('error');
				$('#table_newpost .error_msg').removeClass('display_none');
			}
		});
	}
	
	$('#btn_morepost').click(function(){
		tophp_post_get('more');
	});
	
	if($('#btn_udpatedScatch').length>0){
		$('#btn_udpatedScatch').click(function(){
			dataXML = newpostcontent_to_xml('scratchUpdate');
			passDataToPHP_post(dataXML,'insertNewScratchPost','#btn_udpatedScatch');
		});
	}
	
	$('.div_comment_hints a').click(function(){
		var tempText = $('#textarea_post_content').val();
		tempText = 	tempText + $(this).text()+ ' ';
		$('#textarea_post_content').trigger('focus');
		$('#textarea_post_content').val(tempText);
		return false;
	});
}

//validate upload function-----------------------------------------------------------------------

function validate_videoLink(_videoUrl){
		
	var videoid = '';

	var endpoint = _videoUrl.indexOf('&');
	if(endpoint<0 || (_videoUrl.split("&").length - 1)>1){
		endpoint = _videoUrl.length;
	}
	var str1 = 'www.youtube.com/watch?';
	var str2 = 'www.youtube.com/embed/';
	var str3 = 'youtu.be/';
	
	if(_videoUrl.indexOf(str1) >=0){
		var indexs = _videoUrl.indexOf('?v=');
		if(indexs == -1){
			indexs = _videoUrl.indexOf('&v=');
		}
		indexs = indexs +3;
		endpoint = _videoUrl.indexOf('&',indexs+1);
		if(endpoint == -1){
			endpoint = _videoUrl.length;
		}
		videoid =  _videoUrl.substring(indexs,endpoint);
	}
	else if(_videoUrl.indexOf(str2)>=0){
		var indexs = _videoUrl.indexOf(str2)+str2.length ;
		videoid = _videoUrl.substring(indexs,endpoint);
	}
	else if(_videoUrl.indexOf(str3)>=0){
		var indexs = _videoUrl.indexOf(str3)+str3.length ;
		videoid = _videoUrl.substring(indexs,endpoint);
	}else{
		return false;
	}
	return videoid;
}

function validate_scratchLink(scratchStr){
	var str1 = 'http://scratch.mit.edu/projects/';
	
	if(scratchStr.indexOf('#')>0){
		var lastpro = scratchStr.indexOf('#');
		scratchStr = scratchStr.substring(0,lastpro);
	}
	
	if(scratchStr !='' && scratchStr.indexOf('http://')<0){
		scratchStr = scratchStr + 'http://';
	}
	
	if (scratchStr.indexOf(str1)<0) {
		return false;
	}
	else {
		var endpoint = scratchStr.length;
		var indexs = scratchStr.indexOf(str1) + str1.length;
		scratchid = scratchStr.substring(indexs, endpoint).replace('/', '');
		return scratchid;
	}
}

function validate_websiteLink(_linkUrl,postTarget){
	 if(!/^(https?|ftp):\/\//i.test(_linkUrl)) {
		 _linkUrl = 'http://'+_linkUrl; // set both the value
		 $("#newpost_link_input").val(_linkUrl ); // also update the form element
	}
	 //if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(_linkUrl)){
	 	
	if(/^(https?|ftp|http):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_linkUrl)){
		 return _linkUrl;
	}
	else{
		 return false;
	}
}

//Upload functions--------------------------------------------------------------------------------

function when_upload_image(){
	$("#preview_newpost_image").html('');
	//$("#preview_newpost_image").html('<img src="_images/bg/loader.gif" alt="Uploading...."/>');
	$('#newpost_loading').removeClass('display_none');
	
	$('#newpost_upload_image_form').bind('submit', function(ev) {
			ev.preventDefault(); // <-- important
			$(this).ajaxSubmit({
				target: '#preview_newpost_image',
				success: function() {
				if($('#table_newpost .addedAttach').hasClass('display_none')){
					$('#table_newpost .addedAttach').removeClass('display_none');
				}
				 update_post_attach_container('uploadImg','','newpost','','');
				 $('#newpost_loading').addClass('display_none');
				 $('#newpost_upload_image_form').unbind('submit');
				} 
			});
	}).submit();
}

function update_post_attach_container(target,attachId,postType){
	var postContainer = '';
	if(postType == 'newpost'){
		postContainer ='#td_addedAttach'; 
	}
	var i=0;
	var textToInsert=[];
	
	switch (target){
		case "uploadImg":{
				var newImage = $('#preview_'+postType+'_image img').clone();	
				$(newImage).removeAttr('id').removeClass('newpost_preview_photo').addClass('newpost_attach_photo').addClass('main_newpost_attach').attr('name','image');
				$(postContainer).append('<div class="new_post_attach_p inlineBlock"></div>');
				$(postContainer).find('.new_post_attach_p:last').append(newImage).append('<div class="new_post_attach_delete_div "><a class="newpost_attach_delete btn_close_30"></a></div>');
				
				if(postType == 'newpost'){
					$('#preview_newpost_image img').remove();
					$('#newpost_upload_image_form').resetForm();
				}else{
					$('#preview_editpost_image img').remove();
					$('#editpost_imageform').resetForm();
				}
				break;
		}
		case "video":{
			textToInsert[i++] = '<iframe name="video" class="main_'+postType+'_attach '+postType+'_attach_video" width="560" height="315" src="http://www.youtube.com/embed/';
			textToInsert[i++] = attachId;
			textToInsert[i++] = '" alt="';
			textToInsert[i++] = attachId;
			textToInsert[i++] = '" frameborder="0" allowfullscreen></iframe>';
			break;
		}
		case "scratch":{
				textToInsert[i++] = '<iframe name="scratch" class="main_'+postType+'_attach '+postType+'_attach_scratch" allowtransparency="true" width="560" height="466" src="http://scratch.mit.edu/projects/embed/'; //**14.7.2014 embed/
				textToInsert[i++] = attachId;
				textToInsert[i++] =	'" alt="';
				textToInsert[i++] = attachId;
				textToInsert[i++] = '" frameborder="0" allowfullscreen></iframe>';
			break;
		}
		case "link":{
				attachId = decodeURIComponent(attachId);
				var linkTitle = passDataToPHP_nonDatabase('<data><action>getLinkTitle</action><link>'+attachId+'</link></data>', 'getLinkTitle','#submit_newpost_addlink');
				if (linkTitle == '') {
					linkTitle = attachId;
				}
				textToInsert[i++] = '<a target="_blank" name="link" class="main_'+postType+'_attach '+postType+'_attach_link" href="';
				textToInsert[i++] = attachId;
				textToInsert[i++] = '" alt="';
				textToInsert[i++] = attachId;	
				textToInsert[i++] = '">';
				textToInsert[i++] = linkTitle;
				textToInsert[i++] = '</a>';
			break;
		}
		case "image":{
				attachId = attachId.replace(/\%2F/g,"\/");
				textToInsert[i++] = '<img name="image" src="';
				textToInsert[i++] = attachId;
				textToInsert[i++] = '" alt="';
				textToInsert[i++] = attachId;
				textToInsert[i++] ='" class="main_'+postType+'_attach '+postType+'_attach_image" />';	
			break;
		}
	}
	return textToInsert;
}

function newpostcontent_to_xml(status){
	var textToInsert=[];
	var i=0;
	var tagNameAr = [];
	var tagValueAr = [];
	var xml = ''; 	
	var attachNameAr = [];
	var attachValueAr = [];
	var post_type = 'text';
	var post_attach_num = 0;
	tagNameAr.push('remark');tagValueAr.push(status);
	
	if(status == 'newpost'){
		var postContainer = '#td_addedAttach';
		if($(postContainer).children().size() != 0){
			$(postContainer).find('.new_post_attach_p').each(function(e){
				
				$(this).find('.main_newpost_attach').each(function(e){
					post_type = $(this).attr('name');
					var content = $(this).attr('alt');
					attachNameAr.push(post_type); 
					attachValueAr.push(content);
				});
				post_attach_num = e+1;
			});
			xml = data_form_to_xml(attachNameAr,attachValueAr);
		}
		tagNameAr.push('post_attach'); tagValueAr.push(xml);
		var topicText = $('#input_post_topic').val();
		if(topicText == 'The them..'){
			topicText = '';
		}
		tagNameAr.push('post_topic');tagValueAr.push(topicText);
		tagNameAr.push('post_text');tagValueAr.push($('#textarea_post_content').val());
	}else if(status == 'quickComment'){
		tagNameAr.push('post_topic');tagValueAr.push('Reply');
		tagNameAr.push('post_attach'); tagValueAr.push('');
		tagNameAr.push('post_text');tagValueAr.push($('#textarea_quickCommment').val());
	}else if(status == 'scratchUpdate'){
		tagNameAr.push('post_topic');tagValueAr.push('Updated Scratch project');
		tagNameAr.push('post_attach'); tagValueAr.push('');
		tagNameAr.push('post_text');tagValueAr.push('Please try the new version of project!');
	}

	tagNameAr.push('post_attach_num'); tagValueAr.push(post_attach_num);
	tagNameAr.push('from_userkey');tagValueAr.push(_loginUserkey);
	tagNameAr.push('to_key');tagValueAr.push(groupkey);
	tagNameAr.push('getPost_max_editdate');tagValueAr.push(getPost_max_editdate);
	tagNameAr.push('action');tagValueAr.push('insertNewPost');
	return data_form_to_xml(tagNameAr,tagValueAr);
}

function clearNewPostContent(){
	$('#table_newpost input,textarea').val('');
	$('#post_attach_content').html('');
	$('#td_addedAttach').html('');
	$('#table_newpost .addedAttach').addClass('display_none');
	if($('#span_attachMenu').css('display')!='none'){
		$('#btn_addAttach').trigger('click');
	}
}

function tophp_post_get(subAction){
	var tagNameAr = new Array('action','from_userkey','to_key','getPost_max_editdate','getPost_min_editdate','subAction');
	var tagValueAr = new Array('getGroupPost',_loginUserkey,groupkey,getPost_max_editdate,getPost_min_editdate,subAction);
	dataXML = data_form_to_xml(tagNameAr,tagValueAr);
	passDataToPHP_post(dataXML,'getGroupPost','0');
}

//database ---------------------------------------------------------------------------------------------
function passDataToPHP_nonDatabase(dataXML,source,targetBtn){
	$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	if (!$(targetBtn).hasClass('disabled')) {
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
		}
		var str = '';
		$.ajax({
			type: "POST",
			async: false,
			url: "_functPHP/functNonDatabase.php",
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
					case 'getLinkTitle':{
						str = $(xml).find('linkTitle').text();
						break;
					}
				}
				$(targetBtn).removeClass('disabled');
				$(targetBtn).parent().find('.tempUpload').remove();
			}
		});
		return str;
	}
}

function passDataToPHP_post(dataXML,source,targetBtn){
	$(targetBtn).parent().append('<img class="tempUpload" src="_images/bg/smallloading.gif" alt="Uploading...."/ width="30px">');
	if (!$(targetBtn).hasClass('disabled')) {
		if (targetBtn != '0') {
			$(targetBtn).addClass('disabled');
		}
		$.ajax({
			type: "POST",
			url: "_functPHP/functPost.php",
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
					case 'insertNewPost':{
						clearNewPostContent();
						tophp_post_get('update');
						$('#newpost_submit_btn').attr('disabled', false);
						break;
					}
					case 'getGroupPost':{
						databack_getGroupPost(xml);
						break;
					}
					case 'deletePost':{
						databack_deletePost(xml);
						break;
					}
					case 'insertNewCommentPost':{
						$('#span_quickComment').removeClass('display_none');
						$('#textarea_quickCommment').val('');
						$('#btn_submit_comment').attr('disabled', false);
						if ($('#post_table').length > 0) {
							$('#newpost_submit_btn').attr('disabled', true);
							tophp_post_get('update');
						}
						break;
					}
					case 'insertNewScratchPost':{
						tophp_post_get('update');
						break;
					}
					case 'sumbitPostComment':{
						tophp_post_get('update');
						break;
					}
					case 'deletePostComment':{
						tophp_post_get('update');
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

function databack_deletePost(xml){
	if($(xml).find('data').find('action').text() !='fail'){
		var postkey_post = '#post_'+$(xml).find('data').find('postkey').text();
		$(postkey_post).remove();
	}
	
}
function databack_getGroupPost(xml){
	
	var action = $(xml).find('data').find('subAction').text();
	var i=0;
	var return_post_num = $(xml).find('data').find('post').size();
	
	if(action == 'init'){
		$('#post_table tr').remove();
	}
	
	if(return_post_num >20){
		$('#btn_morepost').removeClass('display_none');
	}else{
		$('#btn_morepost').addClass('display_none');
	}

	$(xml).find('data').find('post').slice(0,20).each(function(e){
		var textToInsert= [];
		var j=0;
		var post_attach = $(this).children('post_attach').text();
		var num_comment =$(this).children('num_comment').text();
		var postkey = $(this).children('postkey').text();
		var from_userkey =  $(this).children('from_userkey').text();
		var post_right=0;
		if(from_userkey == _loginUserkey){
			post_right = 15;
		}
		if(_ulevel > post_right){
		 post_right = _ulevel;
		 }
		var rowindex = 0;
		if(action == 'init' && e==0){
			getPost_max_editdate = $(this).children('update_date').text();
			getPost_min_editdate = $(this).children('update_date').text();
		}
		
		if( $(this).children('update_date').text() > getPost_max_editdate){
			getPost_max_editdate = $(this).children('update_date').text();
		}
		if( $(this).children('update_date').text() < getPost_min_editdate){
			getPost_min_editdate = $(this).children('update_date').text();
		}
		if(action != 'update' || (action == 'update' && $('#post_'+postkey).length <=0)){
			textToInsert[i++] = '<tr class="post_tr roundEdge6' ;
			if (parseInt(post_right) > 20) {
				textToInsert[i++] = ' ed';
			}
			textToInsert[i++] ='" id="post_';
			textToInsert[i++] = postkey;
			textToInsert[i++] = '">';
		}
		textToInsert[i++] = '<td class="post_img_info v_align_top"><img class="post_td_images roundEdge6" src="';
		if($(this).children('userpic').text() != ''){
			textToInsert[i++] = $(this).children('userpic').text();	
		}else{
			textToInsert[i++] = "_images/icon/icon_user.png";
		}
		textToInsert[i++] = '" alt="postuser photo" /></td>';
		textToInsert[i++] ='<td class="post_td_info">';
		if (parseInt(post_right) > 20){
			textToInsert[i++] = '<div class="floatRight"><a class="btn_more post_edit">&nbsp;&nbsp;&nbsp;</a><br/ ><a href="#'+postkey+'" id="postDel_'+postkey+'" class="post_delete roundEdge6 floatRight display_none">Delete</a></div>';
		}
		
		textToInsert[i++] ='<p class="post_heading"><b><span class="post_username">';
		textToInsert[i++] = $(this).children('username').text();	
		textToInsert[i++] =	'</span><span class="post_topic_span"> shared ';
		var topicText = $(this).children('post_topic').text();
		if(topicText != '') {
			textToInsert[i++] ='"'+$(this).children('post_topic').text()+'"';
		}else{
			textToInsert[i++] =':';
		}
		textToInsert[i++] ='</span></b>';
		textToInsert[i++] ='</p>';
		textToInsert[i++] = '<p class="post_p_info">';
		textToInsert[i++] = $(this).children('post_text').text();
		
		textToInsert[i++] = '</p>';
		if (post_attach != '0') { /*generate attach*/
			$(this).children('attach').each(function(){
				textToInsert[i++]  = '<div class="post_attach_info roundEdge6 div_'+$(this).find('attach_type').text()+'">';
				var attach_type = $(this).find('attach_type').text();
				var attach_link = $(this).find('attach_link').text();
				var attachAr = update_post_attach_container(attach_type, attach_link, 'post');
				textToInsert[i++] = attachAr.join('');
				textToInsert[i++] = '</div>';
			});
		}
		
		var updateDate = $(this).children('create_date').text();
		var displayDate = new Date(updateDate.substring(0,4),parseInt(updateDate.substring(5,7))-1,updateDate.substring(8,10), updateDate.substring(11,13), updateDate.substring(14,16), updateDate.substring(17,19));
		var currentDate = new Date();
		var differentDate = Math.ceil((currentDate.getTime() - displayDate.getTime())/(1000*60));
		textToInsert[i++] ='<p class="font13 font_grey">';
		if(differentDate<60){
			textToInsert[i++] =differentDate+'minute(s) ago';
		}else if(differentDate>60 && differentDate<2400){
			textToInsert[i++] =Math.ceil(differentDate/60)+'hour(s) ago';
		}else{
			textToInsert[i++] = updateDate;
		}
		
		textToInsert[i++] ='</p>';
		
		if(num_comment>0){
			textToInsert[i++] = '<table class="comment_table">';
			$(this).find('comment').each(function(){
				var comment_key = $(this).children('postkey').text();
				textToInsert[i++] = '<tr class="comment_tr ';
				if(parseInt(post_right) >20 || $(this).children('from_userkey').text() == _loginUserkey){	
					textToInsert[i++] = 'ed';
				}
				textToInsert[i++] = '" id="comment_';
				textToInsert[i++] = comment_key;
				textToInsert[i++] = '"><td class="post_td_comment_images" ><img class="post_td_images_small roundEdge6" src="';
				if($(this).children('userpic').text() != ''){
					textToInsert[i++] = $(this).children('userpic').text();	
				}else{
					textToInsert[i++] = "_images/icon/icon_user.png";
				}
				textToInsert[i++] = '" alt="user photo" /></td><td class="comment_td_info pos_relative" width="380px">';
				
				if (parseInt(post_right) > 20 || $(this).children('from_userkey').text() == _loginUserkey){
					textToInsert[i++] = '<div class="floatRight"><a class="btn_more postcomment_edit">&nbsp;&nbsp;&nbsp;</a><br/ ><a href="#'+comment_key+'" id="postComDel_'+comment_key+'" class="postcomment_delete roundEdge6 floatRight display_none">Delete</a></div>';
				}
				textToInsert[i++] = '<p class="post_username"><b>';
				textToInsert[i++] = $(this).children('username').text();	
				textToInsert[i++] = '</b></p>';
				textToInsert[i++] = '<p class="comment_p_info">';
				textToInsert[i++] = $(this).children('post_text').text();	
				textToInsert[i++] = '</p>';

				var updateDate2 = $(this).children('create_date').text();
				var displayDate2 = new Date(updateDate2.substring(0,4),parseInt(updateDate2.substring(5,7))-1,updateDate2.substring(8,10), updateDate2.substring(11,13), updateDate2.substring(14,16), updateDate2.substring(17,19));
				var differentDate2 = Math.ceil((currentDate.getTime() - displayDate2.getTime())/(1000*60));
				textToInsert[i++] ='<p class="font13 font_grey comment_p_date">';
				if(differentDate2<60){
					textToInsert[i++] =differentDate2+'minute(s) ago';
				}else if(differentDate2>60 && differentDate2<2400){
					textToInsert[i++] =Math.ceil(differentDate2/60)+'hours ago';
				}else{
					textToInsert[i++] = updateDate2;
				}
				textToInsert[i++] ='</p>';
				textToInsert[i++]='</td></tr>';
			});
			textToInsert[i++] = '</table>';
		}	
		
		
		var should_display = '';
		if (action == 'more' || e > 5) {
			should_display = ' display_none';
			textToInsert[i++] ='<a class="btn_showComment font16" href="#';
			textToInsert[i++] = postkey;
			textToInsert[i++] = '">';
			textToInsert[i++] = 'Comment';
			textToInsert[i++] ='</a>';
		}
		var title='';
		if(isIE){
			title=' Comment：<br />';
		}
		if(_ulevel> 5){
			textToInsert[i++] = '<p class="p_new_comment font_lightBlue font16'+should_display+'">'+title+'<textarea class="post_comment_textarea font15" cols="40" placeholder="Comment..."></textarea><br /><a class="btn_submitComment" href="#';
			textToInsert[i++] = postkey;
			textToInsert[i++] = '" id="submitComment_';
			textToInsert[i++] = postkey;
			textToInsert[i++] = '">';
			textToInsert[i++] = 'Comment';
			textToInsert[i++] ='</a></p>';
		}
		
		
		if(action != 'update' || (action == 'update' && $('#post_'+postkey).length <=0)){
			textToInsert[i++] = '</tr>';
		}	
		if(action == 'init' || action == 'more' || action == 'change'){
			$('#post_table').append(textToInsert.join(''));		
		}else if(action == 'update'){
			if($('#post_'+postkey).length >0){
				$('#post_'+postkey+' td').remove();
				$('#post_'+postkey).append(textToInsert.join(''));
			}else{
				$('#post_table').prepend(textToInsert.join(''));
			}
		}
	});
	$('#post_table .post_heading ,#post_table .post_p_info').css('width','680px').css('max-width','700px').css('word-wrap','break-word');
	$('#post_table .post_attach_info').css('width','600px');
	if($(document).height()>2000 && $('#hotGpList').length>0 && $('#td_hotGpList p').length<=0){
		passDataToPHP_studyGp('<data><action>getHotGpList</action></data>','getHotGpList','0');
		$('#hotGpList').removeClass('display_none');
	}
}
