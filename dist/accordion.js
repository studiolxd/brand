'use client';
import './accordion.css';
import { Chevron as e } from "./chevron.js";
import * as t from "@radix-ui/react-accordion";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/atoms/Accordion/Accordion.tsx
function i({ className: e, children: r, ...i }) {
	let a = i.type === "single" ? {
		...i,
		collapsible: i.collapsible ?? !0
	} : i;
	return /* @__PURE__ */ n(t.Root, {
		className: ["accordion", e].filter(Boolean).join(" "),
		...a,
		children: r
	});
}
function a({ className: e, children: r, ...i }) {
	return /* @__PURE__ */ n(t.Item, {
		className: ["accordion__item", e].filter(Boolean).join(" "),
		...i,
		children: r
	});
}
function o({ className: i, chevronSize: a = "sm", children: o }) {
	return /* @__PURE__ */ n(t.Header, {
		className: "accordion__header",
		children: /* @__PURE__ */ r(t.Trigger, {
			className: ["accordion__trigger", i].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ n("span", {
				className: "accordion__trigger-text",
				children: o
			}), /* @__PURE__ */ n(e, {
				className: "accordion__chevron",
				size: a
			})]
		})
	});
}
function s({ className: e, children: r }) {
	return /* @__PURE__ */ n(t.Content, {
		className: ["accordion__content", e].filter(Boolean).join(" "),
		children: /* @__PURE__ */ n("div", {
			className: "accordion__content-inner",
			children: r
		})
	});
}
//#endregion
export { i as Accordion, s as AccordionContent, a as AccordionItem, o as AccordionTrigger };
