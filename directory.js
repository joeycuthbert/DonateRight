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

window.onload = sendXML;

function sendXML(){
  let xhr = new XMLHttpRequest();
  xhr.responseType = "json"
  xhr.addEventListener("load", handleCandidatesResponse); 
  xhr.open("GET", "http://10.16.14.104/~joey/data-service/data-service.php");
  xhr.send(); 
}

function handleCandidatesResponse(){
  if (this.status == 200){
      let data = this.response; /* JSON data */
      
      let dir = document.querySelector("#directory");
      
      for (candidate of data){
        let candidateDiv = document.createElement("div");
        candidateDiv.classList.add("candidate");
    
        let candidateImgDiv = document.createElement("div");
        candidateImgDiv.classList.add("candidate-img");
    
        let candidateImg = document.createElement("img");
        candidateImg.src = candidate.img; 
        candidateImgDiv.appendChild(candidateImg);
    
        let candidateInfoDiv = document.createElement("div");
        candidateInfoDiv.classList.add("candidate-info");
    
        let candidateNameDiv = document.createElement("div");
        candidateNameDiv.classList.add("candidate-name");
        candidateNameDiv.innerHTML = candidate.name;
    
        let candidatePositionDiv = document.createElement("div");
        candidatePositionDiv.classList.add("candidate-position");
        candidatePositionDiv.innerHTML = candidate.position; 
    
        let candidateDonateDiv = document.createElement("div");
        candidateDonateDiv.classList.add("candidate-donate");
    
        let candidateDonateButton = document.createElement("input");
        candidateDonateButton.type = "button";
        candidateDonateButton.value = "Donate";
    
        let candidateDonateLink = document.createElement("a"); 
        candidateDonateLink.href = candidate.url;
    
        candidateDonateLink.appendChild(candidateDonateButton); 
        candidateDonateDiv.appendChild(candidateDonateLink);
    
        candidateInfoDiv.appendChild(candidateNameDiv);
        candidateInfoDiv.appendChild(candidatePositionDiv);
        candidateInfoDiv.appendChild(candidateDonateDiv);
    
        candidateDiv.appendChild(candidateImgDiv);
        candidateDiv.appendChild(candidateInfoDiv);
    
        dir.appendChild(candidateDiv);    
      
      }

      console.log(data);
  } else {
      console.log("Something went wrong! :-("); 
  }

}

/*

function filterXML(){
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json"
    xhr.addEventListener("click", handleFilter);
    let filter = document.getElementById('filter').value;

    xhr.open("GET", "http://http://10.16.14.104/~joey/data-service/json-api.php?office="+filter);
    xhr.send();
}

*/
// Function to handle dropdown change
function dropdownChangeHandler() {
    // Get the selected value from the dropdown
    let selectedOffice = document.getElementById("filter").value;

    // Call filterXML() with the selected value to filter the JSON content
    filterXML(selectedOffice);
}

// Add event listener to the dropdown to trigger the function on change
document.getElementById("filter").addEventListener("change", dropdownChangeHandler);

// Modified filterXML function to accept a parameter for filtering
function filterXML(selectedOffice) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", handleFilter); // Change event to "load"
    // Modify the URL with the selectedOffice value as needed
    xhr.open("GET", "http://10.16.14.104/~joey/data-service/json-api.php?office=" + selectedOffice);
    xhr.send();
}

function handleFilter(){ 
    if (this.status == 200){
        let data = this.response; /* JSON data */
        if(data.length === 0){
            sendXML(); 
        }
        else{
            let dir = document.querySelector("#directory");
            dir.innerHTML = "";
            
            for (candidate of data){
            let candidateDiv = document.createElement("div");
            candidateDiv.classList.add("candidate");
        
            let candidateImgDiv = document.createElement("div");
            candidateImgDiv.classList.add("candidate-img");
        
            let candidateImg = document.createElement("img");
            candidateImg.src = candidate.img; 
            candidateImgDiv.appendChild(candidateImg);
        
            let candidateInfoDiv = document.createElement("div");
            candidateInfoDiv.classList.add("candidate-info");
        
            let candidateNameDiv = document.createElement("div");
            candidateNameDiv.classList.add("candidate-name");
            candidateNameDiv.innerHTML = candidate.name;
        
            let candidatePositionDiv = document.createElement("div");
            candidatePositionDiv.classList.add("candidate-position");
            candidatePositionDiv.innerHTML = candidate.position; 
        
            let candidateDonateDiv = document.createElement("div");
            candidateDonateDiv.classList.add("candidate-donate");
        
            let candidateDonateButton = document.createElement("input");
            candidateDonateButton.type = "button";
            candidateDonateButton.value = "Donate";
        
            let candidateDonateLink = document.createElement("a"); 
            candidateDonateLink.href = candidate.url; 
        
            candidateDonateLink.appendChild(candidateDonateButton); 
            candidateDonateDiv.appendChild(candidateDonateLink);
        
            candidateInfoDiv.appendChild(candidateNameDiv);
            candidateInfoDiv.appendChild(candidatePositionDiv);
            candidateInfoDiv.appendChild(candidateDonateDiv);
        
            candidateDiv.appendChild(candidateImgDiv);
            candidateDiv.appendChild(candidateInfoDiv);
        
            dir.appendChild(candidateDiv);    
            
            }
    
            console.log(data);
        }
    } else {
        console.log("Something went wrong! :-("); 
    }
}