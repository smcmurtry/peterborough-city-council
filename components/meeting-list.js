import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import {Date} from './date';
import ReactPaginate from 'react-paginate';
import Link from "next/link";

export default function PaginatedMeetingList({ meetings, meetingsPerPage }) {
  // Here we use meeting offsets; we could also use page offsets
  // following the API or data you're working with.
  const [meetingOffset, setMeetingOffset] = useState(0);
  // Simulate fetching meetings from another resources.
  // (This could be meetings from props; or meetings loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = meetingOffset + meetingsPerPage;
  console.log(`Loading meetings from ${meetingOffset} to ${endOffset}`);
  const currentMeetings = meetings.slice(meetingOffset, endOffset);
  const pageCount = Math.ceil(meetings.length / meetingsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * meetingsPerPage) % meetings.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setMeetingOffset(newOffset);
  };

  return (
    <>
      <div className="mb-4 border-b-2">Showing {meetingOffset + 1} to {endOffset} of {meetings.length} results</div>
      <MeetingList meetingData={currentMeetings} />
      <nav aria-label="Page navigation for Meetings" className="mt-6">
        <ReactPaginate
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
          hrefBuilder={(page, pageCount, selected) =>
            page >= 1 && page <= pageCount ? `/page/${page}` : '#'
          }
          hrefAllControls
        />
      </nav>

    </>
  )
}

export function MeetingList({ meetingData }) {
  console.log(meetingData[0])
  return (
    <ul className={utilStyles.list}>
      {meetingData.map(({ id, datetime_iso, meeting_type }) => (
        <li className={utilStyles.listItem} key={id}>
          <MeetingItem
            id={id}
            datetime_iso={datetime_iso}
            meeting_type={meeting_type}
          />
        </li>
      ))}
    </ul>
  );
}

export function MeetingItem({ id, datetime_iso, meeting_type }) {
  const queryId = id == "blah" ? "unknown" : id
  return (
    <Link href={{ pathname: `/meetings/${queryId}.html` }}>
      <a>
        <span>
          <small>
            <Date dateString={datetime_iso} />
          </small>
          <br />
        </span>
        <span>{meeting_type}</span>
      </a>
    </Link>
  )
}