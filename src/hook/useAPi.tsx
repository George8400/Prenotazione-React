import useSWR from 'swr';
import { ApiRoutes, ApiType } from '../api/routes/apiRoutes';
import { fetcher } from '../api/utils/fetcher';

interface ApiProps {
  api: ApiType;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: any;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const useAPi = ({ api, body, headers, method, url, onError, onSuccess }: ApiProps) => {
  const { data, error, isLoading, mutate } = useSWR(ApiRoutes[api], fetcher);

  if (error) {
    onError && onError(error);
  }

  if (data) {
    onSuccess && onSuccess(data);
    console.log('data', data);
  }

  return { data };
};

export default useAPi;
