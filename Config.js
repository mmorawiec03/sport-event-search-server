module.exports = { 
  //MONGODB CONFIG 
  MONGO_URI: process.env.URI_MONGO || 'mongodb://localhost/sport-event-search', 
  //PORT APP CONFIG 
  PORT_LISTEN: process.env.PORT_LISTEN || 3000,
  //JWT CONFIG 
  TOKEN_SECRET_JWT: process.env.TOKEN_SECRET_JWT || 'jWt9v28$s!sEcreTtoKEnwQ7rw'
}