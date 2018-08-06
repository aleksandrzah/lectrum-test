// Core
import { getFullApiUrl } from 'instruments';

const GROUP_ID = '6vf77z4hd5';
const TOKEN = 'rtASDLastuev77';

const SOCKET_URL = 'https://lab.lectrum.io';
const ROOT_URL = 'https://lab.lectrum.io/redux/api';
const MAIN_URL = getFullApiUrl(ROOT_URL, GROUP_ID);

const getResource = resourceName => `${ROOT_URL}/${resourceName}/${GROUP_ID}`;
const getActionResource = (resourceName, action) => `${ROOT_URL}/${resourceName}/${action}`;

export { GROUP_ID, TOKEN, MAIN_URL, getResource, getActionResource };
