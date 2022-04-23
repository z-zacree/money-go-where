// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

// Components
import AccountCard from "./card";

const CardCarousel = ({ width, fields, setIndex }) => {
    return (
        <Swiper
            slidesPerView={width < 650 ? 1 : 2}
            modules={[Pagination]}
            onProgress={(event) => {
                for (const slide of event.slides) {
                    const slideProgress = slide.progress;
                    const absoluteProgress = Math.abs(slideProgress);
                    let n = 1;
                    if (absoluteProgress > 1) n = 0.3 * (absoluteProgress - 1) + 1;
                    slide.style.transform = `translateX(${`${slideProgress * n * 50}%`}) scale(${1 - 0.2 * absoluteProgress})`;
                    slide.style.zIndex = event.slides.indexOf(slide) - Math.abs(Math.round(slideProgress));
                    slide.style.opacity = absoluteProgress > 3 ? 0 : 1;
                }
            }}
            onSetTransition={(event, t) => {
                for (const slide of event.slides) {
                    slide.style.transitionDuration = `${t}ms`;
                }
            }}
            onRealIndexChange={(e) => {
                setIndex(e.snapIndex);
            }}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            watchSlidesProgress
            grabCursor
            centeredSlides
            loop={Object.keys(fields.accounts).length > 4}
        >
            {Object.keys(fields.accounts).map((accountName, index) => (
                <SwiperSlide key={index}>
                    <AccountCard accountName={accountName} accountValues={fields.accounts[accountName]} />
                </SwiperSlide>
            ))}
            <SwiperSlide>
                <AccountCard create />
            </SwiperSlide>
        </Swiper>
    );
};

export default CardCarousel;
