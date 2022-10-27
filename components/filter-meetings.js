import React, { useState } from 'react';

import styles from './filter-meeting.module.css';
import MeetingList from './meeting-list';
import { getSortedMeetingData } from '../lib/meetings';
var meetingTypes = require('../lib/meeting_type_dict.json'); //(with path)

var today = new Date()
var thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30))
var sixtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 60))
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

const timeRangeOptions = [
  {"label": "the last 30 days", "startDate": thirtyDaysAgo, "endDate": today},
  {"label": "the last 60 days", "startDate": sixtyDaysAgo, "endDate": today},
  {"label": "2022", "startDate": start2022, "endDate": today},
  {"label": "2021", "startDate": start2021, "endDate": start2022},
  {"label": "2020", "startDate": start2020, "endDate": start2021},
  {"label": "2019", "startDate": start2019, "endDate": start2020},
  {"label": "2018", "startDate": start2018, "endDate": start2019},
  {"label": "2017", "startDate": start2017, "endDate": start2018},
  {"label": "2016", "startDate": start2016, "endDate": start2017},
  {"label": "2015", "startDate": start2015, "endDate": start2016},
  {"label": "2014", "startDate": start2014, "endDate": start2015},
  {"label": "2013", "startDate": start2013, "endDate": start2014},
  {"label": "2012", "startDate": start2012, "endDate": start2013},
  {"label": "2011", "startDate": start2011, "endDate": start2012},
  {"label": "2010", "startDate": start2010, "endDate": start2011},
  {"label": "2009", "startDate": start2009, "endDate": start2010},
  {"label": "2008", "startDate": start2008, "endDate": start2009},
]

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
  meetingData.forEach(x => {
    x["meeting_label"] = meedingDict[x["meeting_type"]]
    x.datetime = new Date(x.datetime_iso)
  })
  const meetingOptionsArray = Array.from(new Set(meetingData.map(x => x.meeting_label)))
  const _meetingOptions = meetingOptionsArray.map(x => 
    {
      return {"label": x}
    });
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
  const [selectedDateRange, setSelectedDateRange] = useState("the last 30 days");


  const selectedStartDate = timeRangeOptions.filter(x => x.label == selectedDateRange)[0].startDate
  const selectedEndDate = timeRangeOptions.filter(x => x.label == selectedDateRange)[0].endDate
  console.log("selectedDateRange", selectedDateRange)
  console.log("selectedStartDate", selectedStartDate)
  console.log("selectedEndDate", selectedEndDate)
  const _filteredMeetings = selectedMeetingType == "All" ? meetingData : meetingData.filter(x => x.meeting_label == selectedMeetingType)

  const filteredMeetings = _filteredMeetings.filter(x => x.datetime > selectedStartDate && x.datetime <= selectedEndDate)
    return (
      <div>
        <div class="mb-4 border-b-2 pt-8 pb-2">
          <div class="mb-4">
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
                <option value={label}>{label}</option>
              ))}
            </select>
          </div>
          <div class="pt-4">{filteredMeetings.length} results</div>
        </div>
        <MeetingList meetingData={filteredMeetings}/>
      </div>

    )}