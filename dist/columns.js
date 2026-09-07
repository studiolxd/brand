import './columns.css';
import { jsx as e } from "react/jsx-runtime";
import { Children as t, Fragment as n, isValidElement as r } from "react";
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
	].filter(Boolean).join(" "), m = r(u) && u.type === n ? u.props.children : u, h = t.toArray(m);
	return /* @__PURE__ */ e("div", {
		className: p,
		...f,
		children: h.map((t, n) => /* @__PURE__ */ e("div", {
			className: "columns__col",
			children: t
		}, n))
	});
}
//#endregion
export { i as Columns };
