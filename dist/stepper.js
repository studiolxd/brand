'use client';
import './stepper.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { StepMarker as n } from "./step-marker.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/messages/es/stepper.ts
var o = {
	label: "Progreso",
	compact: (e, t) => `Paso ${e} de ${t}`,
	completed: "Completado",
	current: "Paso actual",
	pending: "Pendiente"
};
//#endregion
//#region src/stories/molecules/Stepper/Stepper.tsx
function s({ steps: s, current: c, onStepSelect: l, label: u, compactLabel: d, labels: f, className: p, id: m }) {
	let h = e("stepper", o);
	if (s.length < 2) return null;
	let g = (e) => h(e, f?.[e]), _ = s.length, v = Math.min(Math.max(c, 0), _ - 1), y = s[v];
	return /* @__PURE__ */ a("div", {
		id: m,
		className: ["stepper", p].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ a("p", {
			className: "stepper__compact",
			children: [/* @__PURE__ */ i("span", {
				className: "stepper__compact-count",
				children: h("compact", d)(v + 1, _)
			}), /* @__PURE__ */ i("span", {
				className: "stepper__compact-label",
				children: y.label
			})]
		}), /* @__PURE__ */ i("ol", {
			className: "stepper__list",
			"aria-label": h("label", u),
			children: s.map((e, o) => {
				let s = o < v ? "completed" : o === v ? "current" : "pending", c = l !== void 0 && s !== "current" && (e.reachable ?? s === "completed"), u = /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(n, {
					state: s === "completed" ? "done" : s === "current" ? "current" : "pending",
					count: o + 1,
					className: "stepper__marker"
				}), /* @__PURE__ */ a("span", {
					className: "stepper__text",
					children: [
						/* @__PURE__ */ a(t, { children: [g(s), ": "] }),
						/* @__PURE__ */ i("span", {
							className: "stepper__label",
							children: e.label
						}),
						e.description && /* @__PURE__ */ i("span", {
							className: "stepper__description",
							children: e.description
						})
					]
				})] });
				return /* @__PURE__ */ i("li", {
					className: `stepper__step stepper__step--${s}`,
					children: c ? /* @__PURE__ */ i("button", {
						type: "button",
						className: "stepper__item stepper__item--action",
						onClick: () => l(o, e),
						children: u
					}) : /* @__PURE__ */ i("span", {
						className: "stepper__item",
						"aria-current": s === "current" ? "step" : void 0,
						children: u
					})
				}, e.id ?? o);
			})
		})]
	});
}
//#endregion
export { s as Stepper };
