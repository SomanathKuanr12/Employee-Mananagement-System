import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/Employee';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(list:Employee[],sortBy:string){
    console.log(list);
    
    if(sortBy=='all')
      {
        return list;
      }
      else if(sortBy=='asc')
        {
          return  list.sort((a, b) => (a.salary > b.salary) ? 1 : -1);
        }
        else(sortBy=='desc')
          {
            return  list.sort((a, b) => (a.salary < b.salary) ? 1 : -1);
          }
  }
}
