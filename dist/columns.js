import './columns.css';
import { Children as e, Fragment as t, isValidElement as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/atoms/Columns/Columns.tsx
function i({ columns: i = 2, ratio: a = "1:1", align: o = "start", gap: s = "md", stackOrder: c = "normal", children: l, className: u, ...d }) {
	let f = [
		"columns",
		`columns--${i}`,
		i === 2 && a !== "1:1" ? `columns--ratio-${a.replace(":", "-")}` : "",
		o === "start" ? "" : `columns--align-${o}`,
		s === "md" ? "" : `columns--gap-${s}`,
		c === "reverse" ? "columns--reverse" : "",
		u
	].filter(Boolean).join(" "), p = n(l) && l.type === t ? l.props.children : l, m = e.toArray(p);
	return /* @__PURE__ */ r("div", {
		className: f,
		...d,
		children: m.map((e, t) => /* @__PURE__ */ r("div", {
			className: "columns__col",
			children: e
		}, t))
	});
}
//#endregion
export { i as Columns };
