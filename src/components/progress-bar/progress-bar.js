import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
// routes
import { usePathname } from 'src/routes/hooks';
//
import StyledProgressBar from './styles';

// ----------------------------------------------------------------------

export default function ProgressBar() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      NProgress.start();
      setVisible(true);
    }

    if (visible) {
      NProgress.done();
      setVisible(false);
    }

    if (!visible && mounted) {
      setVisible(false);
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted]);

  if (!mounted) {
    return null;
  }

  return <StyledProgressBar />;
}
