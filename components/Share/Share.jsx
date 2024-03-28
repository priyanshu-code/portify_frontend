"use client";
import { useState } from "react";
import { PiShareFatLight } from "react-icons/pi";
import {
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

const Share = ({ creator }) => {
  const url = "https://portify.website/";
  return (
    <div className=" bg-[#f8f9fa] flex justify-center items-center">
      <WhatsappShareButton
        url={`${url}${creator}`}
        title={'Checkout my portfolio made by Portify 😄❤️'}
        blankTarget='true'
        separator=":: "
        >
        <WhatsappIcon  className='pr-2 hover:scale-110'round />
        </WhatsappShareButton>
        <TwitterShareButton
            url={`${url}${creator}`}
            blankTarget='true'
            title={'Checkout my portfolio made by Portify 😄❤️'}
            >
        <TwitterIcon  className='pr-2 hover:scale-110' round />
        </TwitterShareButton>
        <TelegramShareButton
        url={`${url}${creator}`}
        blankTarget='true'
        title={'Checkout my portfolio made by Portify 😄❤️'}
        >
        <TelegramIcon  className='pr-2 hover:scale-110' round />
        </TelegramShareButton>
        <RedditShareButton
        url={`${url}${creator}`}
        blankTarget='true'
        title={'Checkout my portfolio made by Portify 😄❤️'}
        >
        <RedditIcon className='pr-2 hover:scale-110' round />
        </RedditShareButton>
         
        <LinkedinShareButton
        title={'Checkout my portfolio made by Portify 😄❤️'} 
        blankTarget='true' 
        url={`${url}${creator}`}>
        <LinkedinIcon  className='pr-2  hover:scale-110' round />
        </LinkedinShareButton>
        {/* <EmailShareButton
        url={`${url}${creator}`}
        blankTarget='true'
        subject={'Portify'}
        body="Checkout my portfolio made by Portify"
        >
        <EmailIcon className='pr-2 hover:scale-110' round />
        </EmailShareButton> */}
    </div>
  )
}


export default Share;
