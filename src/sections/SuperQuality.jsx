import Button from "../components/Button"
import { sheryl2 } from "../assets/images"
const SuperQuality = () => {
  return (
    <section
      id="about-us"
      className="mt-12 flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          Meet Our Top
          <span className="text-red-600"> Leading </span>
          <span className="text-red-600"> Super</span> Artist
        </h2>
        <p className="mt-4 lg:max-w-xl info-text">
        Sheryl is the top artist at Black Craft Tattoo Studio, 
        celebrated for her exceptional talent and innovative designs. 
        With over a decade of experience, Sheryl has mastered a range of styles, f
        rom intricate black-and-gray to vibrant full-color tattoos. Specializing in realism, 
        neo-traditional, and geometric tattoos, Sheryl’s versatile styles have earned 
        her global recognition. She has been featured in top tattoo magazines and awarded multiple industry accolades.


        </p>
        <p className="mt-6 lg:max-w-lg info-text"> Her dedication makes her the premier choice for unique, high-quality tattoos at Black Craft Tattoo Studio. </p>
        <div className="mt-11">
        <Button label="View More"
        />
        </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img src={sheryl2} alt="artist" width={570} height={500} className="object-contain" />

        </div>
    </section>
  )
}

export default SuperQuality