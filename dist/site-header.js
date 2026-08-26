'use client';
import './site-header.css';
import { Container as e } from "./container.js";
import { MenuButton as t } from "./menu-button.js";
import { Logo as n } from "./logo.js";
import { SkipLink as r } from "./skip-link.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { useEffect as o, useRef as s, useState as c } from "react";
//#region src/stories/sections/SiteHeader/SiteHeader.tsx
function l({ logoHref: l = "/", logoLabel: u = "Studio LXD — ir al inicio", menuLabel: d = "Menú de navegación", skipLabel: f = "Saltar al contenido principal", skipHref: p = "#main-content", width: m = "xl", open: h, onOpenChange: g, children: _, settings: v, panelId: y = "site-header-panel", actions: b, language: x }) {
	let [S, C] = c(!1), w = h !== void 0, T = w ? h : S, E = !!(_ || v), D = s(null), O = s(null), k = (e) => {
		w || C(e), g?.(e);
	};
	return o(() => {
		if (!T) return;
		let e = (e) => {
			e.key === "Escape" && (k(!1), O.current?.focus());
		}, t = (e) => {
			D.current?.contains(e.target) || k(!1);
		};
		document.addEventListener("keydown", e), document.addEventListener("pointerdown", t);
		let n = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.removeEventListener("pointerdown", t), document.body.style.overflow = n;
		};
	}, [T]), /* @__PURE__ */ a(e, {
		ref: D,
		as: "header",
		width: m,
		className: "site-header",
		innerClassName: "site-header__bar",
		children: [
			f && /* @__PURE__ */ i(r, {
				href: p,
				children: f
			}),
			/* @__PURE__ */ i("a", {
				href: l,
				className: "site-header__logo",
				"aria-label": u,
				children: /* @__PURE__ */ i(n, {})
			}),
			/* @__PURE__ */ a("div", {
				className: "site-header__controls",
				children: [
					b,
					x,
					/* @__PURE__ */ i(t, {
						ref: O,
						isOpen: T,
						onClick: () => k(!T),
						label: d,
						"aria-controls": E ? y : void 0
					})
				]
			}),
			E && /* @__PURE__ */ i("div", {
				className: ["site-header__panel", T ? "site-header__panel--open" : ""].filter(Boolean).join(" "),
				id: y,
				inert: !T,
				"aria-hidden": !T,
				children: /* @__PURE__ */ a(e, {
					width: m,
					space: "none",
					innerClassName: "site-header__panel-inner",
					children: [_, v && /* @__PURE__ */ i("div", {
						className: "site-header__settings",
						children: v
					})]
				})
			})
		]
	});
}
//#endregion
export { l as SiteHeader };
