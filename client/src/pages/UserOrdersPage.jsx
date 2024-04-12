import UserOrders from '../features/user/containers/UserOrders';
import UserProfile from '../features/user/containers/UserProfile';

function UserOrdersPage() {
  return (
    <main className="profile_page-wrapper">
      <UserProfile />

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

export default UserOrdersPage;
