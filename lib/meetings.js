import path from 'path';
var meetingData = require('./all_meeting_data_2.json'); //(with path)

const pdfDirectory = path.join(process.cwd(), 'minutes/pdf');

export function getSortedMeetingData() {
    // var minutesData = JSON.parse(_minutesData)
    // Sort posts by date
    return meetingData.sort(({ datetime_iso: a }, { datetime_iso: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}
