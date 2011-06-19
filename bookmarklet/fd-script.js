/*
 * font dragr v2
 * http://www.thecssninja.com/javascript/font-dragr2
 * Copyright (c) 2011 Ryan Seddon 
 * released under the MIT License
 * http://www.fontdragr.com/license.txt
*/

var FD = FD || {};

(function(){
	
	
	
	// Bookmarklet tracking code
	function gaTrack(g,h,i){function c(e,j){return e+Math.floor(Math.random()*(j-e));}var f=1000000000,k=c(f,9999999999),a=c(10000000,99999999),l=c(f,2147483647),b=(new Date()).getTime(),d=window.location,m=new Image(),n='http://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn='+k+'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='+h+'&utmr='+d+'&utmp='+i+'&utmac='+g+'&utmcc=__utma%3D'+a+'.'+l+'.'+b+'.'+b+'.'+b+'.2%3B%2B__utmb%3D'+a+'%3B%2B__utmc%3D'+a+'%3B%2B__utmz%3D'+a+'.'+b+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D'+d.host+'%7Cutmcct%3D'+d.pathname+'%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'+a+'.-%3B';m.src=n;}gaTrack('UA-4638292-2','fontdragr.com','font dragr bookmarklet');

})();