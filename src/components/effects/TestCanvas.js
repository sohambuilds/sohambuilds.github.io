import React, { useEffect, useRef } from 'react';

const TestCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Simple test drawing
    ctx.fillStyle = 'rgba(96, 165, 250, 0.5)';
    ctx.fillRect(0, 0, 100, 100);
    
    console.log('Test canvas rendered');
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      style={{ border: '1px solid white' }}
    />
  );
};

export default TestCanvas;