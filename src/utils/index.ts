export function getRedirectTo(type: string, header: string) {
  let path
  if (type === 'laoban') {
    path = '/laoban'
  } else if (type === 'dashen') {
    path = '/dashen'
  }
  if (!header) {
    path += 'info'
  }
  return path
}