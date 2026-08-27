import './stack.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Stack/Stack.tsx
function t({ gap: t = "md", mobileOrder: n = "normal", children: r, className: i }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"stack",
			t === "md" ? "" : `stack--gap-${t}`,
			n === "reverse" ? "stack--mobile-reverse" : "",
			i
		].filter(Boolean).join(" "),
		children: r
	});
}
//#endregion
export { t as Stack };
