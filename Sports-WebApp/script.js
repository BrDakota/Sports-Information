/*
  This project is being completed using TheRundown API. This API can be used for free and can be found at https://apilayer.com/marketplace/therundown-api
  If you would like to play with this project or use it in any way you can get a free API key on the website.
  The API provides a decent amount of fun data to play with including money lines which are not being used in this project.
*/
const result_text = document.getElementById("results_text");
const button_submit = document.getElementById("button_submit");
const entry_dropdown = document.getElementById("functions");
const function_explanation = document.getElementById("function_explanation")

const sport_id_input = document.getElementById("sport_id_input");
const event_id_input = document.getElementById("event_id_input");
const date_input = document.getElementById("date_input");

const myHeaders = new Headers();
myHeaders.append("apikey", 'YOUR API KEY');
const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders
}

function input_change(){
  if(entry_dropdown.value === "sport_available"){
    function_explanation.textContent = "This function does not require any input. It will return the sports available through the API and the sport Id used for other options.";
  }
  else if(entry_dropdown.value === "event_sport_date"){
    function_explanation.textContent = "This functions needs a date input and a Sport Id. It will return events for the sport and date entered with the event Id. Date format should be yyyy-mm-dd";
  }
}

function get_data(){
  result_text.innerHTML = "";
  if(entry_dropdown.value === "sport_availvable"){
    available_sports();
  }
  else if(entry_dropdown.value === "event_sport_date"){
    sport_events(sport_id_input.value, date_input.value);
  }
}

async function available_sports(){
    const response = await fetch("https://api.apilayer.com/therundown/sports", requestOptions);
    const data = await response.json();
    console.log(data);

    for(let i = 0; i < data.sports.length; i++){
        result_text.innerHTML += `Sport Name: ${data.sports[i].sport_name}<br>Sport Id: ${data.sports[i].sport_id}<br><br>`;
    }
}

async function sport_events(sport_id, date){
  const response = await fetch(`https://api.apilayer.com/therundown/sports/${sport_id}/events/${date}?offset=0&include=all_periods`, requestOptions)
  const data = await response.json();
  console.log(data);

  if(sport_id !== "" && date !== ""){
    for (let i = 0; i < data.events.length; i++){
      result_text.innerHTML += `Event: ${i + 1}<br>\tTeam 1: ${data.events[i].teams[0].name}<br>\tTeam 2: ${data.events[i].teams[1].name}<br>\tEvent Id: ${data.events[i].event_id}<br><br>`;
    }
  }else {
    // Add pop up here eventually
  }
}

button_submit.addEventListener("click", get_data);