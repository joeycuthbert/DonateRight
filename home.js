navBarData = {
    home : {
        href: "home.html",
        name: "Home"
    },
    directory : {
        href: "directory.html",
        name: "Directory"
    },
    about : {
        href: "#about",
        name: "About"
    },
    signUp : {
        href : "sign-up.html",
        name: "Sign Up"
    },
    signIn : {
        href : "sign-in.html",
        name: "Sign In"
    }
};

function renderNavBar(){
    let bar = document.querySelector("#navBar");

    for (widget in navBarData){
        let link = document.createElement("a");

        link.classList.add("navButton");
        link.href = navBarData[widget].href;

        link.innerHTML = navBarData[widget].name;

        bar.appendChild(link); 
    } 
}

renderNavBar()

function updateTimer() {
    future  = Date.parse("Nov 5, 2024 23:59:59");
    now     = new Date();
    diff    = future - now;
  
    days  = Math.floor( diff / (1000*60*60*24) );
    hours = Math.floor( diff / (1000*60*60) );
    mins  = Math.floor( diff / (1000*60) );
    secs  = Math.floor( diff / 1000 );
  
    d = days;
    h = hours - days  * 24;
    m = mins  - hours * 60;
    s = secs  - mins  * 60;


  
    document.getElementById("countdown").innerHTML =
        '<div class = "label">' + d + '<span> days</span></div>' +
        '<div class = "label">' + h + '<span> hours</span></div>' +
        '<div class = "label">' + m + '<span> minutes</span></div>' +
        '<div class = "label">' + s + '<span> seconds</span></div>' ;
  } 
  
timerId = setInterval('updateTimer()', 1000 );