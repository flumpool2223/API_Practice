const indexModule = (() => {
  document.addEventListener('DOMContentLoaded', () => {
    // 検索ボタンクリック時の処理
    const searchButton = document.getElementById('search-btn');
    if (searchButton) {
      searchButton.addEventListener('click', () => {
        searchModule.searchUsers();
      });
    }

    // 初回ユーザー一覧取得
    usersModule.fetchAllUsers();
  });
})();
