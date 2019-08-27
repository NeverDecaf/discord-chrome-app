var webview = document.getElementById('webview');
document.getElementById("buttonClose").addEventListener("click", function() {
	chrome.app.window.current().close();
});
document.getElementById("buttonMax").addEventListener("click", function() {
	var win = chrome.app.window.current();
	if (win.isMaximized())
		win.restore();
	else
		win.maximize();
});
document.getElementById("buttonMin").addEventListener("click", function() {
	chrome.app.window.current().minimize();
});
/* hide "Download Apps" item */
csstoinject=`
div[class|=scroller] > div[class|=listItem]:nth-last-child(2),
div[class|=scroller] > div[class|=listItem]:last-child {
	display:none
}
`;
chrome.runtime.getPlatformInfo(function (info) {
	var decos = document.getElementsByClassName("os-decoration"); for (var i=0; i<decos.length; i++) { decos[i].classList.add(info.os); }
	/* "mac", "win", "android", "cros", "linux", or "openbsd" */
	switch (info.os) {
		case 'mac':
			csstoinject+=`
			div[class*= directionColumn][class*= base] {
				border-radius: 8px 0 0 8px
			}
			div[class^=wrapper] div[class*= scroller][class*= systemPad] {
				padding-top: 4px
			}
			`;
		break;
		case 'win':
			csstoinject+=`
			div[class*= directionColumn][class*= base] {
				border-radius: 8px 0 0 8px
			}
			div[class^=wrapper] div[class*= scroller][class*= systemPad] {
				padding-top: 4px
			}
			`;
		break;
		case 'linux':
			csstoinject+=`
			div[class*= directionColumn][class*= base] {
				border-radius: 8px 0 0 8px
			}
			div[class^=wrapper] div[class*= scroller][class*= systemPad] {
				padding-top: 4px
			}
			`;
		break;
		case 'openbsd':
			csstoinject+=`
			div[class*= directionColumn][class*= base] {
				border-radius: 8px 0 0 8px
			}
			div[class^=wrapper] div[class*= scroller][class*= systemPad] {
				padding-top: 4px
			}
			`;
		break;
	}
});

webview.addEventListener('contentload', function () {
	webview.executeScript({
		code: `
    var node = document.createElement('style');
    node.innerHTML = \``+csstoinject+`\`;
    document.body.appendChild(node);
	`
		});
});
