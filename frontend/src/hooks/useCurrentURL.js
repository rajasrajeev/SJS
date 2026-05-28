import { useLocation, useParams } from 'react-router-dom';

function useCurrentURL() {
  const location = useLocation();
  const params = useParams();

  return {
    pathname: location.pathname,
    search: location.search,
    params,
  };
}

export default useCurrentURL