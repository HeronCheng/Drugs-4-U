# Drugs-4-U
:pill: Drugs-4-U is a website you can search drugs & medicines which are licensed in Taiwan.  
<p align="center">
  <img src="https://github.com/HeronCheng/Drugs-4-U/blob/main/src/img/white%20logo.png" alt="Website Logo" width="350px"/>
</p>
:link: This is my website : (The website is no longer available.)   <br/><br/>

- Test account : test@test.com   <br/>
- Test password : testtest  

## Table of Content

- [Frontend Technique](#frontend-technique)
  - [React](#react)
  - [Tailwind CSS](#tailwind-css)
  - [ESLint](#eslint)
  - [Webpack & Babel](#webpack--babel)
  - [Third Party Library](#third-party-library)
  - [Responsive Web Design](#responsive-web-design)
- [Backend Technique](#backend-technique)
  - [Firebase](#firebase)
  - [Web Crawler](#web-crawler)
  - [Third Party Library](#third-party-library-1)
- [Main Features](#main-features)
- [Contact](#contact)

## Frontend Technique

### React 
- Use React ( hook ) to build a single-page application( SPA ) and create reusable components.
  - Hook API : `useState`, `useEffect`, `useContext`
  - Components Structure Design

    <img src="https://github.com/HeronCheng/Drugs-4-U/blob/main/src/img/componentdesign.png" alt="Component Structure" width="700px"/>

- React Router ( version 6 ) : use to manage SPA routing 
  - Routers : `BrowserRouter`
  - Components : `Routes`, `Route`, `Outlet`, `Navigate`, `Link`
  - Hooks : `useParams`  
- React Context API : manage state globally between deeply nested components

### Tailwind CSS
- A utility-first CSS framework, easy to use and maintain

### ESLint
- Use to find and fix problems in JavaScript code and keep coding style consistent

### Webpack & Babel
- Webpack : module bundler for JavaScript application
- Babel : transpiler for different versions of JavaScript

### Third Party Library
- [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Print.js](https://printjs.crabbly.com/)
- [Animista](https://animista.net/)

### Responsive Web Design

  <img src="https://github.com/HeronCheng/Drugs-4-U/blob/main/src/img/RWDdemo.png" alt="Show RWD" width="600px"/>


## Backend Technique

### Firebase
- Firestore
  - To store medicine's detailed data ( such as name, unique ID, price, etc. ) 
  - Database Schema
 
    <img src="https://github.com/HeronCheng/Drugs-4-U/blob/main/src/img/databaseschema.png" alt="database schema" width="600px"/>
    
- Firebase Storage
  - Store medicine's picures
- Authentication
  - Authenticate with Google login and with users' email addresses and passwords
  - Use Firebase pre-built UI
- Hosting
  - Host JavaScript application's static assets 

### Web Crawler
- Using Python to download over ten thousand medicines' pictures from [Taiwan Food and Drug Administration( TFDA )](https://info.fda.gov.tw/MLMS/H0001.aspx).

### Third Party Library
- [Typesense](https://typesense.org/) : search engine to build a full-text search in my website


## Main Features

- Searching Medicines
  - You can use a medicine's Chinese name, English name, or ingredient to search for whatever medicines you want.

    <img src="https://github.com/HeronCheng/Drugs-4-U/blob/main/src/img/Drugs4U%20-%201_.gif" alt="Website demo1" width="600px" height="400px"/>

<br>

- Members Only
  - You can add medicines to favorites on the search page and you can see the list on the member page. 
  - You can export your list as PDF files.

    <img src="https://github.com/HeronCheng/Drugs-4-U/blob/main/src/img/Drugs4U%20-%202_.gif" alt="Website demo2" width="600px" height="400px"/>  

  - You can choose the medicines you eat and check whether duplicate medications exist.

    <img src="https://github.com/HeronCheng/Drugs-4-U/blob/main/src/img/Drugs4U%20-%203_.gif" alt="Website demo3" width="600px" height="400px"/>
<br> 

## Contact

:cat2: 鄭羽筑 Yu-Chu, Cheng
<br/>

:email: Email : jc16884@gmail.com
<br/>

:mag: [Linkedin](https://www.linkedin.com/in/%E7%BE%BD%E7%AD%91-%E9%84%AD-a86a6220b/)
