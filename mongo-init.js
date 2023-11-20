db.createUser(
  {
    user: "reeki",
    pwd: "1ffk4tra",
    roles: [
      {
        role: "readWrite",
        db: "mindswiss"
      }
    ]
  }
);
db.createCollection('sites');
db.sites.insertMany( [
   { name: 'google', url: 'https://www.google.com/', statuscode: 200, date: new Date(Date.now()) },
   { name: 'wikipedia', url: 'https://www.google.com/', statuscode: 200, date: new Date(Date.now()) },
   { name: 'mindset', url: 'https://www.google.com/', statuscode: 200, date: new Date(Date.now()) }
] );