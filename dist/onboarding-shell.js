'use client';
import './onboarding-shell.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/form-size.js";
import { Container as n } from "./container.js";
import { n as r, t as i } from "./_shared/publicpageshell.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/messages/es/onboardingShell.ts
var s = { actions: "Acciones del paso" };
//#endregion
//#region src/stories/templates/OnboardingShell/OnboardingShell.tsx
function c({ children: c, brand: l, preferences: u, switchers: d, preferencesLabel: f, stepper: p, primaryAction: m, backAction: h, exitAction: g, actionsLabel: _, id: v = "main-content", shell: y = !0, width: b = "md", className: x }) {
	let S = e("onboardingShell", s), C = e("publicPageShell", r), w = !!(m || h || g), T = u ?? d, E = l && /* @__PURE__ */ a("div", {
		className: "onboarding-shell__brand",
		children: l
	});
	return /* @__PURE__ */ a(i, {
		id: v,
		shell: y,
		header: E && /* @__PURE__ */ a(n, {
			as: "header",
			className: "onboarding-shell__top onboarding-shell__top--band",
			innerClassName: "onboarding-shell__bar",
			children: E
		}),
		preferences: T,
		preferencesLabel: f,
		children: /* @__PURE__ */ o("div", {
			className: ["onboarding-shell", x].filter(Boolean).join(" "),
			children: [
				!y && E && /* @__PURE__ */ a("header", {
					className: "onboarding-shell__top onboarding-shell__bar",
					children: E
				}),
				/* @__PURE__ */ a(t.Provider, {
					value: "lg",
					children: /* @__PURE__ */ o("div", {
						className: ["onboarding-shell__step", b === "wide" ? "onboarding-shell__step--wide" : ""].filter(Boolean).join(" "),
						children: [
							p && /* @__PURE__ */ a("div", {
								className: "onboarding-shell__progress",
								children: p
							}),
							/* @__PURE__ */ a("div", {
								className: "onboarding-shell__body",
								children: c
							}),
							w && /* @__PURE__ */ o("div", {
								className: "onboarding-shell__actions",
								role: "group",
								"aria-label": S("actions", _),
								children: [h, (g || m) && /* @__PURE__ */ o("div", {
									className: "onboarding-shell__decisions",
									children: [g && /* @__PURE__ */ a("div", {
										className: "onboarding-shell__exit",
										children: g
									}), m]
								})]
							})
						]
					})
				}),
				!y && T && /* @__PURE__ */ a("section", {
					className: "onboarding-shell__settings",
					"aria-label": C("preferences", f),
					children: T
				})
			]
		})
	});
}
//#endregion
export { c as OnboardingShell };
