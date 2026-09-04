import './table-of-contents.css';
import { Link as e } from "./link.js";
import { List as t } from "./list.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i } from "react";
//#region src/stories/molecules/TableOfContents/TableOfContents.tsx
function a(e, t) {
	return Math.min(Math.max(e - t, 0), 5);
}
var o = i(function({ items: i, activeId: o, ariaLabel: s = "En esta página", title: c, sticky: l = !1, onItemClick: u, className: d, ...f }, p) {
	if (i.length === 0) return null;
	let m = Math.min(...i.map((e) => e.level));
	return /* @__PURE__ */ r("nav", {
		ref: p,
		className: [
			"table-of-contents",
			l ? "table-of-contents--sticky" : "",
			d ?? ""
		].filter(Boolean).join(" "),
		"aria-label": s,
		...f,
		children: [c && /* @__PURE__ */ n("p", {
			className: "table-of-contents__title",
			children: c
		}), /* @__PURE__ */ n(t, {
			type: "plain",
			className: "table-of-contents__list",
			children: i.map((t) => {
				let r = t.id === o;
				return /* @__PURE__ */ n("li", {
					className: `table-of-contents__item table-of-contents__item--level-${a(t.level, m)}`,
					children: /* @__PURE__ */ n(e, {
						href: `#${t.id}`,
						className: ["table-of-contents__link", r ? "table-of-contents__link--active" : ""].filter(Boolean).join(" "),
						"aria-current": r ? "location" : void 0,
						onClick: u ? (e) => u(t, e) : void 0,
						children: t.label
					})
				}, t.id);
			})
		})]
	});
});
//#endregion
export { o as TableOfContents };
