'use client';
import './stepper.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Stepper/Stepper.tsx
function a({ steps: a, current: o, onStepSelect: s, label: c = "Progreso", compactLabel: l = (e, t) => `Paso ${e} de ${t}`, labels: u, className: d, id: f }) {
	if (a.length < 2) return null;
	let p = {
		completed: "Completado",
		current: "Paso actual",
		pending: "Pendiente",
		...u
	}, m = a.length, h = Math.min(Math.max(o, 0), m - 1), g = a[h];
	return /* @__PURE__ */ i("div", {
		id: f,
		className: ["stepper", d].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ i("p", {
			className: "stepper__compact",
			children: [/* @__PURE__ */ r("span", {
				className: "stepper__compact-count",
				children: l(h + 1, m)
			}), /* @__PURE__ */ r("span", {
				className: "stepper__compact-label",
				children: g.label
			})]
		}), /* @__PURE__ */ r("ol", {
			className: "stepper__list",
			"aria-label": c,
			children: a.map((a, o) => {
				let c = o < h ? "completed" : o === h ? "current" : "pending", l = c === "completed" && s !== void 0, u = /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r("span", {
					className: "stepper__marker",
					"aria-hidden": "true",
					children: c === "completed" ? /* @__PURE__ */ r(e, {
						name: "check",
						size: "sm",
						className: "stepper__check"
					}) : o + 1
				}), /* @__PURE__ */ i("span", {
					className: "stepper__text",
					children: [
						/* @__PURE__ */ i(t, { children: [p[c], ": "] }),
						/* @__PURE__ */ r("span", {
							className: "stepper__label",
							children: a.label
						}),
						a.description && /* @__PURE__ */ r("span", {
							className: "stepper__description",
							children: a.description
						})
					]
				})] });
				return /* @__PURE__ */ r("li", {
					className: `stepper__step stepper__step--${c}`,
					children: l ? /* @__PURE__ */ r("button", {
						type: "button",
						className: "stepper__item stepper__item--action",
						onClick: () => s(o, a),
						children: u
					}) : /* @__PURE__ */ r("span", {
						className: "stepper__item",
						"aria-current": c === "current" ? "step" : void 0,
						children: u
					})
				}, a.id ?? o);
			})
		})]
	});
}
//#endregion
export { a as Stepper };
