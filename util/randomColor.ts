export function generateVuetifyColorFunction(): string {
  const colors = ["teal", "red", "blue", "green", "purple"];
  const lightenLevel = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
  const selectedColor = colors[Math.floor(Math.random() * colors.length)];
  return `bg-${selectedColor}-lighten-${lightenLevel}`;
}
