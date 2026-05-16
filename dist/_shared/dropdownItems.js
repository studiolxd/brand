import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/_shared/dropdownItems.tsx
function i(r, i) {
	return i ? /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t("span", {
		"aria-hidden": "true",
		children: i
	}), r] }) : /* @__PURE__ */ t(e, { children: r });
}
function a({ items: e, itemClass: n, separatorClass: a, renderLink: o }) {
	return e.map((e, s) => {
		if (e.type === "separator") return /* @__PURE__ */ t(r.Separator, { className: a }, s);
		let c = i(e.label, e.icon);
		return e.type === "link" ? e.disabled ? /* @__PURE__ */ t(r.Item, {
			className: n(e.destructive),
			disabled: !0,
			children: c
		}, s) : /* @__PURE__ */ t(r.Item, {
			asChild: !0,
			children: o({
				href: e.href,
				children: c,
				className: n(e.destructive)
			})
		}, s) : /* @__PURE__ */ t(r.Item, {
			className: n(e.destructive),
			disabled: e.disabled,
			onSelect: e.disabled ? void 0 : e.onClick,
			children: c
		}, s);
	});
}
//#endregion
export { a as t };
