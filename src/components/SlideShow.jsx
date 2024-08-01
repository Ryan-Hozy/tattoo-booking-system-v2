import React from "react";
import {Carousel} from 'react-bootstrap';
import image1 from '../assets/images/1.png';
import image2 from '../assets/images/2.png';
import image3 from '../assets/images/3.png';
import image4 from '../assets/images/4.png';



const SlideShow = () => {
    const images = [
        {src: image1, alt: "Image 1"},
        {src: image2, alt: "Image 2"},
        {src: image3, alt: "Image 3"},
        {src: image4, alt: "Image 4"},
       

    ];

    return (
        <Carousel>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block mx-auto" // Center the image horizontally
                src={image.src}
                alt={image.alt}
                style={{ maxHeight: "830px" }} // Set a maximum height for the image
              />
              
            </Carousel.Item>
          ))}
        </Carousel>
      );
    };

export default SlideShow;