import * as showLoader from './showLoader';
import * as currentLoaction from './currentLoaction';
import * as orderDeatils from './orderDeatils';
import * as isLoggedIn from './isLoggedIn';
import * as userData from './userData';
import * as bookingData from './bookingData';
import * as bookingDataPiccker from './bookingDataPiccker';

export default {
    ...showLoader,
    ...currentLoaction,
    ...orderDeatils,
    ...isLoggedIn,
    ...userData,
    ...bookingData,
    ...bookingDataPiccker
}