'use client';
import './accordion.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Accordion as r } from "@base-ui/react/accordion";
import { Children as i, createContext as a, useContext as o } from "react";
//#region src/stories/atoms/Accordion/AccordionContext.ts
var s = a(null);
function c() {
	return o(s);
}
//#endregion
//#region src/stories/atoms/Accordion/Accordion.tsx
var l = (e) => String(e).padStart(2, "0");
function u(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e === "" ? [] : [e];
}
function d({ className: e, children: n, id: a, disabled: o, numbered: c = !1, formatIndex: d = l, ...f }) {
	let p = f.type === "multiple", m = f.type === "single" ? f.collapsible ?? !0 : !0, h = f.value;
	return /* @__PURE__ */ t(r.Root, {
		id: a,
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
		children: c ? i.map(n, (e, n) => /* @__PURE__ */ t(s.Provider, {
			value: {
				index: n + 1,
				formatIndex: d
			},
			children: e
		})) : n
	});
}
function f({ className: e, children: n, ...i }) {
	return /* @__PURE__ */ t(r.Item, {
		className: ["accordion__item", e].filter(Boolean).join(" "),
		...i,
		children: n
	});
}
function p({ className: i, chevronSize: a = "sm", children: o }) {
	let s = c();
	return /* @__PURE__ */ t(r.Header, {
		className: "accordion__header",
		children: /* @__PURE__ */ n(r.Trigger, {
			className: ["accordion__trigger", i].filter(Boolean).join(" "),
			children: [
				s && /* @__PURE__ */ t("span", {
					className: "accordion__index",
					children: s.formatIndex(s.index)
				}),
				/* @__PURE__ */ t("span", {
					className: "accordion__trigger-text",
					children: o
				}),
				/* @__PURE__ */ t(e, {
					name: "chevron",
					className: "accordion__chevron",
					size: a
				})
			]
		})
	});
}
function m({ className: e, children: n }) {
	return /* @__PURE__ */ t(r.Panel, {
		className: ["accordion__content", e].filter(Boolean).join(" "),
		children: /* @__PURE__ */ t("div", {
			className: "accordion__content-inner",
			children: n
		})
	});
}
//#endregion
export { d as Accordion, m as AccordionContent, f as AccordionItem, p as AccordionTrigger };
