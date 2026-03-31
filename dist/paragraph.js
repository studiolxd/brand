import './paragraph.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Paragraph/Paragraph.tsx
function t({ size: t = "default", children: n }) {
	return /* @__PURE__ */ e("p", {
		className: ["paragraph", t === "default" ? "" : `paragraph--${t}`].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
export { t as Paragraph };
