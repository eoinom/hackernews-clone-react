import { Link } from 'react-router-dom';
import './jobCard.scss';

export type JobPost = {
  id: number;
  title: string;
  by: string;
  postedAt: string;
  url?: string;
};

export type JobCardProps = {
  job: JobPost;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <article
      key={job.id}
      className='job-card'
    >
      <h2 className='job-card__title'>
        <Link
          className='job-card__title--link'
          to={`jobs/${job.id}`}
        >
          {job.title}
        </Link>
      </h2>
      <p className='job-card__meta'>
        By {job.by} - {job.postedAt}
      </p>
    </article>
  );
}
