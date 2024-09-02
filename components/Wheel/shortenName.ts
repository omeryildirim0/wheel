export const shortenName = (name: string): string => {
  const maxLength = 15;
  return name.length > maxLength ? name.slice(0, maxLength - 3) + '...' : name;
};
