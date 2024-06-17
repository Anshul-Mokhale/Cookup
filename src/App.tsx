import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

import ECommerce from './pages/Dashboard/ECommerce';
import PrivateRoute from './PrivateRoute';
import Profile from './pages/Profile';
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
        {/* 
        <Route
          path='/dashboard'
          element={
            <>
              <PageTitle title="Mamta medical | Dashboard" />
              <ECommerce />
            </>
          }
        /> */}

        <Route element={<PrivateRoute />}>
          <Route
            path="/user/dashboard"
            element={
              <>
                <PageTitle title="All Posts | Cookup" />
                <ECommerce />
              </>
            }
          />
        </Route>

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
