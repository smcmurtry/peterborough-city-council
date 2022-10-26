import React, { useState } from 'react';

import styles from './filter-meeting.module.css';
import MeetingList from './meeting-list';
import { getSortedMeetingData } from '../lib/meetings';
var meetingTypes = require('../lib/meeting_type_dict.json'); //(with path)

var today = new Date()
var thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
var sixtyDaysAgo = new Date(today.setDate(today.getDate() - 60))
var start2022 = new Date(2022, 0, 0)
var start2021 = new Date(2021, 0, 0)

const timeRangeOptions = [
  {"label": "the last 30 days", "startDate": thirtyDaysAgo, "endDate": today},
  {"label": "the last 60 days", "startDate": sixtyDaysAgo, "endDate": today},
  {"label": "2022", "startDate": start2022, "endDate": today},
  {"label": "2021", "startDate": start2021, "endDate": start2022},
]

// const meetingOptions = [
//   {"label": "all"},
//   {"label": "meeting 1"},
//   {"label": "meeting 2"},
// ]

export async function getStaticProps() {
  const allMeetingData = getSortedMeetingData();
  return {
    props: {
      allMeetingData
    },
  };
}

var meedingDict = {}
meetingTypes.forEach(x => {
  meedingDict[x["meeting_type"]] = x["label"]
});

export default function FilterMeetings({allMeetingData}) {
  const meetingData = getSortedMeetingData();
  meetingData.forEach(x => x["meeting_label"] = meedingDict[x["meeting_type"]])
  const meetingOptionsArray = Array.from(new Set(meetingData.map(x => x.meeting_label)))
  const _meetingOptions = meetingOptionsArray.map(x => 
    {
      return {"label": x}
    });
  // meetingOptions.sort((a, b) => a.label - b.label);
  // sort by name
  _meetingOptions.sort((a, b) => {
    const nameA = a.label.toUpperCase(); // ignore upper and lowercase
    const nameB = b.label.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const meetingOptions = [{"label": "All"}].concat(_meetingOptions)
  const [selectedMeetingType, setSelectedMeetingType] = useState("All");

  const filteredMeetings = selectedMeetingType == "All" ? meetingData : meetingData.filter(x => x.meeting_label == selectedMeetingType)
    return (
      <div>
        <div class="mb-4 border-b-2 py-8">
          <span>See</span>
          <select 
            className={styles.fancySelect} 
            name="meeting-label" 
            value={selectedMeetingType} 
            onChange={e => setSelectedMeetingType(e.target.value)}
          >
            {meetingOptions.map(({ label }) => (
              <option value={label}>{label}</option>
            ))}
          </select>
          <span>meetings for</span>
          <select name="time-range" className={styles.fancySelect}>
            {timeRangeOptions.map(({ label, startDate, endDate }) => (
            <option>{label}</option>
            ))}
          </select>
        </div>
        <MeetingList meetingData={filteredMeetings}/>
      </div>

    )}