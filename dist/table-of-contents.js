'use client';
import './table-of-contents.css';
import { n as e } from "./_shared/env.js";
import { r as t } from "./_shared/brandmessagescontext.js";
import { Link as n } from "./link.js";
import { List as r } from "./list.js";
import { forwardRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/tableOfContents.ts
var s = { label: "En esta página" };
//#endregion
//#region src/stories/molecules/TableOfContents/TableOfContents.tsx
function c(e, t) {
	return Math.min(Math.max(e - t, 0), 5);
}
var l = i(function({ items: i, activeId: l, "aria-label": u, ariaLabel: d, title: f, sticky: p = !1, onItemClick: m, className: h, ...g }, _) {
	d !== void 0 && e("TableOfContents", "ariaLabel", "`aria-label`");
	let v = u ?? d, y = t("tableOfContents", s);
	if (i.length === 0) return null;
	let b = Math.min(...i.map((e) => e.level));
	return /* @__PURE__ */ o("nav", {
		ref: _,
		className: [
			"table-of-contents",
			p ? "table-of-contents--sticky" : "",
			h ?? ""
		].filter(Boolean).join(" "),
		"aria-label": y("label", v),
		...g,
		children: [f && /* @__PURE__ */ a("p", {
			className: "table-of-contents__title",
			children: f
		}), /* @__PURE__ */ a(r, {
			type: "plain",
			className: "table-of-contents__list",
			children: i.map((e) => {
				let t = e.id === l;
				return /* @__PURE__ */ a("li", {
					className: `table-of-contents__item table-of-contents__item--level-${c(e.level, b)}`,
					children: /* @__PURE__ */ a(n, {
						href: `#${e.id}`,
						className: ["table-of-contents__link", t ? "table-of-contents__link--active" : ""].filter(Boolean).join(" "),
						"aria-current": t ? "location" : void 0,
						onClick: m ? (t) => m(e, t) : void 0,
						children: e.label
					})
				}, e.id);
			})
		})]
	});
});
//#endregion
export { l as TableOfContents };
