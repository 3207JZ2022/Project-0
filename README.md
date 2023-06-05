
# Project-0 
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
Create two tables as follows:

1. CREATE TABLE table_name1(
    Author     varchar(22)                         not null,
    Title      VARCHAR(32)                         null,
    Descrip    VARCHAR(300)                        null,
    ReleasedID INT AUTO_INCREMENT,
    Likes      INT DEFAULT 0,
    Date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP null,
    CONSTRAINT table_name1_pk
        PRIMARY KEY (ReleasedID)
);
2. CREATE UNIQUE INDEX table_name1_ReleasedID_uindex
    ON table_name1 (ReleasedID);
3. CREATE TABLE table_name2
(
    src        VARCHAR(100) not null,
    releasedID INT          not null,
    FOREIGN KEY (releasedID) REFERENCES table_name1 (ReleasedID)
);
4. CREATE UNIQUE INDEX  table_name2_src_uindex
    ON table_name2 (src);

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

## Updates
* The like-button now updates the data properly.
* Implement show-password functionality for the registration and change password pages.
* Remove any APIs that are no longer in use.
* Redesign the database.

## Known Issues 
* Potential race condition when multiple users like the same work at the same time.

## Contributions are welcome! Please feel free to submit a pull request. 

I hope this helps! Let me know if you have any other questions.
## Last Updated: 06/05/2023
