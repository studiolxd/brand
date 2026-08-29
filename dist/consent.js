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
import { useEffect as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/stories/molecules/Consent/Consent.tsx
function p({ open: e = !0, onAcceptAll: a, onRejectAll: o, onOpenPreferences: s, title: c = "Cookies", description: l = "Usamos cookies propias y de terceros para que el sitio funcione y para entender cómo se usa. Puedes aceptarlas todas, rechazarlas o elegir por categorías.", policyHref: p, policyLabel: m = "Política de cookies", policyExternal: h = !1, acceptAllLabel: g = "Aceptar todas", rejectAllLabel: _ = "Rechazar", preferencesLabel: v = "Preferencias", regionLabel: y = "Consentimiento de cookies", className: b, ...x }) {
	return e ? /* @__PURE__ */ d("aside", {
		className: ["consent-banner", b].filter(Boolean).join(" "),
		role: "region",
		"aria-label": y,
		...x,
		children: /* @__PURE__ */ f("div", {
			className: "consent-banner__inner",
			children: [/* @__PURE__ */ f("div", {
				className: "consent-banner__text",
				children: [/* @__PURE__ */ d(n, {
					level: 2,
					size: 3,
					className: "consent-banner__title",
					children: c
				}), /* @__PURE__ */ f(i, {
					className: "consent-banner__description",
					children: [l, p !== void 0 && /* @__PURE__ */ f(u, { children: [" ", /* @__PURE__ */ d(r, {
						href: p,
						external: h,
						children: m
					})] })]
				})]
			}), /* @__PURE__ */ f("div", {
				className: "consent-banner__actions",
				children: [
					/* @__PURE__ */ d(t, {
						onClick: a,
						children: g
					}),
					/* @__PURE__ */ d(t, {
						onClick: o,
						children: _
					}),
					s && /* @__PURE__ */ d(t, {
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
function h({ open: n, onOpenChange: r, categories: i, value: p, onChange: h, onSave: g, onAcceptAll: _, onRejectAll: v, surface: y = "modal", side: b = "right", title: x = "Preferencias de cookies", saveLabel: S = "Guardar preferencias", acceptAllLabel: C = "Aceptar todas", rejectAllLabel: w = "Rechazar todas", closeLabel: T = "Cerrar", alwaysOnLabel: E = "Siempre activa", container: D, className: O }) {
	let k = h !== void 0, [A, j] = l(() => m(p, i));
	c(() => {
		n && !k && j(m(p, i));
	}, [n, k]);
	let M = k ? m(p, i) : A, N = (e, t) => {
		let n = {
			...M,
			[e]: t
		};
		k ? h(n) : j(n);
	}, P = /* @__PURE__ */ d("div", {
		className: ["consent-preferences", O].filter(Boolean).join(" "),
		children: /* @__PURE__ */ d("ul", {
			className: "consent-preferences__list",
			children: i.map((t) => /* @__PURE__ */ d("li", {
				className: "consent-preferences__category",
				children: /* @__PURE__ */ d(a, {
					label: t.required ? /* @__PURE__ */ f(u, { children: [t.name, /* @__PURE__ */ f(e, { children: [" ", E] })] }) : t.name,
					helperText: t.description,
					checked: t.required ? !0 : M[t.id] === !0,
					disabled: t.required,
					onCheckedChange: (e) => N(t.id, e)
				})
			}, t.id))
		})
	}), F = /* @__PURE__ */ f(u, { children: [
		/* @__PURE__ */ d(t, {
			onClick: () => g(M),
			children: S
		}),
		v && /* @__PURE__ */ d(t, {
			onClick: v,
			children: w
		}),
		_ && /* @__PURE__ */ d(t, {
			variant: "outline",
			onClick: _,
			children: C
		})
	] });
	return y === "modal" ? /* @__PURE__ */ f(s, {
		open: n,
		onClose: () => r(!1),
		title: typeof x == "string" ? x : void 0,
		closeLabel: T,
		container: D,
		children: [P, /* @__PURE__ */ d("div", {
			className: "consent-preferences__footer",
			children: F
		})]
	}) : /* @__PURE__ */ d(o, {
		open: n,
		onOpenChange: r,
		side: b,
		title: x,
		closeLabel: T,
		footer: F,
		container: D,
		children: P
	});
}
//#endregion
export { p as ConsentBanner, h as ConsentPreferences };
