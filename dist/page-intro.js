import './page-intro.css';
import { Heading as e } from "./heading.js";
import { Paragraph as t } from "./paragraph.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/PageIntro/PageIntro.tsx
function a({ eyebrow: a, title: o, description: s, actions: c, level: l = 1, size: u, as: d = "header", className: f, children: p }) {
	let m = /* @__PURE__ */ i(n, { children: [a && /* @__PURE__ */ r("div", {
		className: "page-intro__eyebrow",
		children: a
	}), /* @__PURE__ */ r(e, {
		level: l,
		size: u,
		children: o
	})] });
	return /* @__PURE__ */ i(d, {
		className: ["page-intro", f].filter(Boolean).join(" "),
		children: [
			c ? /* @__PURE__ */ i("div", {
				className: "page-intro__row",
				children: [/* @__PURE__ */ r("div", {
					className: "page-intro__title-group",
					children: m
				}), /* @__PURE__ */ r("div", {
					className: "page-intro__actions",
					children: c
				})]
			}) : m,
			s && /* @__PURE__ */ r(t, {
				size: "large",
				children: s
			}),
			p
		]
	});
}
//#endregion
export { a as PageIntro };
