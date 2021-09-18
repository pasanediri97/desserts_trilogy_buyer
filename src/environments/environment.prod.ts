export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCPOD6fULhGu9HNMknVu8yjsWeixpIAgbQ",
    authDomain: "food-delivery-1e89f.firebaseapp.com",
    projectId: "food-delivery-1e89f",
    storageBucket: "food-delivery-1e89f.appspot.com",
    messagingSenderId: "717623054826",
    appId: "1:717623054826:web:0493726f9e9c9bad2f2293",
    measurementId: "G-GG0ZQNM3CM",
    databaseURL: "https://food-delivery-1e89f.firebaseio.com"
  },
  onesignal: {
    appId: 'ca4b6aa6-022d-4318-bb6e-a20cca9aab0c',
    googleProjectNumber: '717623054826',
    restKey: 'ZGJmNTJhOTMtMGVjZS00Y2VmLTk5MzUtYzg4M2JkODM2MDky'
  },
  stripe: {
    sk: ''
  },
  paypal: {
    sandbox: '',
    production: 'YOUR_PRODUCTION_CLIENT_ID'
  },
  general: {
    symbol: '$',
    code: 'USD'
  }
};
