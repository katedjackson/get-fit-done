#Get [F]it Done.

MVP

Goals:
  - Blocking pages the user adds to the blacklist
  - Fitbit oauth2
  - Grabbing data from fitbit

Parts working:
  - Blocking pages the user adds to blacklist
  - Fitbit oauth2 (we think)

Parts not working:
  - Not grabbing data from fitbit yet

Open questions:
  - How to test our oauth without publishing
  - Does blocked page html (background/index.html) even belong in background

Code to look at:
  - General file structure? Ours has a lot of layers possibly suggest a better way to modularize
  - Gulp to handle all the package.jsons/webpacks at once?

Instructions for building project:




  - git clone https://github.com/katedjackson/get-fit-done.git
  - cd get-fit-done
  - npm install
  - cd popup
  - npm install
  - npm start
  - cd ../options
  - npm install
  - npm start

  - go to chrome://extensions/ in Chrome browser
  - check off developer mode
  - click load unpacked extension
  - select get-fit-done directory
