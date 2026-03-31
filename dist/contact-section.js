'use client';
import './contact-section.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { ContactForm as n } from "./contact-form.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/sections/ContactSection/ContactSection.tsx
function a({ id: a, title: o, form: s, whatsappTitle: c, whatsappLabel: l, whatsappHref: u }) {
	return /* @__PURE__ */ i("section", {
		id: a,
		className: "contact-section",
		children: [/* @__PURE__ */ i("div", {
			className: "contact-section__left",
			children: [/* @__PURE__ */ r("div", {
				className: "contact-section__intro",
				children: /* @__PURE__ */ r(t, {
					level: 2,
					weight: "semibold",
					children: o
				})
			}), /* @__PURE__ */ i("aside", {
				className: "contact-section__cta",
				children: [/* @__PURE__ */ r(t, {
					level: 3,
					children: c
				}), /* @__PURE__ */ r(e, {
					href: u,
					variant: "primary",
					external: !0,
					children: l
				})]
			})]
		}), /* @__PURE__ */ r("div", {
			className: "contact-section__form",
			children: /* @__PURE__ */ r(n, { ...s })
		})]
	});
}
//#endregion
export { a as ContactSection };
