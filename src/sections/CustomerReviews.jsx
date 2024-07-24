import ReviewCard from "../components/ReviewCard"

const CustomerReviews = () => {
  return (
    <section className="max-container">
      <h3 className="font-palanquin text-center text-4xl font-bold">
        What Our 
        <span className="text-red-600"> Customers</span> Say?</h3>
        <p className="info-text m-auto mt-4 max-w-lg text-center">
          Hear genuine stories from our satisfied customers about their exceptional experience with us.
        </p>
        <div className=" flex flex-1 justify-between items-center max-lg:flex-col gap-16">
          <ReviewCard />
        </div>


    </section>
  )
}

export default CustomerReviews