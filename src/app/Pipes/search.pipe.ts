import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/Employee';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(list:Employee[],searchText:string){
    if(searchText=='' ||searchText==' '){
      return list;
    }
    else{
      return list.filter((emp)=>{
        return emp.name.toString().includes(searchText.toLocaleLowerCase());
      })
    }
  }
}
