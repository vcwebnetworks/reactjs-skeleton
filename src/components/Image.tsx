import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

const Image: React.FC<ImageProps> = ({ fallback, ...props }) => (
  <img
    alt=''
    {...props}
    onError={event => {
      const element = event.currentTarget;

      if (fallback) {
        element.src = fallback;
      } else {
        element.style.visibility = 'hidden';
      }
    }}
  />
);

export default Image;
