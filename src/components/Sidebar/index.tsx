import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/Group 28.png';
import task5 from '../../images/task/5.png';
import task6 from '../../images/task/6.png';
import task7 from '../../images/task/7.png';
import task8 from '../../images/task/8.png';
import task9 from '../../images/task/9.png';
import task10 from '../../images/task/10.png';
// import task11 from '../../images/task/11.png';
import task12 from '../../images/task/11 (1).png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-[#494949] text-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 
      ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/Login">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === '/ECommerce' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-[#D0662E] ${
                          (pathname === '/ECommerce' ||
                            pathname.includes('dashboard')) &&
                          'bg-[#D0662E]'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      ><img src={task12}></img>
                        Dashboard
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/ECommerce"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }>CRM
                            </NavLink>
                          </li>
                        </ul>
                      </div>
               
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Dashboard --> */}

              
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/ECommerce"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('ECommerce') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task12}></img>Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
              

              {/* <!-- Menu Item Ticket --> */}
              <li>
                <NavLink
                  to="/Tickets"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Ticket') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task7}></img>Ticket
                </NavLink>
              </li>
              {/* <!-- Menu Item Ticket --> */}

              {/* <!-- Menu Item Invoice --> */}
              <li>
                <NavLink
                  to="/Invoices"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Invoice') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task5}></img>
                  Invoice
                </NavLink>
              </li>
              {/* <!-- Menu Item Invoice --> */}

              {/* <!-- Menu Item Quotes --> */}
              <li>
                <NavLink
                  to="/Quotes"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Quotes') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task6}></img>
                  Quotes
                </NavLink>
              </li>
              {/* <!-- Menu Item Quotes --> */}

              {/* <!-- Menu Item Subscription --> */}
              <li>
                <NavLink
                  to="/Subscription"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Subscription') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task8}></img>
                  Subscription
                </NavLink>
              </li>
              {/* <!-- Menu Item Subscription --> */}

              {/* <!-- Menu Item Change Password --> */}
              <li>
                <NavLink
                  to="/ChangePassword"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('ChangePassword') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task9}></img>
                   Change Password
                </NavLink>
              </li>
              {/* <!-- Menu Item Change Password --> */}

              {/* <!-- Menu Item Contact US --> */}
              <li>
                <NavLink
                  to="/ContactUS"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Contact US') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task10}></img>
                  Contact US
                </NavLink>
              </li>
              {/* <!-- Menu Item Contact US--> */}
              {/* <!-- Menu Item Messages --> */}
              {/* <li>
                <NavLink
                  to="/Messages"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Messages') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}><img src={task10}></img>
                  Messages
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Messages --> */}

              {/* <!-- Menu Item Profile --> */}
              {/* <li>
                <NavLink
                  to="/Logout"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark ${
                    pathname.includes('Logout') && 'bg-graydark dark:bg-meta-4'
                  }`}><img src={task11}></img>
                  Logout
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Profile --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
