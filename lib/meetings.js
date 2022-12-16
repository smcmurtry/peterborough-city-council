import fetch from 'node-fetch';

const all_meeting_data_url = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/all_meeting_data.json"
const response = await fetch(all_meeting_data_url);
const meetingData = await response.json();

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
