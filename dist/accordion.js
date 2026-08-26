'use client';
import './accordion.css';
import { a as e, i as t, n, r, t as i } from "./_shared/AccordionPanel.js";
import { Icon as a } from "./icon.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/atoms/Accordion/Accordion.tsx
function c(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e === "" ? [] : [e];
}
function l({ className: t, children: n, id: r, disabled: i, ...a }) {
	let s = a.type === "multiple", l = a.type === "single" ? a.collapsible ?? !0 : !0, u = a.value;
	return /* @__PURE__ */ o(e, {
		id: r,
		disabled: i,
		multiple: s,
		value: c(u),
		defaultValue: c(a.defaultValue),
		onValueChange: (e) => {
			let t = e ?? [];
			if (s) {
				a.onValueChange?.(t);
				return;
			}
			!l && t.length === 0 || a.onValueChange?.(t[0] ?? "");
		},
		className: ["accordion", t].filter(Boolean).join(" "),
		children: n
	});
}
function u({ className: e, children: n, ...r }) {
	return /* @__PURE__ */ o(t, {
		className: ["accordion__item", e].filter(Boolean).join(" "),
		...r,
		children: n
	});
}
function d({ className: e, chevronSize: t = "sm", children: i }) {
	return /* @__PURE__ */ o(r, {
		className: "accordion__header",
		children: /* @__PURE__ */ s(n, {
			className: ["accordion__trigger", e].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ o("span", {
				className: "accordion__trigger-text",
				children: i
			}), /* @__PURE__ */ o(a, {
				name: "chevron",
				className: "accordion__chevron",
				size: t
			})]
		})
	});
}
function f({ className: e, children: t }) {
	return /* @__PURE__ */ o(i, {
		className: ["accordion__content", e].filter(Boolean).join(" "),
		children: /* @__PURE__ */ o("div", {
			className: "accordion__content-inner",
			children: t
		})
	});
}
//#endregion
export { l as Accordion, f as AccordionContent, u as AccordionItem, d as AccordionTrigger };
