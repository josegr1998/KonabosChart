import { IPostData } from "@/interfaces/app/IPostData";
import { Post } from "../Post/Post";
import { Container } from "../Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/effect-cube";
import {
  EffectCube,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";


export const Posts = ({ data }: { data: IPostData[] }) => {
  return (
    <Container>
      <div className=''>
        <Swiper
          modules={[Navigation, Pagination, EffectCube, Scrollbar]}
          spaceBetween={50}
          slidesPerView={2}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          scrollbar={{
            el: ".swiper-scrollbar",
            draggable: true,
          }}
          effect='cube'
          speed={1000}
        >
          {data.map((post, index) => (
            <SwiperSlide key={index}>
              <Post data={post} />
            </SwiperSlide>
          ))}
          <div className="swiper-scrollbar"></div>
        </Swiper>
        <div></div>
      </div>
    </Container>
  );
};
