'use client';
import './site-header.css';
import { Container as e } from "./container.js";
import { MenuButton as t } from "./menu-button.js";
import { Logo as n } from "./logo.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useEffect as a, useRef as o, useState as s } from "react";
//#region src/stories/sections/SiteHeader/SiteHeader.tsx
function c({ children: e, ...t }) {
	return /* @__PURE__ */ r("a", {
		...t,
		children: e
	});
}
function l({ logoHref: l = "/", logoLabel: u = "Studio LXD — ir al inicio", menuLabel: d = "Menú de navegación", menuCloseLabel: f, logo: p = /* @__PURE__ */ r(n, {}), renderLogoLink: m = c, width: h = "xl", open: g, onOpenChange: _, children: v, settings: y, panelId: b = "site-header-panel", actions: x, language: S }) {
	let [C, w] = s(!1), T = g !== void 0, E = T ? g : C, D = !!(v || y), O = o(null), k = o(null), A = (e) => {
		T || w(e), _?.(e);
	};
	return a(() => {
		if (!E) return;
		let e = (e) => {
			e.key === "Escape" && (A(!1), k.current?.focus());
		}, t = (e) => {
			O.current?.contains(e.target) || A(!1);
		};
		document.addEventListener("keydown", e), document.addEventListener("pointerdown", t);
		let n = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.removeEventListener("pointerdown", t), document.body.style.overflow = n;
		};
	}, [E]), /* @__PURE__ */ i(e, {
		ref: O,
		as: "header",
		width: h,
		className: "site-header",
		innerClassName: "site-header__bar",
		children: [
			m({
				href: l,
				className: "site-header__logo",
				"aria-label": u,
				children: p
			}),
			/* @__PURE__ */ i("div", {
				className: "site-header__controls",
				children: [
					x,
					S,
					D && /* @__PURE__ */ r(t, {
						ref: k,
						isOpen: E,
						onClick: () => A(!E),
						label: d,
						closeLabel: f,
						"aria-controls": b
					})
				]
			}),
			D && /* @__PURE__ */ r("div", {
				className: ["site-header__panel", E ? "site-header__panel--open" : ""].filter(Boolean).join(" "),
				id: b,
				inert: !E,
				"aria-hidden": !E,
				children: /* @__PURE__ */ i(e, {
					width: h,
					space: "none",
					innerClassName: "site-header__panel-inner",
					children: [v, y && /* @__PURE__ */ r("div", {
						className: "site-header__settings",
						children: y
					})]
				})
			})
		]
	});
}
//#endregion
export { l as SiteHeader };
