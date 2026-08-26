import { N as e } from "./popupStateMapping.js";
import { c as t } from "./useRenderElement.js";
import { F as n, x as r } from "./floating-ui.utils.dom.js";
import { l as i } from "./useOpenChangeComplete.js";
import { n as a, t as o } from "./event.js";
import { A as s } from "./owner.js";
import * as c from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useClick.js
function l(l, u = {}) {
	let d = "rootStore" in l ? l.rootStore : l, f = d.context.dataRef, { enabled: p = !0, event: m = "click", toggle: h = !0, ignoreMouse: g = !1, stickIfOpen: _ = !0, touchOpenDelay: v = 0 } = u, y = c.useRef(void 0), b = i(), x = e(), S = c.useMemo(() => ({
		onPointerDown(e) {
			y.current = e.pointerType;
		},
		onMouseDown(e) {
			let t = y.current, i = e.nativeEvent, o = d.select("open");
			if (e.button !== 0 || m === "click" || a(t, !0) && g) return;
			let c = f.current.openEvent, l = c?.type, u = d.select("domReferenceElement") !== e.currentTarget, p = o && u || !(o && h && (!(c && _) || l === "click" || l === "mousedown"));
			if (s(i.target)) {
				let e = r(n, i, i.target);
				p && t === "touch" && v > 0 ? x.start(v, () => {
					d.setOpen(!0, e);
				}) : d.setOpen(p, e);
				return;
			}
			let S = e.currentTarget;
			b.request(() => {
				let e = r(n, i, S);
				p && t === "touch" && v > 0 ? x.start(v, () => {
					d.setOpen(!0, e);
				}) : d.setOpen(p, e);
			});
		},
		onClick(e) {
			if (m === "mousedown-only") return;
			let t = y.current;
			if (m === "mousedown" && t) {
				y.current = void 0;
				return;
			}
			if (a(t, !0) && g) return;
			let i = d.select("open"), s = f.current.openEvent, c = d.select("domReferenceElement") !== e.currentTarget, l = i && c || !(i && h && (!(s && _) || o(s))), u = r(n, e.nativeEvent, e.currentTarget);
			l && t === "touch" && v > 0 ? x.start(v, () => {
				d.setOpen(!0, u);
			}) : d.setOpen(l, u);
		},
		onKeyDown() {
			y.current = void 0;
		}
	}), [
		f,
		m,
		g,
		d,
		_,
		h,
		b,
		x,
		v
	]);
	return c.useMemo(() => p ? { reference: S } : t, [p, S]);
}
//#endregion
export { l as t };
