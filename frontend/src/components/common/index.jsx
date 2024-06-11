import { FaUsers } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
export const sideItem = [
    { name: 'All Users', value: 'av1', icon: <FaUsers /> },
    { name: 'All Product', value: 'p1', icon: <AiFillProduct /> }
]
export const socialIcon = [
    { value: 'w1', icon: <FaSquareWhatsapp />, link: '', animation: 'animate-pulse' },
    { value: 'i1', icon: <FaSquareInstagram />, link: '', animation: 'animate-ping' },
    { value: 'f1', icon: <FaFacebookSquare />, link: '', animation: 'animate-bounce' },
    { value: 't1', icon: <FaXTwitter />, link: '', animation: 'animate-spin' },
    { value: 'l1', icon: <FaLinkedin />, link: 'linkedin.com/in/durgesh-katyayan-653a572b1', animation: 'animate-bounce' },
    { value: 'y1', icon: <FaYoutube />, link: '', animation: 'animate-ping' },
    { value: 'g1', icon: <FaGithubSquare />, link: 'https://github.com/youngkatyayan', animation: 'animate-pulse' }
]