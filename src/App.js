import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar } from './components';
import {
  Kanban,
  Editor,
  ListSites,
  NewSites,
  EditSites,
  ViewSites,
  Dashboard,
  SiteAnalysis,
  MailForReviews,
} from './pages';

import AddRequest from './pages/request/AddRequest';
import EditRequest from './pages/request/EditRequest';
import ListRequest from './pages/request/ListRequest';
import ViewRequest from './pages/request/ViewRequest';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { currentMode, activeMenu, currentColor, setThemeSettings } =
    useStateContext();
  const [subid, setSubid] = useState(2);

  return (
    <div className={currentMode === 'Light' ? 'light' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* pages  */}

                <Route path="/sites">
                  <Route index element={<ListSites id={subid} />} />
                  <Route path="new" element={<NewSites id={subid} />} />
                  <Route path=":siteid" element={<SiteAnalysis />} />
                  <Route
                    path="edit/:siteid"
                    element={<EditSites id={subid} />}
                  />
                  <Route path="mail" element={<MailForReviews />} />
                </Route>

                {/* request */}
                <Route path="/help">
                  <Route index element={<ListRequest />} />
                  <Route path="new" element={<AddRequest />} />
                  <Route path="edit/:idRequest" element={<EditRequest />} />
                  <Route path="view/:idRequest" element={<ViewRequest />} />
                </Route>

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
