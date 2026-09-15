'use client';
import './accordion.css';
import { Icon as e } from "./icon.js";
import { Children as t, createContext as n, useContext as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Accordion as o } from "@base-ui/react/accordion";
//#region src/stories/atoms/Accordion/AccordionContext.ts
var s = n(null);
function c() {
	return r(s);
}
//#endregion
//#region src/stories/atoms/Accordion/Accordion.tsx
var l = (e) => String(e).padStart(2, "0");
function u(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e === "" ? [] : [e];
}
function d({ className: e, children: n, id: r, disabled: a, numbered: c = !1, formatIndex: d = l, ...f }) {
	let p = f.type === "multiple", m = f.type === "single" ? f.collapsible ?? !0 : !0, h = f.value;
	return /* @__PURE__ */ i(o.Root, {
		id: r,
		disabled: a,
		multiple: p,
		value: u(h),
		defaultValue: u(f.defaultValue),
		onValueChange: (e) => {
			let t = e ?? [];
			if (p) {
				f.onValueChange?.(t);
				return;
			}
			!m && t.length === 0 || f.onValueChange?.(t[0] ?? "");
		},
		className: [
			"accordion",
			c ? "accordion--numbered" : "",
			e
		].filter(Boolean).join(" "),
		children: c ? t.map(n, (e, t) => /* @__PURE__ */ i(s.Provider, {
			value: {
				index: t + 1,
				formatIndex: d
			},
			children: e
		})) : n
	});
}
function f({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ i(o.Item, {
		className: ["accordion__item", e].filter(Boolean).join(" "),
		...n,
		children: t
	});
}
function p({ className: t, chevronSize: n = "sm", children: r }) {
	let s = c();
	return /* @__PURE__ */ i(o.Header, {
		className: "accordion__header",
		children: /* @__PURE__ */ a(o.Trigger, {
			className: ["accordion__trigger", t].filter(Boolean).join(" "),
			children: [
				s && /* @__PURE__ */ i("span", {
					className: "accordion__index",
					children: s.formatIndex(s.index)
				}),
				/* @__PURE__ */ i("span", {
					className: "accordion__trigger-text",
					children: r
				}),
				/* @__PURE__ */ i(e, {
					name: "chevron",
					className: "accordion__chevron",
					size: n
				})
			]
		})
	});
}
function m({ className: e, children: t }) {
	return /* @__PURE__ */ i(o.Panel, {
		className: ["accordion__content", e].filter(Boolean).join(" "),
		children: /* @__PURE__ */ i("div", {
			className: "accordion__content-inner",
			children: t
		})
	});
}
//#endregion
export { d as Accordion, m as AccordionContent, f as AccordionItem, p as AccordionTrigger };
