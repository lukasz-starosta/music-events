export default function today() {
  const date = new Date();
  let dd = date.getDate().toString();
  let mm = (date.getMonth() + 1).toString();
  const yyyy = date.getFullYear();
  if (parseInt(dd) < 10) {
    dd = '0' + dd
  }
  if (parseInt(mm) < 10) {
    mm = '0' + mm
  }

  return yyyy + '-' + mm + '-' + dd;
}
