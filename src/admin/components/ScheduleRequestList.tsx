import type { ScheduleRequest } from "../../shared/types/schedule";

interface ScheduleRequestListProps {
  requests: ScheduleRequest[];
}

function formatRequestedDate(date: string, time?: string) {
  const parsedDate = new Date(`${date}T12:00:00`);
  const dateLabel = parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return time ? `${dateLabel} at ${time}` : dateLabel;
}

function ScheduleRequestList({ requests }: ScheduleRequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="calendar-empty-state">
        <h3>No pending schedule requests</h3>
        <p>
          New requests submitted through a Pioneer business website will
          appear here for review.
        </p>
      </div>
    );
  }

  return (
    <ul className="schedule-request-list">
      {requests.map((request) => (
        <li className="schedule-request" key={request.id}>
          <div className="schedule-request__header">
            <div>
              <p className="schedule-request__business">
                {request.business}
              </p>
              <h3 className="schedule-request__customer">
                {request.customerName}
              </h3>
            </div>

            <span className="schedule-request__status">
              {request.status}
            </span>
          </div>

          <dl className="schedule-request__details">
            <div>
              <dt>Request</dt>
              <dd>{request.requestType}</dd>
            </div>

            <div>
              <dt>Preferred date</dt>
              <dd>
                {formatRequestedDate(
                  request.requestedDate,
                  request.requestedTime
                )}
              </dd>
            </div>

            {request.location ? (
              <div>
                <dt>Location</dt>
                <dd>{request.location}</dd>
              </div>
            ) : null}
          </dl>

          <div className="schedule-request__actions">
            <button
              className="schedule-request__button schedule-request__button--approve"
              type="button"
            >
              Approve
            </button>

            <button className="schedule-request__button" type="button">
              Review
            </button>

            <button
              className="schedule-request__button schedule-request__button--decline"
              type="button"
            >
              Decline
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ScheduleRequestList;
