import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'newlineToParagraphs',
  standalone: true // ✅ Required for standalone components
})
export class NewlineToParagraphsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    const paragraphs = value
      .split('\n')
      .map(p => `<p>${p}</p>`)
      .join('');
    return this.sanitizer.bypassSecurityTrustHtml(paragraphs);
  }
}
