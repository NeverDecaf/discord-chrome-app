/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function () {
    runApp();
});

/**
 * Listens for the app restarting then re-creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 */
chrome.app.runtime.onRestarted.addListener(function () {
    runApp();
});

/**
 * Creates the window for the application.
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
function runApp() {
	chromeAppWindow = {"id":"embed","frame":{"type":"none"},"innerBounds":{"width":1180,"height":900}}
    chrome.app.window.create('html/embed.html', chromeAppWindow, onWindowLoaded);
}

/**
 * Called before the contentWindow's onload event
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
onWindowLoaded = function (win) {
	
	function newWindow_openInTabAndInterceptRedirect(newWindow) {
  // Create an invisible proxy webview to listen to redirect
  // requests from |newWindow| (the window that the guest is
  // trying to open). NOTE: The proxy webview currently has to
  // live somewhere in the DOM, so we append it to the body.
  // This requirement is in the process of being eliminated.
  var proxyWebview = document.createElement('webview');
  document.body.appendChild(proxyWebview);

  // Listen to onBeforeRequest event (chrome.webRequest API)
  // on proxyWebview in order to intercept newWindow's redirects.
  var onBeforeRequestListener = function(e) {
    // Only consider top-level non-blank redirects.
    if (e.type === "main_frame" && e.url.split('#')[0] !== 'about:blank') {
	  win.contentWindow.open(e.url);
      // Don't need proxyWebview anymore.
      document.body.removeChild(proxyWebview);
      // Handled this redirect: cancel further processing.
      return { cancel: true };
    } else {
      // Ignored this redirect: proceed with default processing.
      return { cancel: false };
    }
  };
  proxyWebview.request.onBeforeRequest.addListener(
    onBeforeRequestListener,
    { urls: [ "*://*/*" ] },
    [ 'blocking' ]
  );

  // Attach |newWindow| to proxyWebview. From the original
  // webview guest's point of view, the window is now opened
  // and ready to be redirected: when it does so, the redirect
  // will be intercepted by |onBeforeRequestListener|.
  newWindow.attach(proxyWebview);
}



	win.contentWindow.onload = function () {
		var webview = win.contentWindow.document.getElementById('webview');
		webview.addEventListener('permissionrequest', function (e) {
			e.request.allow();
		});
		webview.addEventListener('newwindow', function (e) {
			e.preventDefault();
			if (e.targetUrl.split('#')[0] !== 'about:blank') 
			{
				win.contentWindow.open(e.targetUrl);
			} 
			else 
			{
				newWindow_openInTabAndInterceptRedirect(e.window);
			}
		});
	};
}
