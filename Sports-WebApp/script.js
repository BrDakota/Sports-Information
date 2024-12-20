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
myHeaders.append("apikey", "KGYMcGFgLWSqNtaKefqesNTwNRj6lSf6");
const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders
}

function get_data(){
  result_text.innerHTML = "";
  if(entry_dropdown.value === "sport_availvable"){
    available_sports();
  }
  else if(entry_dropdown.value === "event_sport_date"){
    sport_events(sport_id_input.value, date_input.value);
  }
  else if (entry_dropdown.value === "event_details"){
    event_details(event_id_input.value);
  }
  else if(entry_dropdown.value === "sport_schedule"){
    sport_schedule(sport_id_input.value);
  }
  else if(entry_dropdown.value === "sport_teams"){
    get_teams(sport_id_input.value);
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

  for (let i = 0; i < data.events.length; i++){
    result_text.innerHTML += `Event: ${i + 1}<br>Team 1: ${data.events[i].teams[0].name}<br>Team 2: ${data.events[i].teams[1].name}<br>Event Id: ${data.events[i].event_id}<br><br>`;
  }
}

async function event_details(event_id){
  const response = await fetch(`https://api.apilayer.com/therundown/events/${event_id}?include=all_periods`, requestOptions);
  const data = await response.json();
  console.log(data);

  let home = "";
  let away = "";
  let winner = "Not determined yet. Stay tuned!";
  
  if(data.teams[0].is_away){
    home = data.teams[0].name;
    away = data.teams[1].name;
  }else{
    home = data.teams[1].name;
    away = data.teams[0].name;
  }
  if(data.score.winner_away === 1){
    winner = away;
  }else if(data.score.winner_home === 1){
    winner = home;
  }

  result_text.innerHTML = `Event Name: <br>${data.schedule.event_name}<br><br>Score: <br>${home}: ${data.score.score_home}<br>${away}: ${data.score.score_away}
  <br><br>Winner: <br>${winner}`;
}

async function sport_schedule(sport_id){
  const response = await fetch(`https://api.apilayer.com/therundown/sports/${sport_id}/schedule?limit=50&from=`, requestOptions);
  const data = await response.json();
  console.log(data);

  for (let i = 0; i < data.schedules.length; i++){
    result_text.innerHTML += `Event: ${i + 1}<br>Away team: ${data.schedules[i].away_team}<br>Home team: ${data.schedules[i].home_team}<br>Season type: ${data.schedules[i].season_type}<br>Date & Time: ${data.schedules[i].event_status_detail}<br>Event Id: ${data.schedules[i].event_id}<br><br>`;
  }
}

async function get_teams(sport_id){
  const response = await fetch(`https://api.apilayer.com/therundown/sports/${sport_id}/teams`, requestOptions);
  const data = await response.json();
  console.log(data);

  for(let i = 0; i < data.teams.length; i++){
    result_text.innerHTML += `Team Number: ${i+1}<br>Team: ${data.teams[i].name} ${data.teams[i].mascot}<br>Record: ${data.teams[i].record}<br><br>`;
  }
}

button_submit.addEventListener("click", get_data);
entry_dropdown.addEventListener("change", () => {
  if(entry_dropdown.value === "sport_availvable"){
    function_explanation.textContent = "This function does not require any input. It will return the sports available through the API and the sport Id used for other options.";
  }
  else if(entry_dropdown.value === "event_sport_date"){
    function_explanation.textContent = "This functions needs a date input and a Sport Id. It will return events for the sport and date entered with the event Id. Date format should be yyyy-mm-dd";
  }
  else if (entry_dropdown.value === "event_details"){
    function_explanation.textContent = "This function will take an event Id. It will return the winner of the game and the score. It will also return the name of the event.";
  }
  else if(entry_dropdown.value === "sport_schedule"){
    function_explanation.textContent = "This function will take a sport Id. It then returns the next 50 events for the sport on the schedule.";
  }
  else if(entry_dropdown.value === "sport_teams"){
    function_explanation.textContent = "This function takes a sport Id. It returns the teams connected to the chosen sport with their record.";
  }
});