'use client';
import './contact-form.css';
import { Button as e } from "./button.js";
import { CheckboxField as t } from "./checkbox-field.js";
import { Form as n } from "./form.js";
import { InputField as r } from "./input-field.js";
import { InputPhoneField as i } from "./input-phone-field.js";
import { TextareaField as a } from "./textarea-field.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { useState as c } from "react";
//#region src/stories/organisms/ContactForm/ContactForm.tsx
function l({ emailPlaceholder: l = "Escribe aquí tu correo electrónico", messagePlaceholder: u = "Escribe aquí tu mensaje", messageRows: d = 5, privacyLabel: f, buttonLabel: p = "Enviar mensaje", submitting: m = !1, submittingLabel: h = "Enviando…", errors: g, success: _ = !1, successMessage: v = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.", onSubmit: y }) {
	let [b, x] = c(!1);
	return _ ? /* @__PURE__ */ o("p", {
		className: "form__success",
		children: v
	}) : /* @__PURE__ */ s(n, {
		errors: g,
		onSubmit: y,
		actions: /* @__PURE__ */ o(e, {
			variant: "form",
			disabled: m,
			children: m ? h : p
		}),
		children: [
			/* @__PURE__ */ o(r, {
				id: "contact-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: l,
				disabled: m
			}),
			/* @__PURE__ */ o(a, {
				id: "contact-message",
				label: "Mensaje",
				labelHidden: !0,
				placeholder: u,
				rows: d,
				disabled: m
			}),
			/* @__PURE__ */ o(t, {
				id: "contact-phone",
				label: "Prefiero que me llaméis por teléfono",
				disabled: m,
				checked: b,
				onCheckedChange: (e) => x(e === !0)
			}),
			b && /* @__PURE__ */ o(i, {
				id: "contact-phone-number",
				label: "Teléfono",
				labelHidden: !0,
				placeholder: "Escribe aquí tu número de teléfono",
				helperText: "Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto.",
				disabled: m
			}),
			/* @__PURE__ */ o(t, {
				id: "contact-privacy",
				label: f,
				disabled: m
			})
		]
	});
}
//#endregion
export { l as ContactForm };
