const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');
const fs = require('fs');
const CREDENTIALS = JSON.parse(fs.readFileSync('client_secret.json'));
// const googleCreds = require('../client_secret.json');

exports.addSheetRow = async (rowData) => {
    try {
        const doc = new GoogleSpreadsheet('1XR_CX_PpzPSxds6Gbs9QDYgzcvleKCaX-nI4wq3VOho');
        await doc.useServiceAccountAuth({
            client_email: CREDENTIALS.client_email,
            private_key: CREDENTIALS.private_key
        });
        await doc.loadInfo();
        let sheet = doc.sheetsByIndex[0];
        await sheet.addRow(rowData);
    } catch (error) { throw error }
}