import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStrikethrough]'
})
export class StrikethroughDirective implements OnInit {
  @Input() appStrikethrough = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.updateStyle();
  }
  ngOnChanges() {
    this.updateStyle();
  }
  private updateStyle() {
    if(this.appStrikethrough) {
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'line-through');
    }
    else {
      this.renderer.removeStyle(this.el.nativeElement, 'text-decoration');
    }
  }

}
