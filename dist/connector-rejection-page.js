'use client';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Stack as n } from "./stack.js";
import { Code as r } from "./code.js";
import { Paragraph as i } from "./paragraph.js";
import { ConnectorAuthShell as a } from "./connector-auth-shell.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/connectorRejection.ts
var c = { code: "Código" };
//#endregion
//#region src/stories/templates/ConnectorAuth/ConnectorRejectionPage.tsx
function l({ title: l, description: u, hint: d, code: f, codeLabel: p, retryHref: m, onRetry: h, retryLabel: g, retryAction: _, aside: v, header: y, footer: b, preferences: x, preferencesLabel: S, id: C, shell: w, className: T }) {
	let E = e("connectorRejection", c), D = _ ?? (m === void 0 ? h ? /* @__PURE__ */ o(t, {
		onClick: h,
		children: g
	}) : null : /* @__PURE__ */ o(t, {
		href: m,
		children: g
	}));
	return /* @__PURE__ */ o(a, {
		title: l,
		description: u,
		intro: f === void 0 ? void 0 : /* @__PURE__ */ s(i, {
			size: "small",
			children: [
				E("code", p),
				": ",
				/* @__PURE__ */ o(r, { children: f })
			]
		}),
		aside: v,
		header: y,
		footer: b,
		preferences: x,
		preferencesLabel: S,
		id: C,
		shell: w,
		className: T,
		children: /* @__PURE__ */ s(n, {
			align: "stretch",
			children: [/* @__PURE__ */ o(i, {
				size: "large",
				children: d
			}), D]
		})
	});
}
//#endregion
export { l as ConnectorRejectionPage };
