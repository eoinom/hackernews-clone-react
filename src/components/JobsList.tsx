import JobCard, { type JobPost } from './JobCard';
import './jobslist.scss';

export type JobsListProps = {
  jobs: JobPost[];
};

export default function JobsList({ jobs }: JobsListProps) {
  return (
    <div className='jobs-list'>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}
