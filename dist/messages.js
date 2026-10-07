'use client';
import { n as e, r as t, t as n } from "./_shared/brandmessagescontext.js";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/messages/BrandMessagesProvider.tsx
function i({ messages: t, fallback: i, children: a }) {
	return /* @__PURE__ */ r(n.Provider, {
		value: t ?? null,
		children: /* @__PURE__ */ r(e.Provider, {
			value: i === "es",
			children: a
		})
	});
}
//#endregion
export { i as BrandMessagesProvider, t as useBrandMessages };
