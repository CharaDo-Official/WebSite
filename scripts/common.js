
document.addEventListener("DOMContentLoaded", async () => {
	// 1. パーツを読み込む関数
	async function loadPart(id, path) {
		const element = document.getElementById(id);
		if (!element) return;

		try {
			const response = await fetch(path);
			if (!response.ok) throw new Error("Network response was not ok");
			const html = await response.text();
			element.innerHTML = html;
		} catch (error) {
			console.error(`Failed to load ${path}:`, error);
		}
	}

	// 2. ヘッダーとフッターを実行
	await loadPart("header-placeholder", "components/header.html");
	await loadPart("footer-placeholder", "components/footer.html");

	// 3. 現在のページに合わせてメニューを光らせる処理
	// bodyタグにつけた data-page の値を取得（例: "products"）
	const currentPage = document.body.dataset.page;

	if (currentPage) {
		// ヘッダー内の data-page が一致するリンクを探す
		const activeLink = document.querySelector(`.nav-link[data-page="${currentPage}"]`);
		if (activeLink) {
			activeLink.classList.add("current");
		}
	}
});