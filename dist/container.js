import './container.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
//#region src/stories/atoms/Container/Container.tsx
var n = t(function({ width: t = "xl", space: n = "none", flush: r = !1, surface: i, as: a = "div", className: o, innerClassName: s, children: c, ...l }, u) {
	let d = [
		"container",
		n !== "none" && `container--space-${n}`,
		r && "container--flush",
		i === "dark" && "surface-dark container--surface",
		o
	].filter(Boolean).join(" "), f = [
		"container__inner",
		t !== "full" && `container__inner--${t}`,
		s
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ e(a, {
		ref: u,
		className: d,
		...l,
		children: /* @__PURE__ */ e("div", {
			className: f,
			children: c
		})
	});
});
//#endregion
export { n as Container };
