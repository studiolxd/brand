'use client';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Stack as n } from "./stack.js";
import { Code as r } from "./code.js";
import { Paragraph as i } from "./paragraph.js";
import { ConnectorAuthShell as a } from "./connector-auth-shell.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/templates/ConnectorAuth/ConnectorRejectionPage.tsx
function c({ title: c, description: l, hint: u, code: d, codeLabel: f, retryHref: p, onRetry: m, retryLabel: h, retryAction: g, aside: _, header: v, footer: y, preferences: b, preferencesLabel: x, id: S, shell: C }) {
	let w = e("connectorRejection"), T = g ?? (p === void 0 ? m ? /* @__PURE__ */ o(t, {
		onClick: m,
		children: h
	}) : null : /* @__PURE__ */ o(t, {
		href: p,
		children: h
	}));
	return /* @__PURE__ */ o(a, {
		title: c,
		description: l,
		intro: d === void 0 ? void 0 : /* @__PURE__ */ s(i, {
			size: "small",
			children: [
				w("code", f),
				": ",
				/* @__PURE__ */ o(r, { children: d })
			]
		}),
		aside: _,
		header: v,
		footer: y,
		preferences: b,
		preferencesLabel: x,
		id: S,
		shell: C,
		children: /* @__PURE__ */ s(n, {
			align: "stretch",
			children: [/* @__PURE__ */ o(i, {
				size: "large",
				children: u
			}), T]
		})
	});
}
//#endregion
export { c as ConnectorRejectionPage };
