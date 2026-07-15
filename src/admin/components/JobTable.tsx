import type { JobRecord } from "../../shared/types/job";

interface JobTableProps {
  jobs: JobRecord[];
  selectedJobId?: string;
  onSelectJob: (job: JobRecord) => void;
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function JobTable({ jobs, selectedJobId, onSelectJob }: JobTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="jobs-empty-state">
        <h3>No jobs found</h3>
        <p>Adjust the filters or create a new job.</p>
      </div>
    );
  }

  return (
    <div className="job-table-wrapper">
      <table className="job-table">
        <thead>
          <tr>
            <th>Job</th>
            <th>Customer</th>
            <th>Business</th>
            <th>Date</th>
            <th>Status</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className={selectedJobId === job.id ? "job-table__row--selected" : ""}
              onClick={() => onSelectJob(job)}
            >
              <td>
                <strong>{job.jobNumber}</strong>
                <span>{job.title}</span>
              </td>
              <td>{job.customerName}</td>
              <td>{job.business}</td>
              <td>{formatDate(job.scheduledDate)}</td>
              <td>
                <span className={`job-status job-status--${job.status}`}>
                  {job.status}
                </span>
              </td>
              <td>${job.estimatedValue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
