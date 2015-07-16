/*
    var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');

	var By = require('selenium-webdriver').By,
		until = require('selenium-webdriver').until;

	var driver = new webdriver.Builder()
		.forBrowser('chrome')
		.setChromeOptions( ... )
		.loggingTo('../log/file.txt')
		.enableVerboseLogging()
		.build();
*/

/*
	// Check if the browser supports notifications
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}
	// Let's check whether notification permissions have alredy been granted
	else if (Notification.permission === "granted") {
	// If it's okay let's create a notification
		alert("Notification permission granted");
		new Notification("Granted!");
	}
	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== 'denied') {
		alert("Notification permission denied");
		Notification.requestPermission(function (permission) {
			// If the user accepts, let's create a notification
			if (permission === "granted") {
		  		alert("Notification permission request granted.");
				new Notification("Request granted!");
			}
		});
	}
*/

/*
var warningId = 'notification.warning';

var createHighNotification = function (notificationId) {
	if(!notificationId)
		notificationId = warningId;
	
    chrome.notifications.create(
    	notificationId, 
    	{
        iconUrl: chrome.runtime.getURL('img/icon.png'),
        title: 'High',
        type: 'basic',
        message: 'Current price is: ' +
        		 ' Do you want to do some action?',
        buttons: [{ title: 'More Action' }],
        isClickable: true,
        priority: 2,
      }, 
      function() {}
    );
};

var createLowNotification = function (notificationId) {
	if(!notificationId)
		notificationId = warningId;
	
    chrome.notifications.create(
    	notificationId, 
    	{
        iconUrl: chrome.runtime.getURL('img/icon.png'),
        title: 'Low',
        type: 'basic',
        message: 'Current price is: ' +
                 ' Do you want to do some action?',
        buttons: [{ title: 'More Action' }],
        isClickable: true,
        priority: 2,
      }, 
      function() {}
    );
};

function hideWarning(done) {
	chrome.notifications.clear(warningId);
}

function showWarning() {
	//if already exist a notification, then clear it.
	//After that, create a new notification.
	chrome.notifications.clear(warningId, function() {
	    if (createHighNotification) createHighNotification();
	    
	});
}

function openWarningPage() {
	window.alert(price + "In page");
  chrome.tabs.create({
    url: 'chrome://extensions?options=' + chrome.runtime.id
  });
}
*/


var latestPrice;
var varyPercent;
var buyPrice;
var sellPrice;
var maxPrice;
var minPrice;
var daytime;
var yesterdayClosePrice;
var todayOpenPrice;
var obtainedAmount;
var buyAmount;
var sellAmount;
var name;

function parseResponse(data){
	if(data == null || data.length <= 0)
		return;
	
	//data:	var hq_str_hf_GC="1154.1,-0.1125,1154.0,1154.1,1157.3,1153.8,10:18:38,1155.4,1156.6,683,0,0,2015-07-14,COMEX黄金";

	var startIndex = data.indexOf("\"") + 1;
	//window.alert(startIndex);
	var stopIndex = data.lastIndexOf("\"");
	if(startIndex != -1 && stopIndex != -1){
		var validValue = data.substring(startIndex, stopIndex);
		
		//0latestPrice,1varyPercent,2buyPrice,3sellPrice,4maxPrice,5minPrice,6time,7yesterdayClosePrice,8todayOpenPrice,9obtainedAmount,10buyAmount,11sellAmount,12day,13name
		var itemsArray = validValue.split(",");
		//window.alert(itemsArray.length);
		latestPrice = itemsArray[0];
		//window.alert(latestPrice);
		varyPercent = itemsArray[1];
		buyPrice = itemsArray[2];
		sellPrice = itemsArray[3];
		maxPrice = itemsArray[4];
		minPrice = itemsArray[5];
		daytime = itemsArray[12] + " " + itemsArray[6];
		yesterdayClosePrice = itemsArray[7];
		todayOpenPrice = itemsArray[8];
		obtainedAmount = itemsArray[9];
		buyAmount = itemsArray[10];
		sellAmount = itemsArray[11];
		name = itemsArray[13];
		
/*					
		chrome.storage.sync.set({'latestPrice': itemsArray[0]},function(){});
		chrome.storage.sync.set({'varyPercent': itemsArray[1]},function(){});//-0.1225
		chrome.storage.sync.set({'buyPrice': itemsArray[2]},function(){});
		chrome.storage.sync.set({'sellPrice': itemsArray[3]},function(){});
		chrome.storage.sync.set({'maxPrice': itemsArray[4]},function(){});
		chrome.storage.sync.set({'minPrice': itemsArray[5]},function(){});
		chrome.storage.sync.set({'daytime': itemsArray[12] + " " + itemsArray[6]},function(){});
		chrome.storage.sync.set({'yesterdayClosePrice': itemsArray[7]},function(){});
		chrome.storage.sync.set({'todayOpenPrice': itemsArray[8]},function(){});
		chrome.storage.sync.set({'obtainedAmount': itemsArray[9]},function(){});
		chrome.storage.sync.set({'buyAmount': itemsArray[10]},function(){});//normal 0
		chrome.storage.sync.set({'sellAmount': itemsArray[11]},function(){});//normal 0
		chrome.storage.sync.set({'name': itemsArray[13]},function(){});//COMEX黄金
		
		chrome.storage.sync.get('latestPrice',function(items){
			if (!chrome.runtime.error) {
				//window.alert(items.data);
				//window.alert(items['latestPrice']);
			}
		});
*/
	}

}

function initRequestPrice(){
/*	$.get(
			'http://hq.sinajs.cn/?_=1436758119430/&list=hf_GC',//COMEX黄金
			//'http://hq.sinajs.cn/?_=1436758119430/&list=hf_XAU',//伦敦金
			
			function(data){
				//window.alert(data);
				parseResponse(data);
			}
		);
*/
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://hq.sinajs.cn/?_=1436758119430/&list=hf_GC", true);//Asynchronous request
	//xhr.open("GET", "http://hq.sinajs.cn/?_=1436758119430/&list=hf_GC", false);//Synchronous request
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			//window.alert(xhr.responseText);
		    parseResponse(xhr.responseText);
		}
	};
	xhr.send(null);
	
	if(highExpect != null || lowExpect != null){
		updateBadge();
	}
}

window.setInterval(initRequestPrice, intervalTime*1000);//retrieve the latest price with interval of seconds

var intervalTime = 5;
function setIntervalTime(time){
	intervalTime = time;
}


var highExpect;
var lowExpect;
function initStoragedExpect(){
	chrome.storage.sync.get('highExpect',function(items){
		if (!chrome.runtime.error) {
			window.alert(items['highExpect']);
			highExpect = items['highExpect'];
		}
	});

	chrome.storage.sync.get('lowExpect',function(items){
		if (!chrome.runtime.error) {
			//window.alert(items['lowExpect']);
			highExpect = items['lowExpect'];
		}
	});

}

function setPopupSettings(low, high){
	if(!low || !high || low > high)
		return;

	lowExpect = low;
	chrome.storage.sync.set({'lowExpect': lowExpect},null);
	highExpect= high;
	chrome.storage.sync.set({'highExpect': highExpect},null);
	
	updateBadge();
}

function updateBadge(){
	//window.alert(lowExpect);
	//new Notification("Time OK.");
	if(lowExpect != null && latestPrice <= lowExpect){//lower than expectation
		chrome.browserAction.setBadgeBackgroundColor({ color: '#00FF00' });
		chrome.browserAction.setBadgeText({ text: '@' });
		
		//new Notification("Time to buy.");
	}
	else if(highExpect != null && latestPrice >= highExpect){//higher than expectation
		chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
		chrome.browserAction.setBadgeText({ text: '!' });
		
		//new Notification("Time to sell.");
	}
}


function setPopupPage(){
	chrome.browserAction.setPopup({ popup: "../html/popup.html" });
}

chrome.runtime.onInstalled.addListener(function(){
	//setPopup();
	initRequestPrice();
});


/*chrome.runtime.onConnect.addListener(function(){
initStoragedExpect();
});
*/

/*chrome.browserAction.onClicked.addListener(function(){
	var views = chrome.extension.getViews({type: "popup"});
	window.alert(views.length);
	for (var i = 0; i < views.length; i++) {
	    views[i].document.getElementById('status').innerText = latestPrice;
	    
	}
});
*/

//chrome.notifications.onClicked.addListener(openWarningPage);
//chrome.notifications.onButtonClicked.addListener(openWarningPage);

/*
//response message
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
	if (request.latestPrice == "GC")
		sendResponse({
	        price: chrome.storage.sync.get('gc')
	    });
}
);
*/

