import { useMemo, useState } from "react";

import JobDetail from "../components/JobDetail";
import JobFilters from "../components/JobFilters";
import JobTable from "../components/JobTable";
import type { BusinessSlug } from "../../shared/types/business";
import type { JobPriority, JobRecord, JobStatus } from "../../shared/types/job";

const seedJobs: JobRecord[] = [
  {
    id: "job-1",
    jobNumber: "JOB-2026-001",
    business: "landscaping",
    customerName: "Sample Customer",
    title: "Property cleanup and pressure washing",
    description: "Complete exterior wash, debris removal, and final walkthrough.",
    status: "scheduled",
    priority: "high",
    scheduledDate: "2026-07-18",
    startTime: "08:00",
    endTime: "12:00",
    location: "Franklinton, LA",
    crew: ["Crew A"],
    equipment: ["Pressure washer", "Utility trailer"],
    estimateId: "EST-2026-004",
    estimatedValue: 1450,
    notes: "Customer requested arrival confirmation by phone.",
    checklist: [
      { id: "c1", label: "Before photos captured", completed: false },
      { id: "c2", label: "Work completed", completed: false },
      { id: "c3", label: "Customer walkthrough", completed: false }
    ],
    createdAt: "2026-07-12T10:00:00",
    updatedAt: "2026-07-15T09:00:00"
  },
  {
    id: "job-2",
    jobNumber: "JOB-2026-002",
    business: "transport",
    customerName: "Sample Commercial Client",
    title: "Equipment delivery",
    description: "Pickup and deliver equipment to the customer site.",
    status: "in-progress",
    priority: "normal",
    scheduledDate: "2026-07-16",
    startTime: "13:00",
    location: "Bogalusa, LA",
    crew: ["Driver 1"],
    equipment: ["Flatbed truck"],
    estimatedValue: 825,
    checklist: [
      { id: "c4", label: "Load inspected", completed: true },
      { id: "c5", label: "Delivery confirmed", completed: false }
    ],
    createdAt: "2026-07-13T11:00:00",
    updatedAt: "2026-07-16T13:15:00"
  },
  {
    id: "job-3",
    jobNumber: "JOB-2026-003",
    business: "productions",
    customerName: "Sample Production Client",
    title: "Promotional video consultation",
    description: "Planning session for a short promotional video project.",
    status: "waiting",
    priority: "low",
    scheduledDate: "2026-07-22",
    startTime: "11:00",
    location: "Remote",
    crew: [],
    equipment: [],
    estimatedValue: 500,
    checklist: [
      { id: "c6", label: "Creative brief received", completed: false },
      { id: "c7", label: "Scope approved", completed: false }
    ],
    createdAt: "2026-07-14T08:30:00",
    updatedAt: "2026-07-14T08:30:00"
  }
];

function Jobs() {
  const [jobs, setJobs] = useState(seedJobs);
  const [selectedJobId, setSelectedJobId] = useState(seedJobs[0]?.id);
  const [search, setSearch] = useState("");
  const [business, setBusiness] = useState<BusinessSlug | "all">("all");
  const [status, setStatus] = useState<JobStatus | "all">("all");
  const [priority, setPriority] = useState<JobPriority | "all">("all");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        [job.jobNumber, job.customerName, job.title, job.location]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (business === "all" || job.business === business) &&
        (status === "all" || job.status === status) &&
        (priority === "all" || job.priority === priority)
      );
    });
  }, [jobs, search, business, status, priority]);

  const selectedJob = jobs.find((job) => job.id === selectedJobId);
  const activeCount = jobs.filter((job) => ["scheduled", "in-progress", "waiting"].includes(job.status)).length;
  const scheduledValue = jobs
    .filter((job) => job.status !== "cancelled")
    .reduce((sum, job) => sum + job.estimatedValue, 0);

  const updateSelectedJob = (updater: (job: JobRecord) => JobRecord) => {
    setJobs((current) =>
      current.map((job) => (job.id === selectedJobId ? updater(job) : job))
    );
  };

  return (
    <section className="jobs-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-page-heading__eyebrow">Operations</p>
          <h2 className="admin-page-heading__title">Jobs</h2>
          <p className="admin-page-heading__description">
            Track scheduled work from approval through completion.
          </p>
        </div>
        <button className="jobs-page__create-button" type="button">
          Create Job
        </button>
      </div>

      <div className="jobs-summary">
        <article><span>Total jobs</span><strong>{jobs.length}</strong></article>
        <article><span>Active jobs</span><strong>{activeCount}</strong></article>
        <article><span>In progress</span><strong>{jobs.filter((job) => job.status === "in-progress").length}</strong></article>
        <article><span>Scheduled value</span><strong>${scheduledValue.toLocaleString()}</strong></article>
      </div>

      <JobFilters
        search={search}
        business={business}
        status={status}
        priority={priority}
        onSearchChange={setSearch}
        onBusinessChange={setBusiness}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      <div className="jobs-layout">
        <JobTable
          jobs={filteredJobs}
          selectedJobId={selectedJobId}
          onSelectJob={(job) => setSelectedJobId(job.id)}
        />

        <JobDetail
          job={selectedJob}
          onStatusChange={(nextStatus) =>
            updateSelectedJob((job) => ({ ...job, status: nextStatus, updatedAt: new Date().toISOString() }))
          }
          onToggleChecklist={(itemId) =>
            updateSelectedJob((job) => ({
              ...job,
              checklist: job.checklist.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
              updatedAt: new Date().toISOString()
            }))
          }
        />
      </div>
    </section>
  );
}

export default Jobs;
