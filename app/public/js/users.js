// 即時関数でモジュール化
const usersModule = (() => {
  const BASE_URL = 'http://localhost:3000/api/v1/users';

  // ヘッダーの設定
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  return {
    fetchAllUsers: async() => {
      const res = await fetch(BASE_URL);
      const users = await res.json();

      for (let i= 0; i < users.length; i++) {
        const user = users[i];
        const body = `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.profile}</td>
          <td>${user.created_at}</td>
          <td>${user.updated_at}</td>
          <td>${user.date_of_birth}</td>
        </tr>`
        document.querySelector('#users-list').insertAdjacentHTML('beforeend', body);
      }
    },
    createUser: async() => {
      const name = document.querySelector('#name').value;
      const profile = document.querySelector('#profile').value;
      const date_of_birth = document.querySelector('#date_of_birth').value;

      // リクエストのbody
      const body = {
        name: name,
        profile: profile,
        date_of_birth: date_of_birth
      };
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });
    const resJson = await res.json();
    alert(resJson.message);
    window.location.href = '/';
   }
  }
})();