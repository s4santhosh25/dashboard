export function googleData(data) {
    console.log('utils', data);
    let { tokenObj: { idpId, access_token }, profileObj: { name, email, imageUrl } } = data;
    return { name, email, imageUrl, idpId, access_token };
}