// import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import { useEffect } from 'react';

export function Index() {
  // const sessionQuery = useQuery({
  //   queryFn: async () => {
  //     return axios.get('http://localhost:5050/auth/me');
  //   },
  //   queryKey: ['auth', 'me'],
  //   refetchOnWindowFocus: true,
  //   refetchOnMount: true,
  //   onSettled: () => {
  //     console.log('Fetched');
  //   },
  // });

  // useEffect(() => {
  //   console.log({ data: sessionQuery?.data?.data }, sessionQuery.status);
  // }, [
  //   sessionQuery.status,
  //   sessionQuery.data?.data,
  //   sessionQuery.isFetching,
  //   sessionQuery.isRefetching,
  // ]);

  const getMe = async () => {
    const response = await axios.get('https://localhost:5050/auth/me', {withCredentials: true});

    console.log(response.data);

    return response;
  };

  return (
    <>
      <h1>Payroll Web</h1>
      <button onClick={getMe}>Refetch</button>
      {/* {sessionQuery.isLoading && <div>Loading...</div>}
      {sessionQuery.isError && <div>Error...</div>}
      {sessionQuery.isSuccess && <div>Success</div>} */}

      <style jsx>{`
        .page {
        }
      `}</style>
    </>
  );
}

export default Index;
