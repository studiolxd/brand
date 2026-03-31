'use client';
import './newsletter-form.css';
import { Button as e } from "./button.js";
import { CheckboxField as t } from "./checkbox-field.js";
import { Form as n } from "./form.js";
import { InputField as r } from "./input-field.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/organisms/NewsletterForm/NewsletterForm.tsx
function o({ emailPlaceholder: o = "Escribe aquí tu correo electrónico", privacyLabel: s, buttonLabel: c = "Suscríbeme a la newsletter", submitting: l = !1, submittingLabel: u = "Suscribiéndote…", errors: d, success: f = !1, successMessage: p = "¡Gracias por suscribirte! Ya no te perderás ninguna de nuestras novedades.", onSubmit: m }) {
	return f ? /* @__PURE__ */ i("p", {
		className: "form__success",
		children: p
	}) : /* @__PURE__ */ i("div", {
		className: "newsletter-form",
		children: /* @__PURE__ */ a(n, {
			errors: d,
			onSubmit: m,
			actions: /* @__PURE__ */ i(e, {
				variant: "form",
				disabled: l,
				children: l ? u : c
			}),
			children: [/* @__PURE__ */ i(r, {
				id: "newsletter-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: o,
				disabled: l
			}), /* @__PURE__ */ i(t, {
				id: "newsletter-privacy",
				label: s,
				disabled: l
			})]
		})
	});
}
//#endregion
export { o as NewsletterForm };
