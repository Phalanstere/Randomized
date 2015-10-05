"use strict";
var util = require("util"); 
var csscolors = require('css-color-names');
var hexToRgb = require('hex-to-rgb');
var color	 = require('color_name_converter');

// console.dir(csscolors);



// calculates the randon color segment
function gcol(newseg, oldseg, range) {
	var dev = Math.floor( (Math.random() * range) - range*0.5 );
	newseg = (oldseg + dev);
	newseg = Math.clip(newseg, 0, 255);
	return newseg;		
}

function galpha(newseg, oldseg, range) {
	var dev;
	dev = (Math.random() * range) - range*0.5;
	newseg = (oldseg + dev);
	newseg = Math.clip(newseg, 0, 1);
	return newseg.toFixed(3);	
}


function random_rgba(col, deviation) {
	
	var tg = {}, range, dev;
	
	if ( !col)  {
		var r,g,b,a;
		r = parseInt( Math.random() * 255, 10);
		g = parseInt( Math.random() * 255, 10);	
		b = parseInt( Math.random() * 255, 10);
		a = Math.random().toFixed(3);	
		return "rgba(" + r + "," + g + "," + b + "," + + a + ")";
		}
	else
		{
		if (deviation)
			{
			range = 255* (deviation*2);           // calculates the range
			tg.r = gcol(tg.r, col.r, range);
			tg.g = gcol(tg.g, col.g, range);
			tg.b = gcol(tg.b, col.b, range);			
			
			tg.a = galpha(tg.a, col.a, deviation*2);			
			//console.log("ALPHA " + tg.a); 
			
			}	
		}		
}
 
// 
function random_rgb(col, deviation, format) {
	var tg = {}, range, dev;
	
	if (! col)
	{
	return "rgb(" + parseInt( Math.random() * 255, 10) + "," 
				  + parseInt( Math.random() * 255, 10) + ","
				  + parseInt( Math.random() * 255, 10) + ")"; 
	}
	else
		{
		if (deviation)
			{
			range = 255* (deviation*2);           // calculates the range
			tg.r = gcol(tg.r, col.r, range);
			tg.g = gcol(tg.g, col.g, range);
			tg.b = gcol(tg.b, col.b, range);		
			
			if (format) return get_format(tg, format);
			else 		return get_format(tg, "rgb");
				
			}	
		}			  
				  
} 
 
 
function get_format(col, type) {
	var ret = null;
	switch(type) {
		case "rgb":
			ret = "rgb(" + col.r + "," + col.g + "," + col.b + ")"; 	
		break; 	
		
		case "rgba":
		    if (! col.a) col.a = 1;
			ret = "rgb(" + col.r + "," + col.g + "," + col.b + "," + col.a + ")"; 
		break; 
		
		case "object":
			ret = col;
		break;
		}
	return ret;		
} 
 
 
function check_type(type) {

	if (type.length > 3 &&  type.substr(0,4) === "rgb(") return "rgb";
	if (type.length > 4 &&  type.substr(0,5) === "rgba(") return "rgba";
	

}

function extract_color(str) {
	var tmp, col = {}; 
	str = str.replace(/ /g,'');
	tmp = str.indexOf("(");
	str = str.substr(tmp+1, str.length );
	str = str.substr(0, str.length-1);
	tmp = str.split(",");
	if (tmp.length > 2)
		{
		col.r = parseInt (tmp[0], 10);
		col.g = parseInt (tmp[1], 10);
		col.b = parseInt (tmp[2], 10);	
		}
		
	if  (tmp.length === 4) {
		col.a = parseFloat( tmp[3] );
		}

 	return  col;
}


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}



function check_colorname(str) {
	
	var c = color(str, "array");
	if (c) 
		{
		console.log(" COLOR " + c);	
		return c;
		}
	else return null;
}


function isFormat(format) {
	if (format === "rgb" || format === "rgba" || format === "hex" || format === "object") return true;
};

function randomized(input, param1, format) {
	var type, res, rgb, col;
	rgb = check_colorname(input);
	if (rgb) type = "colorname";
	else type = check_type(input);
	

		
	// console.log(type);
	
	switch(type) {
		case "colorname":
		  col = { r: rgb[0], g: rgb[1], b: rgb[2]};
		  
		   if (param1 && isNumeric(param1 ) === true) {
			if (isFormat(format) === true) 	res = random_rgb(col, param1, format);
			else							res = random_rgb(col, param1); 
			}
		break;
		
		case "color":
		   res = random_rgb();
		break;
		
		case "rgb":
		  res = extract_color(input);
		break;
	
		case "rgba":
		   res = extract_color(input);
		   // now the question if param 1 is a number
		   if (param1 && isNumeric(param1 ) === true) {
			console.log("eine Zahl");
			res = random_rgba(res, param1); //  
			}
		   
		break;

		
	}
	
return res;	
}



Math.clip = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}


// var c = randomized("lightgreen", 0.02, "rgba");
// console.log(util.inspect( c) );

module.exports = exports = randomized;


