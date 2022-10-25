import {districtsObject} from './districts-object';
import {isEmpty, uniq} from 'lodash';

const getDistrict = (adcode?: any) => {
  if (isEmpty(adcode)) return {};
  const adcodes = uniq([`${adcode.substring(0, 2)}0000`, `${adcode.substring(0, 4)}00`, adcode]);
  return adcodes.reduce((result, code) => {
    const district = districtsObject[code];
    if (isEmpty(district)) return result;
    result[district.level] = district;
    return result;
  }, {})
}

export default getDistrict;
