# EoL
### The successor to this project can be found here: [Discord-PWA](https://github.com/NeverDecaf/discord-PWA)
As of June 2022, [Chromium no longer supports Chrome Apps](https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html). You can still use this app if you are using an older browser (or fork that still supports apps), but it will no longer be maintained. See [Discord-PWA](https://github.com/NeverDecaf/discord-PWA) for a replacement.

# discord-chrome-app
A chrome packaged app that mimics the desktop client while maintaining the privacy and security of the chrome browser sandbox.

# Notice
Chrome Apps have been deprecated for a while now and Google plans to [finally end support for them in 2021](https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html). This will inevitably make this app unusable (unless you are willing to keep an old version of Chromium installed, which is a security risk). I am working on [an alternative](https://github.com/NeverDecaf/discord-PWA) in the form of a PWA. Currently it doesn't look as nice, but makes up for it with improved functionality.

# Installation
1. Download [discord-chrome-app.crx](https://github.com/NeverDecaf/discord-chrome-app/releases/latest/download/discord-chrome-app.crx) from [releases](https://github.com/NeverDecaf/discord-chrome-app/releases)
2. Navigate to `chrome://extensions/` in your chromium based browser
3. Enable `Developer mode` (toggle/checkbox in top right corner, may vary depending on version)
4. Drag and drop the .crx file onto the `chrome://extensions/` page to install
5. To launch the app visit `chrome://apps/`
6. After lauching you can pin the app to your taskbar (on windows) and it will essentially function as a stand-alone program
### If drag-and-drop install fails, try this workaround:
1. Download the .crx from releases and extract the contents to a folder
2. Visit chrome://extensions/ and turn on developer mode (toggle in top right)
3. Click `Load unpacked` and select the directory you extracted the crx to.

