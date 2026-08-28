'use client';
import './password-field.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/form-size.js";
import { Input as r } from "./input.js";
import { Label as i } from "./label.js";
import { forwardRef as a, useId as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var u = a(function({ label: a, labelHidden: u = !0, error: d = !1, errorMessage: f, helperText: p, action: m, size: h, showPasswordLabel: g = "Mostrar contraseña", hidePasswordLabel: _ = "Ocultar contraseña", className: v, id: y, disabled: b, placeholder: x, ...S }, C) {
	let w = n(h), T = o(), E = y ?? T, [D, O] = s(!1), k = f ? `${E}-error` : void 0, A = p ? `${E}-helper` : void 0, j = [k, A].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ l("div", {
		className: ["password-field", v ?? ""].filter(Boolean).join(" "),
		children: [
			a && /* @__PURE__ */ c(i, {
				htmlFor: E,
				hidden: u,
				size: w,
				children: a
			}),
			/* @__PURE__ */ l("div", {
				className: ["password-field__wrapper", w === "md" ? "" : `password-field__wrapper--${w}`].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ c(r, {
					ref: C,
					id: E,
					size: w,
					error: d || !!f,
					placeholder: x ?? (a && u ? a : void 0),
					"aria-describedby": j,
					...S,
					type: D ? "text" : "password",
					disabled: b
				}), /* @__PURE__ */ l("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => O((e) => !e),
					disabled: b,
					"aria-controls": E,
					"aria-pressed": D,
					children: [/* @__PURE__ */ c(t, { children: D ? _ : g }), /* @__PURE__ */ c(e, {
						name: D ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			f && /* @__PURE__ */ c("span", {
				id: k,
				className: "password-field__error",
				role: "alert",
				children: f
			}),
			p && /* @__PURE__ */ c("span", {
				id: A,
				className: "password-field__helper",
				children: p
			}),
			m && /* @__PURE__ */ c("div", {
				className: "password-field__action",
				children: m
			})
		]
	});
});
//#endregion
export { u as PasswordField };
