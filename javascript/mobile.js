var radiusX = 150;
var radiusY = 40;
var centerY = 300 / 2+20;
var speed = .02;
var images=Object();
carousel_items=$('.carousel_itmes');
images['gross'] =0;
images['mri'] =1 * ((3.14*2)/3);
images['section'] =2 * ((3.14*2)/3);
var width=Object();
var height=Object();
var myInterval;
var slides;

function slideInit(resource) {
// 	$.mobile.pageLoading();
	$("#myCanvas").click(
			function(e) {
				
				var x = e.pageX - this.offsetLeft;
				var y = e.pageY - this.offsetTop;
				var highest_z = 1000;// looks like 0 is closer to the screen,
										// hopefully we wont have more than 1000
										// slides
				var clicked_slide_id = 0;
// console.log('click: ' + x + ', ' + y);
				for (item_id in slides) {
					if (point_in_slide(item_id, x, y)) {
						/*
						 * console.log('found polygon in ' +
						 * slides[item_id]['label'] + 'with zorder ' +
						 * slides[item_id]['zorder']);
						 */
						if (slides[item_id]['zorder'] < highest_z) {
							highest_z = slides[item_id]['zorder'];
							clicked_slide_id = item_id;

						}
					}
				}
				if (clicked_slide_id > 0)
					show_shape(clicked_slide_id);
			});
			
	$.ajax({
		type : "GET",
		url : 'resource.php?JSON=true&r=' + escape( (resource) ).replace( new RegExp("\\+","g"),"%2B"),
		dataType : "json",
		success : parseJson
	});
	// alert(resource.split('.').pop()+'.jpg');
	$('#slide_image').attr(
			"src",
			'resource.php?r=' + escape( resource.substr(0, resource.lastIndexOf(".")) ).replace( new RegExp("\\+","g"),"%2B")
					+ '.jpg');
}

function show_shape(item_id) {
	$('.selected_structure').removeClass('selected_structure');
	console.log('#item_' + item_id);
	$('#item_' + item_id).addClass('selected_structure');
	var def = slides[item_id]['definition'];
	$('#definition_box').html('<strong>Definition:</strong></br>' + def);
	console.log(def);
	// Get a reference to the element.
	var canvas = document.getElementById('myCanvas');

	// Always check for properties and methods, to make sure
	// your code doesn't break
	// in other browsers.
	if (canvas && canvas.getContext) {
		// Get the 2d context.
		// Remember: you can only initialize one context per
		// element.
		var context = canvas.getContext('2d');
		if (context) {
			context.clearRect(0, 0, canvas.width, canvas.height);

			// You are done! Now you can draw your first
			// rectangle.
			// You only need to provide the (x,y)
			// coordinates, followed by the width and
			// height dimensions.
			context.fillStyle = "rgba(0, 200, 0, 0.5)";
			context.strokeStyle = "rgba(0, 200, 0 , 0.5)";
			context.lineWidth = 1;
// 		console.log(slides[item_id]['shapes'].length + ' shapes');
			// Start from the top-left point.
			for (s = 0; s < slides[item_id]['shapes'].length; s++) {
// 				console.log('rendering shape '+ s);
				
				context.beginPath();
// 			console.log('has '+slides[item_id]['shapes'][s].length+' sides');
				for (i = 0; i < slides[item_id]['shapes'][s].length; i++) {
					// console.log('rendering vertex '+i+'
					// ('+slides[item_id]['shapes'][s][i].x+','+
					// slides[item_id]['shapes'][s][i].y+') ('+
					// slides[item_id]['shapes'][s][i].cx+','+
					// slides[item_id]['shapes'][s][i].cy+')');
					if (i == 0){
						context.moveTo(slides[item_id]['shapes'][s][i].x,
								slides[item_id]['shapes'][s][i].y); // give
					}else{
					// the
					// (x,y)
					// coordinates
					// context.lineTo(slides[item_id]['shapes'][s][i].x,
						// slides[item_id]['shapes'][s][i].y);
						context.quadraticCurveTo(
								slides[item_id]['shapes'][s][i].cx,
								slides[item_id]['shapes'][s][i].cy,
								slides[item_id]['shapes'][s][i].x,
								slides[item_id]['shapes'][s][i].y
						);}
				}
				context.lineTo(slides[item_id]['shapes'][s][0].x,
						slides[item_id]['shapes'][s][0].y);
				context.fill();
				context.stroke();
				context.closePath();
			}
			// Done! Now fill the shape, and draw the
			// stroke.
			// Note: your shape will not be visible until
			// you call any of the two methods.

		}
	}
}

function point_in_slide(item_id, x, y) {
// console.log( 'checking ' + slides[item_id]['label'] );
	if (slides[item_id]['shapes']==undefined) return false;
	for (s = 0; s < slides[item_id]['shapes'].length; s++) {
		var polySides = slides[item_id]['shapes'][s].length - 1;

		var i, j = polySides - 1;
		var oddNodes = false;
		for (i = 0; i < polySides; i++) {
			if (slides[item_id]['shapes'][s][i].y < y
					&& slides[item_id]['shapes'][s][j].y >= y
					|| slides[item_id]['shapes'][s][j].y < y
					&& slides[item_id]['shapes'][s][i].y >= y) {
				if (slides[item_id]['shapes'][s][i].x
						+ (y - slides[item_id]['shapes'][s][i].y)
						/ (slides[item_id]['shapes'][s][j].y - slides[item_id]['shapes'][s][i].y)
						* (slides[item_id]['shapes'][s][j].x - slides[item_id]['shapes'][s][i].x) < x) {
					oddNodes = !oddNodes;
				}
			}
			j = i;
		}
		if(oddNodes) return true;
	}

	return oddNodes;
}



function parseJson(data) {
	console.log(data);
	slides = eval(data);

	// console.log('found ' + slides.length + ' slides');
	for (i in slides) {// console.log('processing '+i+' slides');
		$('#structures').append('<button class="structure_item" id="item_' + i + '">' + slides[i]['label']+ '</button></br>');
	}
	$(".structure_item").button().click(function() {
		var item_id = $(this).attr("id").split('_').pop();
		show_shape(item_id);
	});
// 	$.mobile.pageLoading(true);
}
function spin()
{
	p=$('#carousel').offset();
	centerX=p.left+(($('#carousel').width())/2)-radiusX+50;
	
	for(img in images){
		x=Math.cos(images[img]) * radiusX + centerX;
		y=Math.sin(images[img]) * radiusY + centerY;
		$('#'+img).css('left',x );
		$('#'+img).css('top',y);
		var s =y /(centerY+radiusY);
		// this._xscale = this._yscale = s*100;
		$('#'+img).height(s*height[img] );
		$('#'+img).width(s*width[img]);
		images[img] += speed;
		z=Math.round(s*100);
		$('#'+img).css('z-index',z);
		// console.log('spin:'+img+' '+x+','+y+' '+$('#'+img).height()+'
		// '+$('#'+img).width()+' '+s+' z:'+z);
	}
}

/* Author: Brandon Paulsen */
function neuroInit() {
// /////////////////////////
// 	 var thisId = $(this).attr("id");
// 	 if (window.location.href.indexOf('view.php?') == -1) {
// 		 	$('#continue_button').click(function() {
// 		 		clearInterval(myInterval);
// 		 		$('#splash').hide();
// 		 	});
// 		 	$('.carousel_item').load(function(){
// 					var img_id=$(this).attr('id');
// 					width[img_id]=$(this).width()+50;
// 					height[img_id]=$(this).height()+50;
// 					console.log(img_id+' '+width[img_id]+','+height[img_id]);
// 			});
// 
// 		 	myInterval=window.setInterval( 'spin()',50);
// 	 }
// ///////////////////////

	$.ajax({
		type : "GET",
		url : 'resource.php?r=documents.xml',
		dataType : "xml",
		success : parseDocumentsXml
	});
	
	$("#structures_container").accordion({
		icons : null,
		heightStyle : "fill"
	});
	
	$("#definition_box_container").accordion({
		icons : null,
		heightStyle : "fill"
	});
	
	
	$("#glossary_button").button().click(function() {
		$("#glossary_window").dialog();
		$("#glossary_window").dialog("option", "width", "800");
		$("#glossary_window").dialog("option", "height", "700");
		$("#structures_list_container").show();
		$("#structures_location_container").show();
		$.ajax({
			type : "GET",
			url : "resource.php?r=glossary/glossary.xml",
			dataType : "xml",
			success : parseGlossaryXml
		});
	});
	
	$("#structures_list_container").accordion({
		heightStyle: "fill"
		}).hide();
	$("#structures_location_container").accordion({
		heightStyle: "fill"
		}).hide();
}

$(document).ajaxError(function(e, xhr, settings, exception) {
	alert('error in: ' + settings.url + ' \n' + 'error:\n' + xhr.responseText);
	console.log(exception);
});

/* Author: Brandon Paulsen */
function parseFolder(xml, path, layer) {

	// console.log('found folder'+xml.attr("label"));
	var html = '<h3 class="folder_header">' + xml.attr("label") + '</h3>\n' + '<div ';
	var isSlideCollection = xml.children()[0].nodeName == "slidecollection";
	if (!isSlideCollection) {
		html += ' class="accordion accordion-layer-' + layer + ' folder-content">';
	} else {
		html += '><div class="slide_collection folder-content">';
	}

	$(xml).children()
			.each(
					function() {// console.log('node:'+this.nodeName);
						if (this.nodeName == "slidecollection") {
							// console.log('found slide'+xml.attr("label"));
							html += '<button id="' + $(this).attr("id")
									+ '" class="slide_item"'
									+ ' path="' + $(this).attr("path")
									+ '" data="' + $(this).attr("data")
									+ '">'
									+ $(this).attr("label") + '</button>'
									+ '<br>';
						} else {
							html += parseFolder($(this), $(this).attr('path'), layer + 1);
						}

					});
	if (isSlideCollection) {
		html += '</div>';
	}
	html += '</div>' + "\n";
	return html;
}

/* Author: Brandon Paulsen */
function parseDocumentsXml(xml) {
	// alert(xml);
	// find every Tutorial and print the author
	var html = '';
	$(xml).find("root>folder").each(function() {
		html += parseFolder($(this), $(this).attr('path'), 1);

	});
	html += '';
	$("#folder_menu").append(html);
// 	console.log(html);

	var icons = {
		header: "folder-close",
		activeHeader: "folder-open"
	}
	
	$( ".accordion" ).accordion({
		icons: icons,
		heightStyle: "content",
		collapsible: true,
		active: false
	});
	
	$(".slide_item").button({
		icons: {
			primary: "slide"
		}
	}).click(function(event) {
		$(".selected_slide").removeClass("selected_slide");
		$(this).addClass("selected_slide");
		$("#structures").empty();
		var canvas = document.getElementById('myCanvas');
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		var image = $(this).attr("data");
		var path = $(this).attr("path") + '/' +
		image.substr(0, image.lastIndexOf(".")) +
		'.xml';
// 		console.log(path);
		slideInit(path);
	});
	
	$("#folder_container").accordion({
		icons: null,
		heightStyle: "fill"
	});
}

/* Author: Brandon Paulsen */
function parseGlossaryXml(xml) {
	var html = '';
	$(xml).find("dictionary>item").each(function() {
		html += '<button id="' + $(this).attr("id") + '" class="structure_list_item">';
		html += $(this).text() + '</button></br>';
	});
	$("#structures_list").append(html);
	
	$(".structure_list_item").button().click(function() {
		$(".selected_structure_location").removeClass("selected_structure_location");
		$(this).addClass("selected_structure_location");
		$("#structures_location").empty();
		
		var resource = '';
		resource += $(this).attr("id");
		$.ajax({
			type: "GET",
			url: "resource.php?r=glossary/" + resource + ".xml",
			dataType: "xml",
			success: parseLocationXml
		});
	});
}

/* Author: Brandon Paulsen */
function parseLocationXml(xml) {
	var html = '';
	$(xml).find("info>item").each(function() {
		html += $(this).text();
		html += '<br>';
	});
	$("#structures_location").append(html);
}