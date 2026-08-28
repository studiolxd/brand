'use client';
import './consent.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { Link as n } from "./link.js";
import { Paragraph as r } from "./paragraph.js";
import { Separator as i } from "./separator.js";
import { SwitcherField as a } from "./switcher-field.js";
import { Sheet as o } from "./sheet.js";
import { Modal as s } from "./modal.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { useEffect as d, useState as f } from "react";
//#region src/stories/molecules/Consent/Consent.tsx
function p({ open: i = !0, onAcceptAll: a, onRejectAll: o, onOpenPreferences: s, title: d = "Cookies", description: f = "Usamos cookies propias y de terceros para que el sitio funcione y para entender cómo se usa. Puedes aceptarlas todas, rechazarlas o elegir por categorías.", policyHref: p, policyLabel: m = "Política de cookies", policyExternal: h = !1, acceptAllLabel: g = "Aceptar todas", rejectAllLabel: _ = "Rechazar", preferencesLabel: v = "Preferencias", regionLabel: y = "Consentimiento de cookies", className: b, ...x }) {
	return i ? /* @__PURE__ */ l("aside", {
		className: ["consent-banner", b].filter(Boolean).join(" "),
		role: "region",
		"aria-label": y,
		...x,
		children: /* @__PURE__ */ u("div", {
			className: "consent-banner__inner",
			children: [/* @__PURE__ */ u("div", {
				className: "consent-banner__text",
				children: [/* @__PURE__ */ l(t, {
					level: 2,
					size: 3,
					className: "consent-banner__title",
					children: d
				}), /* @__PURE__ */ u(r, {
					size: "small",
					className: "consent-banner__description",
					children: [f, p !== void 0 && /* @__PURE__ */ u(c, { children: [" ", /* @__PURE__ */ l(n, {
						href: p,
						external: h,
						children: m
					})] })]
				})]
			}), /* @__PURE__ */ u("div", {
				className: "consent-banner__actions",
				children: [
					/* @__PURE__ */ l(e, {
						onClick: a,
						children: g
					}),
					/* @__PURE__ */ l(e, {
						variant: "outline",
						onClick: o,
						children: _
					}),
					s && /* @__PURE__ */ l(e, {
						variant: "text",
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
function h({ open: t, onOpenChange: n, categories: r, value: p, onChange: h, onSave: g, onAcceptAll: _, onRejectAll: v, surface: y = "sheet", side: b = "right", title: x = "Preferencias de cookies", description: S = "Las cookies necesarias no se pueden desactivar: sin ellas el sitio no funciona. El resto son cosa tuya.", saveLabel: C = "Guardar preferencias", acceptAllLabel: w = "Aceptar todas", rejectAllLabel: T = "Rechazar todas", closeLabel: E = "Cerrar", alwaysOnLabel: D = "Siempre activa", className: O }) {
	let k = h !== void 0, [A, j] = f(() => m(p, r));
	d(() => {
		t && !k && j(m(p, r));
	}, [t, k]);
	let M = k ? m(p, r) : A, N = (e, t) => {
		let n = {
			...M,
			[e]: t
		};
		k ? h(n) : j(n);
	}, P = /* @__PURE__ */ l("div", {
		className: ["consent-preferences", O].filter(Boolean).join(" "),
		children: /* @__PURE__ */ l("ul", {
			className: "consent-preferences__list",
			children: r.map((e, t) => /* @__PURE__ */ u("li", {
				className: "consent-preferences__category",
				children: [t > 0 && /* @__PURE__ */ l(i, { spacing: "sm" }), /* @__PURE__ */ l(a, {
					label: e.required ? /* @__PURE__ */ u(c, { children: [
						e.name,
						" ",
						/* @__PURE__ */ l("span", {
							className: "consent-preferences__always",
							children: D
						})
					] }) : e.name,
					helperText: e.description,
					checked: e.required ? !0 : M[e.id] === !0,
					disabled: e.required,
					onCheckedChange: (t) => N(e.id, t)
				})]
			}, e.id))
		})
	}), F = /* @__PURE__ */ u(c, { children: [
		/* @__PURE__ */ l(e, {
			onClick: () => g(M),
			children: C
		}),
		v && /* @__PURE__ */ l(e, {
			variant: "outline",
			onClick: v,
			children: T
		}),
		_ && /* @__PURE__ */ l(e, {
			variant: "text",
			onClick: _,
			children: w
		})
	] });
	return y === "modal" ? /* @__PURE__ */ u(s, {
		open: t,
		onClose: () => n(!1),
		title: typeof x == "string" ? x : void 0,
		closeLabel: E,
		description: S,
		children: [P, /* @__PURE__ */ l("div", {
			className: "consent-preferences__footer",
			children: F
		})]
	}) : /* @__PURE__ */ l(o, {
		open: t,
		onOpenChange: n,
		side: b,
		title: x,
		description: S,
		closeLabel: E,
		footer: F,
		children: P
	});
}
//#endregion
export { p as ConsentBanner, h as ConsentPreferences };
