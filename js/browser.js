
// true in case the browser is Internet Explorer
function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie; 

}

function checkBrowser() {
    if (isIE()) {
        alert('This game is not supported for IE, please change your browser')
    }
}