//_______________________________________________________________________________________
const app = require('./app');

//server listening on port
app.listen(app.get('port'), () => {
  console.log(`${app.get('name')} listening on port ${app.get('port')}`);
});

//_______________________________________________________________________________________
