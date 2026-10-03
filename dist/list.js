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
}), i = e(function({ as: e = "li", secondary: r, trailing: i, className: a, children: o, ...s }, c) {
	let l = ["list__item", a ?? ""].filter(Boolean).join(" "), u = r != null && r !== !1, d = i != null && i !== !1;
	return !u && !d ? /* @__PURE__ */ t(e, {
		ref: c,
		className: l,
		...s,
		children: o
	}) : /* @__PURE__ */ t(e, {
		ref: c,
		className: l,
		...s,
		children: /* @__PURE__ */ n("div", {
			className: "list__item-row",
			children: [/* @__PURE__ */ n("div", {
				className: "list__item-main",
				children: [o, u && /* @__PURE__ */ t("div", {
					className: "list__item-secondary",
					children: r
				})]
			}), d && /* @__PURE__ */ t("div", {
				className: "list__item-trailing",
				children: i
			})]
		})
	});
});
//#endregion
export { r as List, i as ListItem };
