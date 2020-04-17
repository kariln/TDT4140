import Constants from 'expo-constants';

// Object which contains the API we connect to
const ENV = {
    dev: {
        apiUrl: 'http://192.168.10.167:8000/' // change this to the ip of your machine, and run python manage.py ipofyourmachine:8000, or use staging
    },
    staging: {
        apiUrl: 'https://staging.shopstop.xyz/'
    },
    prod: {
        apiUrl: 'https://shopstop.xyz/'
    }
};

// Constants.manifest.releaseChannel finds out whether this run in dev, staging or production.
// This means we can connect to our local API when running in dev, and to shopstop.xyz when building for production, without having to change anything
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (env === null || env === undefined || env === '') return ENV.dev;
    if (env.indexOf('dev') !== -1) return ENV.dev;
    if (env.indexOf('staging') !== -1) return ENV.staging;
    return ENV.prod;
};

export default getEnvVars();
