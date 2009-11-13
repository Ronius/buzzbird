/*
Copyright (c) 2009 Mike Desjardins

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function toggleFollow(myUsername,myPassword,hisUserId) {
	var check = document.getElementById('check-' + myUsername);
	if (check.checked) {
		follow(myUsername,myPassword,hisUserId);
	} else {
		unfollow(myUsername,myPassword,hisUserId);
	}
}

function unfollow(myUsername,myPassword,hisUserId) {
	jsdump(myUsername + ' is unfollowing ' + hisUserId);
	var throb = document.getElementById('throb-' + myUsername);
	throb.style.display='inline';
	var check = document.getElementById('check-' + myUsername);
	check.style.display='none';
	
	//url = 'http://twitter.com/friendships/destroy/' + hisUserId + '.json';
	url = 'http://' + myUsername + ':' + myPassword + '@twitter.com/friendships/destroy/' + hisUserId + '.json';
	jsdump('hitting ' + url);
	new Ajax.Request(url,
		{
			method:'post',
			httpUserName: myUsername,
			httpPassword: myPassword,
		    onSuccess: function(transport) { friendshipCallback(transport,myUsername); },
		    onFailure: function() { 
				var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
				                        .getService(Components.interfaces.nsIPromptService);
				prompts.alert(window, "Sorry.", "There was an error processing your unfollow request.");
				var check = document.getElementById('check-' + myUsername);
				check.checked=true;
				check.style.display='inline';
				document.getElementById('throb-' + myUsername).style.display='none';
			}
		});	
}

function follow(myUsername,myPassword,hisUserId) {
	jsdump(myUsername + ' is following ' + hisUserId);
	var throb = document.getElementById('throb-' + myUsername);
	throb.style.display='inline';
	var check = document.getElementById('check-' + myUsername);
	check.style.display='none';
	
	url = 'http://' + myUsername + ':' + myPassword + '@twitter.com/friendships/create/' + hisUserId + '.json';
	jsdump('hitting ' + url);
	new Ajax.Request(url,
		{
			method:'post',
			httpUserName: myUsername,
			httpPassword: myPassword,
		    onSuccess: function(transport) { friendshipCallback(transport,myUsername); },
		    onFailure: function() { 
				var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
				                        .getService(Components.interfaces.nsIPromptService);
				prompts.alert(window, "Sorry.", "There was an error processing your follow request.");
				check.checked=false;
				check.style.display='inline';
				document.getElementById('throb-' + myUsername).style.display='none';
			}
		});	
}

function friendshipCallback(transport,myUsername) {
	var throb = document.getElementById('throb-' + myUsername);
	throb.style.display='none';
	var check = document.getElementById('check-' + myUsername);
	check.style.display='inline';
}