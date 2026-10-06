'use client';
import './site-header.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Container as t } from "./container.js";
import { MenuButton as n } from "./menu-button.js";
import { t as r } from "./_shared/logo.js";
import { t as i } from "./_shared/default-render-link.js";
import { useEffect as a, useId as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/sections/SiteHeader/SiteHeader.tsx
function d({ logoHref: d = "/", logoLabel: f, menuLabel: p, menuCloseLabel: m, logoSize: h = "xxl", logo: g = /* @__PURE__ */ l(r, { size: h }), menuButtonSize: _ = "lg", renderLogoLink: v = i, width: y = "xl", open: b, onOpenChange: x, children: S, settings: C, panelId: w, actions: T, language: E }) {
	let D = e("siteHeader"), O = o(), k = w ?? O, [A, j] = c(!1), M = b !== void 0, N = M ? b : A, P = !!(S || C || E), F = s(null), I = s(null), L = (e) => {
		M || j(e), x?.(e);
	};
	return a(() => {
		if (!N) return;
		let e = (e) => {
			e.key === "Escape" && (L(!1), I.current?.focus());
		}, t = (e) => {
			let t = e.target;
			F.current?.contains(t) || t?.closest("[role=\"menu\"], [role=\"listbox\"], [role=\"dialog\"]") || L(!1);
		};
		document.addEventListener("keydown", e), document.addEventListener("pointerdown", t);
		let n = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.removeEventListener("pointerdown", t), document.body.style.overflow = n;
		};
	}, [N]), /* @__PURE__ */ l("header", {
		ref: F,
		className: "site-header",
		children: /* @__PURE__ */ u(t, {
			width: y,
			innerClassName: "site-header__bar",
			children: [
				v({
					href: d,
					className: "site-header__logo",
					"aria-label": D("logo", f),
					children: g
				}),
				/* @__PURE__ */ u("div", {
					className: "site-header__controls",
					children: [T && /* @__PURE__ */ l("div", {
						className: "site-header__actions",
						children: T
					}), P && /* @__PURE__ */ l(n, {
						ref: I,
						isOpen: N,
						onClick: () => L(!N),
						label: p,
						closeLabel: m,
						size: _,
						"aria-controls": k
					})]
				}),
				P && /* @__PURE__ */ l("div", {
					className: ["site-header__panel", N ? "site-header__panel--open" : ""].filter(Boolean).join(" "),
					id: k,
					inert: !N,
					"aria-hidden": !N,
					children: /* @__PURE__ */ u(t, {
						width: y,
						space: "none",
						innerClassName: "site-header__panel-inner",
						children: [S, (E || C) && /* @__PURE__ */ u("div", {
							className: "site-header__settings",
							children: [E, C]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { d as SiteHeader };
