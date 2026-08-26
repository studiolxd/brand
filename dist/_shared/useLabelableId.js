import { l as e } from "./useRenderElement.js";
import { L as t, d as n } from "./floating-ui.utils.dom.js";
import { t as r } from "./useBaseUiId.js";
import { n as i } from "./useValueChanged.js";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/labelable-provider/useLabelableId.js
function a(a = {}) {
	let { id: o, implicit: s = !1, controlRef: c } = a, { controlId: l, setControlId: u } = i(), d = r(o);
	return t(() => {
		if (!(!s && !o || u === e)) {
			if (s) {
				let e = c?.current;
				n(e) && e.closest("label") != null ? u(o ?? null) : u(l ?? d);
			} else o && u(o);
			return () => {
				o && u(void 0);
			};
		}
	}, [
		o,
		c,
		l,
		u,
		s,
		d
	]), l ?? d;
}
//#endregion
export { a as t };
