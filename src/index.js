import fs from 'fs';
import _ from 'lodash';


const genDiff = (filepath1, filepath2) => {
    const content1 = fs.readFileSync(filepath1, 'utf-8');
    const content2 = fs.readFileSync(filepath2, 'utf-8');
    const data1 = JSON.parse(content1);
    const data2 = JSON.parse(content2);
    const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  
    const diff = keys.reduce((acc, key) => {
      if (!_.has(data1, key)) {
        acc[key] = { value: data2[key], type: '+' };
        
      } else if (!_.has(data2, key)) {
        acc[key] = { value: data1[key], type: '-' };

      } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        acc[key] = { children: genDiff(data1[key], data2[key]) };

      } else if (!_.isEqual(data1[key], data2[key])) {
        acc[key] = { value1: data1[key], value2: data2[key], type: '-' };

      } else {
        acc[key] = { value: data1[key] };
      }
      return acc;
    }, {});
  
    return JSON.stringify(diff, null, 2);
  };

export default genDiff;