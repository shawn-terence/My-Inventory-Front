import React from "react"
import {Button} from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { Link } from "@nextui-org/link";
import {Accordion, AccordionItem} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
function SideBar(){
    const inventoryImage="https://cdn-icons-png.flaticon.com/128/12062/12062393.png"
    const posImage="https://cdn-icons-png.flaticon.com/128/2727/2727253.png"
    const statisticsImage="https://cdn-icons-png.flaticon.com/128/2041/2041637.png"
    const menuIcon="https://cdn4.iconfinder.com/data/icons/symbol-blue-set-1/100/Untitled-2-22-512.png"
    const dashboardIcon="https://cdn1.iconfinder.com/data/icons/tiny-iconz-line-vol-09/20/dashboard_panel_admin-256.png"
    const navigate = useNavigate();
    return(
        <div id="SideBar"className=" w-auto ">
            <div className="h-full  flex flex-col  p-2 items-center ">
                <div  id="Sidecontainer" >
                <Accordion >
                    <AccordionItem id="Accordion" className="w-20   rounded-full" hideIndicator={true}
                        title={<img src={menuIcon} className="size-8 ml-6"/>}
                    >
                    <Button id="statsButton"className="mb-6 p-6 bg-clear" startContent={<img className="size-8" src={dashboardIcon}/>}
                    onClick={() => navigate('/')}>
            
                    </Button>
                    <Button id="inventoryButton" className=" mb-6 rounded-full bg-clear" 
                    startContent={<img className="size-8" src={inventoryImage}/>}
                    onClick={() => navigate('/inventory')}>
                    </Button>
                    <Button id="saleButton"className="mb-6 p-6 bg-clear"  startContent={<img className="size-8" src={posImage} />}
                    onClick={() => navigate('/sale-terminal')}>
    
                    </Button>
                    <Button id="statsButton"className="mb-6 p-6 bg-clear" startContent={<img className="size-8" src={statisticsImage}/>}
                    onClick={() => navigate('/statistics')}>
            
                    </Button>
                    </AccordionItem>
                </Accordion>
                <div className="mt-9">
                </div>
                </div>

            </div>
            <div>
            </div>
        </div>
    )
}
export default SideBar