var objects = ['assembly', 'boron', 'card', 'fuse', 'id', 'key', 'lambda', 'lubricant', 'ppes', 'thermocouple'];
var total_boxes = 6;
var location_step = 100;
var empty_img = 'empty.jpg';
var color_marked_obj = '#f5787a';  // light red
var elem = document.documentElement;
var audioGetObject = new Audio('/audio/get_object.wav');
var audioRemoveObject = new Audio('/audio/remove_object.wav');
var username = 'freeman'
var password = 'NuclearPowerU235!'
var pageto = '/html/sites/farewell.html'
var ranking_file = '../ranking.json'

// Object functions

function pickObject(object) {
    if (hasObject(object)) {
        alert('You already have ' + object);
    } else {
        if (getObject(object)) {
            audioGetObject.play();
            alert('You picked up ' + object);
            return true
        }
    }
    return false
}

function getObject(object) {
    var idx;
    idx = getNextEmptyBox();
    if (idx !== null) {
        setCookie(object, 'true');
        setCookie(object + '_gotten', 'true');
        document.getElementById('box' + idx).src = '/img/objects/' + object + '.jpg';
        document.getElementById('link' + idx).href = '/html/objects/' + object + '.html';
        return true
    } else {
        alert('Your pockets are full, please remove some object');
        return false
    }
}

function removeObject(object) {
    var idx, markedObj;
    if (hasObject(object)) {
        markedObj = getCookie('marked_object');
        if (markedObj == object) removeCookie('marked_object');
        removeCookie(object)
        idx = getObjectIdx(object);
        document.getElementById('box' + idx).src = '/img/objects/empty.jpg';
        document.getElementById('link' + idx).href = 'javascript: void(0)';
        document.getElementById('box' + idx).style.boxShadow = '';
        audioRemoveObject.play();
    } else {
        alert('Error 010. You have no ' + object);
    }
}

function useObject(object) {
    var markedObj;
    markedObj = getCookie('marked_object');
    if (markedObj !== null) {
        if (markedObj == object) {
            setCookie(object + '_used', 'true');
            if (markedObj == 'id' || markedObj == 'card') {
                unmarkObject(markedObj);
            } else {
                removeObject(markedObj);
            }
            // alert('You used ' + object);
            return true;
        } else {
            alert('You cannot use ' + markedObj + ' here');
            unmarkObject(markedObj);
        }
    } else {
        alert('You need to use an object here');
    }
    return false;
}

function markObject(object) {
    var idx;
    if (hasObject(object)) {
        idx = getObjectIdx(object);
        document.getElementById('box' + idx).style.boxShadow = '5px 5px 5px 2px ' + color_marked_obj;
    } else {
        alert('Error 020. You have no ' + object);
    }
}

function unmarkObject(object) {
    var idx, markedObj;
    markedObj = getCookie('marked_object');
    if (markedObj !== null) {
        if (markedObj == object) {
            if (hasObject(object)) {
                idx = getObjectIdx(object);
                document.getElementById('box' + idx).style.boxShadow = '';
                removeCookie('marked_object');
            } else {
                alert('Error 030. You have no ' + object);
            }
        } else {
            alert('Error 031. Marked object does not match ' + object);
        }
    } else {
        alert('Error 032. You have no marked object');
    }
}

function loadObjects() {
    var object;
    for (object of objects) {
        if (hasObject(object)) {
            getObject(object);
        }
    }
}

function checkRemoveObject() {
    var object;
    object = getCookie('remove_object');
    if (object !== null) {
        removeObject(object);
        removeCookie('remove_object');
    }
}

function checkMarkedObject() {
    var object;
    object = getCookie('marked_object');
    if (object !== null) {
        markObject(object);
    }
}

function hasObject(object) {
    if (getCookie(object) == 'true') {
        return true
    } else {
        return false
    }
}

function isObjectUsed(object) {
    if (getCookie(object + '_used') == 'true') {
        return true
    } else {
        return false
    }
}

function isObjectGotten(object) {
    if (getCookie(object + '_gotten') == 'true') {
        return true
    } else {
        return false
    }
}

// Box functions

function getObjectIdx(object) {
    var i, idx, source;
    for (idx = 0; idx < total_boxes; idx++) {
        source = document.getElementById('box' + idx).src;
        i = source.indexOf(object + '.jpg');
        if (i > -1) return idx;
    }
    return null;
}

function getNextEmptyBox() {
    var idx;
    for (idx = 0; idx < total_boxes; idx++) {
        if (isBoxEmpty(idx)) return idx
    }
    return null;
}

function isBoxEmpty(idx) {
    var source, i;
    source = document.getElementById('box' + idx).src;
    i = source.indexOf(empty_img);
    if (i == -1) {
        return false
    } else {
        return true
    }
}

function anyEmptyBox() {
    if (getNextEmptyBox() == null) {
        return false
    } else {
        return true
    }
}

// Button functions

function buttonReturn() {
    goBack();
}

function buttonUse(object) {
    setCookie('marked_object', object);
    goBack();
}

function buttonDiscard(object) {
    audioRemoveObject.play();
    if (confirm('Do you really want to discard ' + object + '?')) {
        setCookie('remove_object', object);
        goBack();
    }
}

function buttonPlay() {
    var seconds = new Date().getTime() / 1000;
    setCookie('start_time', seconds);          // time to start playing
    setCookie('mission', 'prelude');           // mission set
    setCookie('id', 'true');                   // you have id object from start of game
    setCookie('alarm', 'false');               // alarm is off by default
}

// Cookie functions

function setCookie(name, value) {
    document.cookie = name + '=' + (value || '') + '; path=/';
}

function getCookie(name) {
    var nameEQ, ca, c, i;
    nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function removeCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function removeAllCookies() {
    var name, ca, i;
    ca = document.cookie.split(';');
    for(i = 0; i < ca.length; i++) {
        name = ca[i].trim().split('=')[0]
        removeCookie(name)
    }
}

// Other functions

// go back in browser
function goBack() {
    javascript: history.go(-1)
}

// load current site
function loadSite(name, xloc, yloc) {
    loadObjects();
    checkRemoveObject();
    checkMarkedObject();
    markPreviousSite();
    showLocation(name);
    setCookie('location', [xloc, yloc])
}

// show location on screen
function showLocation(name) {
    if (name !== undefined) {
        document.getElementById('location').style.display = "block";
        document.getElementById('location').classList.add('animate-disappear')
        printLetterByLetter('location', name, location_step);
    }
}

// print text on screen letter by letter
// https://stackoverflow.com/questions/7264974/show-text-letter-by-letter
function printLetterByLetter(element, text, step){
    var i = 0;
    var interval = setInterval(function(){
        document.getElementById(element).innerHTML += text.charAt(i);
        i++;
        if (i > text.length){
            clearInterval(interval);
        }
    }, step);
}

// draw big red star on map where you are
function drawLocationOnMap() {
    var location;
    location = getCookie('location').split(',');
    if (location !== null) {  
        document.getElementById('big-star').style.left = location[0] + '%';
        document.getElementById('big-star').style.bottom = location[1] + '%';
    }
}

// draw big red X on map for gotten objects
function drawObjectsOnMap() {
    var object;
    for (object of objects) {
        if (object == 'id') continue;
        if (isObjectGotten(object)) {
            document.getElementById(object).classList.remove('hidden')
        }
    }
}

// play audio in loop
function playSoundInLoop(audio, volume) {
    var audioObj = new Audio(audio);
    audioObj.loop = true;
    audioObj.volume = volume
    audioObj.play();
}

function updateSite(nextSite) {
    var currentSite;
    currentSite = getCookie('current_site');
    if (currentSite !== null) {    
        setCookie('previous_site', currentSite);
    }
    setCookie('current_site', nextSite);
}

function markPreviousSite() {
    var previousSite, arrow;
    previousSite = getCookie('previous_site');
    if (previousSite !== null) {
        arrow = document.querySelectorAll("a[href='/html/sites/" + previousSite + ".html']");
        if (arrow.length >= 1) {
            arrow[0].style.color = 'blue';
        }
    }
}

// move image bouncing on screen
function bounceObject(id) {

    var obj, x_pos, y_pos, r_pos, x_step, y_step, r_step, width, frame_id, max, min
    max = 70; min = 30;
    x_pos = Math.random() * (max - min) + min;
    y_pos = Math.random() * (max - min) + min;
    r_pos = 0;
    x_step = +1;
    y_step = +1;
    r_step = +4;
    obj = document.getElementById(id);
    width = 3;
    frame_id = setInterval(frame, 25);

    function frame() {
        x_pos += x_step
        y_pos += y_step
        r_pos += r_step
        if (x_pos >= 100-4*width || x_pos <= +width/2) {
            x_step *= -1
            r_step *= -1
        }
        if (y_pos >= 100-8*width || y_pos <= +width/2) {
            y_step *= -1
            r_step *= -1
        }
        obj.style.left = x_pos + '%'
        obj.style.top = y_pos + '%'
        obj.style.transform = 'rotate(' + r_pos + 'deg)';
    }

}

// login into the server
function login() {
    var data, user, pass
    data = new FormData(document.querySelector('form'));
    user = data.get('user');
    pass = data.get('password');
    if ( user == username && pass == password) {
        alert('You\'re in!');
        window.history.pushState("", "", pageto);
        window.location.reload();
    } else {
        alert('Incorrect user or password, please try again.')
    }
}

// activate the alarm if needed
function activateAlarm() {
    var state;
    state = getCookie('alarm');
    if (state == 'true') {
        document.getElementById('small-container').classList.add('red-bg')
        document.getElementById('site').classList.add('animate-transparent')
        playSoundInLoop('/audio/alarm.wav', 0.3)
    } else {
        document.getElementById('small-container').classList.remove('red-bg')
        document.getElementById('site').classList.remove('animate-transparent')
    }
}

// show message on screen
function showMessage(message) {
    document.getElementById('messages').style.display = "block";
    document.getElementById('messages').innerHTML = message
}

// move to other page
function portalTo(location) {
    updateSite(location);
    window.history.pushState("", "", "/html/sites/" + location + ".html");
    window.location.reload();
}

// fill time in farewell page
function fillTime() {
    var start_time, end_time, total_time;
    end_time = new Date().getTime() / 1000;                 //sec
    start_time = getCookie('start_time');                   //sec
    total_time = Math.round( (end_time - start_time) / 60 ) //minutes
    setCookie('total_time', total_time)  // bug is time is 0
    alert('Congratulations, you finished the game in ' + total_time.toString() + ' minutes.')
}

// load table in ranking page
function loadRanking() {
    // new server request
    const xmlhttp = new XMLHttpRequest();
    // define function when data is loaded
    xmlhttp.onload = function() {
        // parse json file
        const list = JSON.parse(this.responseText);
        var table = document.getElementById("table");
        // fill table with ros and cells
        for (var r = 0; r < list.length; r++) {
            var tr = table.insertRow(-1);
            tr.insertCell(-1).innerHTML = list[r]['name'];
            tr.insertCell(-1).innerHTML = list[r]['time'];
        }
    }
    // open file
    xmlhttp.open("GET", ranking_file, true);
    // send data to user browser
    xmlhttp.send();
}

// prompt user name for ranking and keep it in cookie
function askUserName() {
    var player = prompt("Enter your name if you wish to be on plant records:", "Player");
    setCookie('user_name', player)
}