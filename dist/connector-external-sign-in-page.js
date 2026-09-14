'use client';
import { Button as e } from "./button.js";
import { Stack as t } from "./stack.js";
import { Paragraph as n } from "./paragraph.js";
import { Alert as r } from "./alert.js";
import { Form as i } from "./form.js";
import { InputField as a } from "./input-field.js";
import { ConnectorAuthShell as o } from "./connector-auth-shell.js";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorExternalSignInPage.tsx
function u({ platformName: u = "tu Moodle", organization: d, organizationDefaultValue: f, organizationName: p = "org", action: m, onSubmit: h, hiddenFields: g, error: _, title: v = "Autorizar la conexión", intro: y = ({ platform: e }) => /* @__PURE__ */ l(s, { children: [
	"Tu asistente de IA solicita acceso a ",
	e,
	". Inicia sesión con tu cuenta para autorizarlo."
] }), signingInTo: b = ({ organization: e }) => /* @__PURE__ */ l(s, { children: [
	"Iniciarás sesión en ",
	e,
	"."
] }), organizationLabel: x = "Tu organización", submitLabel: S = ({ platform: e }) => /* @__PURE__ */ l(s, { children: ["Iniciar sesión con ", e] }), extra: C, links: w, header: T, footer: E, preferences: D, preferencesLabel: O, id: k, shell: A }) {
	return /* @__PURE__ */ c(o, {
		title: v,
		description: y({ platform: u }),
		header: T,
		footer: E,
		preferences: D,
		preferencesLabel: O,
		id: k,
		shell: A,
		children: /* @__PURE__ */ l(t, {
			align: "stretch",
			children: [
				_ !== void 0 && /* @__PURE__ */ c(r, {
					role: "alert",
					variant: "error",
					description: _
				}),
				/* @__PURE__ */ l(i, {
					size: "lg",
					blockActions: !0,
					method: m === void 0 ? void 0 : "post",
					action: m,
					onSubmit: h,
					links: w,
					actions: /* @__PURE__ */ c(e, {
						type: "submit",
						children: S({ platform: u })
					}),
					children: [g && Object.entries(g).map(([e, t]) => /* @__PURE__ */ c("input", {
						type: "hidden",
						name: e,
						value: t
					}, e)), d === void 0 ? /* @__PURE__ */ c(a, {
						id: p,
						name: p,
						label: x,
						defaultValue: f,
						autoComplete: "off",
						required: !0
					}) : /* @__PURE__ */ c(n, { children: b({ organization: /* @__PURE__ */ c("strong", { children: d }) }) })]
				}),
				C
			]
		})
	});
}
//#endregion
export { u as ConnectorExternalSignInPage };
