import S from "./styles.module.css"
import List from "../List/list";
import {Categories} from "../category/category";

export default function Table() {
    return(
        <main className={S.main}>
            <Categories />
            <List />
            <div>Description</div>
        </main>
    )
}