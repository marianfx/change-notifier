import $ from 'jquery';
import jQuery from 'jquery';
import notifier from 'node-notifier'
import path from 'path'
import request from 'request'

class App {
    constructor() {
        this.timer = null;
        this.interval = 0;
        this.site = "";
    }

    doNotify(title, message) {
        notifier.notify({
            title: title,//'Hei, looks like we have a change!',
            message: message,//'The site you set me to look after has changed. Click for details',
            icon: path.join(__dirname, '../img/bell-128.png'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // Wait with callback, until user action is taken against notification
        }, function (err, response) {
            // Response is response from notification
        });

        notifier.on('click', function (notifierObject, options) {
            // Triggers if `wait: true` and user clicks notification
        });
    }

    displayMessage(message, msgType = "warning"){
        swal({
            title: "Damn, esé",
            text: message,
            type: msgType,
            showCancelButton: false,
            confirmButtonText: "Oooook.."
        });
    }

    enableTimer(){
        // do some checks
        var siteValue = $('#thesite').val();
        var siteString = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)";
        var regex = new RegExp(siteString);
        var result = regex.exec(siteValue);

        if (!result){
            $('#theindicator').prop('checked', false);
            this.displayMessage("You need to insert a valid link for a web-page, so I can know what to stalk.");
        }
        
        var timeValue = $('#theinterval').val();
        var timeString = "\\d{2}";
        regex = new RegExp(timeString);
        result = regex.exec(timeValue);

        if(!result){
            $('#theindicator').prop('checked', false);
            this.displayMessage("You need to insert a valid number of seconds, minumum 10 (so I do not overheat your computer).");
        }

        // all ok, start timer
        this.interval = timeValue * 1000;
        this.site = siteValue;
        this.displayMessage("Your timer has been ENABLED.", "success");
        if(this.timer != null){
            clearTimeout(this.timer)
            this.timer = null;
        }
        this.startTimer(this);
    }

    startTimer(me, millis){
        console.log("Checking site." + this.site);
        me.checkSite();

        me.timer = setTimeout(function(){
            me.startTimer(me);
        }, me.interval);
    }

    checkSite(){
        // shoud do with casper js or Browserjet 
        var me = this;

        request({
            method: 'GET',
            uri: me.site,
            followAllRedirects: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //all OK
                console.log(body);
            }
            else{
               me.doNotify("Damn, buddy", "Looks like this time I could not access the page. I'll try next time."); 
            }
        });
    }

    disableTimer(){
        this.displayMessage("Your timer has been DISABLED.", "success");
        clearTimeout(this.timer);
        this.timer = null;
    }

    bootstrap() {
        
        var me = this;
        $('#theindicator').click(function () {

            var isit = $('#theindicator').is(":checked");

            if(!isit){
                // i am disabling it, so do the disabling technique
                me.disableTimer();
            }
            else{
                // i am enabling it
                me.enableTimer();
            }
        });
    }
}

export {App}