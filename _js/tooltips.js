/* Modified from the qTip2 - tooltips - v2.2.1 - Copyright (c) 2014 Released under the MIT licenses http://jquery.org/license */

$(document).ready(function(){
	create_tips_for_class_tips();
});

function create_tips_for_class_tips(){
	
	$('.tips').each(function(){
		
		var tips = $(this).attr('tips');
		$(this).qtip({
		   content: {
		     text: tips// Use each elements title attribute
		   },
		   style: { 
		  	 tip: true,
		  	 'font-size': 11,
		  	  border: { color: '#007cc2'},
		  	 'padding':'5px 5px',
		   	  color: '#007cc2',
			    name: 'blue'
		   },
		   position: {
		     corner: {
		    	 tooltip: 'bottomMiddle',
	          target: 'topMiddle'
		     }
		    }// Give it some style
		});
	});
}


function create_post_link_Tips(){

	var apiKey = '0KUn7MSO3322';// Notice the use of the each method to gain access to each element individually
	$('#post_table a.linkpost').each(function(){  // Grab the URL from our link
  	//if($(this).hasClass('newpost_attach_link') || $(this).hasClass('post_link_a')){
  	//if($(this).children('img').size()<=0 && !$(this).hasClass('deletebutton_img') && !$(this).hasClass('newpost_attach_upload') && $(this).attr('href') != '#'){
	
	  var prefix = $(this).attr('href').substr($(this).attr('href').length - 4);
	  if(prefix != '.doc' && prefix != '.jpg' && prefix != '.png' && prefix != '.xlc' && prefix != '.ppt' && prefix != '.pdf'){
	  
		var url = encodeURIComponent( $(this).attr('href') ),
	    // Create image thumbnail using Websnapr thumbnail service
	    thumbnail = $('<img />').attr({
	      src: 'http://images.websnapr.com/?url=' + url + '&key=' + apiKey + '&hash=' + encodeURIComponent(websnapr_hash),
	      alt: 'Loading thumbnail...',
	      width: 202,
	      height: 152
	    });
	    
	    $(this).qtip({ // Setup the tooltip with the content
	      content: thumbnail,
	      position: {
	    	  corner: {
	          tooltip: 'bottomMiddle',
	          target: 'topMiddle'
	        }
	      },
	      style: {
	    	  tip: true, // Give it a speech bubble tip with automatic corner detection
	    	  name: 'cream'
	      }
	    });
  	//}
	  }
  });
}

function create_newpost_link_Tips(){
	
	var apiKey = '0KUn7MSO3322'; // Notice the use of the each method to gain access to each element individually 
  $('#post_attach_content .new_post_attach_p a').each(function() { // Grab the URL from our link  
  //	if(!$(this).hasClass('deletebutton_img') && !$(this).hasClass('newpost_attach_upload') && $(this).attr('href') != '#'){	
	
	  if($(this).attr('href') != undefined && $(this).attr('href') != null) {
		  var prefix = $(this).attr('href').substr($(this).attr('href').length - 4);
	  }
	  
	
	  if(($(this).hasClass('newpost_attach_link') || $(this).hasClass('post_link_a')) && prefix != '.doc' && prefix != '.jpg' && prefix != '.png' && prefix != '.xlc' && prefix != '.ppt' && prefix != '.pdf'){
  	var url = encodeURIComponent( $(this).attr('href') ),
    // Create image thumbnail using Websnapr thumbnail service
    thumbnail = $('<img />').attr({
      src: 'http://images.websnapr.com/?url=' + url + '&key=' + apiKey + '&hash=' + encodeURIComponent(websnapr_hash),
      alt: 'Loading thumbnail...',
      width: 202,
      height: 152
    });
    $(this).qtip({// Setup the tooltip with the content
      content: thumbnail,
      position: {
        corner: {
          tooltip: 'bottomMiddle',
          target: 'topMiddle'
        }
      },
      style: {
        tip: true, // Give it a speech bubble tip with automatic corner detection
        name: 'cream'
      }
    });
  	}
  });
}

function create_editpost_link_Tips(){
	
	var apiKey = '0KUn7MSO3322'; // Notice the use of the each method to gain access to each element individually  
	$('#editpost_attach_content .new_post_attach_p a:last()').each(function()
  	{
    // Grab the URL from our link
	var prefix = $(this).attr('href').substr($(this).attr('href').length - 4);
	if(!$(this).hasClass('deletebutton_img') && !$(this).hasClass('newpost_attach_upload') && $(this).attr('href') != '#' && prefix != '.doc' && prefix != '.jpg' && prefix != '.png' && prefix != '.xlc' && prefix != '.ppt' && prefix != '.pdf'){
    var url = encodeURIComponent( $(this).attr('href') ),

    // Create image thumbnail using Websnapr thumbnail service
    thumbnail = $('<img />').attr({
      src: 'http://images.websnapr.com/?url=' + url + '&key=' + apiKey + '&hash=' + encodeURIComponent(websnapr_hash),
      alt: 'Loading thumbnail...',
      width: 202,
      height: 152
    });

    // Setup the tooltip with the content
    $(this).qtip(
    {
      content: thumbnail,
      position: {
        corner: {
          tooltip: 'bottomMiddle',
          target: 'topMiddle'
        }
      },
      style: {
        tip: true, // Give it a speech bubble tip with automatic corner detection
        name: 'cream'
      }
    });
		}
  });
}

function create_tag_Tips(){
	$('#post_table a.a_tag').each(function(){
		//var contents = 'Tag added by:;
	   // Setup the tooltip with the content
	   $(this).qtip( //<a href="'+'wall.php?id='+$(this).attr("userkey")+'>'+$(this).attr("tag_username")+'</a><br />
	   {
	  	 content: {
	       // Set the text to an image HTML string with the correct src URL to the loading image you want to use
	       text: '<div class="fs_11">Tag added by:'+'<br /><table><tr><td width="30"><img src="'+$(this).attr("tag_photo")+'" width="30px" height="30px" /></td><td>'+$(this).attr("tag_username")+'</a><br />'+$(this).attr("tag_createdate")+'</td></tr></table></div>'
	     },
	     position: {
	       corner: {
	         tooltip: 'topMiddle',
	         target: 'bottomMiddle'
	       }
	     },
	     style: {
	       tip: true, // Give it a speech bubble tip with automatic corner detection
	       name: 'light',
	       width:'100px',
	     	 height:'45px'
	     }
	   });
	});
}

function create_new_search_member_Tips(){
	var addmember = 'Add';
	if(_lang =="cn"){
		addmember = '加入';
	}
	$('#search_member_ul .new_member_li a.new_member_li_a').each(function(){
		$(this).qtip({
	     content: '<a href="'+$(this).attr('href')+'" class="add_memeber_btn">'+addmember+'</a>', // Give it some content
	     position: 'topRight', // Set its position
	     hide: {
	      fixed: true // Make it fixed so it can be hovered over
	     },
	     style: {
	      padding: '2px 2px', // Give it some extra padding
	      name: 'blue' // And style it with the preset dark theme
	     }
		});
  });
}

function create_profile_list_member_Tips(){

	$('#profile_member_list_table td').each(function(){
		
		if($(this).children().size()>0 && _loginUserRight>11){
			$(this).qtip({
		     content: '<a class="delete_member_btn" href="#'+$(this).attr('id').substring(2)+'">&nbsp;</a>', // Give it some content
		     position: 'topRight', // Set its position
		     hide: {
		      fixed: true // Make it fixed so it can be hovered over
		     },
		     style: {
		      padding: '1px 1px', // Give it some extra padding
		      border:'0px',
		      'background-color':'transparent'
		      // name: 'blue' // And style it with the preset dark theme
		     }
			});
		}
  });
}
function create_post_editable_Tips(){

	$('#post_table tr.editable:not(.qtiped)').each(function(){
		var type = 'post';
		var top_post = '';
		if($(this).attr('id').indexOf('post')<0){
			type = 'comment';
		}
		var id = $(this).attr('id').replace('post_','').replace('comment_tr', '');
		
		if(_loginUserRight>15 && _page =='group' && !$(this).hasClass('partnerpost') && !$('#teacherDiscuss_btn').hasClass('selected') && $(this).attr('id').indexOf('post')>=0 ){
			
			if($(this).hasClass('toppostpost')){
				top_post = '<a class="untoppost fc_white" href="#'+id+'">Unset Top Post</a><label class="fc_white"> | </label>';
			}else{
				top_post = '<a class="toppost fc_white" href="#'+id+'">Top Post</a><label class="fc_white"> | </label>';
			}
			
		}
		
	   $(this).qtip(
	   {
	     content: top_post+'<a class="edit'+type+' fc_white" href="#'+id+'">'+_tranDataArr['post_edit_btn']+'</a><label class="fc_white"> | </label> <a class="delete'+type+' fc_white" href="#'+id+'">'+_tranDataArr['post_delete_btn']+'</a>', // Give it some content
	     position: 'topRight', // Set its position
	     hide: {
	      fixed: true // Make it fixed so it can be hovered over
	     },
	     style: { 
		  	 'font-size': 11,
		  	  border: { color: '#007cc2'},
		  	 'background-color':'#007cc2',
		  	 'padding':'2px 2px'
		   }
	   });
	   $(this).addClass('qtiped');
  });
}

function create_reply_comment_editable_Tips(){

	$('#task_reply_comment_td tr.editable').each(function(){
		var type = 'task_reply_comment';
		var id = $(this).attr('id').replace('reply_comment_','');
		   $(this).qtip({
		   
		     content: ' <a class="delete_task_reply_comment fc_white" href="#'+id+'">'+'X'+'</a>', // Give it some content _tranDataArr['post_delete_btn']
		     position: 'topRight', // Set its position
		     hide: {
		      fixed: true // Make it fixed so it can be hovered over
		     },
		     style: { 
			  	 'font-size': 11,
			  	  border: { color: '#007cc2'},
			  	 'background-color':'#007cc2',
			  	 'padding':'2px 2px'
			   }
		   });
	});
}

function create_task_content_hide(){
	$('#task_content_td').each(function(){
	   $(this).qtip({
	     content: ' <a class="hide_task_content fc_white">'+'Hide'+'</a>', // Give it some content _tranDataArr['post_delete_btn']
	     position: 'topRight', // Set its position
	     hide: {
	      fixed: true // Make it fixed so it can be hovered over
	     },
	     style: { 
		  	 'font-size': 11,
		  	  border: { color: '#007cc2'},
		  	 'background-color':'#007cc2',
		  	 'padding':'2px 2px'
		   }
	   });
	});
}



function home_create_post_link_Tips(){

	var apiKey = '0KUn7MSO3322';// Notice the use of the each method to gain access to each element individually
	$('#popupdiv a.linkpost').each(function(){  // Grab the URL from our link
  	//if($(this).hasClass('newpost_attach_link') || $(this).hasClass('post_link_a')){
  	//if($(this).children('img').size()<=0 && !$(this).hasClass('deletebutton_img') && !$(this).hasClass('newpost_attach_upload') && $(this).attr('href') != '#'){
	
	  var prefix = $(this).attr('href').substr($(this).attr('href').length - 4);
	  if(prefix != '.doc' && prefix != '.jpg' && prefix != '.png' && prefix != '.xlc' && prefix != '.ppt' && prefix != '.pdf'){
	  
		var url = encodeURIComponent( $(this).attr('href') ),
	    // Create image thumbnail using Websnapr thumbnail service
	    thumbnail = $('<img />').attr({
	      src: 'http://images.websnapr.com/?url=' + url + '&key=' + apiKey + '&hash=' + encodeURIComponent(websnapr_hash),
	      alt: 'Loading thumbnail...',
	      width: 202,
	      height: 152
	    });
	    
	    $(this).qtip({ // Setup the tooltip with the content
	      content: thumbnail,
	      position: {
	    	  corner: {
	          tooltip: 'bottomMiddle',
	          target: 'topMiddle'
	        }
	      },
	      style: {
	    	  tip: true, // Give it a speech bubble tip with automatic corner detection
	    	  name: 'cream'
	      }
	    });
  	//}
	  }
  });
}

function home_create_tag_Tips(){
	$('#popupdiv a.a_tag').each(function(){
		//var contents = 'Tag added by:;
	   // Setup the tooltip with the content
	   $(this).qtip( //<a href="'+'wall.php?id='+$(this).attr("userkey")+'>'+$(this).attr("tag_username")+'</a><br />
	   {
	  	 content: {
	       // Set the text to an image HTML string with the correct src URL to the loading image you want to use
	       text: '<div class="fs_11">Tag added by:'+'<br /><table><tr><td width="30"><img src="'+$(this).attr("tag_photo")+'" width="30px" height="30px" /></td><td>'+$(this).attr("tag_username")+'</a><br />'+$(this).attr("tag_createdate")+'</td></tr></table></div>'
	     },
	     position: {
	       corner: {
	         tooltip: 'topMiddle',
	         target: 'bottomMiddle'
	       }
	     },
	     style: {
	       tip: true, // Give it a speech bubble tip with automatic corner detection
	       name: 'light',
	       width:'100px',
	     	 height:'45px'
	     }
	   });
	});
}



