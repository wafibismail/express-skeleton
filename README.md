# Skeleton Express App

This is a barebone express app. Plus a bit more stuff I added according to what I think we will use for our project:
- Front-end (all contained in the folder named public) Basic HTML + JS logic for:
  - Login VIA Microsoft portal for strictly UBD webmail (conveniently rejects other Microsoft accounts)
  - View Resources
    - [NOT YET]Request Book Resource
  - [NOT YET]View Booking Requests
    - [NOT YET]Sort/Filter Bookings
    - [NOT YET]Approve a Booking Request
    - [NOT YET]Decline a Booking Request
- Few back-end routes to handle http requests for:
  - GET Categories (all categories, the UI should handling organizing them e.g. collapsing unopened categories)
  - GET Category (resources within the category)
  - GET Booking-Requests
  - [NOT YET]POST Booking-Request (new requests)
- More to be added:
  - PUT Booking-Request (modify e.g. approve/decline)
  - Others I haven't thought of

## Preparing the Work Environment

### Required Dependencies:
- nodejs - JavaScript runtime - have it installed. no need to update to the latest version if you have it installed already.
- npm - default package manager for nodejs - npm should already be included as part of the nodejs installation
### Optional:
If you like express, you might be interested in having this in your work environment:
- express-generator - easily generate express templates e.g. the base of this repo.
  - The command below installs the express-generator globally:
  ```
  npm install -g express-generator
  ```
  - The command below generates a skeleton express app, without a view engine, into a new directory, "new-app" in the directory the CLI is running in
  ```
  express new-app --no-view
  ```
<br>

## Cloning this app
You can get this running locally. In you work directory, run the command:
```
git clone https://github.com/wafibismail/express-skeleton.git
```
Then enter the directory,
```
cd express-skeleton
```
And to install the app specific dependencies, run this:
```
npm install
```
And use this to run the app with nodemon (not available by default, but nodemon makes development easier by auto-restarting on each save).
```
npm run dev
```
Alternatively, you can use the default command
```
npm start
```