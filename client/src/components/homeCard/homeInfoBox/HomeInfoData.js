import { FaShippingFast } from "react-icons/fa";
import { 
    BsCreditCardFill, 
    BsClockHistory, 
    BsCartCheck 
} from "react-icons/bs"



export const homeInfoData = [
    {
        icons: <FaShippingFast size={30} color="#8cb4f5" />,
        heading: "Free shipping",
        text: "We offer free shipping of some special products.",
    },
    {
        icons: <BsCreditCardFill size={30} color="#f7d272" />,
        heading: "Secure payment",
        text: "Make secure payment for your products."
    },
    {
        icons: <BsCartCheck size={30} color="#fa82ea" />,
        heading: "Quality products",
        text: "We sell products from only tested and quality brands."
    },
    {
        icons: <BsClockHistory />,
        heading: "24/7 support",
        text: "Get access to support from our expert support team."
    }

]