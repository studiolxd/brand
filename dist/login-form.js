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
function c({ onSubmit: c, errors: l, loading: u = !1, title: d = "Iniciar sesión" }) {
	let [f, p] = s(""), [m, h] = s(""), g = () => {
		c?.({
			email: f,
			password: m
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
					e.preventDefault(), g();
				},
				errors: l,
				children: [/* @__PURE__ */ a(i, {
					id: "login-email",
					label: "Email",
					type: "email",
					name: "email",
					value: f,
					onChange: (e) => p(e.target.value)
				}), /* @__PURE__ */ a(i, {
					id: "login-password",
					label: "Contraseña",
					type: "password",
					name: "password",
					value: m,
					onChange: (e) => h(e.target.value)
				})]
			}),
			/* @__PURE__ */ a(e, {
				block: !0,
				disabled: u,
				onClick: g,
				children: u ? "Iniciando sesión…" : "Iniciar sesión"
			})
		]
	});
}
//#endregion
export { c as LoginForm };
