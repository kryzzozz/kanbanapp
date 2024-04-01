import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIconColor]'
})
export class IconColorDirective implements OnInit{
  @Input() appIconColor = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.updateStyle();
  }
  ngOnChanges() {
    this.updateStyle();
  }
  private updateStyle() {
    if(this.appIconColor) {
      this.renderer.setStyle(this.el.nativeElement, 'color', this.appIconColor);
    }
    else {
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }

}
