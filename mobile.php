
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>NeuroTime</title>
<link rel="stylesheet" href="/~pauls658/jquery/jquery.mobile-1.0a2/jquery.mobile-1.0a2.min.css" />
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script src="/~pauls658/jquery/jquery.mobile-1.0a2/jquery.mobile-1.0a2.min.js"></script>
<script type="text/javascript" src="/~pauls658/jquery/jScrollTouch.js"></script>
	<script type="text/javascript" src="javascript/mobile.js"></script>
	<link href="css/mobile.css" rel="stylesheet" type="text/css" />
	<style>
		body { font-size:62.5%; }
		.ui-menu { width: 200px; }
		menu2 { height: 200px; overflow: auto; }
	</style>
	
</head>
<body>
<div id="page" data-role="page">

	<div data-role="header">
		<h1>NeuroTime</h1>
	</div><!-- /header -->

	<div data-role="content">	
	<ul id="folder_menu" data-role="listview" >
			<li data-role="list-divider">Overview</li>
			
		</ul>

	</div><!-- /content -->

	<div data-role="footer">
		<h4>University of Minnesota Medical School Duluth</h4>
	</div><!-- /header -->
</div><!-- /page -->
<div id="splash">
<img  id="logo" src="images/logo.png" />
<div id="carousel"><img src="images/Gross.png" id="gross" class='carousel_item'/><img src="images/MRI.png" id="mri" class='carousel_item'/><img src="images/Section.png" id="section" class='carousel_item'/></div>

<div id="copy"><p>Donna J. Forbes, Ph.D. and Arlen R. Severson, Ph.D.</p>
<p>University of Minnesota
Medical School Duluth</p><p>©2001, 2009 Regents of the University of Minneota
All rights reserved.<br />  Do not copy or reproduce without permission.<br /><button type="button" id="continue_button">Continue</button></p></div>
</div>
<script type="text/javascript">

$(document).ready(function()
		{
	
			neuroInit();
		});
</script>
</body>
</html>
