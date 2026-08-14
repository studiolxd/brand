'use client';
import './login-form.css';
import { Button as e } from "./button.js";
import { Heading as t } from "./heading.js";
import { Logo as n } from "./logo.js";
import { Form as r } from "./form.js";
import { InputField as i } from "./input-field.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { useState as s } from "react";
//#region src/stories/organisms/LoginForm/LoginForm.tsx
function c({ onSubmit: c, errors: l, loading: u = !1, title: d = "Iniciar sesión", emailLabel: f = "Email", passwordLabel: p = "Contraseña", submitLabel: m = "Iniciar sesión", loadingLabel: h = "Iniciando sesión…" }) {
	let [g, _] = s(""), [v, y] = s(""), b = () => {
		c?.({
			email: g,
			password: v
		});
	};
	return /* @__PURE__ */ o("div", {
		className: "login-form",
		children: [
			/* @__PURE__ */ a(n, { width: 140 }),
			/* @__PURE__ */ a(t, {
				level: 2,
				size: 5,
				children: d
			}),
			/* @__PURE__ */ o(r, {
				onSubmit: (e) => {
					e.preventDefault(), b();
				},
				errors: l,
				children: [/* @__PURE__ */ a(i, {
					id: "login-email",
					label: f,
					type: "email",
					name: "email",
					value: g,
					onChange: (e) => _(e.target.value)
				}), /* @__PURE__ */ a(i, {
					id: "login-password",
					label: p,
					type: "password",
					name: "password",
					value: v,
					onChange: (e) => y(e.target.value)
				})]
			}),
			/* @__PURE__ */ a(e, {
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
