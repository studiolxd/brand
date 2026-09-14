import './inline.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Inline/Inline.tsx
function t({ gap: t = "md", align: n = "center", justify: r = "start", stack: i, children: a, className: o, ...s }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"inline",
			t === "md" ? "" : `inline--gap-${t}`,
			n === "center" ? "" : `inline--align-${n}`,
			r === "start" ? "" : `inline--justify-${r}`,
			i === "mobile" ? "inline--stack-mobile" : "",
			o
		].filter(Boolean).join(" "),
		...s,
		children: a
	});
}
//#endregion
export { t as Inline };
