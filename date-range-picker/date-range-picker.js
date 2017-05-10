var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { coerceBooleanProperty, ESCAPE, TAB, Overlay, OverlayState, TemplatePortal, } from '../core';
import { fadeInContent } from '../datepicker/datepicker-animations';
var Md2DateRangePicker = (function () {
    function Md2DateRangePicker(_element, overlay, _viewContainerRef) {
        this._element = _element;
        this.overlay = overlay;
        this._viewContainerRef = _viewContainerRef;
        this._panelOpen = false;
        this._openOnFocus = false;
        this._container = 'inline';
        this._startDateValue = null;
        this._startDatePicker = null;
        this._endDateValue = null;
        this._endDatePicker = null;
        this._positionX = 'after';
        this._positionY = 'below';
        this._overlapTrigger = true;
        this._transformOrigin = 'top';
        this._panelDoneAnimating = false;
        this.displayDates = true;
        this._onTouched = function () { };
        this.disabled = false;
        this.placeholder = 'Select Date Range';
        this.okLabel = 'Ok';
        this.cancelLabel = 'Cancel';
        this.startMinDate = null;
        this.startMaxDate = null;
        this.endMinDate = null;
        this.endMaxDate = null;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.startDateValueChange = new EventEmitter();
        this.startDatePickerChange = new EventEmitter();
        this.endDateValueChange = new EventEmitter();
        this.endDatePickerChange = new EventEmitter();
    }
    Object.defineProperty(Md2DateRangePicker.prototype, "startDateValue", {
        get: function () { return this._startDateValue; },
        set: function (d) { this._startDateValue = d; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DateRangePicker.prototype, "startDatePicker", {
        get: function () { return this._startDatePicker; },
        set: function (d) {
            this._startDatePicker = d;
            this.startDatePickerChange.emit(this._startDatePicker);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DateRangePicker.prototype, "endDateValue", {
        get: function () { return this._endDateValue; },
        set: function (d) { this._endDateValue = d; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DateRangePicker.prototype, "endDatePicker", {
        get: function () { return this._endDatePicker; },
        set: function (d) {
            this._endDatePicker = d;
            this.endDatePickerChange.emit(this._endDatePicker);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DateRangePicker.prototype, "format", {
        get: function () {
            return this._format || 'MM/dd/y';
        },
        set: function (value) {
            this._format = value;
            this.displayDates = (value !== 'none');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DateRangePicker.prototype, "container", {
        get: function () { return this._container; },
        set: function (value) {
            if (this._container !== value) {
                this._container = value || 'inline';
                this.destroyPanel();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DateRangePicker.prototype, "openOnFocus", {
        get: function () { return this._openOnFocus; },
        set: function (value) { this._openOnFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DateRangePicker.prototype, "isOpen", {
        set: function (value) {
            if (value && !this.panelOpen) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2DateRangePicker.prototype.ngOnInit = function () { };
    Md2DateRangePicker.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    Object.defineProperty(Md2DateRangePicker.prototype, "panelOpen", {
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Md2DateRangePicker.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    Md2DateRangePicker.prototype.open = function () {
        if (this.disabled) {
            return;
        }
        this._createOverlay();
        if (!this._portal) {
            this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
        }
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        this._panelOpen = true;
    };
    /** Closes the overlay panel and focuses the host element. */
    Md2DateRangePicker.prototype.close = function () {
        var _this = this;
        setTimeout(function () {
            _this._panelOpen = false;
            if (_this._openOnFocus) {
                _this._openOnFocus = false;
                setTimeout(function () { _this._openOnFocus = true; }, 100);
            }
            if (_this._overlayRef) {
                _this._overlayRef.detach();
                _this._backdropSubscription.unsubscribe();
            }
        }, 10);
    };
    /** Removes the panel from the DOM. */
    Md2DateRangePicker.prototype.destroyPanel = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    Md2DateRangePicker.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._focusPanel();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    Md2DateRangePicker.prototype._onFadeInDone = function () {
        this._panelDoneAnimating = this.panelOpen;
    };
    Md2DateRangePicker.prototype._handleWindowResize = function (event) {
        if (this.container === 'inline') {
            this.close();
        }
    };
    Md2DateRangePicker.prototype._focusPanel = function () {
        var el = document.querySelectorAll('.md2-date-range-picker-panel')[0];
        el.focus();
    };
    Md2DateRangePicker.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.panelOpen) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case TAB:
                case ESCAPE:
                    this._onBlur();
                    this.close();
                    break;
            }
        }
    };
    Md2DateRangePicker.prototype.isOkDisabled = function () {
        var bDisabled = (!this.startDatePicker || !this.endDatePicker);
        return bDisabled;
    };
    /**
     * Ok Button Event
     */
    Md2DateRangePicker.prototype._onClickOk = function () {
        if (!this.isOkDisabled()) {
            // Save dates
            this.startDateValue = new Date(this.startDatePicker.getTime());
            this.endDateValue = new Date(this.endDatePicker.getTime());
            this.startDateValueChange.emit(this._startDateValue);
            this.endDateValueChange.emit(this._endDateValue);
            // Close dialog
            this._onBlur();
            this.close();
        }
    };
    Md2DateRangePicker.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    Md2DateRangePicker.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this.close();
        });
    };
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    Md2DateRangePicker.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            if (this.container === 'inline') {
                var _a = this._positionX === 'before' ? ['end', 'start'] : ['start', 'end'], posX = _a[0], fallbackX = _a[1];
                var _b = this._positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], fallbackOverlayY = _b[1];
                var originY = overlayY;
                var fallbackOriginY = fallbackOverlayY;
                if (!this._overlapTrigger) {
                    originY = overlayY === 'top' ? 'bottom' : 'top';
                    fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
                }
                config.positionStrategy = this.overlay.position().connectedTo(this._element, { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: originY }, { overlayX: fallbackX, overlayY: overlayY })
                    .withFallbackPosition({ originX: posX, originY: fallbackOriginY }, { overlayX: posX, overlayY: fallbackOverlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: fallbackOriginY }, { overlayX: fallbackX, overlayY: fallbackOverlayY });
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
            }
            else {
                config.positionStrategy = this.overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this.overlay.create(config);
        }
    };
    Md2DateRangePicker.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
    return Md2DateRangePicker;
}());
__decorate([
    ViewChild('portal'),
    __metadata("design:type", TemplateRef)
], Md2DateRangePicker.prototype, "_templatePortal", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2DateRangePicker.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2DateRangePicker.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2DateRangePicker.prototype, "okLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2DateRangePicker.prototype, "cancelLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2DateRangePicker.prototype, "startMinDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2DateRangePicker.prototype, "startDateValue", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2DateRangePicker.prototype, "startDatePicker", null);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2DateRangePicker.prototype, "startMaxDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2DateRangePicker.prototype, "endMinDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2DateRangePicker.prototype, "endDateValue", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2DateRangePicker.prototype, "endDatePicker", null);
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2DateRangePicker.prototype, "endMaxDate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2DateRangePicker.prototype, "onOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2DateRangePicker.prototype, "onClose", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2DateRangePicker.prototype, "startDateValueChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2DateRangePicker.prototype, "startDatePickerChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2DateRangePicker.prototype, "endDateValueChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2DateRangePicker.prototype, "endDatePickerChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2DateRangePicker.prototype, "format", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2DateRangePicker.prototype, "container", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2DateRangePicker.prototype, "openOnFocus", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2DateRangePicker.prototype, "isOpen", null);
Md2DateRangePicker = __decorate([
    Component({selector: 'md2-date-range-picker',
        template: "<div class=\"md2-date-range-picker-trigger\"><button type=\"button\" class=\"md2-date-range-picker-button\" tabindex=\"-1\" (click)=\"toggle()\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path></svg></button><div class=\"range-display\" *ngIf=\"displayDates\"><div *ngIf=\"startDateValue && endDateValue; then rangeDisplay else rangeDisplayMissing\"></div></div></div><ng-template #rangeDisplayMissing><span class=\"range-display-missing\">(Select a date range)</span></ng-template><ng-template #rangeDisplay>{{ startDateValue | date: format }} to {{ endDateValue | date: format }}</ng-template><ng-template #portal><div class=\"md2-date-range-picker-panel\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onPanelDone()\" [class.md2-date-range-picker-panel-done-animating]=\"_panelDoneAnimating\" [style.transformOrigin]=\"_transformOrigin\" [attr.container]=\"container\" tabindex=\"0\" (keydown)=\"_handleKeydown($event)\"><div class=\"md2-date-range-picker-header\">Date Range</div><div class=\"md2-date-range-picker-content\"><div class=\"md2-date-range-picker-picker\"><md2-calendar-range [(startDate)]=\"startDatePicker\" [(endDate)]=\"endDatePicker\" [startMinDate]=\"startMinDate\" [startMaxDate]=\"startMaxDate\" [endMinDate]=\"endMinDate\" [endMaxDate]=\"endMaxDate\" [disabled]=\"isDisabled\" #dateRangeControl></md2-calendar-range></div><div class=\"md2-datepicker-actions\"><div class=\"md2-button\" (click)=\"close()\">{{ cancelLabel }}</div><div class=\"md2-button\" (click)=\"_onClickOk()\" [class.disabled]=\"isOkDisabled()\">{{ okLabel }}</div></div></div></div></ng-template>",
        styles: [":host{position:relative;display:inline-block;min-width:175px;outline:0;backface-visibility:hidden}:host.md2-date-range-picker-disabled{pointer-events:none;cursor:default}:host.md2-date-range-picker-disabled .md2-date-range-picker-button{color:rgba(0,0,0,.38)}:host.md2-date-range-picker-disabled .range-display{color:rgba(0,0,0,.38)}.md2-date-range-picker-trigger{display:flex;white-space:nowrap;align-items:center}.md2-date-range-picker-button{display:inline-block;height:40px;width:40px;padding:8px;line-height:24px;color:rgba(0,0,0,.54);fill:currentColor;border:0;border-radius:50%;outline:0;user-select:none;cursor:pointer;box-sizing:border-box;background:0 0;vertical-align:middle;align-items:center;text-align:center}.md2-date-range-picker-button:focus{background-color:rgba(158,158,158,.2)}.md2-date-range-picker-panel{width:640px;border-radius:3px;color:rgba(0,0,0,.87);background-color:#fff;overflow:hidden;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);outline:0;user-select:none}.md2-date-range-picker-panel[container=dialog]{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-date-range-picker-header{padding:16px;color:#fff;font-weight:500;white-space:nowrap;background:#106cc8;box-sizing:border-box}.md2-date-range-picker-content{position:relative;overflow:hidden}.md2-date-range-picker-picker{padding:20px}.md2-datepicker-actions{text-align:right}.md2-datepicker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-datepicker-actions .md2-button.disabled{color:rgba(0,0,0,.43);cursor:default}.md2-datepicker-actions .md2-button.disabled:hover{background:inherit}.md2-datepicker-actions .md2-button:hover{background:#ebebeb}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=date-range-picker.css.map */ "],
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
    }),
    __metadata("design:paramtypes", [ElementRef,
        Overlay,
        ViewContainerRef])
], Md2DateRangePicker);
export { Md2DateRangePicker };
//# sourceMappingURL=date-range-picker.js.map