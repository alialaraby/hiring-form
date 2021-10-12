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
        check('expyears', 'Years of Experience is not valid').not().isEmpty().trim().escape(),
        check('uniquereason', 'Unique Reason is Required').not().isEmpty().trim().escape(),
        check('choosereason', 'Choosing Reason is Required').not().isEmpty().trim().escape(),
        check('careerbrief', 'Career Brief is Required').not().isEmpty().trim().escape(),
        check('cv', 'CV is Required').not().isEmpty().trim().escape(),
    ]

    app.post('/hiringform', urlencodedParser, validationRules, (req, res)=> {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                const alert = errors.array();
                const reqBody = req.body;
                res.render('hiring-form', { alert: alert, reqBody: reqBody });
            }else{
                res.send('done');
            }
        }
    );

    // app.use('/users', userRouter);
    app.use(error);
}