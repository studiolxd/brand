'use client';
import './header.css';
import { Hamburger as e } from "./hamburger.js";
import { Logo as t } from "./logo.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useState as i } from "react";
//#region src/stories/sections/Header/Header.tsx
function a({ id: a, navItems: o, featuredLink: s, actions: c, logoHref: l = "/", logoLabel: u = "Studio LXD — ir al inicio", navLabel: d = "Main navigation", dark: f = !1 }) {
	let [p, m] = i(!1), h = () => {
		m(!1);
	};
	return /* @__PURE__ */ r("header", {
		id: a,
		className: ["header", f ? "header--dark" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n("a", {
				href: "#main-content",
				className: "header__skip-link",
				children: "Saltar al contenido principal"
			}),
			/* @__PURE__ */ n("a", {
				href: l,
				className: "header__logo",
				"aria-label": u,
				children: /* @__PURE__ */ n(t, {})
			}),
			/* @__PURE__ */ n(e, {
				isOpen: p,
				onClick: () => m(!p),
				label: p ? "Cerrar menu" : "Abrir menu"
			}),
			/* @__PURE__ */ r("div", {
				className: "header__navbar",
				"aria-hidden": !p,
				children: [
					s && /* @__PURE__ */ n("a", {
						href: s.href,
						className: "header__featured",
						onClick: h,
						children: s.label
					}),
					/* @__PURE__ */ n("nav", {
						"aria-label": d,
						children: o.map((e) => /* @__PURE__ */ n("a", {
							href: e.href,
							className: "header__nav-link",
							onClick: h,
							children: e.label
						}, e.href))
					}),
					c && /* @__PURE__ */ n("div", {
						className: "header__actions",
						children: c
					})
				]
			})
		]
	});
}
//#endregion
export { a as Header };
