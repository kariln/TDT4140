import Constants from 'expo-constants';

const ENV = {
    dev: {
        apiUrl: 'http://localhost:8000/'
    },
    staging: {
        apiUrl: 'https://staging.shopstop.xyz/'
    },
    prod: {
        apiUrl: 'https://shopstop.xyz/'
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (env === null || env === undefined || env === '') return ENV.dev;
    if (env.indexOf('dev') !== -1) return ENV.dev;
    if (env.indexOf('staging') !== -1) return ENV.staging;
    return ENV.prod;
};

export default getEnvVars();
