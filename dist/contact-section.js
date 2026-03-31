'use client';
import './contact-section.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { ContactForm as n } from "./contact-form.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/sections/ContactSection/ContactSection.tsx
function a({ title: a, form: o, whatsappTitle: s, whatsappLabel: c, whatsappHref: l }) {
	return /* @__PURE__ */ i("section", {
		className: "contact-section",
		children: [/* @__PURE__ */ i("div", {
			className: "contact-section__left",
			children: [/* @__PURE__ */ r("div", {
				className: "contact-section__intro",
				children: /* @__PURE__ */ r(t, {
					level: 2,
					weight: "semibold",
					children: a
				})
			}), /* @__PURE__ */ i("aside", {
				className: "contact-section__cta",
				children: [/* @__PURE__ */ r(t, {
					level: 3,
					children: s
				}), /* @__PURE__ */ r(e, {
					href: l,
					variant: "primary",
					external: !0,
					children: c
				})]
			})]
		}), /* @__PURE__ */ r("div", {
			className: "contact-section__form",
			children: /* @__PURE__ */ r(n, { ...o })
		})]
	});
}
//#endregion
export { a as ContactSection };
