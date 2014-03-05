<?php

$requested_file=$_GET['r'];

$base_path='/Users/pauls658/sites/Neurotime_practice/data/';
//Die if they are out of the directory trying to get other resources
$file_path = realpath($base_path . $requested_file);

if(strpos($file_path, $base_path) === FALSE) {
        echo 'error';
        exit("sams");
}

//print $file_path;
if (file_exists($file_path)) {
	$fp = fopen($file_path, 'rb');

	// send the right headers

	header("Cache-Control: ");// leave blank to avoid IE errors
	header("Pragma: ");// leave blank to avoid IE errors
	if( isset($_GET['JSON'])){
		//header ("Content-Type:text/xml");
		header('Content-type: text/json');

		//$filename='/~mcoleman/neurotime/data/'.substr($_GET['slide'], 0,strrpos($_GET['slide'], '.')).'.jpg';
		$xml = simplexml_load_file($file_path);
		$slides=array();
		foreach($xml->children() as $item){
			$attr=$item->attributes();
			$item_id=(int)$attr['id'];
			$slides[$item_id]['label']=(string)$attr['label'];
			//$slides[$item_id]['image']=substr($requested_file, 0,strrpos($requested_file, '.')).'.jpg';
			$slides[$item_id]['definition']=(string)$item->description;
			$slides[$item_id]['zorder']=(int)$attr['zorder'];
			if($item->shape){
				$shapes=$item->shape;
				$i=0;
				foreach($shapes as $shape){
					if($shape->vertex){
						$slides[$item_id]['shapes'][$i]=array();
						foreach($shape->vertex as $vertex){
							$atr=$vertex->attributes();
							$slides[$item_id]['shapes'][$i][]=array('x'=>(float)$atr['x'],'y'=>(float)$atr['y'],'cx'=>(float)$atr['cx'],'cy'=>(float)$atr['cy']);
						}
					$i++;
					}
				}

			}
	 }
	 $json=json_encode($slides);

	 echo $json;return;
	}elseif((substr(strrchr($file_path, '.'), 1)=='xml')){
		header ("Content-Type:text/xml");
	}else{
		header ("Content-Type:img/jpg");
	}
	header("Content-length:".(string)(filesize($file_path)));

	// dump the picture or xml and stop the script
	fpassthru($fp);

}else{
header('HTTP/1.0 404 Not Found');
	echo 'error';
}


?>
