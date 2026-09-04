'use client';
import './collapsible.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import "react";
import { Collapsible as r } from "@base-ui/react/collapsible";
//#region src/stories/atoms/Collapsible/Collapsible.tsx
function i({ onOpenChange: e, children: n, className: i, ...a }) {
	return /* @__PURE__ */ t(r.Root, {
		className: ["collapsible", i].filter(Boolean).join(" "),
		onOpenChange: e ? (t) => e(t) : void 0,
		...a,
		children: n
	});
}
function a({ chevron: i = !0, chevronSize: a = "sm", children: o, className: s, ...c }) {
	return /* @__PURE__ */ n(r.Trigger, {
		className: ["collapsible__trigger", s].filter(Boolean).join(" "),
		...c,
		children: [/* @__PURE__ */ t("span", {
			className: "collapsible__trigger-text",
			children: o
		}), i && /* @__PURE__ */ t(e, {
			name: "chevron",
			className: "collapsible__chevron",
			size: a
		})]
	});
}
function o({ children: e, className: n, ...i }) {
	return /* @__PURE__ */ t(r.Panel, {
		className: ["collapsible__content", n].filter(Boolean).join(" "),
		...i,
		children: /* @__PURE__ */ t("div", {
			className: "collapsible__content-inner",
			children: e
		})
	});
}
//#endregion
export { i as Collapsible, o as CollapsibleContent, a as CollapsibleTrigger };
