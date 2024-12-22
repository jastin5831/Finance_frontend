import PropTypes from 'prop-types';
import { LazyMotion, m, domMax } from 'framer-motion';

// ----------------------------------------------------------------------

export function MotionLazy({ children }) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}

MotionLazy.propTypes = {
  children: PropTypes.node,
};
