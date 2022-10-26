import utilStyles from '../styles/utils.module.css';
import Date from './date';

export default function MeetingList({ meetingData }) {
  return (
    <ul className={utilStyles.list}>
          {meetingData.map(({ id, agenda_url, cancelled, minutes_filename, datetime_iso, meeting_type, video_url }) => (
            <li className={utilStyles.listItem} key={id}>
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
                    <span> | <a href={`/minutes/${minutes_filename}`}>Minutes</a></span>
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
            </li>
          ))}
        </ul>
    );
                }