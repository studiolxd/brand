'use client';
import { n as e } from "./_shared/brandmessagescontext.js";
import { SkipLink as t } from "./skip-link.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/sections/AppRoot/AppRoot.tsx
function a({ skipLabel: a, skipHref: o = "#main-content", children: s }) {
	return /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(t, {
		href: o,
		children: e("appRoot")("skipToContent", a)
	}), s] });
}
//#endregion
export { a as AppRoot };
