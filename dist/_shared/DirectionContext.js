import * as e from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/direction-provider/DirectionContext.js
var t = /* @__PURE__ */ e.createContext(void 0);
process.env.NODE_ENV !== "production" && (t.displayName = "DirectionContext");
function n() {
	return e.useContext(t)?.direction ?? "ltr";
}
//#endregion
export { n as t };
