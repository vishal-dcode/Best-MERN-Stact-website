import UserOrders from '../features/user/containers/UserOrders';
import UserProfile from '../features/user/containers/UserProfile';

export default function UserOrdersPage() {
  return (
    <main className="profile_page-wrapper">
      <UserProfile />

      <section className="admin-order-panel profile-order-panel">
        {/* //! USER ORDERS */}
        <UserOrders />
      </section>
    </main>
  );
}
