
const getApi = async (path: String) => {
        return fetch(`https://collapbackend.azurewebsites.net/${path}`);
}
export default getApi;