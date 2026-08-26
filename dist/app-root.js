import { SkipLink as e } from "./skip-link.js";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/sections/AppRoot/AppRoot.tsx
function i({ skipLabel: i = "Saltar al contenido principal", skipHref: a = "#main-content", children: o }) {
	return /* @__PURE__ */ r(t, { children: [/* @__PURE__ */ n(e, {
		href: a,
		children: i
	}), o] });
}
//#endregion
export { i as AppRoot };
