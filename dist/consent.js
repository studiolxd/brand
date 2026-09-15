'use client';
import './consent.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Button as n } from "./button.js";
import { Heading as r } from "./heading.js";
import { Link as i } from "./link.js";
import { Paragraph as a } from "./paragraph.js";
import { SwitcherField as o } from "./switcher-field.js";
import { Sheet as s } from "./sheet.js";
import { Modal as c } from "./modal.js";
import { useEffect as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/molecules/Consent/Consent.tsx
function m({ open: t = !0, onAcceptAll: o, onRejectAll: s, onOpenPreferences: c, title: l, description: u, policyHref: m, policyLabel: h, policyExternal: g = !1, acceptAllLabel: _, rejectAllLabel: v, preferencesLabel: y, regionLabel: b, className: x, ...S }) {
	let C = e("consent");
	return t ? /* @__PURE__ */ f("aside", {
		className: ["consent-banner", x].filter(Boolean).join(" "),
		role: "region",
		"aria-label": C("regionLabel", b),
		...S,
		children: /* @__PURE__ */ p("div", {
			className: "consent-banner__inner",
			children: [/* @__PURE__ */ p("div", {
				className: "consent-banner__text",
				children: [/* @__PURE__ */ f(r, {
					level: 2,
					size: 3,
					className: "consent-banner__title",
					children: l === void 0 ? C("title") : l
				}), /* @__PURE__ */ p(a, {
					className: "consent-banner__description",
					children: [u, m !== void 0 && /* @__PURE__ */ p(d, { children: [" ", /* @__PURE__ */ f(i, {
						href: m,
						external: g,
						children: h
					})] })]
				})]
			}), /* @__PURE__ */ p("div", {
				className: "consent-banner__actions",
				children: [
					/* @__PURE__ */ f(n, {
						onClick: o,
						children: C("acceptAll", _)
					}),
					/* @__PURE__ */ f(n, {
						onClick: s,
						children: C("rejectAll", v)
					}),
					c && /* @__PURE__ */ f(n, {
						variant: "outline",
						onClick: c,
						children: C("preferences", y)
					})
				]
			})]
		})
	}) : null;
}
function h(e, t) {
	let n = { ...e };
	for (let e of t) e.required && (n[e.id] = !0);
	return n;
}
function g({ open: n, onOpenChange: r, categories: i, value: a, onChange: m, onSave: g, surface: _ = "modal", side: v = "right", title: y, closeLabel: b, alwaysOnLabel: x, container: S, className: C }) {
	let w = e("consent"), T = m !== void 0, [E, D] = u(() => h(a, i));
	l(() => {
		n && !T && D(h(a, i));
	}, [n, T]);
	let O = T ? h(a, i) : E, k = (e) => {
		T ? m(e) : D(e), g?.(e);
	}, A = (e, t) => {
		k({
			...O,
			[e]: t
		});
	}, j = /* @__PURE__ */ f("div", {
		className: ["consent-preferences", C].filter(Boolean).join(" "),
		children: /* @__PURE__ */ f("ul", {
			className: "consent-preferences__list",
			children: i.map((e) => /* @__PURE__ */ f("li", {
				className: "consent-preferences__category",
				children: /* @__PURE__ */ f(o, {
					label: e.required ? /* @__PURE__ */ p(d, { children: [e.name, /* @__PURE__ */ f(t, { children: `, ${w("alwaysOn", x)}` })] }) : e.name,
					helperText: e.description,
					checked: e.required ? !0 : O[e.id] === !0,
					disabled: e.required,
					onCheckedChange: (t) => A(e.id, t)
				})
			}, e.id))
		})
	}), M = y === void 0 ? w("preferencesTitle") : y;
	return _ === "modal" ? /* @__PURE__ */ f(c, {
		open: n,
		onClose: () => r(!1),
		title: typeof M == "string" ? M : void 0,
		...b === void 0 ? {} : { closeLabel: b },
		container: S,
		children: j
	}) : /* @__PURE__ */ f(s, {
		open: n,
		onOpenChange: r,
		side: v,
		title: M,
		...b === void 0 ? {} : { closeLabel: b },
		container: S,
		children: j
	});
}
//#endregion
export { m as ConsentBanner, g as ConsentPreferences };
