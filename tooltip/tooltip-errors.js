var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { MdError } from '../core';
/**
 * Exception thrown when a tooltip has an invalid position.
 * @docs-private
 */
var Md2TooltipInvalidPositionError = (function (_super) {
    __extends(Md2TooltipInvalidPositionError, _super);
    function Md2TooltipInvalidPositionError(position) {
        return _super.call(this, "Tooltip position \"" + position + "\" is invalid.") || this;
    }
    return Md2TooltipInvalidPositionError;
}(MdError));
export { Md2TooltipInvalidPositionError };
//# sourceMappingURL=tooltip-errors.js.map