import { Restaurant } from './types'; // Adjust the path according to your project structure

const segmentColors = [
  '#FFCC00', '#FF9900', '#FF6600', '#FF3300', '#FF0000', '#CC0000', '#990000',
  '#FF99CC', '#FF66CC', '#FF33CC', '#CC0099', '#990066', '#FF6699', '#FF3366',
  '#FF0033', '#FF6600', '#FF9933', '#FFCC66', '#FFFF66', '#FFFF00'
];

export const drawWheel = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  restaurants: Restaurant[],
  rotation: number,
  highlightedIndex: number | null,
  shortenName: (name: string) => string
): void => {
  const canvas = canvasRef.current;
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

    ctx.fillStyle = segmentColors[i % segmentColors.length];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + anglePerSegment / 2);

    const shortName = shortenName(restaurant.name);

    if (isHighlighted) {
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial';
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 10;
    } else {
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
    }

    ctx.textAlign = 'right';
    ctx.fillText(shortName, radius - 10, 10);
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
