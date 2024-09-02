const drawWheel = (canvas: HTMLCanvasElement | null, restaurants: any[], rotation: number, highlightedIndex: number | null) => {
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const numSegments = restaurants.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    restaurants.forEach((restaurant, i) => {
      const startAngle = i * anglePerSegment + rotation;
      const endAngle = startAngle + anglePerSegment;
      const isHighlighted = i === highlightedIndex;
  
      ctx.fillStyle = '#FFCC00'; // Simplify or use a color function
  
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();
  
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
  
      ctx.fillStyle = isHighlighted ? 'white' : 'black';
      ctx.font = isHighlighted ? 'bold 20px Arial' : '16px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(restaurant.name, radius - 10, 10);
      ctx.restore();
    });
  
    ctx.fillStyle = '#FFCC00';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius / 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'blue';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Wheel of', centerX, centerY - 10);
    ctx.fillText('Meals', centerX, centerY + 20);
  };
  
  export default drawWheel;
  