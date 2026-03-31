'use client';
import './contact-form.css';
import { Button as e } from "./button.js";
import { CheckboxField as t } from "./checkbox-field.js";
import { Form as n } from "./form.js";
import { InputField as r } from "./input-field.js";
import { InputPhoneField as i } from "./input-phone-field.js";
import { TextareaField as a } from "./textarea-field.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { forwardRef as c, useState as l } from "react";
//#region src/stories/organisms/ContactForm/ContactForm.tsx
var u = c(function({ emailLabel: c = "Email", emailPlaceholder: u = "Escribe aquí tu correo electrónico", messageLabel: d = "Mensaje", messagePlaceholder: f = "Escribe aquí tu mensaje", messageRows: p = 5, wantCallLabel: m = "Prefiero que me llaméis por teléfono", phoneLabel: h = "Teléfono", phonePlaceholder: g = "Escribe aquí tu número de teléfono", phoneHelper: _ = "Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto.", privacyLabel: v, buttonLabel: y = "Enviar mensaje", submitting: b = !1, submittingLabel: x = "Enviando…", errors: S, success: C = !1, successMessage: w = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.", onSubmit: T }, E) {
	let [D, O] = l(!1);
	return C ? /* @__PURE__ */ o("p", {
		className: "form__success",
		children: w
	}) : /* @__PURE__ */ s(n, {
		ref: E,
		errors: S,
		onSubmit: T,
		actions: /* @__PURE__ */ o(e, {
			variant: "form",
			disabled: b,
			children: b ? x : y
		}),
		children: [
			/* @__PURE__ */ o(r, {
				id: "contact-email",
				label: c,
				labelHidden: !0,
				type: "email",
				placeholder: u,
				disabled: b
			}),
			/* @__PURE__ */ o(a, {
				id: "contact-message",
				label: d,
				labelHidden: !0,
				placeholder: f,
				rows: p,
				disabled: b
			}),
			/* @__PURE__ */ o(t, {
				id: "contact-phone",
				label: m,
				disabled: b,
				checked: D,
				onCheckedChange: (e) => O(e === !0)
			}),
			D && /* @__PURE__ */ o(i, {
				id: "contact-phone-number",
				label: h,
				labelHidden: !0,
				placeholder: g,
				helperText: _,
				disabled: b
			}),
			/* @__PURE__ */ o(t, {
				id: "contact-privacy",
				label: v,
				disabled: b
			})
		]
	});
});
//#endregion
export { u as ContactForm };
