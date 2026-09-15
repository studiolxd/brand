'use client';
import { n as e, t } from "./_shared/brandmessagescontext.js";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/messages/BrandMessagesProvider.tsx
function r({ messages: e, children: r }) {
	return /* @__PURE__ */ n(t.Provider, {
		value: e,
		children: r
	});
}
//#endregion
export { r as BrandMessagesProvider, e as useBrandMessages };
