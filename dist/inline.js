import './inline.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Inline/Inline.tsx
function t({ gap: t = "md", align: n = "center", children: r, className: i }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"inline",
			t === "md" ? "" : `inline--gap-${t}`,
			n === "center" ? "" : `inline--align-${n}`,
			i
		].filter(Boolean).join(" "),
		children: r
	});
}
//#endregion
export { t as Inline };
