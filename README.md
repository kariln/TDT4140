<div align="center">
<h1>
ShopStop
</h1>
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="./shopstop-frontend/assets/icon.png" alt="ShopStop" width="200"></a>
<br>
<br>
ShopStop is a mobile application to make organizing shopping easier!
<br>
<br>
<p align="center">
  <a href="#getting-started">Getting started</a> •
  <a href="#running-tests">Running tests</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#license">License</a> •
  <a href="#links">Links</a>
</p>
</div>

---

# Getting started

Our application is divided into two main parts, a React Native frontend and a Django backend.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Python 3.x](https://www.python.org/downloads/)
- [NodeJS](https://nodejs.org/en/)
- [pip](https://pypi.org/project/pip/) (Included by default on python 3.4 or later)
- [yarn](https://classic.yarnpkg.com/en/docs/getting-started)

```bash
# Clone this repository
$ git clone https://gitlab.stud.idi.ntnu.no/tdt4140-2020/67.git
```

### Setting up Backend

```bash
# Navigate to the backend folder
$ cd 67/shopstop_backend

# Install the required python dependencies
# If you are running Windows and this step fails, remove "uWSGI" from requirements.txt and try again
$ pip install -r requirements.txt

# Migrate the database
$ python manage.py migrate

# Run the server
$ python manage.py runserver IPADDRESS:8000
```

Where `IPADDRESS` is the IPv4 address of your machine.

:warning: You need to manually change `ENV.dev.apiUrl` in **67/shopstop-frontend/environment.js** to `IPADDRESS:8000`. :warning:

If you have trouble setting up the backend locally, you can change `ENV.dev.apiUrl` in **67/shopstop-frontend/environment.js** to `https://staging.shopstop.xyz/` though this is not recommended.

### Setting up Frontend

```bash
# Install expo-cli globally
$ npm install -g expo-cli

# Navigate to the frontend folder
$ cd 67/shopstop-frontend

# Install the node dependencies
$ yarn

# Start the Expo server
$ yarn start
```

The console should now show a QR code. 
- If you are using an Android device, you can scan the QR code using the [expo app for android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en). 
- If you are using an Iphone you can scan the QR code using your Apple Camera App, but you need the [expo app for Iphone](https://apps.apple.com/us/app/expo-client/id982107779) installed.

# Running tests

### ESLint

```bash
# Navigate to the frontend folder
$ cd 67/shopstop-frontend

# Run the linter
$ yarn lint

# Some problems are fixable using
$ yarn lint --fix
```

### Flake8

```bash
# Navigate to the backend folder
$ cd 67/shopstop_backend

# Run the linter
$ flake8 shopstop
```

### Unit tests

```bash
# Navigate to the backend folder
$ cd 67/shopstop_backend

# Run the test suite
$ coverage run --source="shopstop" manage.py test

# Get report of the tests ran
$ coverage report
```

# Deployment

This project utilizes the continuous deployment features of gitlab.

- When a branch is merged into the develop branch, the backend will be built and deployed to https://staging.shopstop.xyz/.
- When the develop branch is merged into the master branch, the backend will be built and deployed to https://shopstop.xyz/.

The frontend must be distributed manually. By using [expo publish](https://docs.expo.io/versions/latest/workflow/publishing/) you can get an .apk or .ipa depending on if you want to distribute on Android or Iphone, which can be published on their respective app store. Whenever you run ```expo publish``` the .apk or .ipa will get the updated version with OTA (over-the-air) updates, which means you do not need to redistribute the application.

# License

This project is distributed under the [MIT license](LICENSE)

# Links

- [Wiki](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/67/-/wikis/home)
- [Download](https://play.google.com/store/apps/details?id=shopstop.xyz) on Google Play Store
- [Backend API documentation](shopstop_backend#shopstop-backend-api)
