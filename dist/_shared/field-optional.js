import { createContext as e, useContext as t } from "react";
//#region src/stories/constants/field-optional.ts
var n = e(!1);
function r(e, r) {
	let i = t(n);
	return e ?? (i && !r);
}
//#endregion
export { r as n, n as t };
