import Button from "../components/Button"
import { arrowRight } from '../assets/icons';
import {statistics} from '../constants';
import { boy } from "../assets/images";


const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex xl:flex-row 
       flex-col justify-center min-h-screen
       gap-10 max-container "
    >
      <div className="relative xl:w-3/6 
      flex flex-col justify-center
      items-start w-full max-xl:px-6 pt-20 pl-20 xl:pl-20">
        <p className="text-xl font-playfair text-red-600">Naise Collection For You</p>
        <h1 className="mt-10 font-roboto text-8xl max-md:text-[72px] max-md:leading-[82] max-sm:text-[40px] max-sm:leading-[50px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">Check Out The</span>
          <br />
          <span className="text-red-600 inline-block max-sm:mt-0">Knockout</span> Designs
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">Explore bold and artistic tattoo designs, expert craftsmanship, and a commitment to your unique style at Black Craft Tattoo.
        </p>
        <Button label="Discover More"
        iconURL={arrowRight}
        />
        <div className="flex justify-start items-start
        flex-wrap w-full mt-20 gap-16"
        >
          {statistics.map((stat)=> (
            <div key={stat.label}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">{stat.label}</p>
            </div>

          ))}
         
        </div>
      </div>
      <div className="relative flex-2 flex justify-center items-center xl:min-h-screen max-xl:py-0">
          <img src={boy} width={610} height={500} className="object-contain relative z-10"/>
          
      </div>
    </section>
  )
}

export default Hero