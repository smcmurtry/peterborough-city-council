import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';

import styles from './filter-meeting.module.css';
import PaginatedMeetingList from './meeting-list';
import { getSortedMeetingData } from '../lib/meetings';
var meetingTypes = require('../lib/meeting_type_dict.json'); //(with path)
const apiEndpoint = "http://localhost:5099/meetings"; // Update with your actual API endpoint

var today = new Date()
var start2022 = new Date(2022, 0, 0)
var start2021 = new Date(2021, 0, 0)
var start2020 = new Date(2020, 0, 0)
var start2019 = new Date(2019, 0, 0)
var start2018 = new Date(2018, 0, 0)
var start2017 = new Date(2017, 0, 0)
var start2016 = new Date(2016, 0, 0)
var start2015 = new Date(2015, 0, 0)
var start2014 = new Date(2014, 0, 0)
var start2013 = new Date(2013, 0, 0)
var start2012 = new Date(2012, 0, 0)
var start2011 = new Date(2011, 0, 0)
var start2010 = new Date(2010, 0, 0)
var start2009 = new Date(2009, 0, 0)
var start2008 = new Date(2008, 0, 0)
var defaultOptionLabel = "2022";
const timeRangeOptions = [
  // { "label": defaultOptionLabel, "startDate": start2008, "endDate": today },
  { "label": defaultOptionLabel, "startDate": start2022, "endDate": today },
  { "label": "2021", "startDate": start2021, "endDate": start2022 },
  { "label": "2020", "startDate": start2020, "endDate": start2021 },
  { "label": "2019", "startDate": start2019, "endDate": start2020 },
  { "label": "2018", "startDate": start2018, "endDate": start2019 },
  { "label": "2017", "startDate": start2017, "endDate": start2018 },
  { "label": "2016", "startDate": start2016, "endDate": start2017 },
  { "label": "2015", "startDate": start2015, "endDate": start2016 },
  { "label": "2014", "startDate": start2014, "endDate": start2015 },
  { "label": "2013", "startDate": start2013, "endDate": start2014 },
  { "label": "2012", "startDate": start2012, "endDate": start2013 },
  { "label": "2011", "startDate": start2011, "endDate": start2012 },
  { "label": "2010", "startDate": start2010, "endDate": start2011 },
  { "label": "2009", "startDate": start2009, "endDate": start2010 },
  { "label": "2008", "startDate": start2008, "endDate": start2009 },
]

var meedingDict = {}
meetingTypes.forEach(x => {
  meedingDict[x["meeting_type"]] = x["label"]
});

export default function FilterMeetings() {
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint, { mode: 'no-cors' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = response.json()
        console.log("response", response)
        console.log("data", data)
        return data;
      })
      .then(data => {
        setMeetingData(getSortedMeetingData(data));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [])

  const knownMeetingTypes = meetingTypes.map(x => x.meeting_type);
  meetingData.forEach(x => {
    if (knownMeetingTypes.indexOf(x["meeting_type"]) > -1) {
      x["meeting_label"] = meedingDict[x["meeting_type"]]
    } else {
      x["meeting_label"] = "Other"
      console.log("new meeeting type", x["meeting_type"])
    }
    x.datetime = new Date(x.datetime_iso)
  })
  const meetingOptionsArray = Array.from(new Set(meetingTypes.map(x => x.label)))
  const _meetingOptions = meetingOptionsArray.map(x => {
    return { "label": x }
  });
  _meetingOptions.sort(({ label: a }, { label: b }) => {
    const nameA = a.toUpperCase(); // ignore upper and lowercase
    const nameB = b.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const meetingOptions = [{ "label": "All", "meeting_type": "All" }].concat(_meetingOptions)
  const [selectedMeetingType, setSelectedMeetingType] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState(defaultOptionLabel);


  const selectedStartDate = timeRangeOptions.filter(x => x.label == selectedDateRange)[0].startDate
  const selectedEndDate = timeRangeOptions.filter(x => x.label == selectedDateRange)[0].endDate
  const _filteredMeetings = selectedMeetingType == "All" ? meetingData : meetingData.filter(x => x.meeting_label == selectedMeetingType)

  const filteredMeetings = _filteredMeetings.filter(x => x.datetime > selectedStartDate && x.datetime <= selectedEndDate)
  return (
    <div>
      <div className="mb-4 pb-2">
        <div className="mb-4">
          <span>See</span>
          <select
            className={styles.fancySelect}
            name="meeting-label"
            value={selectedMeetingType}
            onChange={e => setSelectedMeetingType(e.target.value)}
          >
            {meetingOptions.map(({ label }) => (
              <option value={label} key={label}>{label}</option>
            ))}
          </select>
          <span>meetings</span>
        </div>
        <div>
          <span>for </span>
          <select
            name="time-range"
            className={styles.fancySelect}
            value={selectedDateRange}
            onChange={e => setSelectedDateRange(e.target.value)}
          >
            {timeRangeOptions.map(({ label }) => (
              <option value={label} key={label}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <PaginatedMeetingList meetings={filteredMeetings} meetingsPerPage={10} />
    </div>

  )
}