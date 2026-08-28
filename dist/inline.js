import './inline.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Inline/Inline.tsx
function t({ gap: t = "md", align: n = "center", justify: r = "start", children: i, className: a }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"inline",
			t === "md" ? "" : `inline--gap-${t}`,
			n === "center" ? "" : `inline--align-${n}`,
			r === "start" ? "" : `inline--justify-${r}`,
			a
		].filter(Boolean).join(" "),
		children: i
	});
}
//#endregion
export { t as Inline };
