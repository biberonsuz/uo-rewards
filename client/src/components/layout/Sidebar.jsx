import { NavLink } from 'react-router-dom';
import styles from '../../styles/layout.module.css';

const menuItems = [
  { path: '/dashboard', label: 'UO Rewards Dashboard' },
  { path: '/profile', label: 'Profile' },
  { path: '/addresses', label: 'Addresses' },
  { path: '/payments', label: 'Payments' },
  { path: '/orders', label: 'Order History' },
  { path: '/wishlist', label: 'Wish List' },
  { path: '/favourites', label: 'Favourites' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.sidebarMenu}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.sidebarMenuItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.sidebarMenuLink} ${isActive ? styles.sidebarMenuLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
