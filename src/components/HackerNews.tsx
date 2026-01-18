import { useEffect, useState } from 'react';
import JobsList, { type JobsListProps } from './JobsList';
import './hackernews.scss';

type HackerNewsJob = {
  id: number;
  by: string;
  title: string;
  time: number;
  type: string;
  url?: string;
};

const HN_API_URL = 'https://hacker-news.firebaseio.com/v0';
const NUMBER_POSTS_TO_FETCH = 6;

export default function HackerNews() {
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<HackerNewsJob[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`${HN_API_URL}/jobstories.json`);
        const ids: number[] = await response.json();
        const jobPromises = ids
          .splice(0, NUMBER_POSTS_TO_FETCH)
          .map(async (id) => {
            const jobResponse = await fetch(`${HN_API_URL}/item/${id}.json`);
            return jobResponse.json();
          });
        const jobsData: HackerNewsJob[] = await Promise.all(jobPromises);

        setJobIds(ids);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    fetchJobs();
  }, []);

  const formattedJobs: JobsListProps['jobs'] = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    by: job.by,
    postedAt: `${new Date(job.time * 1000).toLocaleDateString()}, ${new Date(job.time * 1000).toLocaleTimeString('en-US')}`,
    url: job.url,
  }));

  const onLoadMore = async () => {
    const ids = [...jobIds];
    const nextJobIds = ids.splice(0, NUMBER_POSTS_TO_FETCH);
    const jobPromises = nextJobIds.map(async (id) => {
      const jobResponse = await fetch(`${HN_API_URL}/item/${id}.json`);
      return jobResponse.json();
    });
    const newJobsData: HackerNewsJob[] = await Promise.all(jobPromises);

    setJobIds(ids);
    setJobs((prevJobs) => [...prevJobs, ...newJobsData]);
  };

  return (
    <section className='hackernews'>
      <h1 className='hackernews__title'>Hacker News Jobs Board</h1>
      <JobsList jobs={formattedJobs} />
      {jobIds.length > 0 && (
        <button
          className='hackernews__button'
          onClick={onLoadMore}
        >
          Load more jobs
        </button>
      )}
    </section>
  );
}
