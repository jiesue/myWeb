/*
 *@description:BaseUrl
 *@author: zyj
 *@date: 2020-01-16 09:06:42
 *@version: V1.0.0
*/

const configObj = {}

switch (process.env.NODE_ENV) {
    case 'development':
        configObj.cdn = 'https://websave-1253371045.cos.ap-guangzhou.myqcloud.com/website';
        configObj.baseUrl = '';
        break;


    case 'production':
        configObj.cdn = 'https://websave-1253371045.cos.ap-guangzhou.myqcloud.com/website';
        configObj.baseUrl = '';

        break;
    default:
        configObj.cdn = 'https://websave-1253371045.cos.ap-guangzhou.myqcloud.com/website';
        configObj.baseUrl = '';

        break;

}
export default configObj;