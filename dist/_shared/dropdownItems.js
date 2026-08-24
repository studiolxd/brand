import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/_shared/dropdownItems.tsx
function i(r, i) {
	return i ? /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t("span", {
		"aria-hidden": "true",
		children: i
	}), r] }) : /* @__PURE__ */ t(e, { children: r });
}
function a(e) {
	return e.reduce((e, t) => {
		let n = t.type === "radio", r = e[e.length - 1];
		return r && r.radio === n ? r.items.push(t) : e.push({
			radio: n,
			items: [t]
		}), e;
	}, []);
}
function o({ items: e, itemClass: o, separatorClass: s, renderLink: c, labelClass: l, radioIndicatorClass: u, radioValue: d, onRadioValueChange: f }) {
	let p = (e, a) => {
		if (e.type === "separator") return /* @__PURE__ */ t(r.Separator, { className: s }, a);
		if (e.type === "label") return l ? /* @__PURE__ */ t(r.Label, {
			className: l,
			children: e.label
		}, a) : null;
		if (e.type === "radio") return /* @__PURE__ */ n(r.RadioItem, {
			className: o(),
			value: e.value,
			disabled: e.disabled,
			children: [/* @__PURE__ */ t("input", {
				type: "radio",
				checked: d === e.value,
				readOnly: !0,
				tabIndex: -1,
				"aria-hidden": "true",
				className: u
			}), i(e.label, e.icon)]
		}, a);
		let f = i(e.label, e.icon);
		return e.type === "link" ? e.disabled ? /* @__PURE__ */ t(r.Item, {
			className: o(e.destructive),
			disabled: !0,
			children: f
		}, a) : /* @__PURE__ */ t(r.Item, {
			asChild: !0,
			children: c({
				href: e.href,
				children: f,
				className: o(e.destructive)
			})
		}, a) : /* @__PURE__ */ t(r.Item, {
			className: o(e.destructive),
			disabled: e.disabled,
			onSelect: e.disabled ? void 0 : (t) => {
				if (e.closeOnSelect === !1) {
					t.preventDefault(), e.onClick();
					return;
				}
				setTimeout(() => e.onClick(), 0);
			},
			children: f
		}, a);
	}, m = e;
	if (!m.some((e) => e.type === "radio")) return m.map(p);
	let h = 0;
	return a(m).map((e, n) => {
		let i = h;
		h += e.items.length;
		let a = e.items.map((e, t) => p(e, i + t));
		return e.radio ? /* @__PURE__ */ t(r.RadioGroup, {
			value: d,
			onValueChange: f,
			children: a
		}, `radio-${n}`) : a;
	});
}
//#endregion
export { o as t };
