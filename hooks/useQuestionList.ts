import { getQuestionList } from '@/app/(dashboard)/problem-list/data';
import { QuestionType } from '@/lib/schema/QuestionSchema';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useState, useEffect } from 'react';

type Param = { [key: string]: string | string[] | undefined }

export function useQuestionList(value: Param, delay: number, session: RequestCookie | undefined, active?: boolean) {
  const [params, setParams] = useState(value);
  const [data, setData] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
        setParams(value); 
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  useEffect(() => {
    setLoading(true);
    getQuestionList(
      params.page, 
      params.modules, 
      params.tags, 
      params.difficulty, 
      params.query,
      session,
      active
    ).then(response => {
      if (response) {
        setData(response);
      }
    });
    setLoading(false);
  }, [params, session, active]); 

  return {loading, data};
}

