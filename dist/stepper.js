'use client';
import './stepper.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { StepMarker as n } from "./step-marker.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/Stepper/Stepper.tsx
function o({ steps: o, current: s, onStepSelect: c, label: l, compactLabel: u, labels: d, className: f, id: p }) {
	let m = e("stepper");
	if (o.length < 2) return null;
	let h = (e) => m(e, d?.[e]), g = o.length, _ = Math.min(Math.max(s, 0), g - 1), v = o[_];
	return /* @__PURE__ */ a("div", {
		id: p,
		className: ["stepper", f].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ a("p", {
			className: "stepper__compact",
			children: [/* @__PURE__ */ i("span", {
				className: "stepper__compact-count",
				children: m("compact", u)(_ + 1, g)
			}), /* @__PURE__ */ i("span", {
				className: "stepper__compact-label",
				children: v.label
			})]
		}), /* @__PURE__ */ i("ol", {
			className: "stepper__list",
			"aria-label": m("label", l),
			children: o.map((e, o) => {
				let s = o < _ ? "completed" : o === _ ? "current" : "pending", l = c !== void 0 && s !== "current" && (e.reachable ?? s === "completed"), u = /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(n, {
					state: s === "completed" ? "done" : s === "current" ? "current" : "pending",
					count: o + 1,
					className: "stepper__marker"
				}), /* @__PURE__ */ a("span", {
					className: "stepper__text",
					children: [
						/* @__PURE__ */ a(t, { children: [h(s), ": "] }),
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
					children: l ? /* @__PURE__ */ i("button", {
						type: "button",
						className: "stepper__item stepper__item--action",
						onClick: () => c(o, e),
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
export { o as Stepper };
