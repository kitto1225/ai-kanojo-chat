self.addEventListener("install", e => {
  console.log("Service Worker: Installed");
});

self.addEventListener("fetch", e => {
  // ネット経由でそのまま取得
});
