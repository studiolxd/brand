import './paragraph.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Paragraph/Paragraph.tsx
function t({ size: t = "default", className: n, children: r }) {
	return /* @__PURE__ */ e("p", {
		className: [
			"paragraph",
			t === "default" ? "" : `paragraph--${t}`,
			n
		].filter(Boolean).join(" "),
		children: r
	});
}
//#endregion
export { t as Paragraph };
