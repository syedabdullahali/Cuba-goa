import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { Suspense } from 'react';
import Footer from './components/Root-Component/Footer/Footer';
import PostSpaData from "./components/Root-Component/postSpaData/PostSpaData";
import SpaDetailes from "./components/Root-Component/postSpaData/detailedSpa";
import BookingForm from "./components/Root-Component/BookingForm/BookingForm";


const Header = React.lazy(() => import('./components/Header/Header'))
const Home = React.lazy(() => import('./components/Root-Component/Home/Home'))
const About = React.lazy(() => import('./components/Root-Component/About/About'))
const Spa = React.lazy(() => import('./components/Root-Component/spa/Spa'))

const Resorts = React.lazy(() => import('./components/Root-Component/Resorts/Resorts'))
const OurProperties = React.lazy(() => import('./components/Root-Component/OurProperties/OurProperties'))
const ContactUs = React.lazy(() => import('./components/Root-Component/Contact/ContactUs'))
const Gallery = React.lazy(() => import('./components/Root-Component/Gallery/Gallery'))
const BookingPage = React.lazy(() => import('./components/Root-Component/BookingPage/BookingPage'))
const LogIn2 = React.lazy(() => import('./components/Root-Component/LogIn2/Login2'))
const LandingPage = React.lazy(() =>  import('./components/Landing-Page/LandingPage.js') )
const ShowInfoOfRoomCart = React.lazy(() => import('./components/Root-Component/Home/ShowInfoOfRoomCart'))
const LearnMore = React.lazy(() => import('./components/Root-Component/Home/LearnMore'))


function App() {

  return (
    <div style={{ position: 'relative' }}>
      <BrowserRouter>
        <Routes>

          {/* <Route path='/log-in' element={<Suspense fallback={<p>Loading....</p>}>
            <LogIn2 />
          </Suspense>}>
          </Route> */}

          <Route path='/landing-page' element={<Suspense fallback={<p>Loading....</p>}>
            <LandingPage />
          </Suspense>}>
          </Route>


          <Route path="" element={<Header />}>

            <Route path='/' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Home />
                </>
              </Suspense>
            } />

            <Route path="/about" element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <About />
                  <Footer />
                </>
              </Suspense>
            } />

            <Route path="/spa" element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Spa />
                  <Footer />
                </>
              </Suspense>
            } />


            <Route path='/our-properties/:name/:id' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <BookingPage />
                  <Footer />
                </>
              </Suspense>
            } />

            <Route path='/resorts' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Resorts />
                </>
              </Suspense>

            } />

            <Route path='/our-properties' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <OurProperties />
                </>
              </Suspense>

            } />

            <Route path='/contact-us' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <ContactUs />
                  <Footer />
                </>
              </Suspense>

            } />

            <Route path='/gallery' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Gallery />
                  <Footer />
                </>
              </Suspense>} />

            <Route path='/view-room-info/:id/:idChild'
              element={
                <Suspense fallback={<p>Loading....</p>}>
                  <ShowInfoOfRoomCart />
                </Suspense>
              } />
            <Route path="/leran-More" element={
              <Suspense fallback={<p>Loading....</p>}>
                <LearnMore />
              </Suspense>
            } />
            <Route path="/addSpa" element={
              <Suspense fallback={<p>Loading....</p>}>
                <PostSpaData />
              </Suspense>
            } />
            <Route path="/spa-details/:id" element={
              <Suspense fallback={<p>Loading....</p>}>
                <SpaDetailes />
              </Suspense>
            } />

            <Route path="/booking-form" element={
              <Suspense fallback={<p>Loading....</p>}>
                <BookingForm />
              </Suspense>
            } />


          </Route>


        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
