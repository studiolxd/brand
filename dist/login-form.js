'use client';
import './login-form.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { Logo as n } from "./logo.js";
import { Form as r } from "./form.js";
import { InputField as i } from "./input-field.js";
import { useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/organisms/LoginForm/LoginForm.tsx
function c({ onSubmit: c, errors: l, loading: u = !1, title: d = "Iniciar sesión", emailLabel: f = "Email", passwordLabel: p = "Contraseña", submitLabel: m = "Iniciar sesión", loadingLabel: h = "Iniciando sesión…" }) {
	let [g, _] = a(""), [v, y] = a(""), b = () => {
		c?.({
			email: g,
			password: v
		});
	};
	return /* @__PURE__ */ s("div", {
		className: "login-form",
		children: [
			/* @__PURE__ */ o(n, { size: "md" }),
			/* @__PURE__ */ o(t, {
				level: 2,
				size: 5,
				children: d
			}),
			/* @__PURE__ */ s(r, {
				onSubmit: (e) => {
					e.preventDefault(), b();
				},
				errors: l,
				children: [/* @__PURE__ */ o(i, {
					id: "login-email",
					label: f,
					type: "email",
					name: "email",
					value: g,
					onChange: (e) => _(e.target.value)
				}), /* @__PURE__ */ o(i, {
					id: "login-password",
					label: p,
					type: "password",
					name: "password",
					value: v,
					onChange: (e) => y(e.target.value)
				})]
			}),
			/* @__PURE__ */ o(e, {
				variant: "primary",
				disabled: u,
				onClick: b,
				children: u ? h : m
			})
		]
	});
}
//#endregion
export { c as LoginForm };
