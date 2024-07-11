import { BiSearch } from "react-icons/bi"
import styles from "./Search.module.scss";


export default function Search ({ value, onChange, iconClass, searchProductList }) {
    return(
        <div className={`${styles.search} ${searchProductList}`}>
            <BiSearch size={18} className={`${styles.icon} ${iconClass}`} />
            <input
                className={styles.inputHolder}
                type="text"
                placeholder="search products" 
                value={value}
                onChange={onChange}
            />
        </div>
    )
}