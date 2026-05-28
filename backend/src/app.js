const express = require('express');
const { success, error } = require('consola');
const cors = require('cors');
const passport = require('passport');

const { PORT } = require('./config/index');
const { corsOptions } = require("./config/cors");
const { 
    errorLogger, 
    errorResponder, 
    invalidPathHandler 
} = require('./middlewares/error.middleware');
const path = require('path');

const app = express();

//cors settings
app.use(cors(corsOptions));

// TEMPLATE ENGINE
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

//json payload settings
app.use(express.urlencoded({ 
    limit: "50mb", 
    extended: true, 
    parameterLimit: 50000 
}));
app.use(express.json({limit: '50mb'}));

//passport
app.use(passport.initialize());
require("./middlewares/passport.middleware")(passport);


//media files
app.use('/uploads', express.static('uploads'));

// Serve React static files
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// routers
require('./routes/v1/auth.routes')(app);
require('./routes/v1/firm.routes')(app);
require('./routes/v1/location.routes')(app);
require('./routes/v1/master.routes')(app);
require('./routes/v1/permission.routes')(app);
require('./routes/v1/employee.routes')(app);
require('./routes/v1/deduction.routes')(app);
require('./routes/v1/nightallowance.routes')(app);
require('./routes/v1/overtimewages.routes')(app);
require('./routes/v1/promotionwages.routes')(app);
require('./routes/v1/da.routes')(app);

// React fallback route (for SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Error handling middleware
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);


// Server creator
try {
    app.listen(PORT, () => 
        success({
            message: `Server started at port ${PORT}`,
            badge: true
        })
    );
} catch (err) {
    error({
        message: `${err}`,
        badge: true
    })
}