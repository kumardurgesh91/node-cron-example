/* eslint-disable operator-linebreak */
async function checkBlank(manValues) {
  const object = manValues;
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in object) {
    if (
      `${object[prop]}` === undefined ||
      `${object[prop]}` === 'undefined' ||
      (`${object[prop]}` === '' || `${object[prop]}`) === null
    ) {
      return {
        success: false,
        message: `${prop} missing`,
      };
    }
  }
  return false;
}

module.exports = { checkBlank };
