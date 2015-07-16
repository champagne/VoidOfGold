/**
 * Copyright (c) 2013 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

	//var $ = document.getElementById.bind(document);

/*	var url = 'https://chrome.google.com/webstore/detail/' +
	          'google-calendar-by-google/gmbgaklkmjakoegficnlkhebmhkjfich';

	document.querySelector('#name').textContent = chrome.i18n.getMessage('name');
	document.querySelector('#link').href = url;
	document.querySelector('#remove').onclick = function() {
	  chrome.management.uninstallSelf({showConfirmDialog: true});
	  window.close();
	};

*/



var highExpect;
var lowExpect;

//Get Reference to background
var backGround = chrome.extension.getBackgroundPage();

function initPopup() {

    document.getElementById("status").innerText = backGround.latestPrice;
    
/*    if(backGround.highExpect != null)
    	document.getElementById("high").value = backGround.highExpect;
    if(backGround.lowExpect != null)
    	document.getElementById("low").value = backGround.lowExpect;
*/	//window.alert("OK");

    document.getElementById("start").onclick = function() {
    	
    	highExpect = document.getElementById("high").value;
    	lowExpect = document.getElementById("low").value;
    	//window.alert(lowExpect);
    	backGround.setPopupSettings(lowExpect, highExpect);
    	//window.close();
    };

    document.getElementById("stop").addEventListener("click", function() {
    	//set interval time 1 day (24 * 60 * 60 s)
    	backGround.setIntervalTime(24*60*60);
    });

    /*
    //execute javascript
    chrome.tabs.executeScript(null, {code:"window.alert(backGround.latestPrice);document.getElementById('status').innerText = backGround.latestPrice;"}, function(result){
    	if (!chrome.runtime.error) {
    		document.getElementById("low").value = 2;
    	}
    	
    });
    */
    
/*	//get the latestPrice from storage
	chrome.storage.sync.get("latestPrice", function(items) {
		if (!chrome.runtime.error) {
			currentExpect = items['latestPrice'];
			document.getElementById("status").innerText = items['latestPrice'];
		}
	});
*/
    
    //send message to background
    //chrome.runtime.sendMessage({latestPrice: GC});

}

document.addEventListener("DOMContentLoaded", initPopup);

/*chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
	//window.alert(backGround.latestPrice);
	document.getElementById("low").value = 2;
	document.getElementById('status').innerText = backGround.latestPrice;
});

*/





