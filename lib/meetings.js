// const meetingData = require("./all_meeting_data.json")

export function getSortedMeetingData(meetingData) {
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
