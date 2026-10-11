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
function c({ children: c, brand: l, preferences: u, preferencesLabel: d, stepper: f, primaryAction: p, backAction: m, exitAction: h, actionsLabel: g, id: _ = "main-content", shell: v = !0, width: y = "md", className: b }) {
	let x = e("onboardingShell", s), S = e("publicPageShell", r), C = !!(p || m || h), w = l && /* @__PURE__ */ a("div", {
		className: "onboarding-shell__brand",
		children: l
	});
	return /* @__PURE__ */ a(i, {
		id: _,
		shell: v,
		header: w && /* @__PURE__ */ a(n, {
			as: "header",
			className: "onboarding-shell__top onboarding-shell__top--band",
			innerClassName: "onboarding-shell__bar",
			children: w
		}),
		preferences: u,
		preferencesLabel: d,
		children: /* @__PURE__ */ o("div", {
			className: ["onboarding-shell", b].filter(Boolean).join(" "),
			children: [
				!v && w && /* @__PURE__ */ a("header", {
					className: "onboarding-shell__top onboarding-shell__bar",
					children: w
				}),
				/* @__PURE__ */ a(t.Provider, {
					value: "lg",
					children: /* @__PURE__ */ o("div", {
						className: ["onboarding-shell__step", y === "wide" ? "onboarding-shell__step--wide" : ""].filter(Boolean).join(" "),
						children: [
							f && /* @__PURE__ */ a("div", {
								className: "onboarding-shell__progress",
								children: f
							}),
							/* @__PURE__ */ a("div", {
								className: "onboarding-shell__body",
								children: c
							}),
							C && /* @__PURE__ */ o("div", {
								className: "onboarding-shell__actions",
								role: "group",
								"aria-label": x("actions", g),
								children: [m, (h || p) && /* @__PURE__ */ o("div", {
									className: "onboarding-shell__decisions",
									children: [h && /* @__PURE__ */ a("div", {
										className: "onboarding-shell__exit",
										children: h
									}), p]
								})]
							})
						]
					})
				}),
				!v && u && /* @__PURE__ */ a("section", {
					className: "onboarding-shell__settings",
					"aria-label": S("preferences", d),
					children: u
				})
			]
		})
	});
}
//#endregion
export { c as OnboardingShell };
