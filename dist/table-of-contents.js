'use client';
import './table-of-contents.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Link as t } from "./link.js";
import { List as n } from "./list.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/TableOfContents/TableOfContents.tsx
function o(e, t) {
	return Math.min(Math.max(e - t, 0), 5);
}
var s = r(function({ items: r, activeId: s, ariaLabel: c, title: l, sticky: u = !1, onItemClick: d, className: f, ...p }, m) {
	let h = e("tableOfContents");
	if (r.length === 0) return null;
	let g = Math.min(...r.map((e) => e.level));
	return /* @__PURE__ */ a("nav", {
		ref: m,
		className: [
			"table-of-contents",
			u ? "table-of-contents--sticky" : "",
			f ?? ""
		].filter(Boolean).join(" "),
		"aria-label": h("label", c),
		...p,
		children: [l && /* @__PURE__ */ i("p", {
			className: "table-of-contents__title",
			children: l
		}), /* @__PURE__ */ i(n, {
			type: "plain",
			className: "table-of-contents__list",
			children: r.map((e) => {
				let n = e.id === s;
				return /* @__PURE__ */ i("li", {
					className: `table-of-contents__item table-of-contents__item--level-${o(e.level, g)}`,
					children: /* @__PURE__ */ i(t, {
						href: `#${e.id}`,
						className: ["table-of-contents__link", n ? "table-of-contents__link--active" : ""].filter(Boolean).join(" "),
						"aria-current": n ? "location" : void 0,
						onClick: d ? (t) => d(e, t) : void 0,
						children: e.label
					})
				}, e.id);
			})
		})]
	});
});
//#endregion
export { s as TableOfContents };
