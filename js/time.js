/**
 * time.js
 *
 * Computer Science 50
 *
 * Check your watch.
 */
 
 /**
 * Updates time display in real time.
 */
function updateTime(){

    // declare time variables
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    
    // correct formatting for displaying single digit minutes
    if (minutes < 10){
        minutes = "0" + minutes
    }

    // display time
    var t_str = hours + ":" + minutes + " ";
    
        // set AM/PM format away from military time
        if(hours < 12){
            t_str += "AM";
        } 
        else {
            hoursfix = hours - 12;
            t_str = hoursfix + ":" + minutes + " ";
            t_str += "PM";
        }
        
    // retrieve time
    document.getElementById('time_span').innerHTML = t_str;
    }

// update time
setInterval(updateTime, 1000);
