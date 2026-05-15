import './breadcrumb.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/molecules/Breadcrumb/Breadcrumb.tsx
function n({ href: t, children: n, className: r }) {
	return /* @__PURE__ */ e("a", {
		href: t,
		className: r,
		children: n
	});
}
function r({ items: r, renderLink: i = n, separator: a = "/", ariaLabel: o = "Migas de pan", className: s }) {
	return /* @__PURE__ */ e("nav", {
		"aria-label": o,
		className: ["breadcrumb", s].filter(Boolean).join(" "),
		children: /* @__PURE__ */ e("ol", {
			className: "breadcrumb__list",
			children: r.map((n, o) => {
				let s = o === r.length - 1;
				return /* @__PURE__ */ t("li", {
					className: ["breadcrumb__item", s ? "breadcrumb__item--current" : ""].filter(Boolean).join(" "),
					children: [s || !n.href ? /* @__PURE__ */ e("span", {
						className: s ? "breadcrumb__current" : "breadcrumb__static",
						...s ? { "aria-current": "page" } : {},
						children: n.label
					}) : i({
						href: n.href,
						children: n.label,
						className: "breadcrumb__link"
					}), !s && /* @__PURE__ */ e("span", {
						className: "breadcrumb__separator",
						"aria-hidden": "true",
						children: a
					})]
				}, `${n.label}-${o}`);
			})
		})
	});
}
//#endregion
export { r as Breadcrumb };
