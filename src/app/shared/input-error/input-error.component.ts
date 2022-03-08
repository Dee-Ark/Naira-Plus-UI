import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";

@Component({
  selector: "app-input-error",
  templateUrl: "./input-error.component.html",
  styleUrls: ["./input-error.component.scss"],
})
export class InputErrorComponent implements OnInit {
  @Input()control!: FormGroup;
  @Input()name!: string;

  ngOnInit() {}

  showErrors() {
    const { invalid, touched, dirty } = this.control;
    return invalid && (touched || dirty);
  }
}
