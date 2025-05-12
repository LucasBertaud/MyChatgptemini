import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: `[copyToClipboard]`,
  standalone: true,
})
export class CopyToClipboardDirective {
  @Input('copyToClipboard') targetId: string = '';
  constructor(private el: ElementRef) {}

  @HostListener('click') copy() {
    const copyText = document.getElementById(this.targetId) as HTMLInputElement;
    if (!copyText.textContent) {
      return;
    }
    navigator.clipboard.writeText(copyText.textContent);
  }
}
