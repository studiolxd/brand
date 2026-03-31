'use client';
import './footer.css';
import { Heading as e } from "./heading.js";
import { Link as t } from "./link.js";
import { Logo as n } from "./logo.js";
import { NewsletterForm as r } from "./newsletter-form.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/sections/Footer/Footer.tsx
function s({ id: s }) {
	return /* @__PURE__ */ o("footer", {
		id: s,
		className: "footer surface-dark",
		children: [
			/* @__PURE__ */ o("div", {
				className: "footer__col footer__col--1",
				children: [/* @__PURE__ */ o(e, {
					level: 2,
					className: "footer__tagline",
					children: [
						/* @__PURE__ */ a("span", { children: "Learning" }),
						/* @__PURE__ */ a("span", { children: "experience" }),
						/* @__PURE__ */ a("span", { children: "design" })
					]
				}), /* @__PURE__ */ a("div", {
					className: "footer__logo",
					children: /* @__PURE__ */ a(n, { height: 50 })
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: "footer__col footer__col--2",
				children: [/* @__PURE__ */ a(e, {
					level: 3,
					children: "Suscríbete a nuestra newsletter"
				}), /* @__PURE__ */ a(r, { privacyLabel: /* @__PURE__ */ o(i, { children: [
					"He leído la ",
					/* @__PURE__ */ a(t, {
						href: "#",
						children: "política de privacidad"
					}),
					" y consiento recibir la newsletter"
				] }) })]
			}),
			/* @__PURE__ */ o("div", {
				className: "footer__col footer__col--3",
				children: [/* @__PURE__ */ o("ul", {
					className: "footer__social",
					children: [
						/* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "LinkedIn"
						}) }),
						/* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "Instagram"
						}) }),
						/* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "GitHub"
						}) })
					]
				}), /* @__PURE__ */ o("address", {
					className: "footer__contact",
					children: [/* @__PURE__ */ a(t, {
						href: "mailto:hello@studiolxd.com",
						children: "hello@studiolxd.com"
					}), /* @__PURE__ */ a(t, {
						href: "tel:+34623752862",
						children: "+34 623 752 862"
					})]
				})]
			}),
			/* @__PURE__ */ a("div", {
				className: "footer__bottom",
				children: /* @__PURE__ */ o("ul", {
					className: "footer__legal",
					children: [
						/* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
							href: "#",
							children: "Aviso legal"
						}) }),
						/* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
							href: "#",
							children: "Política de privacidad"
						}) }),
						/* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
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
export { s as Footer };
