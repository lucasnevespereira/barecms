import React from 'react';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  const sizeClass = `loading-spinner loading-${size}`;

  return (
    <div>
      <span className={`loading ${sizeClass}`}></span>
    </div>
  );
}

export default Loader;