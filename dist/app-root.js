'use client';
import { r as e } from "./_shared/brandmessagescontext.js";
import { SkipLink as t } from "./skip-link.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/messages/es/appRoot.ts
var a = { skipToContent: "Saltar al contenido principal" };
//#endregion
//#region src/stories/sections/AppRoot/AppRoot.tsx
function o({ skipLabel: o, skipHref: s = "#main-content", children: c }) {
	return /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(t, {
		href: s,
		children: e("appRoot", a)("skipToContent", o)
	}), c] });
}
//#endregion
export { o as AppRoot };
