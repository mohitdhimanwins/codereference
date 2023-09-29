import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'masked' })
export class MaskedPipe implements PipeTransform {
  transform(value: string, masked = false): string {
    if (!masked) return value;
    return value?.replace(/[A-Za-z0-9]/g, '*'); 
  }
}
