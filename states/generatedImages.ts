import { atom } from "recoil";

export const generatedImagesState = atom({
  key: "generatedImages",
  default: [],
});

export const imagesLoadingState = atom({
  key: "areImagesLoading",
  default: false,
});
