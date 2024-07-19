import { products } from "../constants";
import PopularProductCard from "../components/PopularProductCard";

const PopularProducts = () => {
  return (
    <section id="products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">Our <span className="text-red-600">Latest</span> Designs</h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">Turn this design into your one-of-a-kind masterpiece! Each design is exclusively yours and won't be repeated.</p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {products.map((product) => (
          <PopularProductCard key=
          {product.name} {...product} />
        ))}
      </div>
    </section>
  )
}

export default PopularProducts