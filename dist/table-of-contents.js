import './table-of-contents.css';
import { Link as e } from "./link.js";
import { List as t } from "./list.js";
import { forwardRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/TableOfContents/TableOfContents.tsx
function a(e, t) {
	return Math.min(Math.max(e - t, 0), 5);
}
var o = n(function({ items: n, activeId: o, ariaLabel: s = "En esta página", title: c, sticky: l = !1, onItemClick: u, className: d, ...f }, p) {
	if (n.length === 0) return null;
	let m = Math.min(...n.map((e) => e.level));
	return /* @__PURE__ */ i("nav", {
		ref: p,
		className: [
			"table-of-contents",
			l ? "table-of-contents--sticky" : "",
			d ?? ""
		].filter(Boolean).join(" "),
		"aria-label": s,
		...f,
		children: [c && /* @__PURE__ */ r("p", {
			className: "table-of-contents__title",
			children: c
		}), /* @__PURE__ */ r(t, {
			type: "plain",
			className: "table-of-contents__list",
			children: n.map((t) => {
				let n = t.id === o;
				return /* @__PURE__ */ r("li", {
					className: `table-of-contents__item table-of-contents__item--level-${a(t.level, m)}`,
					children: /* @__PURE__ */ r(e, {
						href: `#${t.id}`,
						className: ["table-of-contents__link", n ? "table-of-contents__link--active" : ""].filter(Boolean).join(" "),
						"aria-current": n ? "location" : void 0,
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
