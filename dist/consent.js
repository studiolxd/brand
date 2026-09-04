'use client';
import './consent.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { Button as t } from "./button.js";
import { Heading as n } from "./heading.js";
import { Link as r } from "./link.js";
import { Paragraph as i } from "./paragraph.js";
import { SwitcherField as a } from "./switcher-field.js";
import { Sheet as o } from "./sheet.js";
import { Modal as s } from "./modal.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { useEffect as d, useState as f } from "react";
//#region src/stories/molecules/Consent/Consent.tsx
function p({ open: e = !0, onAcceptAll: a, onRejectAll: o, onOpenPreferences: s, title: d = "Cookies", description: f = "Usamos cookies propias y de terceros para que el sitio funcione y para entender cómo se usa. Puedes aceptarlas todas, rechazarlas o elegir por categorías.", policyHref: p, policyLabel: m = "Política de cookies", policyExternal: h = !1, acceptAllLabel: g = "Aceptar todas", rejectAllLabel: _ = "Rechazar", preferencesLabel: v = "Preferencias", regionLabel: y = "Consentimiento de cookies", className: b, ...x }) {
	return e ? /* @__PURE__ */ l("aside", {
		className: ["consent-banner", b].filter(Boolean).join(" "),
		role: "region",
		"aria-label": y,
		...x,
		children: /* @__PURE__ */ u("div", {
			className: "consent-banner__inner",
			children: [/* @__PURE__ */ u("div", {
				className: "consent-banner__text",
				children: [/* @__PURE__ */ l(n, {
					level: 2,
					size: 3,
					className: "consent-banner__title",
					children: d
				}), /* @__PURE__ */ u(i, {
					className: "consent-banner__description",
					children: [f, p !== void 0 && /* @__PURE__ */ u(c, { children: [" ", /* @__PURE__ */ l(r, {
						href: p,
						external: h,
						children: m
					})] })]
				})]
			}), /* @__PURE__ */ u("div", {
				className: "consent-banner__actions",
				children: [
					/* @__PURE__ */ l(t, {
						onClick: a,
						children: g
					}),
					/* @__PURE__ */ l(t, {
						onClick: o,
						children: _
					}),
					s && /* @__PURE__ */ l(t, {
						variant: "outline",
						onClick: s,
						children: v
					})
				]
			})]
		})
	}) : null;
}
function m(e, t) {
	let n = { ...e };
	for (let e of t) e.required && (n[e.id] = !0);
	return n;
}
function h({ open: t, onOpenChange: n, categories: r, value: i, onChange: p, onSave: h, surface: g = "modal", side: _ = "right", title: v = "Preferencias de cookies", closeLabel: y = "Cerrar", alwaysOnLabel: b = "Siempre activa", container: x, className: S }) {
	let C = p !== void 0, [w, T] = f(() => m(i, r));
	d(() => {
		t && !C && T(m(i, r));
	}, [t, C]);
	let E = C ? m(i, r) : w, D = (e) => {
		C ? p(e) : T(e), h?.(e);
	}, O = (e, t) => {
		D({
			...E,
			[e]: t
		});
	}, k = /* @__PURE__ */ l("div", {
		className: ["consent-preferences", S].filter(Boolean).join(" "),
		children: /* @__PURE__ */ l("ul", {
			className: "consent-preferences__list",
			children: r.map((t) => /* @__PURE__ */ l("li", {
				className: "consent-preferences__category",
				children: /* @__PURE__ */ l(a, {
					label: t.required ? /* @__PURE__ */ u(c, { children: [t.name, /* @__PURE__ */ l(e, { children: `, ${b}` })] }) : t.name,
					helperText: t.description,
					checked: t.required ? !0 : E[t.id] === !0,
					disabled: t.required,
					onCheckedChange: (e) => O(t.id, e)
				})
			}, t.id))
		})
	});
	return g === "modal" ? /* @__PURE__ */ l(s, {
		open: t,
		onClose: () => n(!1),
		title: typeof v == "string" ? v : void 0,
		closeLabel: y,
		container: x,
		children: k
	}) : /* @__PURE__ */ l(o, {
		open: t,
		onOpenChange: n,
		side: _,
		title: v,
		closeLabel: y,
		container: x,
		children: k
	});
}
//#endregion
export { p as ConsentBanner, h as ConsentPreferences };
