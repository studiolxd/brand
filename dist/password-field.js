'use client';
import './password-field.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/form-size.js";
import { Input as r } from "./input.js";
import { Label as i } from "./label.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c, useState as l } from "react";
//#region src/stories/molecules/PasswordField/PasswordField.tsx
var u = s(function({ label: s, labelHidden: u = !0, error: d = !1, errorMessage: f, helperText: p, size: m, showPasswordLabel: h = "Mostrar contraseña", hidePasswordLabel: g = "Ocultar contraseña", className: _, id: v, disabled: y, placeholder: b, ...x }, S) {
	let C = n(m), w = c(), T = v ?? w, [E, D] = l(!1), O = f ? `${T}-error` : void 0, k = p ? `${T}-helper` : void 0, A = [O, k].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ o("div", {
		className: ["password-field", _ ?? ""].filter(Boolean).join(" "),
		children: [
			s && /* @__PURE__ */ a(i, {
				htmlFor: T,
				hidden: u,
				size: C,
				children: s
			}),
			/* @__PURE__ */ o("div", {
				className: ["password-field__wrapper", C === "md" ? "" : `password-field__wrapper--${C}`].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ a(r, {
					ref: S,
					id: T,
					size: C,
					error: d,
					placeholder: b ?? (s && u ? s : void 0),
					"aria-describedby": A,
					...x,
					type: E ? "text" : "password",
					disabled: y
				}), /* @__PURE__ */ o("button", {
					type: "button",
					className: "password-field__toggle",
					onClick: () => D((e) => !e),
					disabled: y,
					"aria-controls": T,
					"aria-pressed": E,
					children: [/* @__PURE__ */ a(t, { children: E ? g : h }), /* @__PURE__ */ a(e, {
						name: E ? "eye-off" : "eye",
						className: "password-field__icon"
					})]
				})]
			}),
			f && /* @__PURE__ */ a("span", {
				id: O,
				className: "password-field__error",
				role: "alert",
				children: f
			}),
			p && /* @__PURE__ */ a("span", {
				id: k,
				className: "password-field__helper",
				children: p
			})
		]
	});
});
//#endregion
export { u as PasswordField };
