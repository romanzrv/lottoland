# Lottoland

Client for [Lottoland EuroJackpot](https://www.lottoland.com/en/eurojackpot/results-winning-numbers)

## Instructions
Install dependencies
```
npm install
```
Transpile to ES5
```
npm run-script build
```
Open `dist/index.html` in your browser

## Tips
If trying to load the page the data doesn't load and you get the following message in the browsers console:
```
No Access-Control-Allow-Origin header is present on the requested resource
```
You can avoid it adding the following arguments at the browsers launcher (Google Chrome in my case):
```
--disable-web-security --allow-file-access-from-files --user-data-dir
```
Example:
```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --allow-file-access-from-files --user-data-dir
```
By this way you can disable the Chrome security policy and display the page successfully. 
