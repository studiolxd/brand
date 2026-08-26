import './container.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/atoms/Container/Container.tsx
var n = e(function({ width: e = "xl", space: n = "none", flush: r = !1, surface: i, as: a = "div", className: o, innerClassName: s, children: c, ...l }, u) {
	let d = [
		"container",
		n !== "none" && `container--space-${n}`,
		r && "container--flush",
		i === "dark" && "surface-dark container--surface",
		o
	].filter(Boolean).join(" "), f = [
		"container__inner",
		e !== "full" && `container__inner--${e}`,
		s
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(a, {
		ref: u,
		className: d,
		...l,
		children: /* @__PURE__ */ t("div", {
			className: f,
			children: c
		})
	});
});
//#endregion
export { n as Container };
