import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import { Menu as r } from "@base-ui/react/menu";
//#region src/stories/molecules/_shared/dropdownItems.tsx
function i(r, i, a, o) {
	let s = a && o ? /* @__PURE__ */ n("span", {
		className: `${o}__item-text`,
		children: [/* @__PURE__ */ t("span", {
			className: `${o}__item-label`,
			children: r
		}), /* @__PURE__ */ t("span", {
			className: `${o}__item-description`,
			children: a
		})]
	}) : r;
	return i ? /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t("span", {
		"aria-hidden": "true",
		className: o ? `${o}__item-icon` : void 0,
		children: i
	}), s] }) : /* @__PURE__ */ t(e, { children: s });
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
function o({ items: e, itemClass: n, separatorClass: o, renderLink: s, labelClass: c, blockClass: l, radioValue: u, onRadioValueChange: d }) {
	let f = (e, a) => {
		if (e.type === "separator") return /* @__PURE__ */ t(r.Separator, { className: o }, a);
		if (e.type === "label") return c ? /* @__PURE__ */ t(r.Group, { children: /* @__PURE__ */ t(r.GroupLabel, {
			className: c,
			children: e.label
		}) }, a) : null;
		if (e.type === "radio") return /* @__PURE__ */ t(r.RadioItem, {
			className: n(),
			value: e.value,
			disabled: e.disabled,
			closeOnClick: e.closeOnSelect !== !1,
			children: i(e.label, e.icon, void 0, l)
		}, a);
		let u = i(e.label, e.icon, e.description, l);
		return e.type === "link" ? e.disabled ? /* @__PURE__ */ t(r.Item, {
			className: n(e.destructive),
			disabled: !0,
			children: u
		}, a) : /* @__PURE__ */ t(r.Item, {
			className: n(e.destructive),
			render: (t) => s({
				...t,
				href: e.href,
				className: t.className ?? n(e.destructive),
				children: u
			})
		}, a) : /* @__PURE__ */ t(r.Item, {
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
			children: u
		}, a);
	}, p = e;
	if (!p.some((e) => e.type === "radio")) return p.map(f);
	let m = 0;
	return a(p).map((e, n) => {
		let i = m;
		m += e.items.length;
		let a = e.items.map((e, t) => f(e, i + t));
		return e.radio ? /* @__PURE__ */ t(r.RadioGroup, {
			value: u,
			onValueChange: (e) => d?.(String(e)),
			children: a
		}, `radio-${n}`) : a;
	});
}
//#endregion
export { o as t };
