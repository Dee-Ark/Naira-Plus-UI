import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  HostListener,
} from "@angular/core";
import {
  NumericValidator,
  AllowedKeys,
  AllowedCurrencyKeys,
} from "./digitValidators";

@Directive({
  selector: "[appInputValidator]",
})
export class InputValidatorDirective implements OnInit {
  @Input("appInputValidator") selectInput = "";

  input: HTMLInputElement;

  constructor(el: ElementRef) {
    this.input = el.nativeElement;
  }

  ngOnInit() {
    //   console.log('appInputValidator', this.selectInput, this.input);
  }

  @HostListener("keydown", ["$event", "$event.keyCode"])
  onKeyDown($event: KeyboardEvent, keyCode: any) {
    const key = $event.key;
    const valid = NumericValidator(key);
    const allowedKey = AllowedKeys(keyCode);
    const allowedCurrencyKey = AllowedCurrencyKeys(keyCode);

    if (this.selectInput === "number") {
      if (!key.match(/^[A-Z0-9]+|[\b]+$/)) {
        $event.preventDefault();
      }
    }

    if (this.selectInput === "currency") {
      if (!key.match(/^[a-zA-Z0-9.]+|[\b]+$/)) {
        $event.preventDefault();
      }
    }

    if (this.selectInput === "character") {
      if (!key.match(/^[a-zA-Z]+$/)) {
        $event.preventDefault();
      }
    }

    if (this.selectInput === "characterWithSpace") {
      if (!key.match(/^[a-zA-Z, ]+$/)) {
        $event.preventDefault();
      }
    }

    if (this.selectInput === "alphanumeric") {
      if (!key.match(/^[a-zA-Z0-9]/)) {
        $event.preventDefault();
      }
    }
    if (this.selectInput === "tel") {
      const regex = new RegExp(/^[{+}A-Z0-9]+|[\b]+$/);
      console.log("this.selectInput", this.selectInput);
      if (!regex.test(key)) {
        $event.preventDefault();
      }
    }

    if (this.selectInput === "alphanumericWithSpace") {
      if (!key.match(/^[a-zA-Z0-9, ]/)) {
        $event.preventDefault();
      }
    }
  }
}
