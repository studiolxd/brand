import './columns.css';
import { Children as e, Fragment as t, isValidElement as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/atoms/Columns/Columns.tsx
function i({ columns: i = 2, ratio: a = "1:1", align: o = "start", gap: s = "md", intermediate: c = !0, stackOrder: l = "normal", children: u, className: d, ...f }) {
	let p = [
		"columns",
		`columns--${i}`,
		i === 2 && a !== "1:1" ? `columns--ratio-${a.replace(":", "-")}` : "",
		o === "start" ? "" : `columns--align-${o}`,
		s === "md" ? "" : `columns--gap-${s}`,
		c ? "" : "columns--no-intermediate",
		l === "reverse" ? "columns--reverse" : "",
		d
	].filter(Boolean).join(" "), m = n(u) && u.type === t ? u.props.children : u, h = e.toArray(m);
	return /* @__PURE__ */ r("div", {
		className: p,
		...f,
		children: h.map((e, t) => /* @__PURE__ */ r("div", {
			className: "columns__col",
			children: e
		}, t))
	});
}
//#endregion
export { i as Columns };
