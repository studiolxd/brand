import './kbd.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Kbd/Kbd.tsx
function t({ size: t = "md", children: n }) {
	return /* @__PURE__ */ e("kbd", {
		className: ["kbd", t === "md" ? "" : `kbd--${t}`].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
export { t as Kbd };
