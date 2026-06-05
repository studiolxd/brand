import './description-list.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/DescriptionList/DescriptionList.tsx
function t({ children: t, className: n }) {
	return /* @__PURE__ */ e("dl", {
		className: ["description-list", n].filter(Boolean).join(" "),
		children: t
	});
}
//#endregion
export { t as DescriptionList };
