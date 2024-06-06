import React, { useState, ChangeEvent } from 'react';
import SubmitLogo from '../../images/Button/Vector.png';
import CancelLogo from '../../images/Button/Vector2.png';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const Feedback: React.FC = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Handle text change if needed
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Feedback" />
      <div>
        <div className='flex justify-center'>
          <div className='w-[40%] border rounded-lg border-slate-200 p-6'>
            <h4 className="text-xl font-bold text-[#D0662E] dark:text-white">Your Feedback</h4>
            <div className="mb-3 mt-3">
              <form>
                <label htmlFor="feedback" className="inline-block mb-1 text-base font-semibold text-[#353535] text-left">
                  Do you have any thoughts you’d like to share?
                </label>
                <textarea
                  id="feedback"
                  placeholder="Enter your feedback..."
                  className="mt-3 border border-stroke bg-white h-12 rounded-lg form-input dark:bg-zink-600/50 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 dark:text-slate-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 appearance-none w-full py-2 px-3 text-[#686b78] leading-tight"
                  onChange={handleTextChange}
                />

                <div className="container flex flex-wrap justify-around align-middle items-center my-3">
                  {['😞', '😔', '😑', '😊', '😀'].map((emoji, index) => (
                    <div key={index} className="item w-90px h-90px flex justify-center select-none items-center">
                      <label className="group">
                        <input
                          className="hidden"
                          type="radio"
                          name="feedback"
                          value={emoji}
                          onChange={() => handleEmojiSelect(emoji)}
                        />
                        <span
                          className={`text-3xl cursor-pointer transition-transform ${
                            selectedEmoji === emoji ? 'grayscale-0 scale-125' : 'grayscale'
                          }`}
                        >
                          {emoji}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className='flex'>
                  <button type="submit" className='w-35 mt-3 h-10 rounded-lg bg-[#D0662E] flex text-center items-center justify-center gap-3'>
                    <img src={SubmitLogo} alt="Submit" />
                    <span className='text-white'>Submit</span>
                  </button>
                  <button type="button" className='w-35 mt-3 ml-5 h-10 border border-[#D0D5DD] rounded-lg flex text-center items-center justify-center gap-3' onClick={() => setSelectedEmoji(null)}>
                    <img src={CancelLogo} alt="Cancel" />
                    <span className='text-[#D0D5DD] font-bold'>Cancel</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Feedback;
