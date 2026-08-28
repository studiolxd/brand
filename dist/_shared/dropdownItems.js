import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import { Menu as r } from "@base-ui/react/menu";
//#region src/stories/molecules/_shared/dropdownItems.tsx
function i({ children: e, ...n }) {
	return /* @__PURE__ */ t("a", {
		...n,
		children: e
	});
}
function a(r, i) {
	return i ? /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t("span", {
		"aria-hidden": "true",
		children: i
	}), r] }) : /* @__PURE__ */ t(e, { children: r });
}
function o(e) {
	return e.reduce((e, t) => {
		let n = t.type === "radio", r = e[e.length - 1];
		return r && r.radio === n ? r.items.push(t) : e.push({
			radio: n,
			items: [t]
		}), e;
	}, []);
}
function s({ items: e, itemClass: n, separatorClass: i, renderLink: s, labelClass: c, radioValue: l, onRadioValueChange: u }) {
	let d = (e, o) => {
		if (e.type === "separator") return /* @__PURE__ */ t(r.Separator, { className: i }, o);
		if (e.type === "label") return c ? /* @__PURE__ */ t(r.Group, { children: /* @__PURE__ */ t(r.GroupLabel, {
			className: c,
			children: e.label
		}) }, o) : null;
		if (e.type === "radio") return /* @__PURE__ */ t(r.RadioItem, {
			className: n(),
			value: e.value,
			disabled: e.disabled,
			closeOnClick: e.closeOnSelect !== !1,
			children: a(e.label, e.icon)
		}, o);
		let l = a(e.label, e.icon);
		return e.type === "link" ? e.disabled ? /* @__PURE__ */ t(r.Item, {
			className: n(e.destructive),
			disabled: !0,
			children: l
		}, o) : /* @__PURE__ */ t(r.Item, {
			className: n(e.destructive),
			render: (t) => s({
				...t,
				href: e.href,
				className: t.className ?? n(e.destructive),
				children: l
			})
		}, o) : /* @__PURE__ */ t(r.Item, {
			className: n(e.destructive),
			disabled: e.disabled,
			closeOnClick: e.closeOnSelect !== !1,
			onClick: e.disabled ? void 0 : () => {
				if (e.closeOnSelect === !1) {
					e.onClick();
					return;
				}
				setTimeout(() => e.onClick(), 0);
			},
			children: l
		}, o);
	}, f = e;
	if (!f.some((e) => e.type === "radio")) return f.map(d);
	let p = 0;
	return o(f).map((e, n) => {
		let i = p;
		p += e.items.length;
		let a = e.items.map((e, t) => d(e, i + t));
		return e.radio ? /* @__PURE__ */ t(r.RadioGroup, {
			value: l,
			onValueChange: (e) => u?.(String(e)),
			children: a
		}, `radio-${n}`) : a;
	});
}
//#endregion
export { s as n, i as t };
