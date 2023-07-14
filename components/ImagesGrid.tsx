import {
  generatedImagesState,
  imagesLoadingState,
} from "@/states/generatedImages";
import { useRecoilState } from "recoil";
import Skeleton from "./Skeleton";

const ImagesGrid = () => {
  const [generatedImages] = useRecoilState(generatedImagesState);
  const [areImagesLoading] = useRecoilState(imagesLoadingState);

  return (
    <div className="m-10">
      <div className="grid grid-cols-1 gap-6 m-8 small:grid-cols-2 medium:grid-cols-3 mobile:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        {areImagesLoading && <Skeleton />}

        {generatedImages && !areImagesLoading &&
          generatedImages.map((imageUrl: string) => (
            <a href={imageUrl} target="_blank">
              <img
                className="object-cover transition-all ease-in-out shadow-md cursor-pointer rounded-xl hover:scale-105 min-w-50 min-h-80"
                src={imageUrl}
                alt=""
              />
            </a>
          ))}
      </div>
    </div>
  );
};

export default ImagesGrid;
