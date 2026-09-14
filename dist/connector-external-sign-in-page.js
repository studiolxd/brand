'use client';
import { Button as e } from "./button.js";
import { Stack as t } from "./stack.js";
import { Paragraph as n } from "./paragraph.js";
import { Alert as r } from "./alert.js";
import { Form as i } from "./form.js";
import { InputField as a } from "./input-field.js";
import { ConnectorAuthShell as o } from "./connector-auth-shell.js";
import { t as s } from "./_shared/untrustedtext.js";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorExternalSignInPage.tsx
function d({ platformName: d = "tu Moodle", organization: f, organizationDefaultValue: p, organizationName: m = "org", action: h, onSubmit: g, hiddenFields: _, error: v, title: y = "Autorizar la conexión", intro: b = ({ platform: e }) => /* @__PURE__ */ u(c, { children: [
	"Tu asistente de IA solicita acceso a ",
	e,
	". Inicia sesión con tu cuenta para autorizarlo."
] }), signingInTo: x = ({ organization: e }) => /* @__PURE__ */ u(c, { children: [
	"Iniciarás sesión en ",
	e,
	"."
] }), valueQuotes: S, organizationLabel: C = "Tu organización", submitLabel: w = ({ platform: e }) => /* @__PURE__ */ u(c, { children: ["Iniciar sesión con ", e] }), extra: T, links: E, header: D, footer: O, preferences: k, preferencesLabel: A, id: j, shell: M }) {
	return /* @__PURE__ */ l(o, {
		title: y,
		description: b({ platform: d }),
		header: D,
		footer: O,
		preferences: k,
		preferencesLabel: A,
		id: j,
		shell: M,
		children: /* @__PURE__ */ u(t, {
			align: "stretch",
			children: [
				v !== void 0 && /* @__PURE__ */ l(r, {
					role: "alert",
					variant: "error",
					description: v
				}),
				/* @__PURE__ */ u(i, {
					size: "lg",
					blockActions: !0,
					method: h === void 0 ? void 0 : "post",
					action: h,
					onSubmit: g,
					links: E,
					actions: /* @__PURE__ */ l(e, {
						type: "submit",
						children: w({ platform: d })
					}),
					children: [_ && Object.entries(_).map(([e, t]) => /* @__PURE__ */ l("input", {
						type: "hidden",
						name: e,
						value: t
					}, e)), f === void 0 ? /* @__PURE__ */ l(a, {
						id: m,
						name: m,
						label: C,
						defaultValue: p,
						autoComplete: "off",
						required: !0
					}) : /* @__PURE__ */ l(n, { children: x({ organization: /* @__PURE__ */ l("strong", { children: /* @__PURE__ */ l(s, {
						value: f,
						quotes: S
					}) }) }) })]
				}),
				T
			]
		})
	});
}
//#endregion
export { d as ConnectorExternalSignInPage };
