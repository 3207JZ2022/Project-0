
# Project0 
This is a website for artwork upload created with ReactJS and ExpressJS. The website has a responsive user interface and web layout. This project includes a frontend code and a backend code.

# Frontend
* The frontend uses ReactJS. 
* Most components and web layout change based on a maximum screen width of 1020px, 720px, and 540px. 
* Components are independent of the pages. That is, components do not carry data but accept data from the pages. The data remains on the page and is passed to components. The functionality of components is not the functionality of a page. So you can use components on every page you want as long as you pass the right data. 
* All submition-related buttons will be disabled for few seconds when it detectes invalid input. 

# Backend 
* The backend uses ExpressJS, Mongoose, and PassportJS. 
* All uploaded works are categorized by the author and stored in the destination folder. 
* All RESTful APIs are handled in the router folder. 
* All artwork collection-related tasks are handled by MySQL, and user information is stored in MongoDB. 

# MySQL 
* table_columns: author varchar(24) not null, title varchar(30), descrip varchar(300), id varchar(18) not null, releasedID int not null, likes int default 0, date timestamp CURRENT_TIMESTAMP
* For mySQL to work correctly it cannot be empty. Put an images named 0_0.jpg in the backend folder ./destination/author_name/id directory and <b>INSERT INTO table_name(author, title, id, releasedID, src) VALUES('author_name', 'title', '0_0', 0, 'destination/author_name/0_0.jpg'); </b> 
* I am currently working on a new database structure but I haven’t finished updating APIs. 

## Features 
* RESTful API for backend server.
* MongoDB for the user database and MySQL for the artwork collection.
* Login session with PassportJS.

## Installation 
1. Clone the repository. 
2. Install the dependencies using: <b><i> yarn install</i></b>. 
3. Start the server using: <b><i> yarn start </i></b>. 
* Note that the frontend and backend are hosted on two different servers. 

## Usage 
1. Open your web browser. 
2. Navigate to http://localhost:3000. 
3. Use the website to upload your artwork. 

## Known Issues 
* The initial MySQL database cannot be empty. You need to manually add the first item to the database. It must have at least one item; otherwise, you cannot upload any work. Every new work will be assigned a unique and ordered (incremented by 1) release ID. However, if there are no items inside the database, it will not know where to start the increment. I will redesign the database implementation in the next update. 
* I implemented the change user email functionality in the latest update. However, since the works are connected by user email, changing the email can cause issues with your existing works. I will split the functionality of username and email in the next update to fix this issue. 
* I haven't update the like status in the database through like button on the page. 


## Contributions are welcome! Please feel free to submit a pull request. 

I hope this helps! Let me know if you have any other questions.
## Last Updated: 05/29/2023
