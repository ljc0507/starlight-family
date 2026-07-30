import { a as require_react, o as __toESM } from "../index.js";
//#region app/offline-register.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function OfflineRegister() {
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
	}, []);
	return null;
}
//#endregion
export { OfflineRegister as default };
