import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'shorten'
})
export class ShortenPipe implements PipeTransform {
    
    //transform(value: any, ...args: any[])
    transform(value: any, limit?: number, showcase?: string) {
        if(value.length > limit) 
        {
            return value.substr(0, limit) + ' ...';
        }
        return value
    }

}