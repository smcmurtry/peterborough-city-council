import React, { useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import Date from './date';
import ReactPaginate from 'react-paginate';

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
  return (
    <ul className={utilStyles.list}>
      {meetingData.map(({ id, agenda_url, cancelled, minutes_filename, datetime_iso, meeting_type, video_url }) => (
        <li className={utilStyles.listItem} key={id}>
          <MeetingItem
            agenda_url={agenda_url}
            cancelled={cancelled}
            minutes_filename={minutes_filename}
            datetime_iso={datetime_iso}
            meeting_type={meeting_type}
            video_url={video_url}
          />
        </li>
      ))}
    </ul>
  );
}

export function MeetingItem({ agenda_url, cancelled, minutes_filename, datetime_iso, meeting_type, video_url }) {
  const minutes_dir_url = "https://city-council-scraper.s3.ca-central-1.amazonaws.com/minutes"
  return (
    <div>
      <div>
        <small className={utilStyles.lightText}>
          <Date dateString={datetime_iso} />
        </small>
      </div>
      <span>{meeting_type}</span>
      {cancelled ? <span> (Cancelled)</span> : null}
      <div>
        <small>
          {agenda_url != null ?
            <a href={agenda_url}>Agenda</a>
            :
            null
          }
          {minutes_filename != null && minutes_filename != "" ?
            <span> | <a href={`${minutes_dir_url}/${minutes_filename}`}>Minutes</a></span>
            :
            null
          }
          {video_url != "" ?
            <span> | <a href={video_url}>Video</a></span>
            :
            null
          }
        </small>
      </div>
    </div>
  )
}