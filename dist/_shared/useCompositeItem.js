import { p as e } from "./useRenderElement.js";
import { n as t } from "./useCompositeListItem.js";
import { r as n } from "./useButton.js";
import * as r from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/item/useCompositeItem.js
function i(i = {}) {
	let { highlightItemOnHover: a, highlightedIndex: o, onHighlightedIndexChange: s } = n(), { ref: c, index: l } = t(i), u = o === l, d = r.useRef(null), f = e(c, d);
	return {
		compositeProps: r.useMemo(() => ({
			tabIndex: u ? 0 : -1,
			onFocus() {
				s(l);
			},
			onMouseMove() {
				let e = d.current;
				if (!a || !e) return;
				let t = e.hasAttribute("disabled") || e.ariaDisabled === "true";
				!u && !t && e.focus();
			}
		}), [
			u,
			s,
			l,
			a
		]),
		compositeRef: f,
		index: l
	};
}
//#endregion
export { i as t };
