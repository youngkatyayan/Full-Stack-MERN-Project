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
export const category=[
    {name:'airpodes', value:'airpodes',id:1},
    {name:'camera', value:'camera',id:2},
    {name:'earphones', value:'earphones',id:3},
    {name:'mobile', value:'mobile',id:4},
    {name:'mouse', value:'mouse',id:5},
    {name:'printers', value:'printers',id:6},
    {name:'processor', value:'processor',id:7},
    {name:'refrigerator', value:'refrigerator',id:8},
    {name:'speakers', value:'speakers',id:9},
    {name:'trimmers', value:'trimmers',id:10},
    {name:'TV', value:'TV',id:11},
    {name:'watches', value:'watches',id:12},
]