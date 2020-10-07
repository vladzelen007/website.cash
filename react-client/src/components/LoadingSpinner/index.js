import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const LoadingSpinner = ({ isLoading }) => {
  return (
    <PuffLoader size={50} color={"#facd1a"} loading={isLoading} />
  )
}

export default LoadingSpinner;