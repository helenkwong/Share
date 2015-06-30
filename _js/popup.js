var showdivArray =[];
// for the pop up property
var popupStatus = 0;
var popupStatus_bottom =0; 
var popupDiv = "null";
var popupDiv_bottom = "null";
var currentTarget = '';

$(document).ready(function() {

	if($('#backgroundPopup').length>0){
		
		$('.popupClose').click(function(){
			disablePopup();
			return false;
		});
		/*$('#backgroundPopup').click(function(){
			disablePopup();
			return false;
		});*/
		
		$('.popupdiv').on('click','a',function(e){
			 if($(this).hasClass('popupClose')){
				disablePopup();
				return false;
			 }
			 else if($(this).hasClass('popupClose_bottom')){
					disablePopup();
					return false;
			}
		});
		
		$(document).keypress(function(e){
			if(e.keyCode==27 && popupStatus_bottom == 1 && $('.popupClose_bottom').length>0){
				disablePopup_bottom();
			}
			else if(e.keyCode==27 && popupStatus == 1){
				disablePopup();
			}
		});
	}
	
	if($('.popupClose_bottom').length>0){
		$('.popupClose_bottom').click(function(){
			disablePopup_bottom();
			return false;
		});
		
		$('#backgroundPopup_bottom').click(function(){
			disablePopup_bottom();
			return false;
		});
		
	}
});

function initPopup(target,width){
	currentTarget = target;
	 if(width != 0){
		 if(target != 'popdiv_bottom'){
			 $('#popdiv').width(width);
		 }else{
			 $('#popdiv_buttom').width(width);
		 }
	 }
	
	 if(target != 'popdiv_bottom'){
		 popupDiv = '#'+target;
		 centerPopup('');
		 loadPopup('');
	 }else{
		 popupDiv_bottom = '#'+target;
		 centerPopup('_bottom');
		 loadPopup('_bottom');
	 }
}

// for the pop up property-----------------------------------------------------------------------
function loadPopup(special_tg){
	if(special_tg == undefined){
		special_tg = '';
	}
	
	if((special_tg == '' && popupStatus==0)){
		$("#backgroundPopup"+special_tg).fadeIn(600);
		$(popupDiv).fadeIn(600);
		popupStatus = 1;

	}else if(special_tg != '' && popupStatus_bottom==0){
		$("#backgroundPopup"+special_tg).fadeIn(600);
		$(popupDiv_bottom).fadeIn(600);
		popupStatus_bottom = 1;
	}
}

function disablePopup(){//disables popup only if it is enabled
	
	if($('#targetBg').children().length>0){
		$('#targetBg').children('canvas').remove();
		$('#targetBg img').remove();
	}
	
	if(popupStatus==1){
		$("#backgroundPopup").fadeOut(600);
		if (currentTarget != 'div_stage') {
			$(popupDiv).fadeOut(600);
		}
		popupStatus = 0;
		if(currentTarget =='div_try_Scratch'){
			$('#span_quickComment').addClass('display_none');
			$('#iframe_Scratch').attr('src','');
		}
		
		if(currentTarget == 'div_helpTable'){
			$('iframe').css('display','');
		}
		
		if(currentTarget == 'div_userEditInfo'){
			$('#div_editInfoStudentList').addClass('display_none');
		}
		$('#popdiv .popup_content_td').children().remove();
	}
}

function disablePopup_bottom(){//disables popup only if it is enabled
	
	if(popupStatus_bottom==1){
		$("#backgroundPopup_bottom").fadeOut(600);
		$(popupDiv_bottom).fadeOut(600);
		popupStatus_bottom = 0;
		$('#popdiv_bottom .popup_content_td').children().remove();
	}
}

function centerPopup(special_tg){//centering popup
	if(special_tg == undefined){
		special_tg = '';
	}
	var target;
	
	if(special_tg == ''){
		target = popupDiv;
	}else{
		target = popupDiv_bottom;
	}
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $(target).height();
	var popupWidth = $(target).width();
	
	var top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
	var newHeight = windowHeight/2 - popupHeight/2;
	var newWidth = windowWidth/2-popupWidth/2;
	
	if(newHeight <20 && currentTarget !='div_try_Scratch' ){
		newHeight = top + 20;
	}
	else{
		newHeight = top + newHeight;
	}
	
	if((newHeight + popupHeight) > $(document).height()){
		newHeight = $(document).height() - popupHeight -30;
	}
	
	if(newHeight<0){
		newHeight = 0;
	}
	
	if(newWidth<0){
		newWidth = 0;
	}
	if(currentTarget =='div_try_Scratch' && fullscreenMode == true ){
		newHeight = newHeight- 20;
	}
	
	$(target).css({
		"position": "absolute",
		"top": newHeight,
		"left": newWidth
	});
	var closewidth = popupWidth;
	
	$("#backgroundPopup"+special_tg).css({
		"height": $(document).height()
	});
}

