import { star } from "../assets/icons"


const ReviewCard = ({imgURL, customerName, rating, feedback}) => {
  return (
    <div className="flex justify-center items-center flex-col">
        <img src={imgURL} alt="customer" className="rounded-full object-cover w-[120px] h-[120px]" />
        <p>{feedback}</p>
        <div>
            <img src={star} width={24} height={24} className="object-contain m-0" />
        </div>
    </div>
  )
}

export default ReviewCard