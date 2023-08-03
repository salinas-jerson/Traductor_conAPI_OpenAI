import { useState } from 'react';

export const Emotic = () => {
    const [iconSize] = useState(100); 
    return (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            fontSize: `${iconSize}px`,
          }}
        >
          ☹️
        </div>
        
        
        
    );
};

