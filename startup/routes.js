const error = require('../middleware/error');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app, debug) => {
    
    app.get('/', (req, res) => {
        res.send('welcome');
    });

    app.get('/hiringform', (req, res) => {
        res.render('hiring-form');
    });

    const validationRules = [
        check('position', 'Choose a Position').not().isEmpty().trim(),
        check('expyears', 'Years of Experience is not valid').not().isEmpty().trim().escape()
    ]

    app.post('/hiringform', urlencodedParser, validationRules, (req, res)=> {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                const alert = errors.array();
                res.render('hiring-form', { alert });
            }else{
                res.send('done');
            }
        }
    );

    // app.use('/users', userRouter);
    app.use(error);
}