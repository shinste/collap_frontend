
const postApi = async (path: String, body: any) => {
        return fetch(`https://collapbackend.azurewebsites.net/${path}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body),
        });
}
export default postApi;