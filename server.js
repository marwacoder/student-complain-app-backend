const express = require('express');
const path = require('path');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const models = require('./models/');



const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const courseRoute = require('./routes/course');
const studentRoute = require('./routes/student');
const lecturerRoute = require('./routes/lecturer');
const examinerRoute = require('./routes/examiner');
const mailRoute = require('./routes/mail');

const app = express();
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/dcs.abu.edu.ng/user', userRoute);
app.use('/dcs.abu.edu.ng/admin', adminRoute);
app.use('/dcs.abu.edu.ng/course', courseRoute);
app.use('/dcs.abu.edu.ng/lecturer', lecturerRoute);
app.use('/dcs.abu.edu.ng/student', studentRoute);
app.use('/dcs.abu.edu.ng/examiner', examinerRoute);
app.use('/dcs.abu.edu.ng/mail', mailRoute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, ')
        return res.status(200).json({});
    }
    next();
})


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

models.sequelize
  .authenticate()
  .then( ()=> {
    console.log('Connection successful');
  })
  .catch((error)=> {
    console.log("Error creating connection:", error);
  });

module.exports = app;
