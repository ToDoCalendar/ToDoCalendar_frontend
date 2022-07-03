export default class Verify {
  /**
   * Функция отправляет в POST token (access или refresh)
   *
   * @param {string} token
   * @returns boolean
   * - true - авторизирован токен
   * - false - не авторизирован токен
   */
  static async verifyToken(token = '') {
    try {
      const url = `${process.env.REACT_APP_api_server}/api/v1/verify-token/`;

      const body = {
        token: token,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const status = response.status;

      if (status !== 200) {
        return false;
      }

      return true;
    } catch (err) {
      alert('' + err);
    }
  }

  /**
   * Функция, которая проверяет авторизован ли resresh токен
   * @param {*} refresh_token
   * @returns boolean
   * - true - авторизован refresh токен
   * - false - не авторизован refresh токен (выходим из аккакунта)
   */
  static async verifyRefresh(refresh_token = localStorage.getItem('refresh')) {
    if (refresh_token == null) {
      localStorage.removeItem('access');
      return false;
    }

    const is_verify_refresh_token = await Verify.verifyToken(refresh_token);

    if (is_verify_refresh_token) {
      localStorage.setItem('refresh', refresh_token);
      return true;
    }

    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    return false;
  }

  /**
   * Функция, которая проверяет авторизован ли access токен
   * @param {*} access_token
   * @returns boolean
   * - true - авторизован access токен
   * - false - просрочен access токен, и он же не обновляется с помощью refresh токена
   */
  static async verifyAccess(access_token = localStorage.getItem('access')) {
    let is_verify_access_token = await Verify.verifyToken(access_token);
    if (is_verify_access_token) {
      localStorage.setItem('access', access_token);
      return true;
    }

    const isUpdated = await Verify.updateAccessToken(); // Продлеваем access токен
    if (isUpdated) {
      return true;
    }

    localStorage.removeItem('access');
    return false;
  }

  /**
   * Функция, которая проверяет два токена
   *
   * ЭТУ ФУНКЦИЮ ИСПОЛЬЗОВАТЬ В REACT КОМПОНЕНТАХ
   *
   * @returns boolean
   * - true - авторизованы токены (из аккаунта не выходим)
   * - false - не авторизован(-ы) токен(-ы)
   */
  static async verifyTokens() {
    const is_verify_access_token = await Verify.verifyAccess();
    const is_verify_refresh_token = await Verify.verifyRefresh();

    if (is_verify_access_token && is_verify_refresh_token) {
      return true;
    }

    return false;
  }

  /**
   * Функция, которая обновляет access токен имея refresh токен
   * @returns
   */
  static async updateAccessToken() {
    try {
      let refresh_token = localStorage.getItem('refresh');
      let access_token = localStorage.getItem('access');

      const url = `${process.env.REACT_APP_api_server}/api/v1/refresh-token/`;

      const body = {
        refresh: refresh_token,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const status = response.status;
      const data = await response.json();

      if (status !== 200) {
        return false;
      }

      access_token = data.access;
      localStorage.setItem('access', access_token);

      // КУДА ПРОПАЛ refresh токен? - вопрос к бэкэндерам
      // refresh_token = data.refresh;
      // localStorage.setItem('refresh', refresh_token);

      return true;
    } catch (error) {
      alert('' + error);
    }
  }
}
