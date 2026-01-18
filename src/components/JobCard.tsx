import './jobcard.scss';

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
        {job.url ? (
          <a
            className='job-card__title--link'
            href={
              job.url
                ? job.url
                : `https://news.ycombinator.com/item?id=${job.id}`
            }
            target='_blank'
            rel='noopener noreferrer'
          >
            {job.title}
          </a>
        ) : (
          job.title
        )}
      </h2>
      <p className='job-card__meta'>
        By {job.by} - {job.postedAt}
      </p>
    </article>
  );
}
