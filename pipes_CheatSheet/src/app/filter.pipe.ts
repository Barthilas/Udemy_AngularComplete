import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';
//ng g p filter --skip-tests
//not really a good practice, does not update on array change.. -> PURE

@Pipe({
  name: 'filter',
  pure: false //will reload now on any data change!! -> performance issues
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === ''){
      return value;
    }
    const resultArray = []
    for (const item of value) {
      if (item[propName] === filterString)
      {
        resultArray.push(item);
      }
    }
    return resultArray
  }

}
