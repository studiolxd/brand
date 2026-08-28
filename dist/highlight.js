import './highlight.css';
import { Container as e } from "./container.js";
import { Columns as t } from "./columns.js";
import { Inline as n } from "./inline.js";
import { Heading as r } from "./heading.js";
import { Paragraph as i } from "./paragraph.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/sections/Highlight/Highlight.tsx
function c({ title: c, description: l, actions: u, media: d, mediaPosition: f = "end", surface: p = "dark", titleLevel: m = 2, titleSize: h = 8, width: g = "xl", className: _, id: v }) {
	let y = /* @__PURE__ */ s("div", {
		className: "highlight__text",
		children: [
			/* @__PURE__ */ o(r, {
				level: m,
				size: h,
				className: "highlight__title",
				children: c
			}),
			l && /* @__PURE__ */ o(i, {
				size: "large",
				className: "highlight__description",
				children: l
			}),
			u && /* @__PURE__ */ o(n, {
				className: "highlight__actions",
				children: u
			})
		]
	});
	return /* @__PURE__ */ o("section", {
		id: v,
		className: [
			"highlight",
			p === "dark" && "surface-dark",
			_
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ o(e, {
			width: g,
			children: d ? /* @__PURE__ */ o(t, {
				align: "center",
				gap: "lg",
				children: f === "start" ? /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o("div", {
					className: "highlight__media",
					children: d
				}), y] }) : /* @__PURE__ */ s(a, { children: [y, /* @__PURE__ */ o("div", {
					className: "highlight__media",
					children: d
				})] })
			}) : y
		})
	});
}
//#endregion
export { c as Highlight };
