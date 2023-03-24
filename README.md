### App: ## Fullstack MongoDB Express React Node.js App – car rental.com   
Link: https://lively-sunset-1722.fly.dev/
Skills: React | Docker | Hooks | Express | OAuth | MongoDB | Node 

This is a car rental app for customers to hire cars (login,select cars, checkout,place order) and admin to update the inventory and orders through the admin page.
Frontend was built by advanced CSS (eg flexbox and grid),HTML, Javascript, React, React Hooks and libraries like MaterialUI. 
SSO and authorization were created by OAuth. 
Backend was built by Node.js and Express.js to interact with the RESTful API endpoints for CRUD. 
Databases use MongoDB atlas and mongoose for modeling. 

This app was deployed to Fly.io using Docker technology for containerized architecture that enables fast and efficient scaling.

Deployment: Old verison: Heroku | New verison: Fly.io

Problem of previous verison on Heroku: It might require 10-20sec to access the link below. Reason: Subscripted to cheapest Eco Dynos Plan of Heroku (USD5/month). That sleeping dyno receives no web traffic in a 30-minute period, it sleeps and the dyno becomes active again after a short delay.

Solution/ New verison: Fly.io's containerized architecture built based on Docker containers allow the app run in a highly efficient and scalable manner. We can now access to the app immediately without any delay.

+ Customer login: your google account or create your own through the website.
+ Junior admin login: junioradmin@abc.com password: Password123  (with permission to read, add, update cars) 
+ Senior admin login: senioradmin@abc.com password: Password123 (with extra permission to delete cars) 
