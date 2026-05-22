import './icon.css';
import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/atoms/Icon/Icon.tsx
var r = {
	arrow: {
		viewBox: "0 0 24 24",
		render: () => /* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M0 12 H24 M18 6 L24 12 L18 18"
		})
	},
	chevron: {
		viewBox: "0 0 12 12",
		render: () => /* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M3 0 L9 6 L3 12"
		})
	},
	close: {
		viewBox: "0 0 12 12",
		render: () => /* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M2 2 L10 10 M10 2 L2 10"
		})
	},
	eye: {
		viewBox: "0 0 24 24",
		render: () => /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M2 12 C7 5 17 5 22 12 C17 19 7 19 2 12 Z"
		}), /* @__PURE__ */ t("circle", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			cx: "12",
			cy: "12",
			r: "3.5"
		})] })
	},
	"eye-off": {
		viewBox: "0 0 24 24",
		render: () => /* @__PURE__ */ n(e, { children: [
			/* @__PURE__ */ t("path", {
				vectorEffect: "non-scaling-stroke",
				strokeWidth: "1",
				d: "M2 12 C7 5 17 5 22 12 C17 19 7 19 2 12 Z"
			}),
			/* @__PURE__ */ t("circle", {
				vectorEffect: "non-scaling-stroke",
				strokeWidth: "1",
				cx: "12",
				cy: "12",
				r: "3.5"
			}),
			/* @__PURE__ */ t("path", {
				vectorEffect: "non-scaling-stroke",
				strokeWidth: "1",
				d: "M4 4 L20 20"
			})
		] })
	}
};
function i({ name: e, size: n = "md", className: i }) {
	let a = r[e];
	return /* @__PURE__ */ t("svg", {
		className: [
			"icon",
			`icon--${n}`,
			i ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: a.viewBox,
		fill: "none",
		stroke: "currentColor",
		children: a.render()
	});
}
//#endregion
export { i as Icon };
