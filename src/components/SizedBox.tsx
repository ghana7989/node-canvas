import React from 'react';

interface SizedBoxProps {
  vertical?: number;
  horizontal?: number;
}

const SizedBox: React.FC<SizedBoxProps> = ({ vertical = 20, horizontal = 0 }) => {
  // If neither vertical nor horizontal is provided, throw an error.
  if (!vertical && !horizontal) {
    throw new Error(
      'Either vertical or horizontal dimension must be provided for SizedBox.',
    );
  }

  // Define the style object based on the props provided.
  const style: React.CSSProperties = {
    width: horizontal ? `${horizontal}px` : 'auto',
    height: vertical ? `${vertical}px` : 'auto',
    display: 'block',
  };

  return <div style={style} />;
};

export default SizedBox;
