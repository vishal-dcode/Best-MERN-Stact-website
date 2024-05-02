import {useSelector} from 'react-redux';
import {selectUserInfo} from '../userSlice';
import {Link} from 'react-router-dom';

export default function UserProfile() {
  const userInfoSelector = useSelector(selectUserInfo);
  return (
    <section className="profile_page-ctr">
      <div className="profile_type">
        <figure className="profile_pic">
          {userInfoSelector.profilePic ? (
            <img src={userInfoSelector.profilePic} alt="Profile Pic" />
          ) : (
            <svg
              width="100"
              height="100"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_325_1001)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M120 0H80V51.7157L43.4315 15.1472L15.1472 43.4314L51.7158 80H0V120H51.7157L15.1472 156.568L43.4315 184.853L80 148.284V200H120V148.284L156.569 184.853L184.853 156.569L148.284 120H200V80H148.284L184.853 43.4314L156.569 15.1471L120 51.7157V0Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_325_1001">
                  <rect width="200" height="200" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </figure>

        <span>
          Account type: {userInfoSelector.role ? userInfoSelector.role : 'User'}
        </span>
      </div>
      <div>
        <h1 className="profile_name">
          {userInfoSelector.userName ? userInfoSelector.userName : 'New User'}
        </h1>
        <div className="profile_link">
          <Link className="profile_link-order" to="/orders">
            FOLLOW YOUR ORDERS
          </Link>
          <Link className="profile_link-signout" to="/logout">
            SIGNOUT
          </Link>
        </div>
        {userInfoSelector.addresses[0] && (
          <div className="profile_page-info">
            <div className="flex gap-1">
              <span>Email:</span> {userInfoSelector.email} ~ <span>Phone:</span>{' '}
              {userInfoSelector.addresses[0].phone}
            </div>
            <div>
              <p>
                <span>Address:</span> {userInfoSelector.addresses[0].street}
              </p>
              <p>
                <span>State:</span> {userInfoSelector.addresses[0].state}
              </p>
              <p>
                <span>City:</span> {userInfoSelector.addresses[0].city}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
