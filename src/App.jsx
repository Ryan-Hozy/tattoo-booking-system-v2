import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./sections";
import Nav from './components/Nav';

const App = () => (
  <main className="relative">
    <Nav />
    <section className="x1:padding-1 wide:pidding-r padding-b">
      <Hero/>
    </section>
    <section className="padding">
      <PopularProducts/>
    </section>
    <section className="padding-x py-10">
      <Services/>
    </section>
    <section className="padding">
     <SuperQuality/>
    </section>
    
    <section className="bg-pale-black padding">
      <CustomerReviews/>
    </section>
    <section className="padding-x sm:py-32 py-16 w-full">
      <Subscribe/>
    </section>
    <section className="padding-x padding-t pb-8 bg-black">
      <Footer/>
    </section>
  </main>
);

export default App;