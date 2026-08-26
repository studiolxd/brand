import { m as e } from "./useRenderElement.js";
import * as t from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/toolbar/root/ToolbarRootContext.js
var n = /* @__PURE__ */ t.createContext(void 0);
process.env.NODE_ENV !== "production" && (n.displayName = "ToolbarRootContext");
function r(r) {
	let i = t.useContext(n);
	if (i === void 0 && !r) throw Error(process.env.NODE_ENV === "production" ? e(69) : "Base UI: ToolbarRootContext is missing. Toolbar parts must be placed within <Toolbar.Root>.");
	return i;
}
//#endregion
export { r as t };
