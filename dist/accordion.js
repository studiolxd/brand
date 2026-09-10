'use client';
import './accordion.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Children as r, createContext as i, useContext as a } from "react";
import { Accordion as o } from "@base-ui/react/accordion";
//#region src/stories/atoms/Accordion/AccordionContext.ts
var s = i(null);
function c() {
	return a(s);
}
//#endregion
//#region src/stories/atoms/Accordion/Accordion.tsx
var l = (e) => String(e).padStart(2, "0");
function u(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e === "" ? [] : [e];
}
function d({ className: e, children: n, id: i, disabled: a, numbered: c = !1, formatIndex: d = l, ...f }) {
	let p = f.type === "multiple", m = f.type === "single" ? f.collapsible ?? !0 : !0, h = f.value;
	return /* @__PURE__ */ t(o.Root, {
		id: i,
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
		children: c ? r.map(n, (e, n) => /* @__PURE__ */ t(s.Provider, {
			value: {
				index: n + 1,
				formatIndex: d
			},
			children: e
		})) : n
	});
}
function f({ className: e, children: n, ...r }) {
	return /* @__PURE__ */ t(o.Item, {
		className: ["accordion__item", e].filter(Boolean).join(" "),
		...r,
		children: n
	});
}
function p({ className: r, chevronSize: i = "sm", children: a }) {
	let s = c();
	return /* @__PURE__ */ t(o.Header, {
		className: "accordion__header",
		children: /* @__PURE__ */ n(o.Trigger, {
			className: ["accordion__trigger", r].filter(Boolean).join(" "),
			children: [
				s && /* @__PURE__ */ t("span", {
					className: "accordion__index",
					children: s.formatIndex(s.index)
				}),
				/* @__PURE__ */ t("span", {
					className: "accordion__trigger-text",
					children: a
				}),
				/* @__PURE__ */ t(e, {
					name: "chevron",
					className: "accordion__chevron",
					size: i
				})
			]
		})
	});
}
function m({ className: e, children: n }) {
	return /* @__PURE__ */ t(o.Panel, {
		className: ["accordion__content", e].filter(Boolean).join(" "),
		children: /* @__PURE__ */ t("div", {
			className: "accordion__content-inner",
			children: n
		})
	});
}
//#endregion
export { d as Accordion, m as AccordionContent, f as AccordionItem, p as AccordionTrigger };
