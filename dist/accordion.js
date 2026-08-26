'use client';
import './accordion.css';
import { Icon as e } from "./icon.js";
import { Accordion as t } from "@base-ui-components/react/accordion";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/atoms/Accordion/Accordion.tsx
function i(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e === "" ? [] : [e];
}
function a({ className: e, children: r, id: a, disabled: o, ...s }) {
	let c = s.type === "multiple", l = s.type === "single" ? s.collapsible ?? !0 : !0, u = s.value;
	return /* @__PURE__ */ n(t.Root, {
		id: a,
		disabled: o,
		multiple: c,
		value: i(u),
		defaultValue: i(s.defaultValue),
		onValueChange: (e) => {
			let t = e ?? [];
			if (c) {
				s.onValueChange?.(t);
				return;
			}
			!l && t.length === 0 || s.onValueChange?.(t[0] ?? "");
		},
		className: ["accordion", e].filter(Boolean).join(" "),
		children: r
	});
}
function o({ className: e, children: r, ...i }) {
	return /* @__PURE__ */ n(t.Item, {
		className: ["accordion__item", e].filter(Boolean).join(" "),
		...i,
		children: r
	});
}
function s({ className: i, chevronSize: a = "sm", children: o }) {
	return /* @__PURE__ */ n(t.Header, {
		className: "accordion__header",
		children: /* @__PURE__ */ r(t.Trigger, {
			className: ["accordion__trigger", i].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ n("span", {
				className: "accordion__trigger-text",
				children: o
			}), /* @__PURE__ */ n(e, {
				name: "chevron",
				className: "accordion__chevron",
				size: a
			})]
		})
	});
}
function c({ className: e, children: r }) {
	return /* @__PURE__ */ n(t.Panel, {
		className: ["accordion__content", e].filter(Boolean).join(" "),
		children: /* @__PURE__ */ n("div", {
			className: "accordion__content-inner",
			children: r
		})
	});
}
//#endregion
export { a as Accordion, c as AccordionContent, o as AccordionItem, s as AccordionTrigger };
