import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  coerceBooleanProperty,
  ESCAPE,
  TAB,
  DateUtil,
  Overlay,
  OverlayState,
  OverlayRef,
  TemplatePortal,
  HorizontalConnectionPos,
  VerticalConnectionPos,
} from '../core';
import { fadeInContent } from '../datepicker/datepicker-animations';
import { Subscription } from 'rxjs/Subscription';

export type Container = 'inline' | 'dialog';
export type PanelPositionX = 'before' | 'after';
export type PanelPositionY = 'above' | 'below';

@Component({
  moduleId: module.id,
  selector: 'md2-date-range-picker',
  templateUrl: 'date-range-picker.html',
  styleUrls: ['./date-range-picker.css'],
  host: {
    'role': 'date-range-picker',
    '[class.md2-date-range-picker-disabled]': 'disabled',
    '[class.md2-date-range-picker-opened]': 'panelOpen',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-disabled]': 'disabled.toString()'
  },
  animations: [
    fadeInContent
  ],
})
export class Md2DateRangePicker implements OnInit, OnDestroy {

  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef;
  private _backdropSubscription: Subscription;

  private _panelOpen = false;

  private _openOnFocus: boolean = false;
  private _container: Container = 'inline';
  private _format: string;

  private _startDateValue: Date = null;
  private _startDatePicker: Date = null;

  private _endDateValue: Date = null;
  private _endDatePicker: Date = null;

  private _positionX: PanelPositionX = 'after';
  private _positionY: PanelPositionY = 'below';
  private _overlapTrigger: boolean = true;

  _transformOrigin: string = 'top';
  _panelDoneAnimating: boolean = false;

  displayDates: boolean = true;

  _onTouched = () => { };

  @ViewChild('portal') _templatePortal: TemplateRef<any>;

  @Input() disabled: boolean = false;

  @Input() placeholder: string = 'Select Date Range';
  @Input() okLabel: string = 'Ok';
  @Input() cancelLabel: string = 'Cancel';
  @Input() tabindex: number = 0;

  @Input()
  get startDateValue() {return this._startDateValue; }
  set startDateValue(d: Date) { this._startDateValue = d; }

  @Input()
  get startDatePicker() { return this._startDatePicker; }
  set startDatePicker(d: Date) {
    this._startDatePicker = d;
    this.startDatePickerChange.emit(this._startDatePicker);
  }

  @Input()
  get endDateValue() { return this._endDateValue; }
  set endDateValue(d: Date) { this._endDateValue = d; }

  @Input()
  get endDatePicker() { return this._endDatePicker; }
  set endDatePicker(d: Date) {
    this._endDatePicker = d;
    this.endDatePickerChange.emit(this._endDatePicker);
  }

  @Input() startMaxDate: Date = null;
  @Input() startMinDate: Date = null;
  @Input() endMinDate: Date = null;
  @Input() endMaxDate: Date = null;

  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Output() startDateValueChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() startDatePickerChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() endDateValueChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() endDatePickerChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  get format() {
    return this._format || 'MM/dd/y';
  }
  set format(value: string) {
    this._format = value;
    this.displayDates = (value !== 'none');
  }

  @Input()
  get container() { return this._container; }
  set container(value: Container) {
    if (this._container !== value) {
      this._container = value || 'inline';
      this.destroyPanel();
    }
  }

  @Input()
  get openOnFocus(): boolean { return this._openOnFocus; }
  set openOnFocus(value: boolean) { this._openOnFocus = coerceBooleanProperty(value); }

  @Input()
  set isOpen(value: boolean) {
    if (value && !this.panelOpen) {
      this.open();
    }
  }

  constructor(private _element: ElementRef,
              private overlay: Overlay,
              private _viewContainerRef: ViewContainerRef,
              private _util: DateUtil) {
  }

  ngOnInit() { }

  ngOnDestroy() { this.destroyPanel(); }

  get panelOpen(): boolean {
    return this._panelOpen;
  }

  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled) { return; }
    this._createOverlay();

    if (!this._portal) {
      this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
    }

    this._overlayRef.attach(this._portal);
    this._subscribeToBackdrop();
    this._panelOpen = true;
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    setTimeout(() => {
      this._panelOpen = false;
      if (this._openOnFocus) {
        this._openOnFocus = false;
        setTimeout(() => { this._openOnFocus = true; }, 100);
      }
      if (this._overlayRef) {
        this._overlayRef.detach();
        this._backdropSubscription.unsubscribe();
      }
    }, 10);
  }

  /** Removes the panel from the DOM. */
  destroyPanel(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      this._cleanUpSubscriptions();
    }
  }

  _onPanelDone(): void {
    if (this.panelOpen) {
      this._focusPanel();
      this.onOpen.emit();
    } else {
      this.onClose.emit();
    }
  }

  _onFadeInDone(): void {
    this._panelDoneAnimating = this.panelOpen;
  }

  _handleWindowResize(event: Event) {
    if (this.container === 'inline') {
      this.close();
    }
  }

  private _focusPanel(): void {
    let el: any = document.querySelectorAll('.md2-date-range-picker-panel')[0];
    el.focus();
  }

  _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }
    if (this.panelOpen) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.keyCode) {
        case TAB:
        case ESCAPE: this._onBlur(); this.close(); break;

        // case ENTER:
        // case SPACE: this._onClickOk(); break;

      }
    }
  }

  isOkDisabled(): boolean {
    const bDisabled = (!this.startDatePicker || !this.endDatePicker);
    return bDisabled;
  }

  /**
   * Ok Button Event
   */
  _onClickOk() {
    if (!this.isOkDisabled()) {
      // Save dates
      this.startDateValue = new Date(this.startDatePicker.getTime());
      this.endDateValue = new Date(this.endDatePicker.getTime());
      this.startDateValueChange.emit(this._startDateValue);
      this.endDateValueChange.emit(this._endDateValue);
      // this.onSave.emit();
      // Close dialog
      this._onBlur();
      this.close();
    }
  }

  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
  }

  private _subscribeToBackdrop(): void {
    this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  /**
   *  This method creates the overlay from the provided panel's template and saves its
   *  OverlayRef so that it can be attached to the DOM when open is called.
   */
  private _createOverlay(): void {
    if (!this._overlayRef) {
      let config = new OverlayState();
      if (this.container === 'inline') {
        const [posX, fallbackX]: HorizontalConnectionPos[] =
          this._positionX === 'before' ? ['end', 'start'] : ['start', 'end'];

        const [overlayY, fallbackOverlayY]: VerticalConnectionPos[] =
          this._positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

        let originY = overlayY;
        let fallbackOriginY = fallbackOverlayY;

        if (!this._overlapTrigger) {
          originY = overlayY === 'top' ? 'bottom' : 'top';
          fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
        }
        config.positionStrategy = this.overlay.position().connectedTo(this._element,
          { originX: posX, originY: originY },
          { overlayX: posX, overlayY: overlayY })
          .withFallbackPosition(
            { originX: fallbackX, originY: originY },
            { overlayX: fallbackX, overlayY: overlayY })
          .withFallbackPosition(
            { originX: posX, originY: fallbackOriginY },
            { overlayX: posX, overlayY: fallbackOverlayY })
          .withFallbackPosition(
            { originX: fallbackX, originY: fallbackOriginY },
            { overlayX: fallbackX, overlayY: fallbackOverlayY });
        config.hasBackdrop = true;
        config.backdropClass = 'cdk-overlay-transparent-backdrop';
      } else {
        config.positionStrategy = this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically();
        config.hasBackdrop = true;
      }
      this._overlayRef = this.overlay.create(config);
    }
  }

  private _cleanUpSubscriptions(): void {
    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }
  }

}
