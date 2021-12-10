export function dateToString(d) {
  if (d === '') return '';

  let date;

  if (d instanceof Date) {
    date = d;
  } else {
    date = new Date(d);
  }

  return `${zero(date.getDate())}/${zero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
}

function zero(int) {
  return int < 10 ? '0' + int : '' + int;
}
