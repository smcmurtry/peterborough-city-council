import path from 'path';
var minutesData = require('./minutes_data.json'); //(with path)

const pdfDirectory = path.join(process.cwd(), 'minutes/pdf');

export function getSortedMinutesData() {
    // var minutesData = JSON.parse(_minutesData)
    // Sort posts by date
    return minutesData.sort(({ datetime_iso: a }, { datetime_iso: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}
