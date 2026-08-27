import './page-intro.css';
import { Heading as e } from "./heading.js";
import { Paragraph as t } from "./paragraph.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/PageIntro/PageIntro.tsx
function i({ title: i, description: a, level: o = 1, size: s, className: c, children: l }) {
	return /* @__PURE__ */ r("header", {
		className: ["page-intro", c].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n(e, {
				level: o,
				size: s,
				children: i
			}),
			a && /* @__PURE__ */ n(t, {
				size: "large",
				children: a
			}),
			l
		]
	});
}
//#endregion
export { i as PageIntro };
