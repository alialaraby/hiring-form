module.exports = function(app){
    const bodyParser = require('body-parser')
    const { check, validationResult } = require('express-validator');
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    const sheetUpdater = require('../middleware/sheets-updater');
    const validationRules = [
        check('position', 'Choose a Position').not().isEmpty().trim(),
        check('expyears', 'Years of Experience is not valid').not().isEmpty().trim().escape(),
        check('uniquereason', 'Unique Reason is Required').not().isEmpty().trim().escape(),
        check('choosereason', 'Choosing Reason is Required').not().isEmpty().trim().escape(),
        check('careerbrief', 'Career Brief is Required').not().isEmpty().trim().escape(),
        check('cv', 'CV is Required').not().isEmpty().trim().escape(),
    ]

    app.get('/hiringform', (req, res) => {
        res.render('hiring-form');
    });

    app.post('/hiringform', urlencodedParser, validationRules, async (req, res)=> {
            const errors = validationResult(req)
            const reqBody = req.body;
            if(!errors.isEmpty()) {
                const alert = errors.array();
                res.render('hiring-form', { alert: alert, reqBody: reqBody });
            }else{
                try {
                    await sheetUpdater.addSheetRow({ 
                        Selected_Position: reqBody.position,
                        Years_Of_Experience: reqBody.expyears,
                        Why_Unique: reqBody.uniquereason,
                        Why_Choose_You: reqBody.choosereason,
                        Career_Brief: reqBody.careerbrief,
                        CV_Link: 'reqBody.cvlink',
                    });
                    res.render('form-uploaded');
                } catch (error) {
                    console.log(error);
                    res.send('Some Error');
                }
            }
        }
    );

}