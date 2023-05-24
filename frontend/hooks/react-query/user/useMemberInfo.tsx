import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { Project } from '@/types/project';
import { Answer } from '@/types/answer';
import { Community } from '@/types/community';
import { Comment } from '@/types/comment';

export const useMemberInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const getInfoQueryKey = (type: string) =>
    id ? [`members-info-${type}`, id] : [`members-info-${type}`, 'me'];

  const queryKeys = {
    projects: getInfoQueryKey('projects'),
    comments: getInfoQueryKey('comments'),
    answers: getInfoQueryKey('answers'),
    communities: getInfoQueryKey('articles'),
  };

  const { data: projectsData, isLoading: projectsLoading } = useQuery<
    Project[]
  >(queryKeys.projects, () =>
    api('/members/info/projects').then((res) => res.data.data)
  );
  const { data: commentsData, isLoading: commentsLoading } = useQuery<
    Comment[]
  >(queryKeys.comments, () =>
    api('/members/info/comments').then((res) => res.data.data)
  );
  const { data: answersData, isLoading: answersLoading } = useQuery<Answer[]>(
    queryKeys.answers,
    () => api('/members/info/answers').then((res) => res.data.data)
  );
  const { data: communitiesData, isLoading: communitiesLoading } = useQuery<
    Community[]
  >(queryKeys.communities, () =>
    api('/members/info/articles').then((res) => res.data.data)
  );

  const isLoading =
    projectsLoading || commentsLoading || answersLoading || communitiesLoading;

  return {
    projectsData,
    commentsData,
    answersData,
    communitiesData,isLoading
  };
};
