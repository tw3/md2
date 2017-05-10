import { ElementRef, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay } from '../core';
export declare type Container = 'inline' | 'dialog';
export declare type PanelPositionX = 'before' | 'after';
export declare type PanelPositionY = 'above' | 'below';
export declare class Md2DateRangePicker implements OnInit, OnDestroy {
    private _element;
    private overlay;
    private _viewContainerRef;
    private _portal;
    private _overlayRef;
    private _backdropSubscription;
    private _panelOpen;
    private _openOnFocus;
    private _container;
    private _format;
    private _startDateValue;
    private _startDatePicker;
    private _endDateValue;
    private _endDatePicker;
    private _positionX;
    private _positionY;
    private _overlapTrigger;
    _transformOrigin: string;
    _panelDoneAnimating: boolean;
    displayDates: boolean;
    _onTouched: () => void;
    _templatePortal: TemplateRef<any>;
    disabled: boolean;
    placeholder: string;
    okLabel: string;
    cancelLabel: string;
    startMinDate: Date;
    startDateValue: Date;
    startDatePicker: Date;
    startMaxDate: Date;
    endMinDate: Date;
    endDateValue: Date;
    endDatePicker: Date;
    endMaxDate: Date;
    onOpen: EventEmitter<void>;
    onClose: EventEmitter<void>;
    startDateValueChange: EventEmitter<Date>;
    startDatePickerChange: EventEmitter<Date>;
    endDateValueChange: EventEmitter<Date>;
    endDatePickerChange: EventEmitter<Date>;
    format: string;
    container: Container;
    openOnFocus: boolean;
    isOpen: boolean;
    constructor(_element: ElementRef, overlay: Overlay, _viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly panelOpen: boolean;
    toggle(): void;
    /** Opens the overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /** Removes the panel from the DOM. */
    destroyPanel(): void;
    _onPanelDone(): void;
    _onFadeInDone(): void;
    _handleWindowResize(event: Event): void;
    private _focusPanel();
    _handleKeydown(event: KeyboardEvent): void;
    isOkDisabled(): boolean;
    /**
     * Ok Button Event
     */
    _onClickOk(): void;
    _onBlur(): void;
    private _subscribeToBackdrop();
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    private _createOverlay();
    private _cleanUpSubscriptions();
}
