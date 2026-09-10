import './page-intro.css';
import { Heading as e } from "./heading.js";
import { Paragraph as t } from "./paragraph.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/PageIntro/PageIntro.tsx
function i({ title: i, description: a, actions: o, level: s = 1, size: c, as: l = "header", className: u, children: d }) {
	let f = /* @__PURE__ */ n(e, {
		level: s,
		size: c,
		children: i
	});
	return /* @__PURE__ */ r(l, {
		className: ["page-intro", u].filter(Boolean).join(" "),
		children: [
			o ? /* @__PURE__ */ r("div", {
				className: "page-intro__row",
				children: [f, /* @__PURE__ */ n("div", {
					className: "page-intro__actions",
					children: o
				})]
			}) : f,
			a && /* @__PURE__ */ n(t, {
				size: "large",
				children: a
			}),
			d
		]
	});
}
//#endregion
export { i as PageIntro };
