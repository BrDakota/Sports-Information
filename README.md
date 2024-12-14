# Sports Information
 This is a website designed to give information of specified sporting events using an API

This project aims to be a website that gives information about sporting events and teams to the users.
This is done using The Rundown API which is a free API that can be used to get sports info. This includes info
that has not been used in the website.

======= Available Sports =======
This function gives the sports that are avaialble using TheRundown API. This will provide the Sport Id that will be used in the other functions
1. Select available sports functions
2. press submit and the sports will appear with their ids.

======= Event by sport and date =======
To use this function you must first use the available sports function to attain a sport id for the sport you wish to find events for. This function allows the user to
find event for a sport on a date that is specified by the user.
1. Get a sport id from the available sports function
2. Change the function you wish to use to "Event by sport and date"
3. Enter your sport id and your date (format: yyyy-mm-dd) enter their respective fields
4. press submit and the page will populate with the events. This will provide you with the event ids for each of the events.

======= Event Details =======
This function gives the details for the event such as the teams at the event and the score for the event.
1. Select the event details function
2. Enter your event id for the desired event
3. press submit and view the score and winner of your chosen event

======= Sport Schedule =======
This function takes in the sport id and returns the next 50 events that are schdeuled for the sport. It provides the teams playing, the date and time, and the event id
1. Select the sport schedule function
2. Enter the sport id for the chosen sport
3. Press submit and view the next 50 events

======= Sport Teams =======
This function returns all of the teams for a chosen sport
1. Select the teams function
2. Enter the sport id for the desired sport
3. After pressing submit you will see all of the teams for the chosen sport