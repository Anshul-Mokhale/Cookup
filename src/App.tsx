import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Home from './website/pages/Home';
import Allsaved from './pages/Dashboard/Allsaved';
import PostNow from './pages/PostNow';
import ViewPost from './pages/ViewPost';
import UpdateImage from './pages/UpdateImage';
import UpdateDetails from './pages/UpdateDetails';
import ViewSaved from './pages/ViewSaved';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const PostView = () => {
    const { id } = useParams();
    return (
      <>
        <PageTitle title={`${id} | Cookup`} />
        <ViewPost />
      </>
    );
  };

  const PostSavedView = () => {
    const { id } = useParams();
    return (
      <>
        <PageTitle title={`${id} | Cookup`} />
        <ViewSaved />
      </>
    );
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Cookup - Recipes sharing platform" />
              <Home />
            </>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <>
              <PageTitle title="All Posts | Cookup" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/user/saved-posts"
          element={
            <>
              <PageTitle title="Saved Posts | Cookup" />
              <Allsaved />
            </>
          }
        />
        <Route
          path="/user/profile"
          element={
            <>
              <PageTitle title="Profile | Cookup" />
              <Profile />
            </>
          }
        />

        <Route
          path="/user/post/post-now"
          element={
            <>
              <PageTitle title="Create New Post | Cookup" />
              <PostNow />
            </>
          }
        />
        <Route
          path="/user/post/view-post/:id"
          element={<PostView />}
        />
        <Route
          path="/user/saved-post/view-post/:id"
          element={<PostSavedView />}
        />
        <Route
          path="/user/post/update-image/:id"
          element={
            <>
              <PageTitle title="Update Post Image | Cookup" />
              <UpdateImage />
            </>
          }
        />
        <Route
          path="/user/post/update-details/:id"
          element={
            <>
              <PageTitle title="Update Post Details | Cookup" />
              <UpdateDetails />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/user/sign-in"
          element={
            <>
              <PageTitle title="Signin | Cookup" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/user/sign-up"
          element={
            <>
              <PageTitle title="Signup | Cookup" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
