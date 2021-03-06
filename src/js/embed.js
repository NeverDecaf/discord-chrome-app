var webview = document.getElementById('webview');
var curwindow = chrome.app.window.current();
document.getElementById("buttonClose").addEventListener("click", function() {
	curwindow.close();
});
document.getElementById("buttonMax").addEventListener("click", function() {
	if (curwindow.isMaximized())
		curwindow.restore();
	else
		curwindow.maximize();
});
document.getElementById("buttonMin").addEventListener("click", function() {
	curwindow.minimize();
});
/* hide "Download Apps" item */
csstoinject=`
div[class|=scroller][dir="ltr"] > div[class|=listItem]:nth-last-of-type(2),
div[class|=scroller][dir="ltr"] > div[class|=listItem]:nth-last-of-type(3) {
	display:none
}
`;
chrome.runtime.getPlatformInfo(function (info) {
	var os = undefined;
	if (info != undefined) {
	var decos = document.getElementsByClassName("os-decoration"); for (var i=0; i<decos.length; i++) { decos[i].classList.add(info.os); }
	os = info.os;
	}
	/* "mac", "win", "android", "cros", "linux", or "openbsd" */
	switch (os) {
		case 'android':
		break;
		case 'cros':
		break;
		default:
			csstoinject+=`
			div[class*= baseLayer] > div[class|=container] > nav[class*= guilds] + div[class*= base] {
				border-radius: 8px 0 0 8px
			}
			nav[class^=wrapper] div[class*= scroller]:not([class*= scrollerWrap]) {
				padding-top: 4px
			}
			`;
		break;
	}
});

webview.addEventListener('contentload', function () {

	webview.contentWindow.postMessage('init', 'https://discord.com/*');
	window.addEventListener('message', function(e) {
	if (e.data == 'drawAttention') 
	{
		curwindow.drawAttention();
	}
	else if (e.data == 'clearAttention') 
	{
		// clearAttention seems broken. it doesn't actually clear anything and after calling it drawAttention no longer does anything.
		// curwindow.clearAttention();
	}
	else
	{
		document.getElementById('backdrop').style.opacity = e.data;
	}
	});
	webview.executeScript({
		code: `
var hasNewMessages = 0;
var node = document.createElement('style');
node.innerHTML = \`` + csstoinject + `\`;
    document.body.appendChild(node);	
	
var messageSource, messageOrigin;
addEventListener('message', function hello(e) {
    if (!messageSource) {
        if (e.data == "init") {
			removeEventListener('message',hello,false);
            const messageSource = e.source;
            const messageOrigin = e.origin;
			
focuslost = function(e) {
	if (hasNewMessages && messageSource)
		messageSource.postMessage('drawAttention', messageOrigin);
}
window.onblur = focuslost;
window.onfocusout = focuslost;
	var observer = new MutationObserver(function(mutations) {	
	    mutations.forEach(function(mutation) {
		if ( mutation.target.href != 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADxElEQVRYR+1XS0wTaxT+ZoaWabVUQN6Uh4XY+ojv5C50YUJu7uIaY4wujGI06EqjIo2Jj5WPGAsYjRu8JsbHSu8z92rie2GMMVEjC2kJVKBY5FlTCp0+mBnzj3bo0NIO2qsuPJu285//nO//zjnfP6XwyTbdEJkyt/MIROwDkBN9nuZPLyicc5dZTt7cTPEkNhVNcLDReRSieDzNCROHo6hjTQ2WE0oAdscwgNyvAgAYabJZ504FIH6l5FKaJptVYn+yBHbHDwDTMlCcl4kVC42YY9DAMxhEq3MUOpZBppaW6AyGBYQjAtYsz0ZxHouedxxevPahbyg0bVVVlcCgz8CGmgIU5GrRPxyWEpYXsVLyROYfn0CXhwObSaMkn0WnO4C/HwzAH5iIc1cFYOuvxVhcbZA2M4zcLqp6NRIRoNHQeOUcxfX/+mYOwGjIwJHdVaBnljcukSACJy92wudXspCSgV9W56Hmp/TIwr2nw7jzhMjMpKUEcHiXGTlGjSq6Uzl5fRGc+s2lHgDp+vrtlXFxQ2EBbweCKC1g5QmIOo0FeAx6Qygr0iEjQb80X+lSTEVSBtasyMH6tfkKAFyQR/PVbrwfjSA7S4P62gp5Gobeh3H+eg+4EA9TIYs9W8rBTGmefx4N4vELrxwzKQDS/UstWQoAre1+XPvXIz/btq4ES+Z/nJCHz0Zw+/GQvLZ/W4XEUqxNnYakAAj9pAyxRk7ZeLkLvCBKp2vYUYm8bK3k0uEeR8uNXum7XsfgcJ1Z0oJYI6JEyhC1pACO76lOKDY9fRzaXGNYYJ6N8mKdIoHjzRjI+jJrFgpyleCJIynhsQsd6gDYGyzyLUX0meN46WQzMdIPWg0t9wKJY2t0qgNg21GpOAWhj5ywvEiHeSZ9UnFyv+Pg6g2gslSPihiWBkZCsF9WWQLDrAyQRjSb9DJiomgv23z46/4ASgtZ5OdooWcZ0DSFcY6H1xdGb38QRMBWLTIqRpEAInJM7gpVPUCciAJbzbOxcqFROgkpwaU/eqULJplVlelRt9GEQJBHt4fD89c+OFxjmHrVplTCmdT7c3x/APguGSDdpVSXzynu5J5+AMbpYsYx0GB3XBGB2i/LqdjtF2lhAyXQfwJQXiyJXssPnXYZJ5jw7wBq0gWCAtYKtOCjBPouAOmPyLQ6EF042NhuoUShMB0geIbuOFs/32M701YtUPQDQDSlBJCOxIliHGhuL6F54RaAJWQ9rgf+r8Sxcfee78jShCZuUsDP3wQAAbO75bnGMDqrpclm3Ul+fwCF65kwy+AsFwAAAABJRU5ErkJggg==' )
		{
			messageSource.postMessage('drawAttention', messageOrigin);
			hasNewMessages = 1;
		}
		else
		{
			messageSource.postMessage('clearAttention', messageOrigin);
			hasNewMessages = 0;
		}
    });
	});
	observer.observe(document.querySelector("link[rel|='icon']"), {
    childList: false,
    subtree: false,
    attributes: true,
    characterData: false,
  });
	var modal_observer = new MutationObserver(function(mutations) {	
	    mutations.forEach(function(mutation) {
			mutation.target.classList.forEach(function (cv, ci, lo) {
				if (cv.startsWith('backdrop'))
					messageSource.postMessage(mutation.target.style.opacity, messageOrigin);
			});
    });
	});
	modal_observer.observe(document.querySelector("div[data-no-focus-lock]"), {
    childList: false,
    subtree: true,
    attributes: true,
    characterData: false,
  });
        }
    }
});`});
});
  