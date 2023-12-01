
const mongoose = require('mongoose')


const app = require('./app')


const { DB_HOST, PORT = 3000 } = process.env;

// const DB_HOST = require('./config')

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successfull");
        console.log(`Server running...`);
    })
  })
  .catch(error =>{
    console.log(error.message);
    process.exit(1);
})

//Q9rDFYMcFH4QN7Md   - pass

