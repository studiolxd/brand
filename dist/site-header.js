'use client';
import './site-header.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Container as t } from "./container.js";
import { t as n } from "./_shared/menubutton.js";
import { t as r } from "./_shared/logo.js";
import { t as i } from "./_shared/default-render-link.js";
import { useEffect as a, useId as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/messages/es/siteHeader.ts
var d = { logo: "Ir al inicio" };
//#endregion
//#region src/stories/sections/SiteHeader/SiteHeader.tsx
function f({ logoHref: f = "/", logoLabel: p, menuLabel: m, menuCloseLabel: h, logoSize: g = "2xl", logo: _ = /* @__PURE__ */ l(r, { size: g }), menuButtonSize: v = "lg", renderLogoLink: y = i, width: b = "xl", open: x, onOpenChange: S, children: C, settings: w, panelId: T, actions: E, language: D }) {
	let O = e("siteHeader", d), k = o(), A = T ?? k, [j, M] = c(!1), N = x !== void 0, P = N ? x : j, F = !!(C || w || D), I = s(null), L = s(null), R = (e) => {
		N || M(e), S?.(e);
	};
	return a(() => {
		if (!P) return;
		let e = (e) => {
			e.key === "Escape" && (R(!1), L.current?.focus());
		}, t = (e) => {
			let t = e.target;
			I.current?.contains(t) || t?.closest("[role=\"menu\"], [role=\"listbox\"], [role=\"dialog\"]") || R(!1);
		};
		document.addEventListener("keydown", e), document.addEventListener("pointerdown", t);
		let n = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.removeEventListener("pointerdown", t), document.body.style.overflow = n;
		};
	}, [P]), /* @__PURE__ */ l("header", {
		ref: I,
		className: "site-header",
		children: /* @__PURE__ */ u(t, {
			width: b,
			innerClassName: "site-header__bar",
			children: [
				y({
					href: f,
					className: "site-header__logo",
					"aria-label": O("logo", p),
					children: _
				}),
				/* @__PURE__ */ u("div", {
					className: "site-header__controls",
					children: [E && /* @__PURE__ */ l("div", {
						className: "site-header__actions",
						children: E
					}), F && /* @__PURE__ */ l(n, {
						ref: L,
						isOpen: P,
						onClick: () => R(!P),
						label: m,
						closeLabel: h,
						size: v,
						"aria-controls": A
					})]
				}),
				F && /* @__PURE__ */ l("div", {
					className: ["site-header__panel", P ? "site-header__panel--open" : ""].filter(Boolean).join(" "),
					id: A,
					inert: !P,
					"aria-hidden": !P,
					children: /* @__PURE__ */ u(t, {
						width: b,
						space: "none",
						innerClassName: "site-header__panel-inner",
						children: [C, (D || w) && /* @__PURE__ */ u("div", {
							className: "site-header__settings",
							children: [D, w]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { f as SiteHeader };
