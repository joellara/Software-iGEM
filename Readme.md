# iGEM Tec CEM Web Software
## Description

For this year’s software, we developed a web application with three main functionalities, a cell counter, a BioBrick builder and an activity log for our hardware. Up next, we will explain each one of them!

## Biobrick builder
This piece of software helps every iGEMer in developing a new composite biobrick, with this application you can search and filter the promoters, rbs and terminators available by the igem library. We built a scrapper to gather all the relevant information and scan the part sequence to obtain our standards based on the sequence. Currently this part of our suite of works with help of our database hosted in firebase, the reason is that our scrapper gathers the information and saves it in the database.

## Actvitiy Log

The activity log is a really simple piece of software, nevertheless very important. This part of the web application is where the software and the hardware converge into a single solution. The user interface is really basic and minimalistic and shows the data obtained from the hardware as a table and as a graph.

## Cell Count

The cell count software is a beta version image processing program that takes an input image and outputs a close estimate of the number of cells in the picture. The main reasons of it to still be a beta is because we would like to return the confluence percentage, as well as perform more tests on the software.

## Running our application
1.  In order to run the application you must have yarn or npm installed as this software uses npm packages.
2.  Install the packages with use of the following command.
~~~~
npm or yarn install
~~~~
3. If the previous command runs successfully then you should be able to run the applcation with the following command.
~~~~
npm start or yarn start
~~~~
