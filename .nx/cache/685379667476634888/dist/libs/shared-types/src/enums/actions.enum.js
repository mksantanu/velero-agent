"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyType = exports.Action = void 0;
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
    Action["Download"] = "download";
    Action["Logs"] = "logs";
})(Action || (exports.Action = Action = {}));
var PolicyType;
(function (PolicyType) {
    PolicyType["Group"] = "g";
    PolicyType["User"] = "u";
})(PolicyType || (exports.PolicyType = PolicyType = {}));
//# sourceMappingURL=actions.enum.js.map