'use client';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Stack as n } from "./stack.js";
import { Paragraph as r } from "./paragraph.js";
import { Alert as i } from "./alert.js";
import { Form as a } from "./form.js";
import { InputField as o } from "./input-field.js";
import { ConnectorAuthShell as s } from "./connector-auth-shell.js";
import { t as c } from "./_shared/untrustedtext.js";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorExternalSignInPage.tsx
function d({ platformName: d, organization: f, organizationDefaultValue: p, organizationName: m = "org", action: h, onSubmit: g, hiddenFields: _, error: v, title: y, intro: b, signingInTo: x, valueQuotes: S, organizationLabel: C, submitLabel: w, extra: T, links: E, header: D, footer: O, preferences: k, preferencesLabel: A, id: j, shell: M }) {
	let N = e("connectorExternalSignIn");
	return /* @__PURE__ */ l(s, {
		title: y ?? N("title"),
		description: b({ platform: d }),
		header: D,
		footer: O,
		preferences: k,
		preferencesLabel: A,
		id: j,
		shell: M,
		children: /* @__PURE__ */ u(n, {
			align: "stretch",
			children: [
				v !== void 0 && /* @__PURE__ */ l(i, {
					role: "alert",
					variant: "error",
					description: v
				}),
				/* @__PURE__ */ u(a, {
					size: "lg",
					blockActions: !0,
					method: typeof h == "string" ? "post" : void 0,
					action: h,
					onSubmit: g,
					links: E,
					actions: /* @__PURE__ */ l(t, {
						type: "submit",
						children: N("submit", w)(d)
					}),
					children: [_ && Object.entries(_).map(([e, t]) => /* @__PURE__ */ l("input", {
						type: "hidden",
						name: e,
						value: t
					}, e)), f === void 0 ? /* @__PURE__ */ l(o, {
						id: m,
						name: m,
						label: N("organization", C),
						defaultValue: p,
						autoComplete: "off",
						required: !0
					}) : /* @__PURE__ */ l(r, { children: x({ organization: /* @__PURE__ */ l("strong", { children: /* @__PURE__ */ l(c, {
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
