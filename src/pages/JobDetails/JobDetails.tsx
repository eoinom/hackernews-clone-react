import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HN_API_URL } from '../../constants/api';
import type { HackerNewsJob } from '../../components/types/hackerNews';
import { timestampToDateAndTime } from '../../utils/formatTimestamp';
import './jobDetails.scss';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<HackerNewsJob | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`${HN_API_URL}/item/${id}.json`);
        const jobDetails: HackerNewsJob = await response.json();
        setJob(jobDetails);
      } catch (error) {
        console.error('Error fetching job with id:', id, error);
      }
    }
    fetchJob();
  }, [id]);

  return (
    <section className='jobDetailsPage'>
      {job && (
        <article
          key={job.id}
          className='jobDetailsPage__details'
        >
          <h2 className='jobDetailsPage__title'>
            {job.url ? (
              <a
                className='jobDetailsPage__title--link'
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
          <p className='jobDetailsPage__meta'>
            By {job.by} - {timestampToDateAndTime(job.time)}
          </p>
        </article>
      )}
      <Link to='/'>
        <button
          type='button'
          className='jobDetailsPage__button'
        >
          Back to job board
        </button>
      </Link>
    </section>
  );
}
