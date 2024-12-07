import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const Grid = () => {
  return (
    <gridHelper
      args={[1, 1, '#61c8ff', '#61c8ff']}
      position={[0, -1.49, 0]}
    >
      <meshBasicMaterial transparent opacity={0.9} />
    </gridHelper>
  );
};

export default Grid;
