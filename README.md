# ShopStop
Shop stop is a shared shopping list. 

Our application is divided into to main parts, a React Native frontend and a Django backend. 

# How to run for local development

## Frontend

Install [expo-cli](https://expo.io/) with:
```console
npm install -g expo-cli
```

Navigate to the **frontend** folder and install the node dependencies:
```console
yarn
```

To start the Expo server run:

```console
yarn start
```

## Backend

Install the required python dependencies by navigating to **shopstop_backend** and running:

```console
pip install -r requirements.txt
```

Migrate the database with:

```console
python manage.py migrate
```

And finally run the server with:

```console
python manage.py runserver
```