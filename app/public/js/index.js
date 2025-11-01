const indexModule = (() => {
  const path = window.location.pathname;

  switch (path) {
    case '/':
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
      break;

    case '/create.html':
      document.addEventListener('DOMContentLoaded', () => {
        // 保存ボタンクリック時の処理
        const saveButton = document.getElementById('save-btn');
        if (saveButton) {
          saveButton.addEventListener('click', () => {
            usersModule.createUser();
          });
        }

        // キャンセルボタンクリック時の処理
        const cancelButton = document.getElementById('cancel-btn');
        if (cancelButton) {
          cancelButton.addEventListener('click', () => {
            window.location.href = '/';
          });
        }
      });
      break;

    case '/edit.html':
      const uid = window.location.search.split('?uid=')[1];

      document.addEventListener('DOMContentLoaded', () => {
        // 保存ボタンクリック時の処理
        const saveButton = document.getElementById('save-btn');
        if (saveButton) {
          saveButton.addEventListener('click', () => {
            usersModule.saveUser(uid);
          });
        }

        // キャンセルボタンクリック時の処理
        const cancelButton = document.getElementById('cancel-btn');
        if (cancelButton) {
          cancelButton.addEventListener('click', () => {
            window.location.href = '/';
          });
        }

        // 削除ボタンクリック時の処理
        const deleteButton = document.getElementById('delete-btn');
        if (deleteButton) {
          deleteButton.addEventListener('click', () => {
            usersModule.deleteUser(uid);
          });
        }
      });
      // 既存のユーザ情報をセット
      return usersModule.setExistingValue(uid);

    default:
      break;
  }
})();
