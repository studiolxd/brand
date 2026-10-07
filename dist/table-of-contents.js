'use client';
import './table-of-contents.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Link as t } from "./link.js";
import { List as n } from "./list.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/messages/es/tableOfContents.ts
var o = { label: "En esta página" };
//#endregion
//#region src/stories/molecules/TableOfContents/TableOfContents.tsx
function s(e, t) {
	return Math.min(Math.max(e - t, 0), 5);
}
var c = r(function({ items: r, activeId: c, ariaLabel: l, title: u, sticky: d = !1, onItemClick: f, className: p, ...m }, h) {
	let g = e("tableOfContents", o);
	if (r.length === 0) return null;
	let _ = Math.min(...r.map((e) => e.level));
	return /* @__PURE__ */ a("nav", {
		ref: h,
		className: [
			"table-of-contents",
			d ? "table-of-contents--sticky" : "",
			p ?? ""
		].filter(Boolean).join(" "),
		"aria-label": g("label", l),
		...m,
		children: [u && /* @__PURE__ */ i("p", {
			className: "table-of-contents__title",
			children: u
		}), /* @__PURE__ */ i(n, {
			type: "plain",
			className: "table-of-contents__list",
			children: r.map((e) => {
				let n = e.id === c;
				return /* @__PURE__ */ i("li", {
					className: `table-of-contents__item table-of-contents__item--level-${s(e.level, _)}`,
					children: /* @__PURE__ */ i(t, {
						href: `#${e.id}`,
						className: ["table-of-contents__link", n ? "table-of-contents__link--active" : ""].filter(Boolean).join(" "),
						"aria-current": n ? "location" : void 0,
						onClick: f ? (t) => f(e, t) : void 0,
						children: e.label
					})
				}, e.id);
			})
		})]
	});
});
//#endregion
export { c as TableOfContents };
