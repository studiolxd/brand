'use client';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Stack as n } from "./stack.js";
import { Paragraph as r } from "./paragraph.js";
import { t as i } from "./_shared/alert.js";
import { Form as a } from "./form.js";
import { t as o } from "./_shared/inputfield.js";
import { ConnectorAuthShell as s } from "./connector-auth-shell.js";
import { t as c } from "./_shared/untrustedtext.js";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/messages/es/connectorExternalSignIn.ts
var d = {
	title: "Autorizar la conexión",
	organization: "Tu organización",
	submit: (e) => `Iniciar sesión con ${e}`
};
//#endregion
//#region src/stories/templates/ConnectorAuth/ConnectorExternalSignInPage.tsx
function f({ platformName: f, organization: p, organizationDefaultValue: m, organizationName: h = "org", action: g, onSubmit: _, hiddenFields: v, error: y, title: b, intro: x, signingInTo: S, valueQuotes: C, organizationLabel: w, submitLabel: T, extra: E, links: D, header: O, footer: k, preferences: A, preferencesLabel: j, id: M, shell: N, className: P }) {
	let F = e("connectorExternalSignIn", d);
	return /* @__PURE__ */ l(s, {
		title: b ?? F("title"),
		description: x({ platform: f }),
		header: O,
		footer: k,
		preferences: A,
		preferencesLabel: j,
		id: M,
		shell: N,
		className: P,
		children: /* @__PURE__ */ u(n, {
			align: "stretch",
			children: [
				y !== void 0 && /* @__PURE__ */ l(i, {
					role: "alert",
					variant: "error",
					description: y
				}),
				/* @__PURE__ */ u(a, {
					size: "lg",
					blockActions: !0,
					method: typeof g == "string" ? "post" : void 0,
					action: g,
					onSubmit: _,
					links: D,
					actions: /* @__PURE__ */ l(t, {
						type: "submit",
						children: F("submit", T)(f)
					}),
					children: [v && Object.entries(v).map(([e, t]) => /* @__PURE__ */ l("input", {
						type: "hidden",
						name: e,
						value: t
					}, e)), p === void 0 ? /* @__PURE__ */ l(o, {
						id: h,
						name: h,
						label: F("organization", w),
						defaultValue: m,
						autoComplete: "off",
						required: !0
					}) : /* @__PURE__ */ l(r, { children: S({ organization: /* @__PURE__ */ l("strong", { children: /* @__PURE__ */ l(c, {
						value: p,
						quotes: C
					}) }) }) })]
				}),
				E
			]
		})
	});
}
//#endregion
export { f as ConnectorExternalSignInPage };
