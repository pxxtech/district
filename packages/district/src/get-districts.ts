import {districtsObject} from './districts-object';
import {isEmpty} from 'lodash';

const getDistricts = (adcode?: any) => {
  if (isEmpty(adcode)) return;
  // 省
  const _province = districtsObject[adcode];
  if (_province) return {province: _province};
  // 市
  const provinceAdcode = `${adcode.substring(0, 2)}0000`;
  const province = districtsObject[provinceAdcode];
  const cityAdcode = `${adcode.substring(0, 4)}00`;
  const city = districtsObject[cityAdcode];
  const district = districtsObject[adcode]
  return {
    province,
    city,
    district
  }
}

export default getDistricts;
