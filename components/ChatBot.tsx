"use client";

import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import {
  generatedImagesState,
  imagesLoadingState,
} from "@/states/generatedImages";
import { API_OPTIONS, API_URL } from "@/api/constants";

const ChatBot = () => {
  const promptRef = useRef<any>(null);
  const [promptArr, setPromptArr] = useState<any>([]);
  const [, setGeneratedImages] = useRecoilState(generatedImagesState);
  const [areImagesLoading, setAreImagesLoading] =
    useRecoilState(imagesLoadingState);

  const generateImage = async (prompt: string) => {
    setGeneratedImages([]);
    setAreImagesLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        {
          prompt,
          page: 1,
        },
        API_OPTIONS
      );
      setGeneratedImages(response.data.results.images);
    } catch (error) {
      console.error(error);
    } finally {
      setAreImagesLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const prompt = promptRef.current.value;
    promptRef.current.value = "";
    setPromptArr((prevPromptArr: []) => [...prevPromptArr, prompt]);
    generateImage(prompt);
  };

  return (
    <div className="bg-[#FBFEFF] min-w-full h-screen pb-6 flex flex-col justify-between mobile:sticky top-0 left-0 mobile:min-w-[35rem]">
      <div>
        <div className="flex flex-col justify-center py-6 bg-white border-b chatbot-header border-b-gray-200">
          <p className="text-2xl font-medium text-[#22C55E] text-center">
            तस्बिर
            <span className="text-base text-black">.AI</span>
          </p>
          <p className="text-xs font-medium text-center">Powered by Trishan</p>
        </div>

        <div className="flex flex-col max-h-[45rem] gap-6 overflow-auto">
          <div className="flex items-end gap-4 m-6 mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/197/197387.png"
              className="border border-gray-200 rounded-full w-9 h-9"
              alt=""
            />

            <div className="p-4 bg-white border border-gray-200 rounded-t-2xl rounded-br-2xl max-w-[25rem]">
              <p className="text-[#334155]">
                Hi! I'm AI Image Generator 😎 Nice to meet you! 👋. Type and
                send your prompt to generate cool images!{" "}
              </p>
            </div>
          </div>

          {promptArr &&
            promptArr.map((prompt: string, index: number) => (
              <div className="flex items-end self-end gap-4 mr-8" key={index}>
                <div className="p-4 bg-[#ECFEFF] rounded-t-2xl rounded-bl-2xl max-w-[25rem]">
                  <p className="text-[#334155]">{prompt}</p>
                </div>

                <img
                  src="https://cdn-icons-png.flaticon.com/512/197/197387.png"
                  className="border border-gray-200 rounded-full w-9 h-9"
                  alt=""
                />
              </div>
            ))}

          {areImagesLoading && (
            <div className="flex items-end gap-4 mx-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/197/197387.png"
                className="border border-gray-200 rounded-full w-9 h-9"
                alt=""
              />

              <div className="p-4 bg-white border border-gray-200 rounded-t-2xl rounded-br-2xl max-w-[25rem] flex gap-4">
                <p>Generating</p>
                <img
                  src="https://monophy.com/media/Ky5F5Rhn1WRVZmvE5W/monophy.gif"
                  alt=""
                  className="object-contain w-6"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <form className="relative m-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full h-16 px-4 bg-white border border-gray-200 rounded-2xl placeholder:text-black focus:outline-none"
          placeholder="Enter your prompt..."
          ref={promptRef}
          disabled={areImagesLoading}
        />

        <button
          type="submit"
          className="absolute top-3 right-3 p-2.5 text-white bg-[#06B6D4] hover:bg-[#148497] rounded-full transition-all ease-in-out"
          disabled={areImagesLoading}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
