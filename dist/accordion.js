'use client';
import './accordion.css';
import { Icon as e } from "./icon.js";
import { Accordion as t } from "@base-ui/react/accordion";
import { Children as n, createContext as r, useContext as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/atoms/Accordion/AccordionContext.ts
var s = r(null);
function c() {
	return i(s);
}
//#endregion
//#region src/stories/atoms/Accordion/Accordion.tsx
var l = (e) => String(e).padStart(2, "0");
function u(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e === "" ? [] : [e];
}
function d({ className: e, children: r, id: i, disabled: o, numbered: c = !1, formatIndex: d = l, ...f }) {
	let p = f.type === "multiple", m = f.type === "single" ? f.collapsible ?? !0 : !0, h = f.value;
	return /* @__PURE__ */ a(t.Root, {
		id: i,
		disabled: o,
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
		children: c ? n.map(r, (e, t) => /* @__PURE__ */ a(s.Provider, {
			value: {
				index: t + 1,
				formatIndex: d
			},
			children: e
		})) : r
	});
}
function f({ className: e, children: n, ...r }) {
	return /* @__PURE__ */ a(t.Item, {
		className: ["accordion__item", e].filter(Boolean).join(" "),
		...r,
		children: n
	});
}
function p({ className: n, chevronSize: r = "sm", children: i }) {
	let s = c();
	return /* @__PURE__ */ a(t.Header, {
		className: "accordion__header",
		children: /* @__PURE__ */ o(t.Trigger, {
			className: ["accordion__trigger", n].filter(Boolean).join(" "),
			children: [
				s && /* @__PURE__ */ a("span", {
					className: "accordion__index",
					children: s.formatIndex(s.index)
				}),
				/* @__PURE__ */ a("span", {
					className: "accordion__trigger-text",
					children: i
				}),
				/* @__PURE__ */ a(e, {
					name: "chevron",
					className: "accordion__chevron",
					size: r
				})
			]
		})
	});
}
function m({ className: e, children: n }) {
	return /* @__PURE__ */ a(t.Panel, {
		className: ["accordion__content", e].filter(Boolean).join(" "),
		children: /* @__PURE__ */ a("div", {
			className: "accordion__content-inner",
			children: n
		})
	});
}
//#endregion
export { d as Accordion, m as AccordionContent, f as AccordionItem, p as AccordionTrigger };
