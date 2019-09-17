
import React, { Suspense, lazy, Fragment } from 'react';

import LazyLoadingErrorBoundary from '../../LazyLoadingErrorBoundary';
import { useMemoryStatus } from '../../../utils/hooks';
import './cell.css';

const LazySimpleCell = lazy(() => import(/* webpackChunkName: "simple-cell" */ './SimpleCell'));
const LazyAnimationCell = lazy(() => import(/* webpackChunkName: "animation-cell" */ './AnimationCell'));
const Loading = () => <Fragment>Loading...</Fragment>;

const Cell = ({ ...rest }) => {
  const memoryStatus = useMemoryStatus();
  if (!memoryStatus) return <Loading />;

  console.log('[Cell] memoryStatus => ', memoryStatus);

  const { overLoaded } = memoryStatus;

  const adaptiveCell = overLoaded ? (
    <LazySimpleCell {...rest} />
  ) : (
    <LazyAnimationCell {...rest} />
  );

  return (
    <LazyLoadingErrorBoundary>
      <Suspense fallback={<Loading />}>
        {adaptiveCell}
      </Suspense>
    </LazyLoadingErrorBoundary>
  );
};

export default Cell;
