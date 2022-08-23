function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

window.onload = function(e){ 
    document.getElementById("defaultOpen").click();
 }    

function setDate() {
    var date = new Date();
    var rdate = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    rdate.setDate(rdate.getDate() + 7);
    var rday = rdate.getDate();
    var rmonth = rdate.getMonth() + 1;
    var ryear = rdate.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (minutes < 10) minutes = "0" + minutes;
    if (rmonth < 10) rmonth = "0" + rmonth;
    if (rday < 10) rday = "0" + rday;


    var today = year + "-" + month + "-" + day + "T" + hour + ":" + minutes;     
    var rday = ryear + "-" + rmonth + "-" + rday + "T" + hour + ":" + minutes;   
    $("#todaydate").attr("value", today);
    $("#returndate").attr("value", rday);
}

var formInput = document.getElementById('formInput');
var formInputBook = document.getElementById('formInEdBook');
window.onclick = function(event) {
    if (event.target == formInput || event.target == formInputBook) {
        formInput.style.display = "none";
        formInputBook.style.display = "none";
    }
}

function editNotes() {
    var edit_item_button = document.getElementsByClassName('buttonnoteedit');

    for(var i = 0; i < edit_item_button.length; i++){
        var actualDisplay = getComputedStyle(edit_item_button[i]).display;
        if (actualDisplay == 'none') {
            edit_item_button[i].style.display = 'block';
        } else if (actualDisplay == 'block') {
            edit_item_button[i].style.display = 'none';
        }
    }
}

function addBooks() {
    var add_item_button = document.getElementById('formInputSec');
    if (document.getElementById('formInputSec').style.display == 'none') {
        add_item_button.style.display = 'block';
    } else if (document.getElementById('formInputSec').style.display == 'block') {
        add_item_button.style.display = 'none';
    }
}

function editBooks() {
    var edit_item_button = document.getElementsByClassName('buttonbookedit');

    for(var i = 0; i < edit_item_button.length; i++){
        var actualDisplay = getComputedStyle(edit_item_button[i]).display;
        if (actualDisplay == 'none') {
            edit_item_button[i].style.display = 'block';
        } else if (actualDisplay == 'block') {
            edit_item_button[i].style.display = 'none';
        }
    }
}
function setErr() {
    document.getElementById('itemErr').innerHTML = '<b>Заполните поля</b>';
    setTimeout(function(){
        document.getElementById('itemErr').innerHTML = '';
    }, 1500);
}

function encodeDate(decDate) {
    var dateString = decDate;
    var ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
        m = dateString.match(ISO);
    var year = +m[1],
        month = +m[2],
        dayOfMonth = +m[3],
        hour = +m[4],
        minute = +m[5];
    if (month < 10) month = "0" + month;
    if (dayOfMonth < 10) dayOfMonth = "0" + dayOfMonth;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    regDate = hour+':'+minute+' '+dayOfMonth+'.'+month+'.'+year; 
    return regDate;
} 
