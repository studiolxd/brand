import './list.css';
import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/atoms/List/List.tsx
var r = e(function({ type: e = "unordered", showSeparators: n = !1, className: r, children: i, ...a }, o) {
	return /* @__PURE__ */ t(e === "ordered" ? "ol" : "ul", {
		ref: o,
		className: [
			"list",
			`list--${e}`,
			n ? "list--separated" : "",
			r ?? ""
		].filter(Boolean).join(" "),
		...a,
		children: i
	});
}), i = e(function({ as: e = "li", leading: r, secondary: i, trailing: a, className: o, children: s, ...c }, l) {
	let u = e, d = ["list__item", o ?? ""].filter(Boolean).join(" "), f = i != null && i !== !1, p = r != null && r !== !1, m = a != null && a !== !1;
	return !f && !m && !p ? /* @__PURE__ */ t(u, {
		ref: l,
		className: d,
		...c,
		children: s
	}) : /* @__PURE__ */ t(u, {
		ref: l,
		className: d,
		...c,
		children: /* @__PURE__ */ n("div", {
			className: "list__item-row",
			children: [
				p && /* @__PURE__ */ t("div", {
					className: "list__item-leading",
					children: r
				}),
				/* @__PURE__ */ n("div", {
					className: "list__item-main",
					children: [s, f && /* @__PURE__ */ t("div", {
						className: "list__item-secondary",
						children: i
					})]
				}),
				m && /* @__PURE__ */ t("div", {
					className: "list__item-trailing",
					children: a
				})
			]
		})
	});
});
//#endregion
export { r as List, i as ListItem };
