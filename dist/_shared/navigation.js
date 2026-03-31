import { Hamburger as e } from "../hamburger.js";
import { Heading as t } from "../heading.js";
import { Link as n } from "../link.js";
import { Logo as r } from "../logo.js";
import { NewsletterForm as i } from "../newsletter-form.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { useState as c } from "react";
//#region src/stories/sections/Header/Header.tsx
function l({ id: t, navItems: n, featuredLink: i, actions: a, logoHref: l = "/", logoLabel: u = "Studio LXD — ir al inicio", navLabel: d = "Main navigation", dark: f = !1 }) {
	let [p, m] = c(!1), h = () => {
		m(!1);
	};
	return /* @__PURE__ */ s("header", {
		id: t,
		className: ["header", f ? "header--dark" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("a", {
				href: "#main-content",
				className: "header__skip-link",
				children: "Saltar al contenido principal"
			}),
			/* @__PURE__ */ o("a", {
				href: l,
				className: "header__logo",
				"aria-label": u,
				children: /* @__PURE__ */ o(r, {})
			}),
			/* @__PURE__ */ o(e, {
				isOpen: p,
				onClick: () => m(!p),
				label: p ? "Cerrar menu" : "Abrir menu"
			}),
			/* @__PURE__ */ s("div", {
				className: "header__navbar",
				"aria-hidden": !p,
				children: [
					i && /* @__PURE__ */ o("a", {
						href: i.href,
						className: "header__featured",
						onClick: h,
						children: i.label
					}),
					/* @__PURE__ */ o("nav", {
						"aria-label": d,
						children: n.map((e) => /* @__PURE__ */ o("a", {
							href: e.href,
							className: "header__nav-link",
							onClick: h,
							children: e.label
						}, e.href))
					}),
					a && /* @__PURE__ */ o("div", {
						className: "header__actions",
						children: a
					})
				]
			})
		]
	});
}
//#endregion
//#region src/stories/sections/Footer/Footer.tsx
function u({ id: e }) {
	return /* @__PURE__ */ s("footer", {
		id: e,
		className: "footer surface-dark",
		children: [
			/* @__PURE__ */ s("div", {
				className: "footer__col footer__col--1",
				children: [/* @__PURE__ */ s(t, {
					level: 2,
					className: "footer__tagline",
					children: [
						/* @__PURE__ */ o("span", { children: "Learning" }),
						/* @__PURE__ */ o("span", { children: "experience" }),
						/* @__PURE__ */ o("span", { children: "design" })
					]
				}), /* @__PURE__ */ o("div", {
					className: "footer__logo",
					children: /* @__PURE__ */ o(r, { height: 50 })
				})]
			}),
			/* @__PURE__ */ s("div", {
				className: "footer__col footer__col--2",
				children: [/* @__PURE__ */ o(t, {
					level: 3,
					children: "Suscríbete a nuestra newsletter"
				}), /* @__PURE__ */ o(i, { privacyLabel: /* @__PURE__ */ s(a, { children: [
					"He leído la ",
					/* @__PURE__ */ o(n, {
						href: "#",
						children: "política de privacidad"
					}),
					" y consiento recibir la newsletter"
				] }) })]
			}),
			/* @__PURE__ */ s("div", {
				className: "footer__col footer__col--3",
				children: [/* @__PURE__ */ s("ul", {
					className: "footer__social",
					children: [
						/* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "LinkedIn"
						}) }),
						/* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "Instagram"
						}) }),
						/* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "GitHub"
						}) })
					]
				}), /* @__PURE__ */ s("address", {
					className: "footer__contact",
					children: [/* @__PURE__ */ o(n, {
						href: "mailto:hello@studiolxd.com",
						children: "hello@studiolxd.com"
					}), /* @__PURE__ */ o(n, {
						href: "tel:+34623752862",
						children: "+34 623 752 862"
					})]
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: "footer__bottom",
				children: /* @__PURE__ */ s("ul", {
					className: "footer__legal",
					children: [
						/* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
							href: "#",
							children: "Aviso legal"
						}) }),
						/* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
							href: "#",
							children: "Política de privacidad"
						}) }),
						/* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
							href: "#",
							children: "Política de cookies"
						}) })
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/constants/navigation.ts
var d = [
	{
		label: "Inicio",
		href: "#"
	},
	{
		label: "Soluciones",
		href: "#"
	},
	{
		label: "Proyectos",
		href: "#"
	},
	{
		label: "Academia",
		href: "#"
	},
	{
		label: "Contacto",
		href: "#"
	}
], f = {
	label: "Cursos online",
	href: "#"
};
//#endregion
export { l as i, d as n, u as r, f as t };
