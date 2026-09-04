'use client';
import './onboarding-shell.css';
import { Container as e } from "./container.js";
import { PublicPageShell as t } from "./public-page-shell.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/templates/OnboardingShell/OnboardingShell.tsx
function i({ children: i, brand: a, switchers: o, stepper: s, primaryAction: c, backAction: l, exitAction: u, actionsLabel: d = "Acciones del paso", id: f = "main-content", shell: p = !0, className: m }) {
	let h = !!(c || l || u), g = o && /* @__PURE__ */ n("div", {
		className: "onboarding-shell__switchers",
		children: o
	});
	return /* @__PURE__ */ n(t, {
		id: f,
		shell: p,
		footer: g && /* @__PURE__ */ n(e, {
			as: "footer",
			className: "onboarding-shell__settings onboarding-shell__settings--band",
			children: g
		}),
		children: /* @__PURE__ */ r("div", {
			className: ["onboarding-shell", m].filter(Boolean).join(" "),
			children: [
				a && /* @__PURE__ */ n("header", {
					className: "onboarding-shell__top",
					children: /* @__PURE__ */ n("div", {
						className: "onboarding-shell__brand",
						children: a
					})
				}),
				/* @__PURE__ */ r("div", {
					className: "onboarding-shell__step",
					children: [
						s && /* @__PURE__ */ n("div", {
							className: "onboarding-shell__progress",
							children: s
						}),
						/* @__PURE__ */ n("div", {
							className: "onboarding-shell__body",
							children: i
						}),
						h && /* @__PURE__ */ r("div", {
							className: "onboarding-shell__actions",
							role: "group",
							"aria-label": d,
							children: [/* @__PURE__ */ r("div", {
								className: "onboarding-shell__decisions",
								children: [l, c]
							}), u && /* @__PURE__ */ n("div", {
								className: "onboarding-shell__exit",
								children: u
							})]
						})
					]
				}),
				!p && g && /* @__PURE__ */ n("footer", {
					className: "onboarding-shell__settings",
					children: g
				})
			]
		})
	});
}
//#endregion
export { i as OnboardingShell };
