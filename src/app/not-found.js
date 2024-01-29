import Image from "next/image";
import notfound from '../../public/404.jpg'
import Nav from "./nav";



export default function Notfound() {
    return (<>
        <Nav></Nav>
        <Image src={notfound} height={550} width={600} style={{ position: "relative", top: "80px", left: "370px" }}></Image>
    </>)
}