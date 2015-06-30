<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<?php
//include('db.php');
session_start();
$session_id="123";//$_SESSION['userkey']; //$session id
$path = "../_upload/profile_upload_images/";
$download_path = "_upload/profile_upload_images/";

	$valid_formats = array("jpg", "png", "gif", "bmp", "JPEG","JPG","PNG","GIF");
	
	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST" && isset($_FILES['uploadImg'])){
			$name = $_FILES['uploadImg']['name'];
			$size = $_FILES['uploadImg']['size'];
			
			if(strlen($name)){
				list($txt, $ext) = explode(".", $name);
				//$ext = substr(strrchr($name, '.'), 0);
				if(in_array($ext,$valid_formats)){
					if($size<(6048*6048)){
						$actual_image_name = $session_id.".".$ext;
						//$actual_image_name = time().substr(str_replace(" ", "_", $txt), 5).".".$ext;
						$tmp = $_FILES['uploadImg']['tmp_name'];
						
						$actual_image_name = $session_id."_".time().".".$ext;
						/*while (file_exists($path.$actual_image_name) && $counter<50){
							$actual_image_name = $session_id."_".$counter.".".$ext;
                			//$actual_image_name = time().substr(str_replace(" ", "_", $txt), 5)."_".$counter.".".$ext;
                			$counter = $counter+1;
                			
                			if($counter == 49){
                				
                			}
            			}*/
							if(move_uploaded_file($tmp, $path.$actual_image_name)){
								//mysql_query("UPDATE users SET profile_image='$actual_image_name' WHERE uid='$session_id'");
								echo "<img src='".$download_path.$actual_image_name."'  alt='".$download_path.$actual_image_name."' id='userUploadImg' class='previewImg' >";
							}else
								echo "Upload failure.";
						}
					else
						echo "Upload image size must be less than 3M.";					
					}
					else
						echo "Invalid image format.";	
				}	
			else
				echo "Please select image!";
		}else{
			echo "Please select image!";
		}
		exit;
?>
</html>