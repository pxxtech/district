# getDistrict 根据adcode查询省市区县

## 安装、使用
`npm i @pxxtech/district -S`

`import {getDistrict} from '@pxxtech/district';`
`const {province, city, district} = getDistrict(adcode);`

## 数据源
https://restapi.amap.com/v3/config/district

## 行政区划代码（adcode）规则说明
代码共6位，前两位代表省（一级）、中间两位为市/地区（二级），最后两位为区县（三级）
1. 省级：前两位有值，后4位置0，如，河北省：130000
2. 市/地区：前4四位有值，包含省代码与市代码，最后两位置0，如河北省保定市：130600
3. 区县：6位全有值，包含前4位省市代码及区县代码，河北省保定市涿州市：130681
4. 直辖县：第3、4位为90的，为省直辖县

## 如何获取城市编码（city_code）：
1. 编码前4位不为0，第5、6位为0的，为常规城市，可直接取用
2. 北京、上海、重庆、天津、香港、澳门，编码和省一致，需要单独提出
3. 第3、4位为90的为省直辖县，一般当做城市来应用，也需要单独提出



