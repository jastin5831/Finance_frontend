import { useLocation, matchPath } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useActiveLink(path, deep = true) {
  const { pathname } = useLocation();

  const normalActive = path ? !!matchPath({ path, end: true }, pathname) : false;

  const deepActive = path ? !!matchPath({ path, end: false }, pathname) : false;

  return deep ? deepActive : normalActive;
}
