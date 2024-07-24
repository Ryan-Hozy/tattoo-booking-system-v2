import { star } from "../assets/icons"


const ReviewCard = () => {
  
  return (
      <section id="testimonials" className="font-roboto">
    
      
      <ul role="list"
        className="max-w-full mt-8 grid grid-cols-1 gap-8 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
        <li>
          <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
            <li>
              <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
                  width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                  
                </svg>
                <blockquote className="relative">
                  <p className="text-lg tracking-tight text-slate-900 leading-7">Black Craft Studio's tattoo artists are incredibly talented. My new ink looks amazing and exceeded my expectations!</p>
                </blockquote>
                <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
                  <div>
                    <div className="font-display text-base text-slate-900">Sheryl Berge</div>
                  </div>
                  <div className="overflow-hidden rounded-full bg-slate-50">
                    <img alt="" className="h-14 w-14 object-cover" src="https://randomuser.me/api/portraits/men/15.jpg/"/>
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </li>
        <li>
          <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
            <li>
              <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
                  width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                </svg>
                <blockquote className="relative">
                  <p className="text-lg tracking-tight leading-7 text-slate-900">The attention to detail at Black Craft Studio is unmatched. My tattoo turned out even better than I imagined.</p>
                </blockquote>
                <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div className="font-display text-base text-slate-900">Leland Kiehn</div>
                  </div>
                  <div className="overflow-hidden rounded-full bg-slate-50">
                    <img alt="" className="h-14 w-14 object-cover" src="https://randomuser.me/api/portraits/women/15.jpg"/>
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </li>
        <li>
          <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
            <li>
              <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
                  width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                  
                </svg>
                <blockquote className="relative">
                  <p className="text-lg tracking-tight leading-7 text-slate-900">I felt comfortable and confident getting my tattoo at Black Craft Studio. The artists are true professionals.</p>
                </blockquote>
                <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div className="font-display text-base text-slate-900">Peter Renolds</div>
                  </div>
                  <div className="overflow-hidden rounded-full bg-slate-50">
                    <img alt="" className="h-14 w-14 object-cover" src="https://randomuser.me/api/portraits/men/10.jpg"/>
                  </div>
                </figcaption>
              </figure>
            </li>
          </ul>
        </li>
      </ul>
   
  </section>
  )
}

export default ReviewCard