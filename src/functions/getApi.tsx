
const getApi = async (path: String) => {
        return fetch(`https://collapbackend.applikuapp.com/${path}`);
}
export default getApi;