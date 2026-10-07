'use client';
import './consent.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Heading as r } from "./heading.js";
import { Link as i } from "./link.js";
import { Paragraph as a } from "./paragraph.js";
import { SwitcherField as o } from "./switcher-field.js";
import { t as s } from "./_shared/sheet.js";
import { t as c } from "./_shared/modal.js";
import { useEffect as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/messages/es/consent.ts
var m = {
	title: "Cookies",
	regionLabel: "Consentimiento de cookies",
	acceptAll: "Aceptar todas",
	rejectAll: "Rechazar",
	preferences: "Preferencias",
	preferencesTitle: "Preferencias de cookies",
	alwaysOn: "Siempre activa"
};
//#endregion
//#region src/stories/molecules/Consent/Consent.tsx
function h({ open: t = !0, onAcceptAll: o, onRejectAll: s, onOpenPreferences: c, title: l, description: u, policyHref: h, policyLabel: g, policyExternal: _ = !1, acceptAllLabel: v, rejectAllLabel: y, preferencesLabel: b, regionLabel: x, className: S, ...C }) {
	let w = e("consent", m);
	return t ? /* @__PURE__ */ f("aside", {
		className: ["consent-banner", S].filter(Boolean).join(" "),
		role: "region",
		"aria-label": w("regionLabel", x),
		...C,
		children: /* @__PURE__ */ p("div", {
			className: "consent-banner__inner",
			children: [/* @__PURE__ */ p("div", {
				className: "consent-banner__text",
				children: [/* @__PURE__ */ f(r, {
					level: 2,
					size: 3,
					className: "consent-banner__title",
					children: l === void 0 ? w("title") : l
				}), /* @__PURE__ */ p(a, {
					className: "consent-banner__description",
					children: [u, h !== void 0 && /* @__PURE__ */ p(d, { children: [" ", /* @__PURE__ */ f(i, {
						href: h,
						external: _,
						children: g
					})] })]
				})]
			}), /* @__PURE__ */ p("div", {
				className: "consent-banner__actions",
				children: [
					/* @__PURE__ */ f(n, {
						onClick: o,
						children: w("acceptAll", v)
					}),
					/* @__PURE__ */ f(n, {
						onClick: s,
						children: w("rejectAll", y)
					}),
					c && /* @__PURE__ */ f(n, {
						variant: "outline",
						onClick: c,
						children: w("preferences", b)
					})
				]
			})]
		})
	}) : null;
}
function g(e, t) {
	let n = { ...e };
	for (let e of t) e.required && (n[e.id] = !0);
	return n;
}
function _({ open: n, onOpenChange: r, categories: i, value: a, onChange: h, onSave: _, surface: v = "modal", side: y = "right", title: b, closeLabel: x, alwaysOnLabel: S, container: C, className: w }) {
	let T = e("consent", m), E = h !== void 0, [D, O] = u(() => g(a, i));
	l(() => {
		n && !E && O(g(a, i));
	}, [n, E]);
	let k = E ? g(a, i) : D, A = (e) => {
		E ? h(e) : O(e), _?.(e);
	}, j = (e, t) => {
		A({
			...k,
			[e]: t
		});
	}, M = /* @__PURE__ */ f("div", {
		className: ["consent-preferences", w].filter(Boolean).join(" "),
		children: /* @__PURE__ */ f("ul", {
			className: "consent-preferences__list",
			children: i.map((e) => /* @__PURE__ */ f("li", {
				className: "consent-preferences__category",
				children: /* @__PURE__ */ f(o, {
					label: e.required ? /* @__PURE__ */ p(d, { children: [e.name, /* @__PURE__ */ f(t, { children: `, ${T("alwaysOn", S)}` })] }) : e.name,
					helperText: e.description,
					checked: e.required ? !0 : k[e.id] === !0,
					disabled: e.required,
					onCheckedChange: (t) => j(e.id, t)
				})
			}, e.id))
		})
	}), N = b === void 0 ? T("preferencesTitle") : b;
	return v === "modal" ? /* @__PURE__ */ f(c, {
		open: n,
		onOpenChange: r,
		title: typeof N == "string" ? N : void 0,
		...x === void 0 ? {} : { closeLabel: x },
		container: C,
		children: M
	}) : /* @__PURE__ */ f(s, {
		open: n,
		onOpenChange: r,
		side: y,
		title: N,
		...x === void 0 ? {} : { closeLabel: x },
		container: C,
		children: M
	});
}
//#endregion
export { h as ConsentBanner, _ as ConsentPreferences };
