const fs = require('fs');
const axios = require('axios');
const isEmpty = require('lodash/isEmpty');

const loopSort = (districts) => {
  if (isEmpty(districts)) return;
  districts.sort((a, b) => +a.adcode - +b.adcode);
  districts.forEach((item) => {
    loopSort(item.districts);
  })
}

const getObject = (districts) => {
  if (isEmpty(districts)) return;
  return districts.reduce((result, item) => {
    result[item.adcode] = {
      ...item,
      districts: getObject(item.districts)
    };
    return result;
  }, {})
}

const main = async () => {
  const {status, info, infocode, districts} = await axios.get('https://restapi.amap.com/v3/config/district', {
    params: {
      key: "ef96f75c50278a8a75c10519cbc1c325",
      subdistrict: "3"
    }
  }).then(({data}) => data);
  if (!(info === "OK" && infocode === "10000" && status === "1")) return;
  loopSort(districts[0].districts);
  const districtsArray = districts[0].districts;
  const districtsObject = getObject(districtsArray);
  fs.writeFile(
    './src/districts-array.ts',
    `export const districtsArray:any = ${JSON.stringify(districtsArray)}`,
    (error) => {
      if (error) console.log(error);
    },
  );
  fs.writeFile(
    './src/districts-object.ts',
    `export const districtsObject:any = ${JSON.stringify(districtsObject)}`,
    (error) => {
      if (error) console.log(error);
    },
  );
};

main();
