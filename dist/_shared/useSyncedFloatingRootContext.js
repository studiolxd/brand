import { d as e, k as t, o as n, s as r } from "./popupStateMapping.js";
import { c as i, h as a } from "./useRenderElement.js";
import { L as o, R as s, b as c, d as l } from "./floating-ui.utils.dom.js";
import { a as u, t as d } from "./useOpenChangeComplete.js";
import * as f from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/popups/popupStoreUtils.js
function p(e, t) {
	let n = f.useRef(null);
	return f.useCallback((r) => {
		if (e !== void 0 && (n.current !== null && (t.context.triggerElements.delete(n.current), n.current = null), r !== null)) return n.current = e, t.context.triggerElements.add(e, r), () => {
			n.current !== null && (t.context.triggerElements.delete(n.current), n.current = null);
		};
	}, [t, e]);
}
function m(e, t, n, r) {
	let i = n.useState("isMountedByTrigger", e), a = p(e, n), c = s((t) => {
		let i = a(t);
		return t !== null && n.select("open") && n.select("activeTriggerId") == null && n.update({
			activeTriggerId: e,
			activeTriggerElement: t,
			...r
		}), i;
	});
	return o(() => {
		i && n.update({
			activeTriggerElement: t.current,
			...r
		});
	}, [
		i,
		n,
		t,
		...Object.values(r)
	]), {
		registerTrigger: c,
		isMountedByThisTrigger: i
	};
}
function h(e) {
	let t = e.useState("open");
	o(() => {
		if (t && !e.select("activeTriggerId") && e.context.triggerElements.size === 1) {
			let t = e.context.triggerElements.entries().next();
			if (!t.done) {
				let [n, r] = t.value;
				e.update({
					activeTriggerId: n,
					activeTriggerElement: r
				});
			}
		}
	}, [t, e]);
}
function g(e, t, n) {
	let { mounted: r, setMounted: i, transitionStatus: a } = u(e);
	t.useSyncedValues({
		mounted: r,
		transitionStatus: a
	});
	let o = s(() => {
		i(!1), t.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: !1
		}), n?.(), t.context.onOpenChangeComplete?.(!1);
	});
	return d({
		enabled: !t.useState("preventUnmountingOnClose"),
		open: e,
		ref: t.context.popupRef,
		onComplete() {
			e || o();
		}
	}), {
		forceUnmount: o,
		transitionStatus: a
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/utils/getEmptyRootContext.js
function _() {
	return new r({
		open: !1,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new n(),
		floatingId: "",
		nested: !1,
		noEmit: !1,
		onOpenChange: void 0
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/popups/store.js
function v() {
	return {
		open: !1,
		mounted: !1,
		transitionStatus: "idle",
		floatingRootContext: _(),
		preventUnmountingOnClose: !1,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: i,
		inactiveTriggerProps: i,
		popupProps: i
	};
}
var y = {
	open: e((e) => e.open),
	mounted: e((e) => e.mounted),
	transitionStatus: e((e) => e.transitionStatus),
	floatingRootContext: e((e) => e.floatingRootContext),
	preventUnmountingOnClose: e((e) => e.preventUnmountingOnClose),
	payload: e((e) => e.payload),
	activeTriggerId: e((e) => e.activeTriggerId),
	activeTriggerElement: e((e) => e.mounted ? e.activeTriggerElement : null),
	isTriggerActive: e((e, t) => t !== void 0 && e.activeTriggerId === t),
	isOpenedByTrigger: e((e, t) => t !== void 0 && e.activeTriggerId === t && e.open),
	isMountedByTrigger: e((e, t) => t !== void 0 && e.activeTriggerId === t && e.mounted),
	triggerProps: e((e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps),
	popupProps: e((e) => e.popupProps),
	popupElement: e((e) => e.popupElement),
	positionerElement: e((e) => e.positionerElement)
};
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js
function b(e) {
	let { popupStore: n, noEmit: i = !1, treatPopupAsFloatingElement: s = !1, onOpenChange: u } = e, d = c(), f = t() != null, p = n.useState("open"), m = n.useState("activeTriggerElement"), h = n.useState(s ? "popupElement" : "positionerElement"), g = n.context.triggerElements, _ = a(() => new r({
		open: p,
		referenceElement: m,
		floatingElement: h,
		triggerElements: g,
		onOpenChange: u,
		floatingId: d,
		nested: f,
		noEmit: i
	})).current;
	return o(() => {
		let e = {
			open: p,
			floatingId: d,
			referenceElement: m,
			floatingElement: h
		};
		l(m) && (e.domReferenceElement = m), _.update(e);
	}, [
		p,
		d,
		m,
		h,
		_
	]), _.context.onOpenChange = u, _.context.nested = f, _.context.noEmit = i, _;
}
//#endregion
export { g as a, h as i, v as n, m as o, y as r, b as t };
