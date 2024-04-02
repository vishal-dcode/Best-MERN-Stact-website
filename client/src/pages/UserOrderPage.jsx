import {Link} from 'react-router-dom';
import UserOrders from '../features/user/containers/UserOrders';

export default function UserOrderPage() {
  return (
    <main className="profile_page-wrapper">
      <section className="profile_page-ctr">
        <div className="profile_type">
          <img
            src="https://images.unsplash.com/photo-1709675153296-1f7e5b74137b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3OXx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <span>Account type: Admin</span>
        </div>
        <div>
          <h1 className="profile_name">Vishal Vishwakarma</h1>
          <div className="profile_link">
            <Link className="profile_link-order" to="/orders">
              FOLLOW YOUR ORDERS
            </Link>
            <Link className="profile_link-signout" to="/signout">
              SIGNOUT
            </Link>
          </div>
          <div className="profile_page-info">
            <p>
              <span>Email:</span> vishalvish4225@gmail.com ~ <span>Phone:</span>{' '}
              +91 883-000-6845
            </p>
            <p>
              <span>Address:</span> Bhumi Silveriio Dehu-Alandi Road,
              Pimpri-Chinchward, Moshi
            </p>
            <p>
              <span>State:</span> Maharashtra
            </p>
            <p>
              <span>City:</span> Pune
            </p>
          </div>
        </div>
      </section>
      <section className="admin-order-panel profile-order-panel">
        <div className="sorting-wrapper">
          <span></span>
          <div className="sorting-ctr">Sort by: High to Low</div>
        </div>
        {/* //! USER ORDERS */}
        <UserOrders />
      </section>
    </main>
  );
}
