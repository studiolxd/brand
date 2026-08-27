import './columns.css';
import { jsx as e } from "react/jsx-runtime";
import { Children as t, Fragment as n, isValidElement as r } from "react";
//#region src/stories/atoms/Columns/Columns.tsx
function i({ columns: i = 2, ratio: a = "1:1", align: o = "start", gap: s = "md", stackOrder: c = "normal", children: l, className: u }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"columns",
			`columns--${i}`,
			i === 2 && a !== "1:1" ? `columns--ratio-${a.replace(":", "-")}` : "",
			o === "start" ? "" : `columns--align-${o}`,
			s === "md" ? "" : `columns--gap-${s}`,
			c === "reverse" ? "columns--reverse" : "",
			u
		].filter(Boolean).join(" "),
		children: t.toArray(l).flatMap((e) => r(e) && e.type === n ? t.toArray(e.props.children) : [e]).map((t, n) => /* @__PURE__ */ e("div", {
			className: "columns__col",
			children: t
		}, n))
	});
}
//#endregion
export { i as Columns };
