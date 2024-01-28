# Collap Application

This is the frontend to my web app Collap. Using a React Framework and Typescript, I'm able to connect my frontend to my Django Framework Backend. Documentation for the backend is found on my Repo. At the time of this README commit, I'm having a lot of issues with getting my Github repository to update on Azure, along with a multitude of errors, so for now the best I can show is a lot of documentation and screenshots.

## About this App

This is my very first real project and I decided to make an event planning application. Although this seems like an overly ambitious first project, this is my desired way of learning: to dive right in. Collap is an application that will allow users to HOST events with minimal details, and invite users who can contribute to the date of the event. It also includes a calendar that displays your events. My inspiration for this application was to solve issues planning events with large groups of people or with participants who were too reserved to contribute to any real planning of said event. Event Hosts are able to control many aspects of their events, such as start/end time, primary dates, participants, etc. The voting system for event is a simple way for hosts to understand every participant's preference in days. Hosts may start votes any time, and when they are completed they can be shown in a simple bar graph. Each participant is required to submit available dates for the time frame that was determined before joining an event. This is DIFFERENT than voting, it's simply availability that can be shown to hosts. This helps hosts determine the days in which some participants are UNABLE to come.

## Issues

Although I took a lot of time trying to document all the backend logic and endpoints, but it proved very difficult to see the BIGGER picture when planning something you've never done in your life. Looking back, it may have been more beneficial to simultaneously think about backend and frontend instead of going one at a time like I believed to be better. This way I could have identified more oversights and flaws with my design. However, this journey of struggle has taught me (in a tough way) a lot in how I must think about web development and all the meticulous planning I should do before actually creating code for a product. 

Another reflection I have about not seeing the larger scope during this project is not planning and implementing more features than I had designed the application to have. My application lacks some features that I had overlooked during my planning phase, and I regret not taking more time to add more to my application. It wasn't a large issue implementing these add-ons during the development process, but it was very difficult going through many ideas during development and spending more time delaying my overall progress with the project. At one point I decided that I need to ignore most ideas unless they were vital to the logic of the application. My lack of time and desire to put this project on my resume contributed to this decision.


## Links

#### Note IMPORTANT!!!
Feel free to register your own account to check it out, but since it's difficult to see all the features of an event planning application without many users and events, I've preloaded accounts with some data so that you can check it out! Feel free to modify any information on each of these acccounts
* username: githubexample1 password: githubexample1
* username: githubexample2 password: githubexample2
* username: githubexample3 password: githubexample3

### Hosted Project
https://master--illustrious-unicorn-98eadd.netlify.app/
### Front End Documentation (This Repository)
https://github.com/shinste/collap_frontend
### Back End Documentation and Design 
https://github.com/shinste/collap_backend

## Documentation (Split by Pages)

### Login

![Login Page](collap_frontend\documentation_pics\login.png)
