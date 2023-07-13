export const encodeCurlyBrackets = (input: string) => {
  const regex1 = new RegExp('{', 'g');
  const regex2 = new RegExp('}', 'g');
  const regex3 = new RegExp('&#123&#123', 'g');
  const regex4 = new RegExp('&#125&#125', 'g');

  return input.replace(regex1, '&#123')
    .replace(regex2, '&#125')
    .replace(regex3, '{{')
    .replace(regex4, '}}');
}
