document.addEventListener("DOMContentLoaded", function(event) { 
    event.preventDefault();
    


    const leapYearBlock = document.querySelector('#ifLeapYear'); // Leap Year
    const secondsBlock = document.querySelector('#seconds'); // Seconds
    const minutesBlock = document.querySelector('#minutes'); // Minutes
    const hoursBlock = document.querySelector('#hours');    // Hours
    const daysBlock = document.querySelector('#days');      // Days
    const nextLeapYearBlock = document.querySelector('#nextLeapYear');      // Leap Year
   
    let leapYear = false;
    let currentSecondsLeft = 0; // 0-60
    let currentMinutesLeft = 0; // 0-60
    let currentHoursLeft = 0;  // 0-24
    let daysLeft = 0;         // Days left to New Year
    let currentYearDaysCount = 0; // Days in the year for ex. 365 or 366 depending on LEAP OR NOT 
    let currentYearDaysPast = 0; // 340/365 (how many days past from beggining of the year)

    let currentDate = new Date();   // Current Date
    let currentMonth = currentDate.getMonth();    // Current month number
    let currentYearCheck = currentDate.getFullYear();

    let monthDays = []; // 28,30,31 - month dependency

    const checkIsLeapYear = function(){  // Checking if current year IS LEAP YEAR                
        currentYearCheck%4==0?monthDays = [31,29,31,30,31,30,31,31,30,31,30,31] : monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
        monthDays[1]==29?leapYear=true:leapYear=false;
        leapYearBlock.textContent = leapYear ? `${currentYearCheck} - Leap year`:`${currentYearCheck} - not Leap year`;
        switch(leapYear){
            case true : nextLeapYearBlock.textContent = `${currentYearCheck+4} - Next Leap`;
                break;
            case false : 
                if((currentYearCheck-1)%4==0){
                    nextLeapYearBlock.textContent = `${currentYearCheck+3} - Next Leap`;
                }
                else if((currentYearCheck-2)%4==0){
                    nextLeapYearBlock.textContent = `${currentYearCheck+2} - Next Leap`;
                }
                else{
                    nextLeapYearBlock.textContent = `${currentYearCheck+1} - Next Leap`;
                }
                break;
        }
        return monthDays;
    };
                
    const calculatingDaysLeft = function(){ // Calculating DAYS LEFT TO NEW YEAR
        checkIsLeapYear();
        monthDays.forEach(function(month, i ){
            currentYearDaysCount+=month;
            i<currentMonth?(currentYearDaysPast+=month):false;
            i==currentMonth?currentYearDaysPast+=currentDate.getDate():false;
        });
        daysLeft = currentYearDaysCount - currentYearDaysPast; // Calculating Days left to New Year
        currentYearDaysCount--;
        return daysLeft;                                        
    };
    calculatingDaysLeft();
    
    const changeDays = function(){
        daysLeft = (daysLeft+'d').padStart(3,0);
        daysBlock.textContent = daysLeft;                             // Days 
    }

    const changeHours = function(){
        currentHoursLeft = (currentDate.getHours());
        currentHoursLeft = (23 - currentHoursLeft + 'h').padStart(3,0);      // Hours
        hoursBlock.textContent = currentHoursLeft; 
        currentHoursLeft =='23h'?changeDays():false;
    }

    const changeMinutes = function(){
        currentMinutesLeft = currentDate.getMinutes();
        currentMinutesLeft = (59 - currentMinutesLeft +'m').padStart(3,0);    // Minutes
        minutesBlock.textContent = currentMinutesLeft;
        currentMinutesLeft=='59m'?changeHours():false;
    }
    const changeSeconds = function(){
        currentSecondsLeft = currentDate.getSeconds();
        currentSecondsLeft = (59 - currentSecondsLeft +'s').padStart(3,0);     // Seconds
        secondsBlock.textContent = currentSecondsLeft;   
        currentSecondsLeft=='59s'?changeMinutes():false;                     
    }


    const getCountdown = function(){            // Main Function - DOM
        currentDate = new Date();
        changeSeconds();                        // Calling changeSeconds which checks and calling other fuctions
    };

    changeMinutes(); // Caling once to initialze time
    changeHours();   // Caling once to initialze time
    //changeDays();    // Caling once to initialze time
    getCountdown();  // Caling once to initialze time
    setInterval(getCountdown,1000); // Caling once per 1000 ms in order to change time
  });

function playAudio(){
    var clockAudio = new Audio;
    clockAudio.src = "https://nemesisbest.github.io/newYearCountdown/clock.mp3";
    clockAudio.play();
  }
